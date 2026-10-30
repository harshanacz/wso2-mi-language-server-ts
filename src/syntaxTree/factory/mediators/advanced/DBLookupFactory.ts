// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/DBLookupFactory.java by the java2ts converter (see tools/java2ts).
import { DBMediatorFactory } from "./DBMediatorFactory.js";

export class DBLookupFactory extends DBMediatorFactory {
  static readonly DB_LOOKUP: string = "dblookup";

  getTagName(): string {
    return DBLookupFactory.DB_LOOKUP;

  }
}
