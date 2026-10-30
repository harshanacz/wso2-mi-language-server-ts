// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/TemplateDebugInfo.java by the java2ts converter (see tools/java2ts).
import { DebugInfo } from "./DebugInfo.js";
import { JsonElement } from "../../../gson.js";
import { JsonObject } from "../../../gson.js";

export class TemplateDebugInfo extends DebugInfo {
  static readonly __fields: string[] = ["templateKey"];

  templateKey?: string;

  setTemplateKey(templateKey: string): void {
    this.templateKey = templateKey;

  }

  getTemplateKey(): string {
    return this.templateKey;

  }

  toJson(): JsonElement {
    let rootNode = new JsonObject();
    let template = new JsonObject();
    template.addProperty("template-key", this.templateKey);
    template.addProperty("mediator-position", this.mediatorPosition);
    rootNode.add("template", template);

    rootNode.addProperty("mediation-component", "template");

    return rootNode;

  }

  toString(): string {
    return "TemplateDebugInfo{" +
            "templateKey='" + this.templateKey + '\'' +
            ", mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
