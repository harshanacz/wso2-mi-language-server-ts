// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/TypeProcessor.java by the java2ts converter (see tools/java2ts).

export interface TypeProcessor {
  processType(element: XSElementDeclaration, elementStructure: XSParticle, node: ObjectNode, id: string, addTitle: boolean): void;

  processRootType(element: XSElementDeclaration, node: ObjectNode, id: string, addTitle: boolean): void;
}
