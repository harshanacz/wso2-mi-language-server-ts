// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/inbound/InboundEndpointType.java by the java2ts converter (see tools/java2ts).

export class InboundEndpointType {


  static readonly HTTP = new InboundEndpointType("HTTP", 0);
  static readonly HTTPS = new InboundEndpointType("HTTPS", 1);
  static readonly FILE = new InboundEndpointType("FILE", 2);
  static readonly JMS = new InboundEndpointType("JMS", 3);
  static readonly KAFKA = new InboundEndpointType("KAFKA", 4);
  static readonly RABBITMQ = new InboundEndpointType("RABBITMQ", 5);
  static readonly HL7 = new InboundEndpointType("HL7", 6);
  static readonly MQTT = new InboundEndpointType("MQTT", 7);
  static readonly WS = new InboundEndpointType("WS", 8);
  static readonly WSO2_MB = new InboundEndpointType("WSO2_MB", 9);
  static readonly WSS = new InboundEndpointType("WSS", 10);
  static readonly CXF_WS_RM = new InboundEndpointType("CXF_WS_RM", 11);
  static readonly Feed = new InboundEndpointType("Feed", 12);
  static readonly Custom = new InboundEndpointType("Custom", 13);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): InboundEndpointType[] { return [InboundEndpointType.HTTP, InboundEndpointType.HTTPS, InboundEndpointType.FILE, InboundEndpointType.JMS, InboundEndpointType.KAFKA, InboundEndpointType.RABBITMQ, InboundEndpointType.HL7, InboundEndpointType.MQTT, InboundEndpointType.WS, InboundEndpointType.WSO2_MB, InboundEndpointType.WSS, InboundEndpointType.CXF_WS_RM, InboundEndpointType.Feed, InboundEndpointType.Custom]; }
  static valueOf(name: string): InboundEndpointType {
    const v = InboundEndpointType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
