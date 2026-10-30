// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/JsonSchemaObjectNode.java by the java2ts converter (see tools/java2ts).
import { isEmpty, StringUtils } from "../../../syntaxTree/javaCompat.js";
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { Utils } from "./Utils.js";

export class JsonSchemaObjectNode extends JsonSchemaNode {
  static readonly __fields: string[] = ["properties", "required"];

  properties?: ObjectNode;

  required?: ArrayNode;

  constructor(id: string);
  constructor(node: ObjectNode, id: string, name: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        const [id] = args;


                super(id, Utils.OBJECT);
                this.properties = JsonNodeFactory.instance.objectNode();
                this.required = JsonNodeFactory.instance.arrayNode();
                this.node.set(Utils.PROPERTIES, this.properties);

        break;
      }
      case 3: {
        const [node, id, name] = args;


                super(node, id, Utils.OBJECT, name);
                this.properties = JsonNodeFactory.instance.objectNode();
                this.required = JsonNodeFactory.instance.arrayNode();
                this.node.set(Utils.PROPERTIES, this.properties);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  update(addTitle: boolean): void {
    if (!isEmpty(this.required)) {
        this.node.set(Utils.REQUIRED, this.required);
    }
    if (addTitle && StringUtils.isNotEmpty(this.name)) {
        this.node.set(Utils.TITLE, this.name);
    }

  }

  addProperty(name: string, property: ObjectNode): void {
    this.properties.set(name, property);

  }

  addRequiredElement(itemName: string): void {
    this.required.push(itemName);

  }
}
