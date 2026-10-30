// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/failover/EndpointFailoverEndpoint.java by the java2ts converter (see tools/java2ts).
import { UnsupportedOperationException } from "../../../javaCompat.js";
import { ChildEndpoint } from "../ChildEndpoint.js";
import { EndpointFailover } from "./EndpointFailover.js";

export class EndpointFailoverEndpoint extends ChildEndpoint {
  getFailover(): EndpointFailover {
    throw new UnsupportedOperationException("Not supported for FailOver Endpoint");

  }

  setFailover(failOver: EndpointFailover): void {
    throw new UnsupportedOperationException("Not supported for FailOver Endpoint");

  }
}
