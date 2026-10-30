// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/ResourceFinderFactory.java by the java2ts converter (see tools/java2ts).
import { AbstractResourceFinder } from "./AbstractResourceFinder.js";
import { NewProjectResourceFinder } from "./NewProjectResourceFinder.js";
import { OldProjectResourceFinder } from "./OldProjectResourceFinder.js";

export class ResourceFinderFactory {
  static readonly __fields: string[] = [];

  static getResourceFinder(isLegacyProject: boolean): AbstractResourceFinder {
    if (isLegacyProject) {
        return new OldProjectResourceFinder();
    } else {
        return new NewProjectResourceFinder();
    }

  }
}
