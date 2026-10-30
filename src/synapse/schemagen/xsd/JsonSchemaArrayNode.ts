// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/JsonSchemaArrayNode.java by the java2ts converter (see tools/java2ts).
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { Utils } from "./Utils.js";

export class JsonSchemaArrayNode extends JsonSchemaNode {
  static readonly __fields: string[] = ["items"];

  items?: ArrayNode;

  constructor(id: string, node: ObjectNode) {
    super(node, id + Utils.ARRAY_FIRST_ELEMENT_IDENTIFIER);
    this.items = JsonNodeFactory.instance.arrayNode();

    node.set(Utils.ID, id);
    node.set(Utils.TYPE, Utils.ARRAY);
    node.set(Utils.ITEMS, this.items);

  }

  addItem(item: JsonSchemaNode): void {
    this.items.push(item.getNode());

  }
}
