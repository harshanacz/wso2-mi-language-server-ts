// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/ResourceParam.java by the java2ts converter (see tools/java2ts).
import { StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { RequestedResource } from "./RequestedResource.js";

export class ResourceParam {
  static readonly __fields: string[] = ["resourceType", "projectPath", "customProjectUri"];

  resourceType?: Either<string, RequestedResource[]>;

  projectPath: string = StringUtils.EMPTY;

  customProjectUri?: string;
}
