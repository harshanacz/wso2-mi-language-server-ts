// Ported from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/ConnectorConfigService.java.
// Differences from the Java version: there are no threads here, so the per-project locks are not needed; the
// config file is written through a temp file and a rename like the Java code (the atomic-move fallback is the
// same single rename on the host file system).
import { Logger, Level, StringUtils, JavaHashMap, IllegalArgumentException } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { ConnectorHolder } from "../../connectors/ConnectorHolder.js";
import { Connector } from "../../connectors/entity/Connector.js";
import { Files, Path } from "../../host/nio.js";
import { JFile } from "../../host/JFile.js";
import { writeJacksonPretty } from "../../jackson.js";
import { parse as parseYaml } from "yaml";
import { parseDOM, DOMElement, DOMNode } from "../../../syntaxTree/dom/dom.js";
import { ConnectorConfig } from "./ConnectorConfig.js";
import { ConnectorDependencyConfig } from "./ConnectorDependencyConfig.js";
import { ConnectorDependencyResponse } from "./ConnectorDependencyResponse.js";
import { ConnectorEffectiveData } from "./ConnectorEffectiveData.js";
import { DependencyOverride } from "./DependencyOverride.js";
import { EffectiveDependency } from "./EffectiveDependency.js";
import { ResetConnectorDependencyRequest } from "./ResetConnectorDependencyRequest.js";
import { UpdateConnectorDependencyRequest } from "./UpdateConnectorDependencyRequest.js";
import { UpdateConnectorFlagsRequest } from "./UpdateConnectorFlagsRequest.js";
import { UpdateGlobalConnectorFlagsRequest } from "./UpdateGlobalConnectorFlagsRequest.js";
import { isWellFormed, unescapeXml } from "../../../syntaxTree/utils.js";

/** java.lang.IllegalStateException */
export class IllegalStateException extends Error {
  constructor(message?: string, readonly cause?: unknown) {
    super(message);
    this.name = "IllegalStateException";
  }
}

const LOGGER = Logger.getLogger("ConnectorConfigService");

const LOCAL_ENTRIES_RELATIVE_PATH = Path.of("src", "main", "wso2mi", "artifacts", "local-entries");
const CONFIG_RELATIVE_PATH = "src/main/wso2mi/resources/connectors/connector-config.json";
const CONFIG_VERSION = "1.0";

type Json = Record<string, unknown>;

const isBlank = (v: string | null | undefined): boolean => v === null || v === undefined || v.trim() === "";
const blankToNull = (v: string | null | undefined): string | undefined => (isBlank(v) ? undefined : v!);
const isTrue = (v: boolean | null | undefined): boolean => v === true;

// ---------------------------------------------------------------------------
// JSON mapping (Jackson with NON_NULL inclusion and FAIL_ON_UNKNOWN_PROPERTIES)
// ---------------------------------------------------------------------------

function fail(msg: string): never {
  throw new Error(msg);
}

function expectObject(v: unknown, what: string): Json {
  if (v === null || typeof v !== "object" || Array.isArray(v)) fail(`Cannot deserialize ${what} from a non-object value`);
  return v as Json;
}

function checkKnown(o: Json, known: string[], what: string): void {
  for (const k of Object.keys(o)) if (!known.includes(k)) fail(`Unrecognized field "${k}" (class ${what})`);
}

function optString(o: Json, k: string): string | undefined {
  const v = o[k];
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return fail(`Cannot deserialize String from ${typeof v} for "${k}"`);
}

function optBoolean(o: Json, k: string): boolean | undefined {
  const v = o[k];
  if (v === null || v === undefined) return undefined;
  if (typeof v === "boolean") return v;
  if (v === "true") return true;
  if (v === "false") return false;
  return fail(`Cannot deserialize Boolean from ${typeof v} for "${k}"`);
}

function toOverride(v: unknown): DependencyOverride {
  const o = expectObject(v, "DependencyOverride");
  checkKnown(o, DependencyOverride.__fields, "DependencyOverride");
  const d = new DependencyOverride();
  d.connectionType = optString(o, "connectionType");
  d.groupId = optString(o, "groupId");
  d.artifactId = optString(o, "artifactId");
  d.version = optString(o, "version");
  d.omit = optBoolean(o, "omit");
  d.localPath = optString(o, "localPath");
  return d;
}

