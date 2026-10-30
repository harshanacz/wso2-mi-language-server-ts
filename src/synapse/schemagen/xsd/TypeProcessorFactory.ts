// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/schemagen/xsd/TypeProcessorFactory.java by the java2ts converter (see tools/java2ts).
import { ComplexTypeProcessor } from "./ComplexTypeProcessor.js";
import { SimpleTypeProcessor } from "./SimpleTypeProcessor.js";
import { TypeProcessor } from "./TypeProcessor.js";

export class TypeProcessorFactory {
  static readonly __fields: string[] = [];

  static getTypeProcessor(element: XSElementDeclaration): TypeProcessor {
    if (element.getTypeDefinition() instanceof XSComplexTypeDefinition) {
        return new ComplexTypeProcessor();
    } else {
        return new SimpleTypeProcessor();
    }

  }
}
