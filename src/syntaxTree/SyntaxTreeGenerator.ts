// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/SyntaxTreeGenerator.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, size, format, Logger } from "./javaCompat.js";
import { APIFactory } from "./factory/APIFactory.js";
import { ArtifactTypeResponse } from "./pojo/ArtifactTypeResponse.js";
import { Constant } from "./constant.js";
import { DOMDocument } from "./dom/dom.js";
import { DOMElement } from "./dom/dom.js";
import { DataServiceConfigFactory } from "./factory/DataServiceConfigFactory.js";
import { DataSourceConfigFactory } from "./factory/DataSourceConfigFactory.js";
import { EndpointFactory } from "./factory/endpoint/EndpointFactory.js";
import { InboundEndpointFactory } from "./factory/InboundEndpointFactory.js";
import { LocalEntry } from "./pojo/LocalEntry.js";
import { LocalEntryFactory } from "./factory/LocalEntryFactory.js";
import { MessageProcessorFactory } from "./factory/MessageProcessorFactory.js";
import { MessageStoreFactory } from "./factory/MessageStoreFactory.js";
import { MockServiceFactory } from "./factory/test/MockServiceFactory.js";
import { NamedSequenceFactory } from "./factory/NamedSequenceFactory.js";
import { ProxyFactory } from "./factory/ProxyFactory.js";
import { STNode } from "./stNode.js";
import { SyntaxTreeResponse } from "./SyntaxTreeResponse.js";
import { TaskFactory } from "./factory/TaskFactory.js";
import { TemplateFactory } from "./factory/TemplateFactory.js";
import { UnitTestFactory } from "./factory/test/UnitTestFactory.js";
import { Utils } from "./utils.js";
import { toJsonTree } from "./toJsonTree.js";
import { Wsdl11Factory } from "./factory/misc/Wsdl11Factory.js";
import { Wsdl20Factory } from "./factory/misc/Wsdl20Factory.js";

export class SyntaxTreeGenerator {
  static readonly LOGGER: Logger = Logger.getLogger("SyntaxTreeGenerator");

  projectPath?: string;

  static componentNames: string[] = [Constant.API, Constant.ENDPOINT, Constant.INBOUND_ENDPOINT,
            Constant.MESSAGE_PROCESSOR, Constant.LOCAL_ENTRY, Constant.MESSAGE_STORE, Constant.PROXY, Constant.SEQUENCE,
            Constant.TASK, Constant.TEMPLATE, Constant.WSDL_DEFINITIONS, Constant.WSDL_DESCRIPTION, Constant.DATA,
            Constant.DATA_SOURCE, Constant.UNIT_TEST, Constant.MOCK_SERVICE];

  getSyntaxTree(document: DOMDocument): SyntaxTreeResponse {
    let response = new SyntaxTreeResponse(null, document.getDocumentURI());
    let rootElement = this.getRootElement(document);
    let tree = SyntaxTreeGenerator.buildTree(rootElement);
    if (tree != null) {
        let rootTag = tree.getTag();
        let nextNode = toJsonTree(tree);
        let root: any = {};
        root[rootTag as string] = nextNode;
        response.setSyntaxTree(root);
    }
    return response;

  }

  setProjectPath(path: string): void {
    this.projectPath = path;

  }

  getRootElement(document: DOMDocument): DOMElement {
    let rootElement = null;
    for (let i = 0; i < size(document.getChildren()); i++) {
        let elementName = document.getChild(i).getNodeName();
        if (Utils.containsIgnoreCase(SyntaxTreeGenerator.componentNames, elementName)) {
            rootElement = (document.getChild(i) as DOMElement);
            break;
        }
    }
    return rootElement;

  }

  static buildTree(xmlNode: DOMElement): STNode {
    let factory = null;
    let root = null;
    if (xmlNode != null) {
        if (equalsIgnoreCase(Constant.API, xmlNode.getNodeName())) {
            factory = new APIFactory();
        } else if (equalsIgnoreCase(Constant.ENDPOINT, xmlNode.getNodeName())) {
            factory = new EndpointFactory();
        } else if (equalsIgnoreCase(Constant.INBOUND_ENDPOINT, xmlNode.getNodeName())) {
            factory = new InboundEndpointFactory();
        } else if (equalsIgnoreCase(Constant.MESSAGE_PROCESSOR, xmlNode.getNodeName())) {
            factory = new MessageProcessorFactory();
        } else if (equalsIgnoreCase(Constant.LOCAL_ENTRY, xmlNode.getNodeName())) {
            factory = new LocalEntryFactory();
        } else if (equalsIgnoreCase(Constant.MESSAGE_STORE, xmlNode.getNodeName())) {
            factory = new MessageStoreFactory();
        } else if (equalsIgnoreCase(Constant.PROXY, xmlNode.getNodeName())) {
            factory = new ProxyFactory();
        } else if (equalsIgnoreCase(Constant.SEQUENCE, xmlNode.getNodeName())) {
            factory = new NamedSequenceFactory();
        } else if (equalsIgnoreCase(Constant.TASK, xmlNode.getNodeName())) {
            factory = new TaskFactory();
        } else if (equalsIgnoreCase(Constant.TEMPLATE, xmlNode.getNodeName())) {
            factory = new TemplateFactory();
        } else if (equalsIgnoreCase(Constant.WSDL_DEFINITIONS, xmlNode.getNodeName())) {
            factory = new Wsdl11Factory();
        } else if (equalsIgnoreCase(Constant.WSDL_DESCRIPTION, xmlNode.getNodeName())) {
            factory = new Wsdl20Factory();
        } else if (equalsIgnoreCase(Constant.DATA, xmlNode.getNodeName())) {
            factory = new DataServiceConfigFactory();
        } else if (equalsIgnoreCase(Constant.DATA_SOURCE, xmlNode.getNodeName())) {
            factory = new DataSourceConfigFactory();
        } else if (equalsIgnoreCase(Constant.UNIT_TEST, xmlNode.getNodeName())) {
            factory = new UnitTestFactory();
        } else if (equalsIgnoreCase(Constant.MOCK_SERVICE, xmlNode.getNodeName())) {
            factory = new MockServiceFactory();
        }
    }

    if (factory != null) {
        root = factory.create(xmlNode);
    }
    return root;

  }

  /** Browser friendly variant of getArtifactType: the caller supplies the file content (or null when missing). */
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

  getProjectPath(): string {
    return this.projectPath;

  }
}
