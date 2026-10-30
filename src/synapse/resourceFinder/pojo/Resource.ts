// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/Resource.java by the java2ts converter (see tools/java2ts).

export abstract class Resource {
  static readonly __fields: string[] = ["name", "type", "from"];

  name?: string;

  type?: string;

  from?: string;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  getFrom(): string {
    return this.from;

  }

  setFrom(from: string): void {
    this.from = from;

  }

  toString(): string {
    return "Resource{" +
            "name='" + this.name + '\'' +
            ", type='" + this.type + '\'' +
            ", from='" + this.from + '\'' +
            '}';

  }
}
