// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/SchemaVisitor.java by the java2ts converter (see tools/java2ts).
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";

export interface SchemaVisitor {
  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void;
}
