// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/JsonSchemaNode.java by the java2ts converter (see tools/java2ts).
import { JsonNodeFactory, ObjectNode, ArrayNode, JsonNode, ObjectMapper } from "../../jackson.js";
import { XSModelGroup, XSComplexTypeDefinition, XSSimpleTypeDefinition, XSElementDeclaration, XSParticle, XSTerm, XSAttributeUse, XSAttributeDeclaration, XSConstants, XSModel, XSNamedMap, XSWildcard, XMLSchemaLoader } from "../../host/xs.js";
import { StringUtils } from "../../../syntaxTree/javaCompat.js";
import { Utils } from "./Utils.js";

export class JsonSchemaNode {
  static readonly __fields: string[] = ["name", "node", "id"];

  name?: string;

  node?: ObjectNode;

  id?: string;

  constructor();
  constructor(node: ObjectNode);
  constructor(id: string);
  constructor(node: ObjectNode, id: string);
  constructor(id: string, type: string);
  constructor(node: ObjectNode, id: string, type: string, name: string);
  constructor(...args: any[]) {
    let node: any, id: any = null, type: any = null, name: any = null;
    const objectNode = () => JsonNodeFactory.instance.objectNode();
    switch (args.length) {
      case 0: node = objectNode(); break;
      case 1:
        if (typeof args[0] === 'string') { node = objectNode(); id = args[0]; } else { node = args[0]; }
        break;
      case 2:
        if (typeof args[0] === 'string') { node = objectNode(); id = args[0]; type = args[1]; }
        else { node = args[0]; id = args[1]; }
        break;
      default: [node, id, type, name] = args;
    }
    this.id = id;
    this.name = name;
    this.node = node;
    this.put(Utils.ID, id);
    this.put(Utils.TYPE, type);
  }


  getId(): string {
    return this.id;

  }

  setType(type: string): void {
    this.node.set(Utils.TYPE, type);

  }

  getNode(): ObjectNode {
    return this.node;

  }

  update(addTitle: boolean): void {
    if (addTitle && StringUtils.isNotEmpty(this.name)) {
        this.node.set(Utils.TITLE, this.name);
    }

  }

  set(key: string, value: ObjectNode): void;
  set(key: string, value: ArrayNode): void;
  set(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (args[1] instanceof ObjectNode) {
          const [key, value] = args;


                  this.node.set(key, value);

        } else if (args[1] instanceof ArrayNode) {
          const [key, value] = args;


                  this.node.set(key, value);

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  put(key: string, value: string): void {
    if (value != null) {
        this.node.set(key, value);
    }

  }
}
