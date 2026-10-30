// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/pojo/Namespace.java by the java2ts converter (see tools/java2ts).

export class Namespace {
  static readonly __fields: string[] = ["prefix", "uri"];

  prefix?: string;

  uri?: string;

  constructor(prefix: string, uri: string) {
    this.prefix = prefix;
    this.uri = uri;

  }

  getPrefix(): string {
    return this.prefix;

  }

  getUri(): string {
    return this.uri;

  }
}
