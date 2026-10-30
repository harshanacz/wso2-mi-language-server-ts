import { CharStream, CommonTokenStream, DefaultErrorStrategy } from "antlr4ng";
import { ExpressionLexer } from "./generated/ExpressionLexer.js";
import { ExpressionParser } from "./generated/ExpressionParser.js";
import { SyntaxErrorListener } from "./syntaxErrorListener.js";
import { SemanticExpressionValidator } from "./semanticExpressionValidator.js";
import type { ExpressionError, ExpressionParam, ExpressionValidationResponse } from "./types.js";

/** Port of ExpressionValidator.validate(): syntax check first, semantic check only if syntax is clean. */
export function validateExpression(expression: string): ExpressionError[] {
  const lexer = new ExpressionLexer(CharStream.fromString(expression));
  lexer.removeErrorListeners();
  const tokens = new CommonTokenStream(lexer);
  const parser = new ExpressionParser(tokens);
  parser.errorHandler = new DefaultErrorStrategy();
  parser.removeErrorListeners();
  const listener = new SyntaxErrorListener();
  parser.addErrorListener(listener);

  const tree = parser.expression();

  if (listener.hasErrors()) {
    return listener.getErrors().map((e) => ({ ...e, expression }));
  }
  const semantic = new SemanticExpressionValidator();
  semantic.visit(tree);
  return semantic.getErrors().map((e) => ({ ...e, expression }));
}

/**
 * Handler for `synapse/expressionValidation`. Same behaviour as
 * SynapseLanguageService.expressionValidation(): strips a `${ ... }` wrapper and
 * reports `isValid = errors.isEmpty()` (warnings count as errors, like Java).
 */
export function expressionValidation(param: ExpressionParam): ExpressionValidationResponse {
  let expression = param.expression ?? "";
  if (expression.startsWith("${") && expression.endsWith("}")) {
    expression = expression.substring(2, expression.length - 1);
  }
  const errors = validateExpression(expression);
  return {
    isValid: errors.length === 0,
    errors: errors.map((e) => ({
      expression: e.expression,
      line: e.line,
      charPositionInLine: e.charPositionInLine,
      message: e.message,
      offendingSymbol: String(e.offendingSymbol),
      warning: e.warning,
    })),
  };
}
