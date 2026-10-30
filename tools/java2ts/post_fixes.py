#!/usr/bin/env python3
"""Hand-maintained fix-ups applied after j2t.py regenerates src/syntaxTree."""
import os, re
ROOT = "/home/claude/cloned/wso2-mi-language-server-ts/src/syntaxTree/"


def rd(f):
    return open(ROOT + f, encoding="utf-8").read()


def wr(f, t):
    os.makedirs(os.path.dirname(ROOT + f), exist_ok=True)
    open(ROOT + f, "w", encoding="utf-8").write(t)


def sub(f, old, new, count=1):
    t = rd(f)
    if old not in t:
        print("POSTFIX MISS", f, old[:50].replace("\n", " "))
        return
    wr(f, t.replace(old, new, count) if count else t.replace(old, new))


def rsub(f, pat, new, flags=0):
    t = rd(f)
    n, c = re.subn(pat, new, t, flags=flags)
    if not c:
        print("POSTFIX MISS(re)", f, pat[:50])
    wr(f, n)


HEADER = "// Hand ported from the Java original (see git history for the generated base).\n"

# ---------------------------------------------------------------- wire format helper
wr("toJsonTree.ts", HEADER + '''/** Equivalent of Gson.toJsonTree for syntax tree nodes (Map -> object, enums via toJSON, undefined dropped). */
export function toJsonTree(value: unknown): any {
  return JSON.parse(JSON.stringify(value, (_k, v) => (v instanceof Map ? Object.fromEntries(v) : v)));
}
''')

# ---------------------------------------------------------------- SyntaxTreeResponse
rsub("SyntaxTreeResponse.ts", r"^", "type JsonElement = any;\n", re.M) if False else None
t = rd("SyntaxTreeResponse.ts")
if "type JsonElement" not in t:
    t = t.replace("export class SyntaxTreeResponse", "export type JsonElement = any;\n\nexport class SyntaxTreeResponse", 1)
wr("SyntaxTreeResponse.ts", t)

# ---------------------------------------------------------------- ArtifactTypeResponse
wr("pojo/ArtifactTypeResponse.ts", HEADER + '''export class ArtifactType {
  static readonly API = new ArtifactType("API", 0, "API", "apis");
  static readonly AUTOMATION = new ArtifactType("AUTOMATION", 1, "Automation", "tasks");
  static readonly EVENT_INTEGRATION = new ArtifactType("EVENT_INTEGRATION", 2, "Event Integration", "inbound-endpoints");
  static readonly ENDPOINT = new ArtifactType("ENDPOINT", 3, "Endpoint", "endpoints");
  static readonly SEQUENCE = new ArtifactType("SEQUENCE", 4, "Sequence", "sequences");
  static readonly CLASS_MEDIATOR = new ArtifactType("CLASS_MEDIATOR", 5, "Class Mediator", "java");
  static readonly RESOURCE = new ArtifactType("RESOURCE", 6, "Resource", "resources");
  static readonly MESSAGE_PROCESSOR = new ArtifactType("MESSAGE_PROCESSOR", 7, "Message Processor", "message-processors");
  static readonly MESSAGE_STORE = new ArtifactType("MESSAGE_STORE", 8, "Message Store", "message-stores");
  static readonly TEMPLATE = new ArtifactType("TEMPLATE", 9, "Template", "templates");
  static readonly LOCAL_ENTRY = new ArtifactType("LOCAL_ENTRY", 10, "Local Entry", "local-entries");
  static readonly CONNECTIONS = new ArtifactType("CONNECTIONS", 11, "Connections", "local-entries");
  static readonly PROXY = new ArtifactType("PROXY", 12, "Proxy", "proxy-services");
  static readonly DATA_SERVICE = new ArtifactType("DATA_SERVICE", 13, "Data Service", "data-services");
  static readonly DATA_SOURCE = new ArtifactType("DATA_SOURCE", 14, "Data Source", "data-sources");

  private constructor(private readonly _name: string, private readonly _ordinal: number,
                      private readonly value: string, private readonly folder: string) {}
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  getValue(): string { return this.value; }
  getFolder(): string { return this.folder; }
  toJSON(): string { return this.value; }
  static values(): ArtifactType[] {
    return [ArtifactType.API, ArtifactType.AUTOMATION, ArtifactType.EVENT_INTEGRATION, ArtifactType.ENDPOINT,
      ArtifactType.SEQUENCE, ArtifactType.CLASS_MEDIATOR, ArtifactType.RESOURCE, ArtifactType.MESSAGE_PROCESSOR,
      ArtifactType.MESSAGE_STORE, ArtifactType.TEMPLATE, ArtifactType.LOCAL_ENTRY, ArtifactType.CONNECTIONS,
      ArtifactType.PROXY, ArtifactType.DATA_SERVICE, ArtifactType.DATA_SOURCE];
  }
}

export class ArtifactTypeResponse {
  static readonly ArtifactType = ArtifactType;

  artifactType?: string;
  artifactFolder?: string;
  error?: string;

  constructor(artifactOrError: ArtifactType | string) {
    if (typeof artifactOrError === "string") {
      this.error = artifactOrError;
    } else {
      this.artifactType = artifactOrError.getValue();
      this.artifactFolder = artifactOrError.getFolder();
    }
  }

  getArtifactType(): string | undefined { return this.artifactType; }
  getArtifactFolder(): string | undefined { return this.artifactFolder; }
  getError(): string | undefined { return this.error; }
}
''')

