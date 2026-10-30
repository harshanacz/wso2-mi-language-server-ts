// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/recipientList/EndpointRecipientlist.java by the java2ts converter (see tools/java2ts).
import { EndpointRecipientlistEndpoint } from "./EndpointRecipientlistEndpoint.js";
import { STNode } from "../../../stNode.js";

export class EndpointRecipientlist extends STNode {
  endpoint?: EndpointRecipientlistEndpoint[];

  getEndpoint(): EndpointRecipientlistEndpoint[] {
    return this.endpoint;

  }

  setEndpoint(endpoint: EndpointRecipientlistEndpoint[]): void {
    this.endpoint = endpoint;

  }
}
