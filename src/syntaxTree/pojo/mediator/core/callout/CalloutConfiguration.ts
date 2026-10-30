// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/core/callout/CalloutConfiguration.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../../stNode.js";

export class CalloutConfiguration extends STNode {
  axis2Xml?: string;

  repository?: string;

  getAxis2Xml(): string {
    return this.axis2Xml;

  }

  setAxis2Xml(axis2Xml: string): void {
    this.axis2Xml = axis2Xml;

  }

  getRepository(): string {
    return this.repository;

  }

  setRepository(repository: string): void {
    this.repository = repository;

  }
}
