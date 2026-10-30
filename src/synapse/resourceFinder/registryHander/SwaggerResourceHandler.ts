// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/registryHander/SwaggerResourceHandler.java by the java2ts converter (see tools/java2ts).
import { equals, get } from "../../../syntaxTree/javaCompat.js";
import { NonXMLRegistryHandler } from "./NonXMLRegistryHandler.js";
import { Resource } from "../pojo/Resource.js";
import { JFile } from "../../host/JFile.js";

import { ObjectMapper, YAMLFactory } from "../../jackson.js";

export class SwaggerResourceHandler extends NonXMLRegistryHandler {
  static readonly __fields: string[] = [];

  constructor(resources: Resource[]) {
    super(resources);

  }

  canHandle(file: JFile): boolean {
    let objectMapper: ObjectMapper | undefined;
    let content: Map<string, any> | undefined;

    if (file.getAbsolutePath().endsWith(".yaml") || file.getAbsolutePath().endsWith(".yml")) {
        objectMapper = new ObjectMapper(new YAMLFactory());
    } else if (file.getAbsolutePath().endsWith(".json")) {
        objectMapper = new ObjectMapper();
    } else {
        return false;
    }
    try {
        content = objectMapper.readValue(file, Map);
        return this.isSwaggerContent(content);
    } catch (e) {
    }
    return false;

  }

  isSwaggerContent(content: Map<string, any>): boolean {
    if (content.has("swagger") && equals("2.0", get(content, "swagger"))) {
        return true;
    }
    if (content.has("openapi") && String(get(content, "openapi")).startsWith("3.")) {
        return true;
    }
    return content.has("info") && content.has("paths");

  }
}
