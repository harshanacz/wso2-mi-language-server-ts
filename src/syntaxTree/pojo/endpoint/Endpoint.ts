// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/Endpoint.java by the java2ts converter (see tools/java2ts).
import { DefaultEndpoint } from "./DefaultEndpoint.js";
import { EndpointAddress } from "./EndpointAddress.js";
import { EndpointFailover } from "./failover/EndpointFailover.js";
import { EndpointHttp } from "./http/EndpointHttp.js";
import { EndpointLoadbalance } from "./loadbalance/EndpointLoadbalance.js";
import { EndpointParameter } from "./common/EndpointParameter.js";
import { EndpointProperty } from "./common/EndpointProperty.js";
import { EndpointRecipientlist } from "./recipientList/EndpointRecipientlist.js";
import { EndpointSession } from "./EndpointSession.js";
import { EndpointType } from "./EndpointType.js";
import { STNode } from "../../stNode.js";
import { WSDLEndpoint } from "./wsdl/WSDLEndpoint.js";

export class Endpoint extends STNode {
  _default?: DefaultEndpoint;

  http?: EndpointHttp;

  address?: EndpointAddress;

  wsdl?: WSDLEndpoint;

  loadbalance?: EndpointLoadbalance;

  session?: EndpointSession;

  failover?: EndpointFailover;

  recipientlist?: EndpointRecipientlist;

  property?: EndpointProperty[];

  parameter?: EndpointParameter[];

  description?: string;

  key?: string;

  keyExpression?: string;

  template?: string;

  uri?: string;

  type?: EndpointType;

  get_default(): DefaultEndpoint {
    return this._default;

  }

  set_default(_default: DefaultEndpoint): void {
    this._default = _default;

  }

  getHttp(): EndpointHttp {
    return this.http;

  }

  setHttp(http: EndpointHttp): void {
    this.http = http;

  }

  getAddress(): EndpointAddress {
    return this.address;

  }

  setAddress(address: EndpointAddress): void {
    this.address = address;

  }

  getWsdl(): WSDLEndpoint {
    return this.wsdl;

  }

  setWsdl(wsdl: WSDLEndpoint): void {
    this.wsdl = wsdl;

  }

  getLoadbalance(): EndpointLoadbalance {
    return this.loadbalance;

  }

  setLoadbalance(loadbalance: EndpointLoadbalance): void {
    this.loadbalance = loadbalance;

  }

  getSession(): EndpointSession {
    return this.session;

  }

  setSession(session: EndpointSession): void {
    this.session = session;

  }

  getFailover(): EndpointFailover {
    return this.failover;

  }

  setFailover(failover: EndpointFailover): void {
    this.failover = failover;

  }

  getRecipientlist(): EndpointRecipientlist {
    return this.recipientlist;

  }

  setRecipientlist(recipientlist: EndpointRecipientlist): void {
    this.recipientlist = recipientlist;

  }

  getProperty(): EndpointProperty[] {
    return this.property;

  }

  setProperty(property: EndpointProperty[]): void {
    this.property = property;

  }

  getParameter(): EndpointParameter[] {
    return this.parameter;

  }

  setParameter(parameter: EndpointParameter[]): void {
    this.parameter = parameter;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }

  getKeyExpression(): string {
    return this.keyExpression;

  }

  setKeyExpression(keyExpression: string): void {
    this.keyExpression = keyExpression;

  }

  getTemplate(): string {
    return this.template;

  }

  setTemplate(template: string): void {
    this.template = template;

  }

  getUri(): string {
    return this.uri;

  }

  setUri(uri: string): void {
    this.uri = uri;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getType(): EndpointType {
    return this.type;

  }

  setType(type: EndpointType): void {
    this.type = type;

  }
}
