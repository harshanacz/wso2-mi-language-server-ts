// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/template/Template.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../javaCompat.js";
import { NamedEndpoint } from "../endpoint/NamedEndpoint.js";
import { NamedSequence } from "../NamedSequence.js";
import { STNode } from "../../stNode.js";
import { TemplateArtifactType } from "./TemplateArtifactType.js";
import { TemplateParameter } from "./TemplateParameter.js";

export class Template extends STNode {
  description?: STNode;

  parameter?: TemplateParameter[];

  endpoint?: NamedEndpoint;

  sequence?: NamedSequence;

  name?: string;

  onError?: string;

  type?: TemplateArtifactType;

  getDescription(): STNode {
    return this.description;

  }

  setDescription(description: STNode): void {
    this.description = description;

  }

  getParameter(): TemplateParameter[];
  getParameter(key: string): TemplateParameter;
  getParameter(...args: any[]): any {
    switch (args.length) {
      case 0: {
        return this.parameter;

        break;
      }
      case 1: {
        const [key] = args;


                if (this.parameter != null) {
                    for (let param of this.parameter) {
                        if (equals(param.getName(), key)) {
                            return param;
                        }
                    }
                }
                return null;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  hasParameter(key: string): boolean {
    if (this.parameter != null) {
        for (let param of this.parameter) {
            if (equals(param.getName(), key)) {
                return true;
            }
        }
    }
    return false;

  }

  setParameter(parameter: TemplateParameter[]): void {
    this.parameter = parameter;

  }

  getEndpoint(): NamedEndpoint {
    return this.endpoint;

  }

  setEndpoint(endpoint: NamedEndpoint): void {
    this.endpoint = endpoint;

  }

  getSequence(): NamedSequence {
    return this.sequence;

  }

  setSequence(sequence: NamedSequence): void {
    this.sequence = sequence;

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

  getType(): TemplateArtifactType {
    return this.type;

  }

  setType(type: TemplateArtifactType): void {
    this.type = type;

  }
}
