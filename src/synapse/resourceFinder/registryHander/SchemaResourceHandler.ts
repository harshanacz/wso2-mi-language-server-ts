// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/registryHander/SchemaResourceHandler.java by the java2ts converter (see tools/java2ts).
import { NonXMLRegistryHandler } from "./NonXMLRegistryHandler.js";
import { Resource } from "../pojo/Resource.js";
import { JFile } from "../../host/JFile.js";

export class SchemaResourceHandler extends NonXMLRegistryHandler {
  static readonly __fields: string[] = [];

  constructor(resources: Resource[]) {
    super(resources);

  }

  canHandle(file: JFile): boolean {
    if (file.getAbsolutePath().endsWith(".xsd") || file.getAbsolutePath().endsWith(".json")) {
        return true;
    }
    return false;

  }
}
