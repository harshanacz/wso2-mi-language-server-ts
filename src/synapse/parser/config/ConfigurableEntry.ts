// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/config/ConfigurableEntry.java by the java2ts converter (see tools/java2ts).

export class ConfigurableEntry {
  static readonly __fields: string[] = ["name", "type"];

  name?: string;

  type?: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;

  }

  getName(): string {
    return this.name;

  }

  getType(): string {
    return this.type;

  }
}
