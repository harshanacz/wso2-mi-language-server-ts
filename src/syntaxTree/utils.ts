/** Ports of the helpers in customservice/synapse/utils/Utils.java used by the syntax tree. */

export function unescapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

export function escapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

import { DOMNode, DOMElement, DOMAttr, DOMDocument, parseDOM } from "./dom/dom.js";
import type { Position } from "../synapse/lsp.js";
import { JFile } from "../synapse/host/JFile.js";
import { ZipArchive } from "../synapse/host/zip.js";
import { Constant } from "./constant.js";
import { md5Hex } from "../synapse/utils/md5.js";
import { Path, Files, IOException } from "../synapse/host/nio.js";
import { listResourceFolder, readResourceText } from "../synapse/resources.js";
import { JsonArray, JsonElement, JsonObject, JsonParser } from "../synapse/gson.js";
import { getEnumFromValue } from "./javaCompat.js";
import { MustacheFactory, type Mustache } from "../synapse/mustache/Mustache.js";
import type { ConnectorHolder } from "../synapse/connectors/ConnectorHolder.js";
export { getEnumFromValue };
import { PomParser } from "../synapse/parser/pom/PomParser.js";
import { OverviewPageDetailsResponse } from "../synapse/parser/OverviewPageDetailsResponse.js";
import { ProjectType } from "../synapse/directoryTree/legacyBuilder/utils/ProjectType.js";

function attributeXmlString(node: DOMNode): string {
  const children = node.getAttributeNodes();
  let xml = "";
  if (children && children.length > 0) {
    xml = " ";
    for (const child of children) {
      xml += child.getName() + '="' + unescapeXml(child.getValue()) + '" ';
    }
  }
  return xml;
}

function decodeEntities(t: string): string {
  return t.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|lt|gt|amp|quot|apos);/g, (m, e: string) => {
    if (e === "lt") return "<";
    if (e === "gt") return ">";
    if (e === "amp") return "&";
    if (e === "quot") return '"';
    if (e === "apos") return "'";
    const code = e[1] === "x" ? parseInt(e.substring(2), 16) : parseInt(e.substring(1), 10);
    return String.fromCodePoint(code);
  });
}

