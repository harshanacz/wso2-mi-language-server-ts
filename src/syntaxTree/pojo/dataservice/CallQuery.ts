// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/CallQuery.java by the java2ts converter (see tools/java2ts).
import { CallQueryWithParam } from "./CallQueryWithParam.js";
import { STNode } from "../../stNode.js";

export class CallQuery extends STNode {
  static readonly __fields: string[] = ["withParam", "href", "requiredRoles"];

  withParam?: CallQueryWithParam[];

  href?: string;

  requiredRoles?: string;

  getWithParam(): CallQueryWithParam[] {
    return this.withParam;

  }

  setWithParam(withParam: CallQueryWithParam[]): void {
    this.withParam = withParam;

  }

  getHref(): string {
    return this.href;

  }

  setHref(href: string): void {
    this.href = href;

  }

  getRequiredRoles(): string {
    return this.requiredRoles;

  }

  setRequiredRoles(requiredRoles: string): void {
    this.requiredRoles = requiredRoles;

  }
}
