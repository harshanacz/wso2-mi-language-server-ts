import type { RecognitionException } from "antlr4ng";

/**
 * Port of org.eclipse.lemminx.customservice.synapse.expression.pojo.ExpressionError
 */
export interface ExpressionError {
  expression?: string;
  /** 1-based line */
  line: number;
  /** 0-based column */
  charPositionInLine: number;
  message: string;
  offendingSymbol: unknown;
  exception?: RecognitionException | null;
  warning: boolean;
}

/** Wire format of the `synapse/expressionValidation` response (matches the Java server). */
export interface ExpressionValidationErrorDto {
  expression?: string;
  line: number;
  charPositionInLine: number;
  message: string;
  offendingSymbol: string;
  warning: boolean;
}

export interface ExpressionValidationResponse {
  isValid: boolean;
  errors: ExpressionValidationErrorDto[];
}

/** Request params of `synapse/expressionValidation`. */
export interface ExpressionParam {
  expression: string;
  offset?: number;
  documentUri?: string;
  position?: { line: number; character: number };
}

export interface FunctionSignature {
  name: string;
  paramTypes: readonly string[];
  arity: number;
  description: string;
}
