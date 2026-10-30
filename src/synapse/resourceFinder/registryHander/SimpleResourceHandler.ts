// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/registryHander/SimpleResourceHandler.java by the java2ts converter (see tools/java2ts).
import { contains, get } from "../../../syntaxTree/javaCompat.js";
import { NonXMLRegistryHandler } from "./NonXMLRegistryHandler.js";
import { RequestedResource } from "../pojo/RequestedResource.js";
import { Resource } from "../pojo/Resource.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export class SimpleResourceHandler extends NonXMLRegistryHandler {
  static readonly __fields: string[] = ["requestedResources"];

  requestedResources?: string[];

  static readonly nonXmlTypeToExtensionMap: Map<string, string> = new Map();

  static {
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("dataMapper", "dmc");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("js", "js");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("json", "json");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("wsdl", "wsdl");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("xsd", "xsd");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("xsl", "xsl");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("xslt", "xslt");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("yaml", "yaml");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("crt", "crt");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("txt", "txt");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("xml", "xml");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("ftl", "ftl");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("rb", "rb");
    SimpleResourceHandler.nonXmlTypeToExtensionMap.set("groovy", "groovy");

  }

  constructor(requestedResources: RequestedResource[], resources: Resource[]) {
    super(resources);
    this.requestedResources = [];
    for (let requestedResource of requestedResources) {
        this.requestedResources.push(get(SimpleResourceHandler.nonXmlTypeToExtensionMap, requestedResource.getType()));
    }

  }

  canHandle(file: JFile): boolean {
    return contains(this.requestedResources, Utils.getFileExtension(file));

  }
}
