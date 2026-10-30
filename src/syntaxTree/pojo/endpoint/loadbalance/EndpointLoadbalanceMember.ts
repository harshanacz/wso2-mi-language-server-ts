// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/loadbalance/EndpointLoadbalanceMember.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointLoadbalanceMember extends STNode {
  hostName?: string;

  httpPort?: string;

  httpsPort?: string;

  getHostName(): string {
    return this.hostName;

  }

  setHostName(hostName: string): void {
    this.hostName = hostName;

  }

  getHttpPort(): string {
    return this.httpPort;

  }

  setHttpPort(httpPort: string): void {
    this.httpPort = httpPort;

  }

  getHttpsPort(): string {
    return this.httpsPort;

  }

  setHttpsPort(httpsPort: string): void {
    this.httpsPort = httpsPort;

  }
}
