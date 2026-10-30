// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/NamedSequence.java by the java2ts converter (see tools/java2ts).
import { EnableDisable } from "./api/EnableDisable.js";
import { Mediator } from "./mediator/Mediator.js";
import { STNode } from "../stNode.js";

export class NamedSequence extends STNode {
  mediatorList?: Mediator[];

  name?: string;

  onError?: string;

  description?: string;

  statistics?: EnableDisable;

  trace?: EnableDisable;

  getMediatorList(): Mediator[] {
    return this.mediatorList;

  }

  setMediatorList(mediatorList: Mediator[]): void {
    this.mediatorList = mediatorList;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getOnError(): string {
    return this.onError;

  }

  setOnError(onError: string): void {
    this.onError = onError;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getStatistics(): EnableDisable {
    return this.statistics;

  }

  setStatistics(statistics: EnableDisable): void {
    this.statistics = statistics;

  }

  getTrace(): EnableDisable {
    return this.trace;

  }

  setTrace(trace: EnableDisable): void {
    this.trace = trace;

  }
}
