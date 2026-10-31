// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/SequenceTemplateVisitor.java by the java2ts converter (see tools/java2ts).
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { Params } from "../../../tryout/pojo/Params.js";
import { Property } from "../../../tryout/pojo/Property.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { SchemaVisitorFactory } from "./SchemaVisitorFactory.js";
import { Template } from "../../../../../syntaxTree/pojo/template/Template.js";

export class SequenceTemplateVisitor {
  static readonly __fields: string[] = ["projectPath"];

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    if (node instanceof Template) {
      this.visitTemplate(node, info, request);
    }
  }

  visitTemplate(node: Template, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
          this.populateFunctionParams(node, info);
          let sequence = node.getSequence();
          if (sequence != null) {
              let visitor = SchemaVisitorFactory.getSchemaVisitor(sequence, this.projectPath);
              if (visitor != null) {
                  visitor.visit(sequence, info, request);
              }
          }
  }

  populateFunctionParams(node: Template, info: MediatorTryoutInfo): void {
    let parameters = node.getParameter();
    if (parameters != null) {
        let params = new Params();
        for (let parameter of parameters) {
            let name = parameter.getName();
            let value = parameter.getDefaultValue();
            params.addFunctionParam(new Property(name, value));
        }
        info.setInputParams(params);
        info.setOutputParams(params.deepCopy());
    }

  }
}
