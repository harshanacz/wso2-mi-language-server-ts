// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/DeployedArtifactType.java by the java2ts converter (see tools/java2ts).

export class DeployedArtifactType {
  static readonly __fields: string[] = ["value"];

  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly APIS = new DeployedArtifactType("APIS", 0, "apis");
  static readonly SEQUENCES = new DeployedArtifactType("SEQUENCES", 1, "sequences");
  static readonly ENDPOINTS = new DeployedArtifactType("ENDPOINTS", 2, "endpoints");
  static readonly LOCAL_ENTRIES = new DeployedArtifactType("LOCAL_ENTRIES", 3, "local-entries");
  static readonly TASKS = new DeployedArtifactType("TASKS", 4, "tasks");
  static readonly MESSAGE_STORES = new DeployedArtifactType("MESSAGE_STORES", 5, "message-stores");
  static readonly MESSAGE_PROCESSORS = new DeployedArtifactType("MESSAGE_PROCESSORS", 6, "message-processors");
  static readonly INBOUND_ENDPOINTS = new DeployedArtifactType("INBOUND_ENDPOINTS", 7, "inbound-endpoints");
  static readonly TEMPLATES = new DeployedArtifactType("TEMPLATES", 8, "templates");
  static readonly DATA_SERVICES = new DeployedArtifactType("DATA_SERVICES", 9, "data-services");
  static readonly DATA_SOURCES = new DeployedArtifactType("DATA_SOURCES", 10, "data-sources");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): DeployedArtifactType[] { return [DeployedArtifactType.APIS, DeployedArtifactType.SEQUENCES, DeployedArtifactType.ENDPOINTS, DeployedArtifactType.LOCAL_ENTRIES, DeployedArtifactType.TASKS, DeployedArtifactType.MESSAGE_STORES, DeployedArtifactType.MESSAGE_PROCESSORS, DeployedArtifactType.INBOUND_ENDPOINTS, DeployedArtifactType.TEMPLATES, DeployedArtifactType.DATA_SERVICES, DeployedArtifactType.DATA_SOURCES]; }
  static valueOf(name: string): DeployedArtifactType {
    const v = DeployedArtifactType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
