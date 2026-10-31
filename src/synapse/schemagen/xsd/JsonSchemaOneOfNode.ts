// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/JsonSchemaOneOfNode.java by the java2ts converter (see tools/java2ts).
import { JsonNodeFactory, ObjectNode, ArrayNode, JsonNode, ObjectMapper } from "../../jackson.js";
import { XSModelGroup, XSComplexTypeDefinition, XSSimpleTypeDefinition, XSElementDeclaration, XSParticle, XSTerm, XSAttributeUse, XSAttributeDeclaration, XSConstants, XSModel, XSNamedMap, XSWildcard, XMLSchemaLoader } from "../../host/xs.js";
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { Utils } from "./Utils.js";

export class JsonSchemaOneOfNode extends JsonSchemaNode {
  static readonly __fields: string[] = [];

  constructor();
  constructor(node: ObjectNode, name: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {
        super();
        this.node = JsonNodeFactory.instance.objectNode();

        break;
      }
      case 2: {
        const [node, name] = args;


                super(node);
                this.name = name;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  setOneOf(oneOf: ArrayNode): void {
    this.node.set(Utils.ONE_OF, oneOf);

  }
}
