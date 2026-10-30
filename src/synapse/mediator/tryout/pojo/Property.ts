// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/Property.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, unmodifiable } from "../../../../syntaxTree/javaCompat.js";

export class Property {
  static readonly __fields: string[] = ["key", "value", "description", "properties"];

  key?: string;

  value?: string;

  description?: string;

  properties?: Property[];

  constructor(key: string, value: string);
  constructor(key: string, value: string, description: string);
  constructor(key: string, properties: Property[]);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        if (typeof args[1] === 'string') {
          const [key, value] = args;


                  this.key = key;
                  this.value = value;

        } else if (Array.isArray(args[1])) {
          const [key, properties] = args;


                  this.key = key;
                  this.properties = properties;

        }
        break;
      }
      case 3: {
        const [key, value, description] = args;


                this.key = key;
                this.value = value;
                this.description = description;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getValue(): string {
    return this.value;

  }

  setValue(value: string): void {
    this.value = value;

  }

  setProperties(properties: Property[]): void {
    this.properties = properties;

  }

  addProperty(property: Property): void {
    if (this.properties == null) {
        this.properties = [];
    }
    this.properties.push(property);

  }

  getProperties(): Property[] {
    if (this.properties == null) {
        return [];
    }
    return unmodifiable(this.properties);

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  deepCopy(): Property {
    let property = new Property(this.key, this.value, this.description);
    if (this.properties != null) {
        property.setProperties(Array.from(this.properties));
    }
    return property;

  }

  equals(obj: any): boolean {
    if (!(obj instanceof Property)) {
        return false;
    }
    let property = (obj as Property);
    return this.equals(this.key, property.getKey()) && (this.value != null && this.equals(this.value, property.getValue()));

  }

  hashCode(): number {
    let result = this.key != null ? this.key.hashCode() : 0;
    result = 31 * result + (this.value != null ? this.value.hashCode() : 0);
    return result;

  }

  deleteProperty(key: string): boolean {
    if (this.properties == null || isEmpty(this.properties)) {
        return false;
    }
    return this.properties.removeIf(property => this.equals(property.getKey(), key));

  }

  toString(): string {
    return "Property{" +
            "key='" + this.key + '\'' +
            ", value='" + this.value + '\'' +
            ", description='" + this.description + '\'' +
            ", properties=" + this.properties +
            '}';

  }
}
