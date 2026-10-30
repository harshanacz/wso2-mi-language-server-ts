// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/registryHander/NonXMLRegistryHandler.java by the java2ts converter (see tools/java2ts).
import { Logger } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { RegistryResource } from "../pojo/RegistryResource.js";
import { Resource } from "../pojo/Resource.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { JFile } from "../../host/JFile.js";

export abstract class NonXMLRegistryHandler {
  static readonly __fields: string[] = ["nextHandler", "resources"];

  static readonly LOGGER: Logger = Logger.getLogger("NonXMLRegistryHandler");

  nextHandler?: NonXMLRegistryHandler;

  resources?: Resource[];

  constructor(resources: Resource[]) {
    this.resources = resources;

  }

  handleFile(file: JFile): void {
    if (this.canHandle(file)) {
        let resource = this.createNonXmlResource(file);
        this.resources.push(resource);
    } else {
        if (this.nextHandler != null) {
            this.nextHandler.handleFile(file);
        }
    }

  }

  abstract canHandle(file: JFile): boolean;

  formatKey(key: string): string {
    return key;

  }

  createNonXmlResource(file: JFile): Resource {
    let resource = new RegistryResource();
    resource.setName(file.getName());
    resource.setType(Utils.getFileExtension(file));
    resource.setRegistryPath(file.getAbsolutePath());
    if (Utils.isFileInRegistry(file)) {
        resource.setFrom(Constant.REGISTRY);
        resource.setRegistryKey(this.formatKey(Utils.getRegistryKey(file)));
    } else {
        resource.setFrom(Constant.RESOURCES);
        resource.setRegistryKey(this.formatKey(Utils.getResourceKey(file)));
    }
    return resource;

  }

  getNextHandler(): NonXMLRegistryHandler {
    return this.nextHandler;

  }

  setNextHandler(nextHandler: NonXMLRegistryHandler): void {
    this.nextHandler = nextHandler;

  }

  getResources(): Resource[] {
    return this.resources;

  }

  setResources(resources: Resource[]): void {
    this.resources = resources;

  }
}