# ---------------------------------------------------------------- SyntaxTreeGenerator
t = rd("SyntaxTreeGenerator.ts")
a = t.index("    let tree = SyntaxTreeGenerator.buildTree(rootElement);")
b = t.index("    return response;", a)
t = t[:a] + '''    let tree = SyntaxTreeGenerator.buildTree(rootElement);
    if (tree != null) {
        let rootTag = tree.getTag();
        let nextNode = toJsonTree(tree);
        let root: any = {};
        root[rootTag as string] = nextNode;
        response.setSyntaxTree(root);
    }
''' + t[b:]
a = t.index("  static getArtifactType(")
b = t.index("  getProjectPath()")
t = t[:a] + '''  /** Browser friendly variant of getArtifactType: the caller supplies the file content (or null when missing). */
  static getArtifactType(artifactPath: string, content: string | null): ArtifactTypeResponse {
    if (content === null || content === undefined) {
      return new ArtifactTypeResponse("File not found in the given path: " + artifactPath);
    }
    let document = Utils.getDOMDocument(content);
    let node = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
    if (node == null || node.getTag() == null) {
      return new ArtifactTypeResponse("Invalid artifact file: " + artifactPath);
    }
    const T = ArtifactTypeResponse.ArtifactType;
    switch (node.getTag()) {
      case Constant.API: return new ArtifactTypeResponse(T.API);
      case Constant.ENDPOINT: return new ArtifactTypeResponse(T.ENDPOINT);
      case Constant.INBOUND_ENDPOINT: return new ArtifactTypeResponse(T.EVENT_INTEGRATION);
      case Constant.MESSAGE_PROCESSOR: return new ArtifactTypeResponse(T.MESSAGE_PROCESSOR);
      case Constant.LOCAL_ENTRY: {
        const localEntry = node as LocalEntry;
        if (localEntry.getSubType() != null && (localEntry.getSubType() as string).endsWith(".INIT")) {
          return new ArtifactTypeResponse(T.CONNECTIONS);
        }
        return new ArtifactTypeResponse(T.LOCAL_ENTRY);
      }
      case Constant.MESSAGE_STORE: return new ArtifactTypeResponse(T.MESSAGE_STORE);
      case Constant.PROXY: return new ArtifactTypeResponse(T.PROXY);
      case Constant.SEQUENCE: return new ArtifactTypeResponse(T.SEQUENCE);
      case Constant.TEMPLATE: return new ArtifactTypeResponse(T.TEMPLATE);
      case Constant.DATA: return new ArtifactTypeResponse(T.DATA_SERVICE);
      case Constant.DATA_SOURCE: return new ArtifactTypeResponse(T.DATA_SOURCE);
      case Constant.TASK: return new ArtifactTypeResponse(T.AUTOMATION);
      default: return new ArtifactTypeResponse("Invalid artifact file: " + artifactPath);
    }
  }

''' + t[b:]
t = t.replace('import { Utils } from "./utils.js";', 'import { Utils } from "./utils.js";\nimport { toJsonTree } from "./toJsonTree.js";', 1)
wr("SyntaxTreeGenerator.ts", t)

