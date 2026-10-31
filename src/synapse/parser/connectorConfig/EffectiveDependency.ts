// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/connectorConfig/EffectiveDependency.java by the java2ts converter (see tools/java2ts).

export class EffectiveDependency {
  static readonly __fields: string[] = ["connectionType", "groupId", "artifactId", "defaultVersion", "overriddenVersion", "omit", "isOverridden", "isConnectionTypeActive", "localPath"];

  connectionType?: string;

  groupId?: string;

  artifactId?: string;

  defaultVersion?: string;

  overriddenVersion?: string;

  omit: boolean = false;

  isOverridden: boolean = false;

  isConnectionTypeActive: boolean = false;

  localPath?: string;
}