function escapeXmlText(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeXmlAttr(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;")
    .replace(/\t/g, "&#9;");
}

/** Well-formedness check standing in for the JAXP parser used by Utils.formatXml (which rejects malformed XML). */
function isWellFormed(doc: DOMDocument): boolean {
  let roots = 0;
  const check = (nodes: DOMNode[], top: boolean): boolean => {
    for (const n of nodes) {
      if (n.isElement()) {
        if (top) roots++;
        if (n.isOrphanEndTag() || !n.hasStartTag()) return false;
        if (!n.isSelfClosed() && !n.hasEndTag()) return false;
        if (!n.getTagName()) return false;
        const seen = new Set<string>();
        for (const a of n.getAttributeNodes()) {
          if (seen.has(a.getName())) return false;
          seen.add(a.getName());
        }
        if (!check(n.getChildren(), false)) return false;
      } else if (n.isText() && top && (n.getTextContent() ?? "").trim() !== "") {
        return false;
      }
    }
    return true;
  };
  return check(doc.getChildren(), true) && roots === 1;
}

function formatNode(node: DOMNode, depth: number, out: string[]): void {
  const pad = " ".repeat(4 * depth);
  if (node.isElement()) {
    const name = node.getTagName() as string;
    // The JDK DOM keeps attributes sorted by name.
    const attrs = [...node.getAttributeNodes()].sort((a, b) => (a.getName() < b.getName() ? -1 : a.getName() > b.getName() ? 1 : 0));
    const attrText = attrs.map((a) => " " + a.getName() + '="' + escapeXmlAttr(decodeEntities(a.getValue() ?? "")) + '"').join("");
    const children = node.getChildren().filter((c) => !(c.isText() && (c.getTextContent() ?? "").trim() === ""));
    if (children.length === 0) {
      out.push(pad + "<" + name + attrText + "/>");
      return;
    }
    if (children.every((c) => c.isText() || c.isCDATA())) {
      const inner = children
        .map((c) => (c.isCDATA() ? "<![CDATA[" + (c as any).getData() + "]]>" : escapeXmlText(decodeEntities(c.getTextContent() ?? ""))))
        .join("");
      out.push(pad + "<" + name + attrText + ">" + inner + "</" + name + ">");
      return;
    }
    out.push(pad + "<" + name + attrText + ">");
    for (const c of children) formatNode(c, depth + 1, out);
    out.push(pad + "</" + name + ">");
  } else if (node.isCDATA()) {
    out.push(pad + "<![CDATA[" + (node as any).getData() + "]]>");
  } else if (node.isComment()) {
    out.push(pad + "<!--" + (node as any).getData() + "-->");
  } else if (node.isText()) {
    out.push(pad + escapeXmlText(decodeEntities(node.getTextContent() ?? "")));
  }
}

export function formatXmlText(xml: string | null | undefined): string | null | undefined {
  if (xml === null || xml === undefined || xml.trim() === "") return xml;
  try {
    const doc = parseDOM(xml, "file:///format.xml", false);
    if (!isWellFormed(doc)) return xml;
    const root = doc.getDocumentElement();
    if (!root) return xml;
    const out: string[] = [];
    formatNode(root, 0, out);
    return out.join("\n").trim();
  } catch {
    return xml;
  }
}

function processMediatorList(mediatorList: JsonObject): void {
  const favourites = mediatorList
    .getAsJsonArray(Constant.FAVOURITES)
    .asList()
    .map((e) => e.getAsJsonObject().get(Constant.TITLE)!.getAsString());
  for (const key of mediatorList.keySet()) {
    const value = mediatorList.get(key)!;
    if (key !== Constant.FAVOURITES && value.isJsonArray()) {
      const arr = value.getAsJsonArray();
      for (let i = arr.size() - 1; i >= 0; i--) {
        if (favourites.includes(arr.get(i).getAsJsonObject().get(Constant.TITLE)!.getAsString())) arr.remove(i);
      }
    }
    const itemObject = new JsonObject();
    itemObject.add(Constant.ITEMS, value);
    mediatorList.add(key, itemObject);
  }
}

function addConnectorsToMediatorList(mediatorList: JsonObject, connectorHolder: ConnectorHolder, forAgentTool: boolean): void {
  const other = mediatorList.remove(Constant.OTHER);
  for (const connector of connectorHolder.getConnectors()) {
    const operationsArray = new JsonArray();
    const categories = new JsonObject();
    for (const operation of connector.getActions()) {
      if (operation.getHidden() || (forAgentTool && !operation.isCanActAsAgentTool())) continue;
      const op = new JsonObject();
      const dn = operation.getDisplayName();
      op.addProperty(Constant.TITLE, dn === null || dn === undefined || dn === "" ? operation.getName() : dn);
      op.addProperty(Constant.OPERATION_NAME, operation.getName());
      op.addProperty(Constant.TAG, operation.getTag());
      op.addProperty(Constant.TOOLTIP, operation.getDescription());
      op.addProperty(Constant.ICON_PATH, connector.getIconPath());
      const group = operation.getGroupName();
      if (group !== null && group !== undefined && group !== "") {
        if (categories.has(group)) {
          categories.getAsJsonArray(group).add(op);
        } else {
          const arr = new JsonArray();
          arr.add(op);
          categories.add(group, arr);
        }
      } else {
        operationsArray.add(op);
      }
    }
    const connectorObject = new JsonObject();
    if (categories.size() > 0) {
      connectorObject.add(Constant.ITEMS, categories);
      connectorObject.addProperty(Constant.IS_SUPPORT_CATEGORIES, true);
    } else {
      connectorObject.add(Constant.ITEMS, operationsArray);
    }
    connectorObject.addProperty(Constant.IS_CONNECTOR, true);
    connectorObject.addProperty(Constant.ARTIFACT_ID, connector.getArtifactId());
    connectorObject.addProperty(Constant.VERSION, connector.getVersion());
    connectorObject.addProperty(Constant.CONNECTOR_PATH, connector.getConnectorZipPath());
    const bm = connector.getBallerinaModulePath();
    connectorObject.addProperty(Constant.IS_BALLERINA_MODULE, bm !== null && bm !== undefined && bm.trim() !== "");
    connectorObject.addProperty(Constant.BALLERINA_MODULE_PATH, bm);
    const dn = connector.getDisplayName();
    mediatorList.add(dn === null || dn === undefined || dn === "" ? connector.getName() : dn, connectorObject);
  }
  if (other !== null) mediatorList.add(Constant.OTHER, other);
}

export const Utils = {
  isLegacyProject(path: string): boolean {
    const dotProject = new JFile(path + JFile.separator + Constant.DOT_PROJECT);
    if (dotProject.exists()) {
      try {
        const projectDOM = Utils.getDOMDocument(dotProject);
        const description = Utils.findDescriptionNode(projectDOM);
        if (description) {
          const natures = Utils.findNaturesNode(description);
          if (natures) {
            for (const child of natures.getChildren()) {
              const nature = Utils.getInlineString(child.getFirstChild());
              if (nature !== null && nature !== undefined && ProjectType.ROOT_PROJECT.value.toLowerCase() === nature.toLowerCase()) {
                return true;
              }
            }
          }
        }
      } catch {
        // unreadable .project means not a legacy project
      }
    }
    return false;
  },

  isOlderCARPlugin(projectPath: string): boolean {
    const details = new OverviewPageDetailsResponse();
    PomParser.getPomDetails(projectPath, details);
    let currentVersion = details.getBuildDetails().getAdvanceDetails().getPluginDetails().getProjectBuildPluginVersion().getValue();
    if (currentVersion.includes("-SNAPSHOT")) {
      currentVersion = currentVersion.replace("-SNAPSHOT", "");
    }
    return Utils.compareVersions(currentVersion, Constant.CAR_PLUGIN_CHECK_VERSION) < 0;
  },

  hasResourceForKey(resourceKey: string | null, resourceResponse: any): boolean {
    if (!resourceResponse || resourceKey === null || resourceKey === undefined) return false;
    for (const list of [resourceResponse.getResources(), resourceResponse.getRegistryResources()]) {
      if (list) {
        for (const resource of list) {
          if (resource && resourceKey === resource.getName()) return true;
        }
      }
    }
    return false;
  },

  sanitizeTag(tag: string): string {
    let sanitized = tag;
    if (tag.includes("-")) {
      const split = tag.split("-");
      sanitized = split[0] + split[1].substring(0, 1).toUpperCase() + split[1].substring(1);
    } else if (tag.includes(":")) {
      sanitized = tag.split(":")[1];
    } else if (tag.includes(".")) {
      if (tag.startsWith("ai.")) {
        return Constant.AI_CONNECTOR_VISITOR_FUNCTION.get(tag) as string;
      }
      sanitized = "connector";
    }
    return sanitized;
  },

  /** Loads every `*.json` file of a bundled resource folder; keys are the file names with `_` read as `:`. */
  getUISchemaMap(resourceFolderName: string): Map<string, JsonObject> {
    const map = new Map<string, JsonObject>();
    for (const name of listResourceFolder(resourceFolderName)) {
      if (!name.endsWith(".json")) continue;
      const key = name.replace(".json", "").split("_").join(":");
      try {
        const text = readResourceText(resourceFolderName + "/" + name);
        if (text !== null) map.set(key, JsonParser.parseString(text).getAsJsonObject());
      } catch (e) {
        // a broken schema file is skipped, as the Java version logs and continues
      }
    }
    return map;
  },

  /** Compiles every `*.mustache` template of a bundled resource folder; keys are the file names with `_` read as `:`. */
  getTemplateMap(resourceFolderName: string): Map<string, Mustache> {
    const map = new Map<string, Mustache>();
    const factory = new MustacheFactory();
    for (const name of listResourceFolder(resourceFolderName)) {
      if (!name.endsWith(".mustache")) continue;
      const key = name.replace(".mustache", "").split("_").join(":");
      try {
        const text = readResourceText(resourceFolderName + "/" + name);
        if (text !== null) map.set(key, factory.compile(text, key));
      } catch (e) {
        // a broken template is skipped, as the Java version logs and continues
      }
    }
    return map;
  },

  getMediatorList(version: string, connectorHolder: ConnectorHolder): JsonObject {
    const text = readResourceText("mediators/mediators_" + version.split(".").join("") + ".json");
    if (text === null) throw new IOException("Mediator list not found for the given version: " + version);
    const mediatorList = JsonParser.parseString(text).getAsJsonObject();
    processMediatorList(mediatorList);
    addConnectorsToMediatorList(mediatorList, connectorHolder, false);
    return mediatorList;
  },

  getAgentToolList(mediatorList: JsonObject, connectorHolder: ConnectorHolder): JsonObject {
    const toolList = new JsonObject();
    toolList.add("extension", mediatorList.get("extension"));
    addConnectorsToMediatorList(toolList, connectorHolder, true);
    return toolList;
  },

  getDOMNode(documentUri: string, position: Position): DOMNode | null {
    if (!documentUri || !position) return null;
    const document = Utils.getDOMDocumentFromPath(Utils.getAbsolutePath(documentUri));
    if (!document) return null;
    return document.findNodeAt(document.offsetAt(position));
  },

  isExpression(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && value.startsWith("${") && value.endsWith("}");
  },

  toCamelCase(input: string | null): string | null {
    return input === null ? null : input.replace(/_(.)/g, (_m, c: string) => c.toUpperCase());
  },

  getInlineString(node: DOMNode | null | undefined, requiresXmlUnescaping = true): string {
    let inline = "";
    if (node) {
      if (node.isCDATA()) {
        inline = "<![CDATA[" + node.getTextContent() + "]]>";
      } else if (node.isText()) {
        inline = requiresXmlUnescaping ? (unescapeXml(node.getTextContent()) as string) : (node.getTextContent() as string);
      } else if (node instanceof DOMElement) {
        if (node.isSelfClosed()) {
          inline = "<" + node.getNodeName() + attributeXmlString(node) + "/>";
        } else if (!node.isOrphanEndTag()) {
          inline = "<" + node.getNodeName() + attributeXmlString(node) + ">";
          const children = node.getChildren();
          if (children && children.length > 0) {
            if (children[0] instanceof DOMElement) inline += "\n";
            for (const child of children) {
              inline += Utils.getInlineString(child);
              if (child instanceof DOMElement) inline += "\n";
            }
          }
          inline += "</" + escapeXml(node.getNodeName()) + ">";
        }
      }
    }
    return inline;
  },

  parseInt(n: string | null | undefined): number {
    if (n === null || n === undefined || n === "") return -1;
    return /^[+-]?\d+$/.test(n) && Math.abs(Number(n)) <= 2147483647 ? Number(n) : -1;
  },

  getChildNodeByName(node: DOMNode, name: string): DOMNode | null {
    for (const c of node.getChildren()) {
      if (name.toLowerCase() === (c.getNodeName() ?? "").toLowerCase()) return c;
    }
    return null;
  },

  /** Parses XML text, or the contents of a file (the Java overloads taking a String or a File). */
  getDOMDocument(content: string | JFile) {
    if (content instanceof JFile) {
      return parseDOM(content.readText(), "file://" + content.getPath());
    }
    return parseDOM(content);
  },

  getDOMDocumentFromPath(path: string | null | undefined) {
    if (path === null || path === undefined) {
      return null;
    }
    return Utils.getDOMDocument(new JFile(Utils.getAbsolutePath(path)));
  },

  /** Strips a `file://` prefix; the Java version converts a URI to a platform path. */
  getAbsolutePath(path: string): string {
    if (path !== null && path !== undefined && path.includes(Constant.FILE_PREFIX)) {
      let p = decodeURIComponent(path.replace(/^file:\/\/\/?/, "/"));
      if (/^\/[A-Za-z]:/.test(p)) {
        p = p.substring(1);
      }
      return p;
    }
    return path;
  },

  /** Same as Java: reads line by line, so every line (including the last) ends with a single `\n`. */
  readFile(file: JFile): string {
    const text = file.readText();
    if (text === "") {
      return "";
    }
    const lines = text.split(/\r\n|\r|\n/);
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }
    return lines.join("\n") + "\n";
  },

  writeToFile(path: string, content: string): void {
    new JFile(path).writeText(content);
  },

  getJsonObject(content: string): JsonObject | null {
    const e = JsonParser.parseString(content);
    return e.isJsonObject() ? e.getAsJsonObject() : null;
  },

  getJsonArray(content: string): JsonArray | null {
    const e = JsonParser.parseString(content);
    return e.isJsonArray() ? e.getAsJsonArray() : null;
  },

  getJsonElement(content: string): JsonElement | null {
    try {
      return JsonParser.parseString(content);
    } catch {
      return null;
    }
  },

  isJson(content: string): boolean {
    return Utils.getJsonElement(content) !== null;
  },

  isJSONObject(content: string): boolean {
    try {
      return JsonParser.parseString(content).isJsonObject();
    } catch {
      return false;
    }
  },

  isZipFile(file: JFile): boolean {
    return file.getName().endsWith(".zip");
  },

  isXml(file: JFile): boolean {
    const name = file.getName();
    const dot = name.lastIndexOf(Constant.DOT);
    if (dot !== -1 && dot < name.length - 1) {
      return Constant.XML.toLowerCase() === name.substring(dot + 1).toLowerCase();
    }
    return false;
  },

  getFileExtension(file: JFile): string {
    const name = file.getName();
    const dot = name.lastIndexOf(".");
    return dot !== -1 && dot < name.length - 1 ? name.substring(dot + 1) : "";
  },

  getFileName(file: JFile): string {
    const name = file.getName();
    const dot = name.lastIndexOf(".");
    return dot !== -1 ? name.substring(0, dot) : name;
  },

  isFileExists(filePath: string): boolean {
    let p = filePath;
    if (p.includes(Constant.FILE_PREFIX)) {
      p = p.substring(7);
    }
    return new JFile(p).exists();
  },

  isValidProject(projectRoot: string | null | undefined): boolean {
    if (!projectRoot) {
      return false;
    }
    return new JFile(projectRoot, "pom.xml").exists() && new JFile(projectRoot, "src").exists();
  },

  /**
   * Extracts a zip into a folder. If the archive starts with a single folder named like the zip itself, that
   * folder is dropped (same behaviour as the Java implementation).
   */
  extractZip(zip: JFile, extractTo: JFile): void {
    const archive = new ZipArchive(zip);
    const zipName = zip.getName().replace(Constant.ZIP_EXTENSION, "");
    let removeUpperFolder = false;
    for (const rawName of archive.names()) {
      let entryName = rawName;
      const isDirectory = rawName.endsWith("/");
      if (removeUpperFolder) {
        if (entryName.startsWith(zipName + "/")) {
          entryName = entryName.substring(zipName.length + 1);
          if (entryName === "") {
            continue;
          }
        }
      } else if (entryName === zipName + "/" && isDirectory) {
        removeUpperFolder = true;
        continue;
      }
      const newFile = Utils.newFile(extractTo, entryName);
      if (isDirectory) {
        newFile.mkdirs();
      } else {
        newFile.getParentFile()?.mkdirs();
        newFile.writeBytes(archive.readBytes(rawName));
      }
    }
  },

  newFile(destinationDir: JFile, zipName: string): JFile {
    const destFile = new JFile(destinationDir, zipName);
    if (!destFile.getPath().startsWith(destinationDir.getPath() + "/")) {
      throw new Error("Entry is outside of the target dir: " + zipName);
    }
    return destFile;
  },

  unescapeXml,

  removeCDATATag(value: string | null | undefined): string {
    if (!value) return "";
    return value.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
  },

  getFirstElement(element: DOMElement): DOMElement | null {
    for (const c of element.getChildren()) if (c instanceof DOMElement) return c;
    return null;
  },

  containsIgnoreCase(list: string[], name: string): boolean {
    return list.some((s) => s.toLowerCase() === (name ?? "").toLowerCase());
  },

  compareVersions(v1: string, v2: string): number {
    const a = v1.split("."), b = v2.split(".");
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = i < a.length ? parseInt(a[i], 10) : 0;
      const y = i < b.length ? parseInt(b[i], 10) : 0;
      if (x < y) return -1;
      if (x > y) return 1;
    }
    return 0;
  },

  getEnumFromValue,

  getRootElementFromConfigXml(document: DOMNode): DOMElement | null {
    for (const child of document.getChildren()) {
      if (Utils.containsIgnoreCase(Constant.SYNAPSE_CONFIG_ELEMENTS, child.getNodeName() as string)) {
        return child as DOMElement;
      }
    }
    return null;
  },

  getRootElement(document: DOMDocument): DOMElement | null {
    for (const child of document.getChildren() ?? []) {
      if (child instanceof DOMElement) return child;
    }
    return null;
  },

  findDescriptionNode(projectDOM: DOMDocument): DOMNode | null {
    for (const child of projectDOM.getChildren()) {
      if (Constant.PROJECT_DESCRIPTION.toLowerCase() === (child.getNodeName() ?? "").toLowerCase()) return child;
    }
    return null;
  },

  findNaturesNode(descriptionNode: DOMNode): DOMNode | null {
    for (const child of descriptionNode.getChildren()) {
      if (Constant.NATURES.toLowerCase() === (child.getNodeName() ?? "").toLowerCase()) return child;
    }
    return null;
  },

  isFileInRegistry(file: JFile): boolean {
    const p = file.getAbsolutePath();
    return p.includes(Constant.REGISTRY + "/" + Constant.GOV) || p.includes(Constant.REGISTRY + "/" + Constant.CONF);
  },

  getRegistryKey(file: JFile): string | null {
    const m = /(.*)(\b(gov|conf)\b)(.*)/.exec(file.getAbsolutePath());
    if (m) {
      const path = m[4].replace(/\\/g, "/").replace(/^\/+/, "");
      return m[3] + ":" + path;
    }
    return null;
  },

  getResourceKey(file: JFile): string | null {
    const m = /(.*)(\b(resources)\b)(.*)/.exec(file.getAbsolutePath());
    if (m) {
      const path = m[4].replace(/\\/g, "/").replace(/^\/+/, "");
      return Constant.RESOURCES + ":" + path;
    }
    return null;
  },

  isRegistryPropertiesFile(file: JFile): boolean {
    const m = /^(.*)\.properties$/s.exec(file.getAbsolutePath());
    return m ? new JFile(m[1]).exists() : false;
  },

  deriveResourceKeyFromFilePath(filePath: string): string {
    const gov = "registry/gov/";
    const conf = "registry/conf/";
    const res = "resources/";
    const p = filePath.replace(/\\/g, "/");
    if (p.includes(gov)) return "gov:" + p.substring(p.indexOf(gov) + gov.length);
    if (p.includes(conf)) return "conf:" + p.substring(p.indexOf(conf) + conf.length);
    if (p.includes(res)) return "resources:" + p.substring(p.indexOf(res) + res.length);
    return filePath;
  },

  getNodeValue(node: { getValue(): string | null } | null): string {
    return node !== null && node !== undefined && node.getValue() !== null && node.getValue() !== undefined ? (node.getValue() as string) : "";
  },

  stripConnectorVersion(zipBaseName: string): string {
    const i = zipBaseName.lastIndexOf(Constant.HYPHEN);
    return i > 0 ? zipBaseName.substring(0, i) : zipBaseName;
  },

  removeHyphen(name: string): string {
    const parts = name.split("-");
    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
      result += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
    }
    return result;
  },

  pluralToSingular(name: string): string {
    if (name.endsWith("ies")) return name.substring(0, name.length - 3) + "y";
    if (name.endsWith("s")) return name.substring(0, name.length - 1);
    return name;
  },

  addUnderscoreBetweenWords(input: string): string {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const c = input.charAt(i);
      if (c !== c.toLowerCase() && c === c.toUpperCase() && i > 0) result += "_";
      result += c;
    }
    return result;
  },

  getHash(input: string): string {
    return md5Hex(input);
  },

  deleteDirectory(path: Path | string): void {
    new JFile(path.toString()).delete();
  },

  /** Pretty prints XML like the JAXP identity transformer with INDENT=yes and an indent of 4 (malformed input is returned unchanged). */
  formatXml(xml: string | null | undefined): string | null | undefined {
    return formatXmlText(xml);
  },

  /** Copies a file into the target folder (optionally under a new name), replacing an existing file. */
  copyFile(sourcePath: string, targetPath: string, targetFileName?: string | null): void {
    const source = Path.fromString(sourcePath);
    const targetFolder = Path.fromString(targetPath);
    const target = targetFileName != null ? targetFolder.resolve(targetFileName) : targetFolder.resolve(source.getFileName() as Path);
    if (Files.notExists(target)) {
      const parent = target.getParent();
      if (parent) Files.createDirectories(parent);
    }
    Files.copy(source, target);
  },

  escapeXML(text: string | null | undefined): string | null | undefined {
    return escapeXml(text);
  },

  getRawRuntimeVersion(projectPath: string, defaultVersion: string): string {
    try {
      const document = Utils.getDOMDocument(new JFile(projectPath, "pom.xml"));
      const props = Utils.getChildNodeByName(document.getDocumentElement() as DOMNode, "properties");
      if (props) {
        const rv = Utils.getChildNodeByName(props, "project.runtime.version");
        if (rv) {
          const version = Utils.getInlineString(rv.getFirstChild());
          if (version && /^\d+\.\d+\.\d+$/.test(version)) return version;
        }
      }
    } catch {
      // fall through to the default
    }
    return defaultVersion;
  },

  getServerVersion(projectPath: string, defaultVersion: string): string {
    try {
      const document = Utils.getDOMDocument(new JFile(projectPath, "pom.xml"));
      const props = Utils.getChildNodeByName(document.getDocumentElement() as DOMNode, "properties");
      if (props) {
        const rv = Utils.getChildNodeByName(props, "project.runtime.version");
        if (rv) {
          const version = Utils.getInlineString(rv.getFirstChild());
          if (/^\d+\.\d+\.\d+$/.test(version)) {
            if (parseInt(version.split(".").join(""), 10) < parseInt(Constant.MI_430_VERSION.split(".").join(""), 10)) {
              return Constant.MI_430_VERSION;
            }
            const mapped = Constant.MI_SUPPORTED_VERSION_MAP.get(version);
            return mapped ?? Constant.DEFAULT_MI_VERSION;
          }
        }
      }
    } catch {
      // fall through to the default
    }
    const mapped = Constant.MI_SUPPORTED_VERSION_MAP.get(defaultVersion);
    return mapped ?? Constant.DEFAULT_MI_VERSION;
  },
};

