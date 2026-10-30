// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/EndpointAddress.java by the java2ts converter (see tools/java2ts).
import { DefaultEndpoint } from "./DefaultEndpoint.js";

export class EndpointAddress extends DefaultEndpoint {
  uri?: string;

  constructor(defaultEndpoint: DefaultEndpoint) {
    super();
    this.setEnableRM(defaultEndpoint.getEnableRM());
    this.setEnableSec(defaultEndpoint.getEnableSec());
    this.setEnableAddressing(defaultEndpoint.getEnableAddressing());
    this.setTimeout(defaultEndpoint.getTimeout());
    this.setSuspendOnFailure(defaultEndpoint.getSuspendOnFailure());
    this.setMarkForSuspension(defaultEndpoint.getMarkForSuspension());

    this.setFormat(defaultEndpoint.getFormat());
    this.setOptimize(defaultEndpoint.getOptimize());
    this.setEncoding(defaultEndpoint.getEncoding());
    this.setStatistics(defaultEndpoint.getStatistics());
    this.setTrace(defaultEndpoint.getTrace());

  }

  getUri(): string {
    return this.uri;

  }

  setUri(uri: string): void {
    this.uri = uri;

  }
}