function toConnectorCfg(v: unknown): ConnectorDependencyConfig {
  const o = expectObject(v, "ConnectorDependencyConfig");
  checkKnown(o, ConnectorDependencyConfig.__fields, "ConnectorDependencyConfig");
  const c = new ConnectorDependencyConfig();
  c.omit = optBoolean(o, "omit");
  c.omitAllDrivers = optBoolean(o, "omitAllDrivers");
  c.qname = optString(o, "qname");
  const deps = o["dependencies"];
  if (deps !== null && deps !== undefined) {
    if (!Array.isArray(deps)) fail('Cannot deserialize List from a non-array value for "dependencies"');
    c.dependencies = deps.map(toOverride);
  }
  return c;
}

function parseConfig(text: string): ConnectorConfig {
  const o = expectObject(JSON.parse(text), "ConnectorConfig");
  checkKnown(o, ConnectorConfig.__fields, "ConnectorConfig");
  const c = new ConnectorConfig();
  c.version = optString(o, "version");
  c.omitAllDrivers = optBoolean(o, "omitAllDrivers");
  c.omitAllConnectors = optBoolean(o, "omitAllConnectors");
  // Jackson fills a Map property with a LinkedHashMap, so the file order is kept
  c.connectors = new Map();
  const conns = o["connectors"];
  if (conns !== null && conns !== undefined) {
    const co = expectObject(conns, "connectors");
    for (const [k, v] of Object.entries(co)) c.connectors.set(k, toConnectorCfg(v));
  }
  return c;
}

/** The class instances as plain ordered maps (declaration order, nulls left out) ready for the pretty printer. */
function toWritable(v: unknown): unknown {
  if (v === null || v === undefined) return undefined;
  if (v instanceof Map) {
    const m = new Map<string, unknown>();
    for (const [k, x] of v) {
      const w = toWritable(x);
      if (w !== undefined) m.set(String(k), w);
    }
    return m;
  }
  if (Array.isArray(v)) return v.map((x) => toWritable(x));
  if (typeof v === "object") {
    const m = new Map<string, unknown>();
    const fields: string[] = (v.constructor as { __fields?: string[] }).__fields ?? Object.keys(v);
    for (const f of fields) {
      const w = toWritable((v as Record<string, unknown>)[f]);
      if (w !== undefined) m.set(f, w);
    }
    return m;
  }
  return v;
}

// ---------------------------------------------------------------------------
// Read / Write
// ---------------------------------------------------------------------------

function configFile(projectPath: string): JFile {
  return new JFile(Path.of(projectPath, CONFIG_RELATIVE_PATH).toString());
}

export class ConnectorConfigService {
  static readonly __fields: string[] = [];

  /** Reads connector-config.json; an empty config when absent. Throws IllegalStateException when it is malformed. */
  static readConfig(projectPath: string): ConnectorConfig {
    const file = configFile(projectPath);
    if (!file.exists()) {
      const empty = new ConnectorConfig();
      empty.version = CONFIG_VERSION;
      empty.connectors = new JavaHashMap();
      return empty;
    }
    try {
      const config = parseConfig(Files.readString(file.getPath()));
      if (config.connectors == null) {
        config.connectors = new JavaHashMap();
      }
      return config;
    } catch (e) {
      const message = (e as Error).message;
      LOGGER.log(Level.SEVERE, "connector-config.json is malformed and cannot be read: " + message);
      throw new IllegalStateException("connector-config.json is malformed: " + message, e);
    }
  }

  /** Writes connector-config.json through a temp file, then renames it over the target. */
  static writeConfig(projectPath: string, config: ConnectorConfig): void {
    const file = configFile(projectPath);
    file.getParentFile()!.mkdirs();
    const target = Path.of(file.getPath());
    const tmp = Path.of(file.getPath() + ".tmp");
    try {
      Files.writeString(tmp, writeJacksonPretty(toWritable(config)) as string);
      Files.move(tmp, target);
    } catch (e) {
      try {
        Files.deleteIfExists(tmp);
      } catch (deleteEx) {
        LOGGER.log(Level.WARNING, "Failed to delete temp file after write failure: " + tmp, deleteEx);
      }
      throw e;
    }
    LOGGER.log(Level.INFO, "connector-config.json written to: " + file.getAbsolutePath());
  }

