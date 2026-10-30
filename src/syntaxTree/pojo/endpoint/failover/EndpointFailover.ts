// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/failover/EndpointFailover.java by the java2ts converter (see tools/java2ts).
import { EndpointFailoverEndpoint } from "./EndpointFailoverEndpoint.js";
import { STNode } from "../../../stNode.js";

export class EndpointFailover extends STNode {
  static readonly __fields: string[] = ["endpoint", "dynamic", "buildMessage"];

  endpoint?: EndpointFailoverEndpoint[];

  dynamic: boolean = false;

  buildMessage: boolean = false;

  getEndpoint(): EndpointFailoverEndpoint[] {
    return this.endpoint;

  }

  setEndpoint(endpoint: EndpointFailoverEndpoint[]): void {
    this.endpoint = endpoint;

  }

  isDynamic(): boolean {
    return this.dynamic;

  }

  setDynamic(dynamic: boolean): void {
    this.dynamic = dynamic;

  }

  isBuildMessage(): boolean {
    return this.buildMessage;

  }

  setBuildMessage(buildMessage: boolean): void {
    this.buildMessage = buildMessage;

  }
}
