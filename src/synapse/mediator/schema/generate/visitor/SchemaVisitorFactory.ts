// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/SchemaVisitorFactory.java by the java2ts converter (see tools/java2ts).
import { equals, Logger } from "../../../../../syntaxTree/javaCompat.js";
import { APIVisitor } from "./APIVisitor.js";
import { Constant } from "../../../../../syntaxTree/constant.js";
import { InboundEndpointVisitor } from "./InboundEndpointVisitor.js";
import { ProxyVisitor } from "./ProxyVisitor.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { SchemaVisitor } from "./SchemaVisitor.js";
import { SequenceTemplateVisitor } from "./SequenceTemplateVisitor.js";
import { SequenceVisitor } from "./SequenceVisitor.js";
import { TaskSchemaVisitor } from "./TaskSchemaVisitor.js";
import { Template } from "../../../../../syntaxTree/pojo/template/Template.js";

export class SchemaVisitorFactory {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("SchemaVisitorFactory");

  static getSchemaVisitor(node: STNode, projectPath: string): SchemaVisitor {
    let nodeType = node.getTag();
    let visitor = null;
    if (equals(Constant.API, nodeType)) {
        visitor = new APIVisitor(projectPath);
    } else if (equals(Constant.SEQUENCE, nodeType)) {
        visitor = new SequenceVisitor(projectPath);
    } else if (equals(Constant.TEMPLATE, nodeType) && ((node as Template)).getSequence() != null) {
        visitor = new SequenceTemplateVisitor(projectPath);
    } else if (equals(Constant.PROXY, nodeType)) {
        visitor = new ProxyVisitor(projectPath);
    } else if (equals(Constant.INBOUND_ENDPOINT, nodeType)) {
        visitor = new InboundEndpointVisitor(projectPath);
    } else if (equals(Constant.TASK, nodeType)) {
        visitor = new TaskSchemaVisitor(projectPath);
    } else {
        SchemaVisitorFactory.LOGGER.warning("No visitor found for the node type: " + nodeType);
    }
    return visitor;

  }
}
