// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/ChildEndpoint.java by the java2ts converter (see tools/java2ts).
import { DefaultEndpoint } from "./DefaultEndpoint.js";
import { EndpointAddress } from "./EndpointAddress.js";
import { EndpointFailover } from "./failover/EndpointFailover.js";
import { EndpointHttp } from "./http/EndpointHttp.js";
import { EndpointLoadbalance } from "./loadbalance/EndpointLoadbalance.js";
import { EndpointSession } from "./EndpointSession.js";
import { STNode } from "../../stNode.js";
import { WSDLEndpoint } from "./wsdl/WSDLEndpoint.js";

export abstract class ChildEndpoint extends STNode {
  static readonly __fields: string[] = ["_default", "http", "address", "wsdl", "loadbalance", "failover", "session", "name", "key"];

  _default?: DefaultEndpoint;

  http?: EndpointHttp;

  address?: EndpointAddress;

  wsdl?: WSDLEndpoint;

  loadbalance?: EndpointLoadbalance;

  failover?: EndpointFailover;

  session?: EndpointSession;

  name?: string;

  key?: string;

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

  getFailover(): EndpointFailover {
    return this.failover;

  }

  setFailover(failover: EndpointFailover): void {
    this.failover = failover;

  }

  setSession(session: EndpointSession): void {
    this.session = session;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getKey(): string {
    return this.key;

  }

  setKey(key: string): void {
    this.key = key;

  }
}