# ---------------------------------------------------------------- connector dependencies (ported with the connector package)
wr("connectorDeps.ts", HEADER + '''/**
 * Minimal contracts for the connector services the syntax tree needs. The real implementations arrive with the
 * connector port; until then these are the seams the factories call through.
 */
export interface ConnectorHolder {
  isValidConnector(name: string): boolean;
}

export class Connection {
  name?: string;
  connectionType?: string;
  getName(): string | undefined { return this.name; }
  getConnectionType(): string | undefined { return this.connectionType; }
}

export class Connections {
  connections: Connection[] = [];
  getConnections(): Connection[] { return this.connections; }
}

export const ConnectionFinder = {
  /** Returns the connections of the given kind defined in the project (none until the connector port lands). */
  findConnections(_projectPath: string | undefined, _type: string, _holder: ConnectorHolder | undefined,
                  _includeAll: boolean): { getLeft(): Connections } {
    return { getLeft: () => new Connections() };
  },
};

export const ConfigFinder = {
  getTemplatePath(_templateName: string, _projectPath: string | undefined): string | null {
    return null;
  },
};
''')
for f in ("factory/mediators/MediatorFactoryFinder.ts", "factory/mediators/ai/AIConnectorFactory.ts",
          "factory/mediators/ai/AIAgentConnectorFactory.ts", "pojo/connector/ai/AIConnector.ts"):
    t = rd(f)
    rel = os.path.relpath("connectorDeps", os.path.dirname(f)).replace(os.sep, "/")
    rel = rel if rel.startswith(".") else "./" + rel
    names = [n for n in ("ConnectorHolder", "Connection", "Connections", "ConnectionFinder", "ConfigFinder")
             if re.search(r"\b%s\b" % n, t)]
    imp = 'import { %s } from "%s.js";\n' % (", ".join(names), rel)
    t = re.sub(r"^(// .*\n)", lambda m: m.group(1) + imp, t, count=1)
    wr(f, t)

# ---------------------------------------------------------------- misc fixes
# field/method name clashes (Gson uses the field name, so the field keeps it)
sub("pojo/template/TemplateParameter.ts", "  isMandatory(): boolean {", "  getIsMandatory(): boolean {")
sub("serializer/TemplateSerializer.ts", "param.isMandatory()", "param.getIsMandatory()")
sub("pojo/connector/ai/AgentTool.ts", "  isMcpTool(): boolean {", "  getIsMcpTool(): boolean {")

# AbstractMediatorSerializer: serializeComment is static on CommentMediatorSerializer
t = rd("serializer/mediator/AbstractMediatorSerializer.ts")
t = re.sub(r"return \(\(this as CommentMediatorSerializer\)\)\.serializeComment\(parent, \(m as CommentMediator\)\);",
           "// inlined CommentMediatorSerializer.serializeComment to avoid an import cycle with its subclass\n"
           "        const comment = AbstractMediatorSerializer.fac.createOMComment(parent, (m as CommentMediator).getCommentText());\n"
           "        if (parent != null) {\n            parent.addChild(comment);\n        }\n        return null;", t)
t = re.sub(r'import \{ CommentMediatorSerializer \} from "[^"]+";\n', "", t)
wr("serializer/mediator/AbstractMediatorSerializer.ts", t)


# EndpointSerializer switch over the EndpointType enum
t = rd("serializer/endpoint/EndpointSerializer.ts")
t = re.sub(r"case ([A-Z_]+_ENDPOINT):", r"case EndpointType.\1:", t)
if "EndpointType" in t and "import { EndpointType }" not in t:
    t = re.sub(r"^(// .*\n)", r'\1import { EndpointType } from "../../pojo/endpoint/EndpointType.js";\n', t, count=1)
t = t.replace("    let endpointElt = fac.createOMElement", "    let endpointElt = EndpointSerializer.fac.createOMElement")
wr("serializer/endpoint/EndpointSerializer.ts", t)

# Finder classes: build class lists lazily so import cycles between factories/finders cannot hit the TDZ
for f, field in (("factory/mediators/MediatorFactoryFinder.ts", "mediatorFactories"),
                 ("serializer/mediator/MediatorSerializerFinder.ts", "mediatorSerializers")):
    t = rd(f)
    t = re.sub(r"static readonly %s: any\[\] = \[(.*?)\];" % field,
               lambda m: "static %s(): any[] {\n    return [%s];\n  }" % (field, m.group(1)), t, flags=re.S)
    t = t.replace("MediatorFactoryFinder.mediatorFactories)", "MediatorFactoryFinder.mediatorFactories())")
    t = t.replace("of MediatorFactoryFinder.mediatorFactories ", "of MediatorFactoryFinder.mediatorFactories() ")
    t = t.replace("of MediatorSerializerFinder.mediatorSerializers ", "of MediatorSerializerFinder.mediatorSerializers() ")
    t = t.replace("of MediatorSerializerFinder.mediatorSerializers)", "of MediatorSerializerFinder.mediatorSerializers())")
    t = t.replace("c.getName()", "c.name").replace("mediator.constructor.getName()", "mediator.constructor.name")
    wr(f, t)

# SyntaxTreeUtils bad import ('..js' = the syntaxTree package index)
t = rd("utils/SyntaxTreeUtils.ts")
t = re.sub(r'from "\.\.js"', 'from "../SyntaxTreeGenerator.js"', t)
wr("utils/SyntaxTreeUtils.ts", t)

