// Hand ported from the Java original (see git history for the generated base).
export class ArtifactType {
  static readonly API = new ArtifactType("API", 0, "API", "apis");
  static readonly AUTOMATION = new ArtifactType("AUTOMATION", 1, "Automation", "tasks");
  static readonly EVENT_INTEGRATION = new ArtifactType("EVENT_INTEGRATION", 2, "Event Integration", "inbound-endpoints");
  static readonly ENDPOINT = new ArtifactType("ENDPOINT", 3, "Endpoint", "endpoints");
  static readonly SEQUENCE = new ArtifactType("SEQUENCE", 4, "Sequence", "sequences");
  static readonly CLASS_MEDIATOR = new ArtifactType("CLASS_MEDIATOR", 5, "Class Mediator", "java");
  static readonly RESOURCE = new ArtifactType("RESOURCE", 6, "Resource", "resources");
  static readonly MESSAGE_PROCESSOR = new ArtifactType("MESSAGE_PROCESSOR", 7, "Message Processor", "message-processors");
  static readonly MESSAGE_STORE = new ArtifactType("MESSAGE_STORE", 8, "Message Store", "message-stores");
  static readonly TEMPLATE = new ArtifactType("TEMPLATE", 9, "Template", "templates");
  static readonly LOCAL_ENTRY = new ArtifactType("LOCAL_ENTRY", 10, "Local Entry", "local-entries");
  static readonly CONNECTIONS = new ArtifactType("CONNECTIONS", 11, "Connections", "local-entries");
  static readonly PROXY = new ArtifactType("PROXY", 12, "Proxy", "proxy-services");
  static readonly DATA_SERVICE = new ArtifactType("DATA_SERVICE", 13, "Data Service", "data-services");
  static readonly DATA_SOURCE = new ArtifactType("DATA_SOURCE", 14, "Data Source", "data-sources");

  private constructor(private readonly _name: string, private readonly _ordinal: number,
                      private readonly value: string, private readonly folder: string) {}
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  getValue(): string { return this.value; }
  getFolder(): string { return this.folder; }
  toJSON(): string { return this.value; }
  static values(): ArtifactType[] {
    return [ArtifactType.API, ArtifactType.AUTOMATION, ArtifactType.EVENT_INTEGRATION, ArtifactType.ENDPOINT,
      ArtifactType.SEQUENCE, ArtifactType.CLASS_MEDIATOR, ArtifactType.RESOURCE, ArtifactType.MESSAGE_PROCESSOR,
      ArtifactType.MESSAGE_STORE, ArtifactType.TEMPLATE, ArtifactType.LOCAL_ENTRY, ArtifactType.CONNECTIONS,
      ArtifactType.PROXY, ArtifactType.DATA_SERVICE, ArtifactType.DATA_SOURCE];
  }
}

export class ArtifactTypeResponse {
  static readonly ArtifactType = ArtifactType;

  artifactType?: string;
  artifactFolder?: string;
  error?: string;

  constructor(artifactOrError: ArtifactType | string) {
    if (typeof artifactOrError === "string") {
      this.error = artifactOrError;
    } else {
      this.artifactType = artifactOrError.getValue();
      this.artifactFolder = artifactOrError.getFolder();
    }
  }

  getArtifactType(): string | undefined { return this.artifactType; }
  getArtifactFolder(): string | undefined { return this.artifactFolder; }
  getError(): string | undefined { return this.error; }
}
