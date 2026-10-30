// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.java by the java2ts converter (see tools/java2ts).
import { DataServiceCallOperations } from "./DataServiceCallOperations.js";
import { DataServiceCallSource } from "./DataServiceCallSource.js";
import { DataServiceCallTarget } from "./DataServiceCallTarget.js";
import { Mediator } from "../../Mediator.js";

export class DataServiceCall extends Mediator {
  source?: DataServiceCallSource;

  operations?: DataServiceCallOperations;

  target?: DataServiceCallTarget;

  serviceName?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Call Dataservice");

  }

  getSource(): DataServiceCallSource {
    return this.source;

  }

  setSource(source: DataServiceCallSource): void {
    this.source = source;

  }

  getOperations(): DataServiceCallOperations {
    return this.operations;

  }

  setOperations(operations: DataServiceCallOperations): void {
    this.operations = operations;

  }

  getTarget(): DataServiceCallTarget {
    return this.target;

  }

  setTarget(target: DataServiceCallTarget): void {
    this.target = target;

  }

  getServiceName(): string {
    return this.serviceName;

  }

  setServiceName(serviceName: string): void {
    this.serviceName = serviceName;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