# ---------------------------------------------------------------- host file access + connector call sites
wr("hostFs.ts", HEADER + """/**
 * The syntax tree factories occasionally need to read other project files (for example AI agent templates).
 * The host (Node, browser virtual FS, tests) registers a reader here instead of the code touching a filesystem.
 */
type FileReader = (path: string) => string | null | undefined;

let reader: FileReader = () => null;

export function setHostFileReader(fn: FileReader): void {
  reader = fn;
}

export function readHostFile(path: string): string | null {
  return reader(path) ?? null;
}
""")
t = rd("factory/mediators/ai/AIAgentConnectorFactory.ts")
t = t.replace("Utils.getDOMDocument(new File(templatePath))", "Utils.getDOMDocument(readHostFile(templatePath) ?? \"\")")
t = re.sub(r"^(// .*\n)", lambda m: m.group(1) + 'import { readHostFile } from "../../../hostFs.js";\n', t, count=1)
wr("factory/mediators/ai/AIAgentConnectorFactory.ts", t)

sub("factory/mediators/ai/AIConnectorFactory.ts", "ConnectorHolder.getInstance()", "undefined")
for f, tags in (("factory/mediators/ai/AIChatConnectorFactory.ts", "AIChatConnectorFactory"),
                ("factory/mediators/ai/AIRAGChatConnectorFactory.ts", "AIRAGChatConnectorFactory")):
    t = rd(f)
    t = re.sub(r"populateConnections\(aiChat: AIChat, element: DOMElement\): void \{\n\s*this\.populateConnections\(",
               "populateConnections(aiChat: AIChat, element: DOMElement, _allowed?: string[]): void {\n    super.populateConnections(", t)
    wr(f, t)
t = rd("connectorDeps.ts")
t = t.replace("export class Connection {\n  name?: string;\n  connectionType?: string;",
 "export class Connection {\n  constructor(public connectorName?: string, public name?: string, public connectionType?: string,\n              public a?: unknown, public b?: unknown) {}")
wr("connectorDeps.ts", t)

# ---------------------------------------------------------------- EndpointSerializer subclass registry (import cycle)
t = rd("serializer/endpoint/EndpointSerializer.ts")
subs = ["Reference", "HTTP", "Address", "WSDL", "Default", "RecipientList", "LoadBalance", "Failover", "Template"]
for sname in subs:
    t = re.sub(r'import \{ %sEndpointSerializer \} from "[^"]+";\n' % sname, "", t)
    t = t.replace("return new %sEndpointSerializer();" % sname,
                  'return EndpointSerializer.registry.get("%sEndpointSerializer")!();' % sname)
t = t.replace("export abstract class EndpointSerializer {",
              "export abstract class EndpointSerializer {\n  /** Filled by registerEndpointSerializers.ts (kept out of this module to avoid an import cycle). */\n  static registry: Map<string, () => EndpointSerializer> = new Map();\n", 1)
t = t.replace("endpointSerializer instanceof ReferenceEndpointSerializer ||\n                endpointSerializer instanceof TemplateEndpointSerializer",
              "EndpointSerializer.standalone.has(endpointSerializer.constructor)")
t = t.replace("  static registry: Map", "  static standalone: Set<Function> = new Set();\n  static registry: Map", 1)
wr("serializer/endpoint/EndpointSerializer.ts", t)
wr("serializer/endpoint/registerEndpointSerializers.ts", HEADER + "import { EndpointSerializer } from \"./EndpointSerializer.js\";\n" +
   "".join('import { %sEndpointSerializer } from "./%sEndpointSerializer.js";\n' % (n, n) for n in subs) + "\n" +
   "".join('EndpointSerializer.registry.set("%sEndpointSerializer", () => new %sEndpointSerializer());\n' % (n, n) for n in subs) +
   "EndpointSerializer.standalone.add(ReferenceEndpointSerializer);\nEndpointSerializer.standalone.add(TemplateEndpointSerializer);\n")
for root_, _, files_ in os.walk(ROOT):
    for fn in files_:
        full = os.path.join(root_, fn)
        rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
        if not fn.endswith(".ts") or rel.startswith("serializer/endpoint/"):
            continue
        txt = open(full, encoding="utf-8").read()
        m = re.search(r'from "([./]+/(?:serializer/)?endpoint/EndpointSerializer\.js|\./endpoint/EndpointSerializer\.js)";\n', txt)
        if m and "registerEndpointSerializers" not in txt:
            reg = m.group(1).replace("EndpointSerializer.js", "registerEndpointSerializers.js")
            txt = txt.replace(m.group(0), m.group(0) + 'import "%s";\n' % reg, 1)
            open(full, "w", encoding="utf-8").write(txt)
