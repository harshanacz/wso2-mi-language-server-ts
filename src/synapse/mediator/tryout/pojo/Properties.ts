// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/Properties.java by the java2ts converter (see tools/java2ts).
import { unmodifiable } from "../../../../syntaxTree/javaCompat.js";
import { Property } from "./Property.js";

export class Type {
  static readonly __fields: string[] = [];



  static readonly SYNAPSE = new Type("SYNAPSE", 0);
  static readonly AXIS2 = new Type("AXIS2", 1);
  static readonly AXIS2_CLIENT = new Type("AXIS2_CLIENT", 2);
  static readonly AXIS2_TRANSPORT = new Type("AXIS2_TRANSPORT", 3);
  static readonly AXIS2_OPERATION = new Type("AXIS2_OPERATION", 4);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): Type[] { return [Type.SYNAPSE, Type.AXIS2, Type.AXIS2_CLIENT, Type.AXIS2_TRANSPORT, Type.AXIS2_OPERATION]; }
  static valueOf(name: string): Type {
    const v = Type.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}

export class Properties {
  synapse?: Property[];

  axis2?: Property[];

  axis2Client?: Property[];

  axis2Transport?: Property[];

  axis2Operation?: Property[];

  constructor() {
    this.synapse = [];
    this.axis2 = [];
    this.axis2Client = [];
    this.axis2Transport = [];
    this.axis2Operation = [];

  }

  addSynapseProperties(properties: Property[]): void {
    this.synapse.push(...properties);

  }

  addAxis2Properties(properties: Property[]): void {
    this.axis2.push(...properties);

  }

  addAxis2ClientProperties(properties: Property[]): void {
    this.axis2Client.push(...properties);

  }

  addAxis2TransportProperties(properties: Property[]): void {
    this.axis2Transport.push(...properties);

  }

  addAxis2OperationProperties(properties: Property[]): void {
    this.axis2Operation.push(...properties);

  }

  addSynapseProperty(property: Property): void {
    this.synapse.push(property);

  }

  addAxis2Property(property: Property): void {
    this.axis2.push(property);

  }

  addAxis2ClientProperty(property: Property): void {
    this.axis2Client.push(property);

  }

  addAxis2TransportProperty(property: Property): void {
    this.axis2Transport.push(property);

  }

  addAxis2OperationProperty(property: Property): void {
    this.axis2Operation.push(property);

  }

  getSynapse(): Property[] {
    return unmodifiable(this.synapse);

  }

  getAxis2(): Property[] {
    return unmodifiable(this.axis2);

  }

  getAxis2Client(): Property[] {
    return unmodifiable(this.axis2Client);

  }

  getAxis2Transport(): Property[] {
    return unmodifiable(this.axis2Transport);

  }

  getAxis2Operation(): Property[] {
    return unmodifiable(this.axis2Operation);

  }

  getPropertiesByType(type: Type): Property[] {
    if (type == null) {
        return null;
    }
    switch (type) {
        case SYNAPSE:
            return this.synapse;
        case AXIS2:
            return this.axis2;
        case AXIS2_CLIENT:
            return this.axis2Client;
        case AXIS2_TRANSPORT:
            return this.axis2Transport;
        case AXIS2_OPERATION:
            return this.axis2Operation;
        default:
            return null;
    }

  }

  deepCopy(): Properties {
    let properties = new Properties();
    properties.addSynapseProperties(Array.from(this.synapse));
    properties.addAxis2Properties(Array.from(this.axis2));
    properties.addAxis2ClientProperties(Array.from(this.axis2Client));
    properties.addAxis2TransportProperties(Array.from(this.axis2Transport));
    properties.addAxis2OperationProperties(Array.from(this.axis2Operation));
    return properties;

  }

  toString(): string {
    return "Properties{" +
            "synapse=" + this.synapse +
            ", axis2=" + this.axis2 +
            ", axis2Client=" + this.axis2Client +
            ", axis2Transport=" + this.axis2Transport +
            ", axis2Operation=" + this.axis2Operation +
            '}';

  }
}