  static initIfAbsent(projectPath: string): void {
    const file = configFile(projectPath);
    if (!file.exists()) {
      try {
        const initial = new ConnectorConfig();
        initial.version = CONFIG_VERSION;
        initial.connectors = new JavaHashMap();
        ConnectorConfigService.writeConfig(projectPath, initial);
        LOGGER.log(Level.INFO, "Created initial connector-config.json at: " + file.getAbsolutePath());
      } catch (e) {
        LOGGER.log(Level.WARNING, "Could not create connector-config.json: " + (e as Error).message);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Override management
  // -------------------------------------------------------------------------

  static updateDependencyOverride(projectPath: string, request: UpdateConnectorDependencyRequest): void {
    if (isBlank(request.connectorArtifactId)) {
      throw new IllegalArgumentException("connectorArtifactId must not be blank");
    }
    const hasConnectionType = !isBlank(request.connectionType);
    const hasCoordinates = !isBlank(request.groupId) && !isBlank(request.artifactId);
    if (!hasConnectionType && !hasCoordinates) {
      throw new IllegalArgumentException("At least one of connectionType or (groupId + artifactId) must be provided");
    }

    const config = ConnectorConfigService.readConfig(projectPath);
    let connectorCfg = config.connectors.get(request.connectorArtifactId!);
    if (connectorCfg === undefined) {
      connectorCfg = new ConnectorDependencyConfig();
      config.connectors.set(request.connectorArtifactId!, connectorCfg);
    }
    ConnectorConfigService.populateQNameIfAbsent(connectorCfg, request.connectorArtifactId!);
    if (connectorCfg.dependencies == null) {
      connectorCfg.dependencies = [];
    }

    const existing = ConnectorConfigService.findMatchingOverride(
        connectorCfg.dependencies, request.connectionType, request.groupId, request.artifactId);

    if (existing != null) {
      // Update in place; blank strings become null so they are left out of the JSON and don't break matching.
      if (request.connectionType != null) existing.connectionType = blankToNull(request.connectionType);
      if (request.groupId != null) existing.groupId = blankToNull(request.groupId);
      if (request.artifactId != null) existing.artifactId = blankToNull(request.artifactId);
      if (request.version != null) existing.version = blankToNull(request.version);
      if (request.omit != null) existing.omit = request.omit ? true : undefined;
      if (request.localPath != null) existing.localPath = blankToNull(request.localPath);
    } else {
      const override = new DependencyOverride();
      override.connectionType = blankToNull(request.connectionType);
      override.groupId = blankToNull(request.groupId);
      override.artifactId = blankToNull(request.artifactId);
      override.version = blankToNull(request.version);
      override.omit = isTrue(request.omit) ? true : undefined;
      override.localPath = blankToNull(request.localPath);
      connectorCfg.dependencies.push(override);
    }

    ConnectorConfigService.writeConfig(projectPath, config);
  }

  static resetDependencyOverrides(projectPath: string, request: ResetConnectorDependencyRequest): void {
    if (isBlank(request.connectorArtifactId)) {
      throw new IllegalArgumentException("connectorArtifactId must not be blank");
    }

    // Partial groupId/artifactId (only one provided) is ambiguous, so it is a no-op
    const hasGroupId = !isBlank(request.groupId);
    const hasArtifactId = !isBlank(request.artifactId);
    if (hasGroupId !== hasArtifactId) {
      LOGGER.log(Level.WARNING, "resetDependencyOverrides: groupId and artifactId must both be provided or both omitted; ignoring request.");
      return;
    }

    const config = ConnectorConfigService.readConfig(projectPath);
    const connectorCfg = config.connectors.get(request.connectorArtifactId!);
    if (connectorCfg == null || connectorCfg.dependencies == null) {
      return; // nothing to reset
    }

    if (request.connectionType != null) {
      connectorCfg.dependencies = connectorCfg.dependencies.filter(
          (o) => !(o.connectionType != null && request.connectionType!.toLowerCase() === o.connectionType.toLowerCase()));
    } else if (hasGroupId) {
      connectorCfg.dependencies = connectorCfg.dependencies.filter(
          (o) => !(o.connectionType == null && request.groupId === o.groupId && request.artifactId === o.artifactId));
    } else {
      config.connectors.delete(request.connectorArtifactId!);
    }
    if (connectorCfg.dependencies != null && connectorCfg.dependencies.length === 0
        && connectorCfg.omit == null && connectorCfg.omitAllDrivers == null) {
      config.connectors.delete(request.connectorArtifactId!);
    }
    ConnectorConfigService.writeConfig(projectPath, config);
  }

  // -------------------------------------------------------------------------
  // Effective dependency computation
  // -------------------------------------------------------------------------

  static buildDependencyResponse(projectPath: string, connectorArtifactId: string | null): ConnectorDependencyResponse {
    const config = ConnectorConfigService.readConfig(projectPath);
    const response = new ConnectorDependencyResponse();
    response.omitAllDrivers = isTrue(config.omitAllDrivers);
    response.omitAllConnectors = isTrue(config.omitAllConnectors);
    if (connectorArtifactId != null) {
      const descriptorDeps = ConnectorConfigService.readDescriptorDependencies(connectorArtifactId);
      const activeConnectionTypes = ConnectorConfigService.scanActiveConnectionTypes(projectPath);
      response.dependencies = ConnectorConfigService.mergeDependencies(descriptorDeps, config, connectorArtifactId, activeConnectionTypes);
    } else {
      response.allConnectors = ConnectorConfigService.getAllEffectiveDependencies(config, projectPath);
    }
    return response;
  }

  private static getAllEffectiveDependencies(config: ConnectorConfig, projectPath: string): Map<string, ConnectorEffectiveData> {
    // Scanned once here and forwarded to mergeDependencies so it is not re-scanned for every connector
    const activeConnectionTypes = ConnectorConfigService.scanActiveConnectionTypes(projectPath);

    const result = new JavaHashMap<string, ConnectorEffectiveData>();
    const holder = ConnectorHolder.getInstance();
    for (const connector of [...holder.getConnectors()]) {
      const artifactId = ConnectorConfigService.connectorArtifactId(connector);
      const descriptorDeps = ConnectorConfigService.readDescriptorDependenciesFromPath(connector.getExtractedConnectorPath());
      const connectorCfg = config.connectors.get(artifactId);

      const data = new ConnectorEffectiveData();
      data.omit = isTrue(connectorCfg != null ? connectorCfg.omit : null);
      data.omitAllDrivers = isTrue(config.omitAllDrivers) || isTrue(connectorCfg != null ? connectorCfg.omitAllDrivers : null);
      data.dependencies = descriptorDeps.length === 0
          ? []
          : ConnectorConfigService.mergeDependencies(descriptorDeps, config, artifactId, activeConnectionTypes);
      result.set(artifactId, data);
    }
    return result;
  }

  static isOmitAllDrivers(projectPath: string, connectorArtifactId: string): boolean {
    const config = ConnectorConfigService.readConfig(projectPath);
    if (isTrue(config.omitAllDrivers)) {
      return true;
    }
    if (config.connectors == null) {
      return false;
    }
    const cfg = ConnectorConfigService.findConnectorConfig(config, connectorArtifactId);
    return cfg != null && isTrue(cfg.omitAllDrivers);
  }

  static findOverrideByConnectorNameAndConnectionType(projectPath: string, connectorArtifactId: string,
                                                      connectionType: string): DependencyOverride | null {
    const config = ConnectorConfigService.readConfig(projectPath);
    if (config.connectors == null || config.connectors.size === 0) {
      return null;
    }
    const cfg = ConnectorConfigService.findConnectorConfig(config, connectorArtifactId);
    if (cfg == null || cfg.dependencies == null) {
      return null;
    }
    return ConnectorConfigService.findMatchingOverride(cfg.dependencies, connectionType, null, null);
  }

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  private static findLoadedConnector(connectorArtifactId: string): Connector | null {
    return [...ConnectorHolder.getInstance().getConnectors()].find(
        (c) => connectorArtifactId === ConnectorConfigService.connectorArtifactId(c) || connectorArtifactId === c.getName()) ?? null;
  }

  private static readDescriptorDependencies(connectorArtifactId: string): Record<string, unknown>[] {
    const connector = ConnectorConfigService.findLoadedConnector(connectorArtifactId);
    if (connector == null) {
      return [];
    }
    return ConnectorConfigService.readDescriptorDependenciesFromPath(connector.getExtractedConnectorPath());
  }

  private static readDescriptorDependenciesFromPath(extractedConnectorPath: string | null | undefined): Record<string, unknown>[] {
    if (isBlank(extractedConnectorPath)) {
      return [];
    }
    const descriptorFile = new JFile(extractedConnectorPath!, Constant.DESCRIPTOR_FILE);
    if (!descriptorFile.exists()) {
      return [];
    }
    try {
      const yamlData = parseYaml(Files.readString(descriptorFile.getPath()));
      const deps = yamlData !== null && typeof yamlData === "object" ? (yamlData as Json)["dependencies"] : undefined;
      if (Array.isArray(deps)) {
        return deps as Record<string, unknown>[];
      }
    } catch (e) {
      LOGGER.log(Level.WARNING, "Failed to read descriptor.yml from " + extractedConnectorPath + ": " + (e as Error).message);
    }
    return [];
  }

  /** Merges descriptor.yml dependency entries with connector-config.json overrides. */
  private static mergeDependencies(descriptorDeps: Record<string, unknown>[], config: ConnectorConfig,
                                   connectorArtifactId: string, activeConnectionTypes: Set<string>): EffectiveDependency[] {
    const connectorCfg = ConnectorConfigService.findConnectorConfig(config, connectorArtifactId);
    const globalOmitAllDrivers = isTrue(config.omitAllDrivers) || (connectorCfg != null && isTrue(connectorCfg.omitAllDrivers));
    const overrides = connectorCfg != null && connectorCfg.dependencies != null ? connectorCfg.dependencies : [];

    const result: EffectiveDependency[] = [];
    for (const dep of descriptorDeps) {
      const groupId = dep["groupId"] as string | undefined;
      const artifactId = dep["artifactId"] as string | undefined;
      const version = dep["version"] as string | undefined;
      const connectionType = dep["connectionType"] as string | undefined;

      const override = ConnectorConfigService.findMatchingOverride(overrides, connectionType, groupId, artifactId);

      const eff = new EffectiveDependency();
      eff.connectionType = connectionType;
      eff.defaultVersion = version;
      eff.groupId = groupId;
      eff.artifactId = artifactId;
      // Deps without a connectionType are always active; those with one only when a local entry uses it.
      eff.isConnectionTypeActive = connectionType == null || activeConnectionTypes.has(connectionType.toUpperCase());

      if (globalOmitAllDrivers) {
        eff.omit = true;
        eff.isOverridden = true;
      } else if (override != null) {
        eff.isOverridden = true;
        eff.omit = isTrue(override.omit);
        if (!isBlank(override.groupId)) eff.groupId = override.groupId;
        if (!isBlank(override.artifactId)) eff.artifactId = override.artifactId;
        if (!isBlank(override.version)) eff.overriddenVersion = override.version;
        if (!isBlank(override.localPath)) eff.localPath = override.localPath;
      }
      result.push(eff);
    }
    return result;
  }

  /** The connectionType values in use: each `*.init` element of the local entries that has a connectionType child. */
  private static scanActiveConnectionTypes(projectPath: string): Set<string> {
    const active = new Set<string>();
    if (isBlank(projectPath)) {
      return active;
    }
    const localEntriesDir = new JFile(Path.of(projectPath).resolve(LOCAL_ENTRIES_RELATIVE_PATH).toString());
    if (!localEntriesDir.isDirectory()) {
      return active;
    }
    const files = localEntriesDir.listFiles((f) => f.isFile() && f.getName().endsWith(".xml"));
    if (files == null) {
      return active;
    }
    for (const file of files) {
      try {
        const text = Files.readString(file.getPath());
        // the Java parser is hardened with disallow-doctype-decl, so such files are rejected
        if (/<!DOCTYPE/i.test(text)) throw new Error("DOCTYPE is disallowed when the feature disallow-doctype-decl is set to true");
        const doc = parseDOM(text, file.getPath());
        if (!isWellFormed(doc)) throw new Error("The XML document is not well-formed");
        const root = doc.getDocumentElement();
        if (root === null) throw new Error("Premature end of file");
        // getElementsByTagName("*") lists the descendants in document order
        const stack: DOMNode[] = [...root.getChildren()].reverse();
        while (stack.length > 0) {
          const node = stack.pop()!;
          if (!node.isElement()) continue;
          if (node.getNodeName().endsWith(".init")) {
            const ct = ConnectorConfigService.firstDescendantByName(node, "connectionType");
            if (ct !== null) {
              const value = ConnectorConfigService.textContent(ct).trim();
              if (value !== "") active.add(value.toUpperCase());
            }
            break;
          }
          stack.push(...[...node.getChildren()].reverse());
        }
      } catch (e) {
        LOGGER.log(Level.WARNING, "Failed to parse local entry file " + file.getName() + ": " + (e as Error).message);
      }
    }
    return active;
  }

  /** org.w3c.dom Node.getTextContent: the text and CDATA of the node and its descendants, entities decoded. */
  private static textContent(node: DOMNode): string {
    let out = "";
    for (const child of node.getChildren()) {
      if (child.isElement()) out += ConnectorConfigService.textContent(child);
      else if (child.isCDATA()) out += child.getTextContent() ?? "";
      else if (child.isText()) out += unescapeXml(child.getTextContent() ?? "") ?? "";
    }
    return out;
  }

  private static firstDescendantByName(node: DOMNode, name: string): DOMNode | null {
    for (const child of node.getChildren()) {
      if (!child.isElement()) continue;
      if (child.getNodeName() === name) return child;
      const deeper = ConnectorConfigService.firstDescendantByName(child, name);
      if (deeper !== null) return deeper;
    }
    return null;
  }

  /** Finds the best-matching override by connectionType, then by groupId+artifactId. */
  private static findMatchingOverride(overrides: DependencyOverride[] | null | undefined, connectionType: string | null | undefined,
                                      groupId: string | null | undefined, artifactId: string | null | undefined): DependencyOverride | null {
    if (overrides == null) {
      return null;
    }
    if (connectionType != null) {
      for (const o of overrides) {
        if (o.connectionType != null && connectionType.toLowerCase() === o.connectionType.toLowerCase()) {
          return o;
        }
      }
    }
    if (groupId != null && artifactId != null) {
      for (const o of overrides) {
        if (o.connectionType == null && groupId === o.groupId && artifactId === o.artifactId) {
          return o;
        }
      }
    }
    return null;
  }

  static updateConnectorFlags(projectPath: string, request: UpdateConnectorFlagsRequest): void {
    if (isBlank(request.connectorArtifactId)) {
      throw new IllegalArgumentException("connectorArtifactId must not be blank");
    }

    const config = ConnectorConfigService.readConfig(projectPath);
    let connectorCfg = config.connectors.get(request.connectorArtifactId!);
    if (connectorCfg === undefined) {
      connectorCfg = new ConnectorDependencyConfig();
      config.connectors.set(request.connectorArtifactId!, connectorCfg);
    }
    ConnectorConfigService.populateQNameIfAbsent(connectorCfg, request.connectorArtifactId!);

    if (request.omit != null) {
      connectorCfg.omit = request.omit ? true : undefined;
    }
    if (request.omitAllDrivers != null) {
      connectorCfg.omitAllDrivers = request.omitAllDrivers ? true : undefined;
    }

    // If all fields on the connector config are now null/empty, remove the entry
    if (connectorCfg.omit == null && connectorCfg.omitAllDrivers == null
        && (connectorCfg.dependencies == null || connectorCfg.dependencies.length === 0)) {
      config.connectors.delete(request.connectorArtifactId!);
    }

    ConnectorConfigService.writeConfig(projectPath, config);
  }

  static updateGlobalConnectorFlags(projectPath: string, request: UpdateGlobalConnectorFlagsRequest): void {
    const config = ConnectorConfigService.readConfig(projectPath);

    if (request.omitAllDrivers != null) {
      config.omitAllDrivers = request.omitAllDrivers ? true : undefined;
    }
    if (request.omitAllConnectors != null) {
      config.omitAllConnectors = request.omitAllConnectors ? true : undefined;
    }

    ConnectorConfigService.writeConfig(projectPath, config);
  }

  private static findConnectorConfig(config: ConnectorConfig, artifactId: string): ConnectorDependencyConfig | null {
    if (config.connectors == null) {
      return null;
    }
    return config.connectors.get(artifactId) ?? null;
  }

  /** The artifactId ConnectorReader parsed from the extracted folder name, else the connector's short name. */
  private static connectorArtifactId(connector: Connector): string {
    const artifactId = connector.getArtifactId();
    if (artifactId != null && artifactId.trim() !== "") {
      return artifactId;
    }
    return connector.getName();
  }

  /** Sets qname to `{package}name` (the CAR plugin's lib sub directory name) when it is not set yet. */
  private static populateQNameIfAbsent(connectorCfg: ConnectorDependencyConfig, connectorArtifactId: string): void {
    if (connectorCfg.qname != null) {
      return; // already set
    }
    const connector = ConnectorConfigService.findLoadedConnector(connectorArtifactId);
    if (connector == null) {
      return;
    }
    const pkg = connector.getPackageName();
    const name = connector.getName();
    if (!isBlank(pkg) && !isBlank(name)) {
      connectorCfg.qname = "{" + pkg + "}" + name;
    }
  }
}
