// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/JsonSchemaElementValueNode.java by the java2ts converter (see tools/java2ts).
import { XSModelGroup, XSComplexTypeDefinition, XSSimpleTypeDefinition, XSElementDeclaration, XSParticle, XSTerm, XSAttributeUse, XSAttributeDeclaration, XSConstants, XSModel, XSNamedMap, XSWildcard, XMLSchemaLoader } from "../../host/xs.js";
import { JsonSchemaNode } from "./JsonSchemaNode.js";
import { Utils } from "./Utils.js";

export class JsonSchemaElementValueNode extends JsonSchemaNode {
  static readonly __fields: string[] = [];

  constructor(id: string, type: string) {
    super(id + Utils.ID_VALUE_SEPERATOR + Utils.ELEMENT_VALUE, type);

  }
}
