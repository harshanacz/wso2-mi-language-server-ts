import { AbstractParseTreeVisitor, TerminalNode, type Token } from "antlr4ng";
import { ExpressionLexer } from "./generated/ExpressionLexer.js";
import {
  ArithmeticExpressionContext,
  ArrayIndexContext,
  ExpressionContext,
  FactorContext,
  FilterComponentContext,
  FilterExpressionContext,
  FunctionCallContext,
  FunctionCallSuffixContext,
  TermContext,
} from "./generated/ExpressionParser.js";
import type { ExpressionParserVisitor } from "./generated/ExpressionParserVisitor.js";
import { FunctionRegistry } from "./functionRegistry.js";
import type { ExpressionError, FunctionSignature } from "./types.js";

/**
 * Port of SemanticExpressionValidator.java. Runs after parsing succeeds and checks
 * function arity, literal argument types, arithmetic operand types, division by zero,
 * incomplete filter expressions and non-integer array indices.
 */
export class SemanticExpressionValidator
  extends AbstractParseTreeVisitor<void>
  implements ExpressionParserVisitor<void>
{
  private readonly errors: ExpressionError[] = [];
  private readonly registry = FunctionRegistry.getInstance();

  getErrors(): ExpressionError[] {
    return this.errors;
  }

  protected override defaultResult(): void {
    return undefined;
  }

  private addError(token: Token, message: string, warning = false): void {
    this.errors.push({
      line: token.line,
      charPositionInLine: token.column,
      message,
      offendingSymbol: token,
      exception: null,
      warning,
    });
  }

  // ===== Function calls =====

  visitFunctionCall = (ctx: FunctionCallContext): void => {
    const funcToken = ctx.FUNCTIONS().symbol;
    const funcName = funcToken.text ?? "";
    const args = ctx.expression();
    const argCount = args.length;

    if (this.registry.hasFunction(funcName)) {
      const overloads = this.registry.getOverloads(funcName);
      if (!overloads.some((s) => s.arity === argCount)) {
        this.addArityError(funcName, argCount, funcToken);
      } else {
        const same = overloads.filter((s) => s.arity === argCount);
        if (same.length === 1) {
          this.validateArgumentTypes(funcName, same[0], args);
        } else if (same.length > 1) {
          this.validateArgumentTypesMultiOverload(funcName, same, args);
        }
      }

      const suffix = ctx.functionCallSuffix();
      if (suffix && suffix.SECONDARY_FUNCTIONS()) {
        this.validateSecondaryFunction(suffix);
      }
    }
    return this.visitChildren(ctx) ?? undefined;
  };

  /** Arity-only validation for chained calls like `xpath("//foo").property("name")`. */
  private validateSecondaryFunction(ctx: FunctionCallSuffixContext): void {
    const funcToken = ctx.SECONDARY_FUNCTIONS()!.symbol;
    const funcName = funcToken.text ?? "";
    const argCount = ctx.expression().length;
    if (this.registry.hasFunction(funcName)) {
      const overloads = this.registry.getOverloads(funcName);
      if (!overloads.some((s) => s.arity === argCount)) {
        this.addArityError(funcName, argCount, funcToken);
      }
    }
  }

  private addArityError(funcName: string, argCount: number, funcToken: Token): void {
    const min = this.registry.getMinArity(funcName);
    const max = this.registry.getMaxArity(funcName);
    const expected = min === max ? String(min) : `${min}-${max}`;
    const usage = this.registry.getUsageString(funcName);
    this.addError(
      funcToken,
      `Function '${funcName}' expects ${expected} argument(s) but received ${argCount}. Usage: ${usage}`,
    );
  }

  private validateArgumentTypes(funcName: string, sig: FunctionSignature, args: ExpressionContext[]): void {
    const expectedTypes = sig.paramTypes;
    for (let i = 0; i < args.length && i < expectedTypes.length; i++) {
      const expected = expectedTypes[i];
      if (expected === "any") continue;
      const arg = args[i];
      const literalType = this.getLiteralType(arg);
      if (literalType === null) continue;
      if (!this.isTypeCompatible(expected, literalType)) {
        this.addError(
          arg.start!,
          `Function '${funcName}' expects argument ${i + 1} to be ${expected} but received ${literalType} literal '${arg.getText()}'.`,
        );
      }
    }
  }

  /** Accept the call if ANY same-arity overload is type-compatible with the literal args. */
  private validateArgumentTypesMultiOverload(
    funcName: string,
    overloads: FunctionSignature[],
    args: ExpressionContext[],
  ): void {
    const literalTypes = args.map((a) => this.getLiteralType(a));
    if (literalTypes.every((t) => t === null)) return;
    if (overloads.some((sig) => this.isOverloadCompatible(sig, literalTypes))) return;
    this.validateArgumentTypes(funcName, overloads[0], args);
  }

  private isOverloadCompatible(sig: FunctionSignature, literalTypes: Array<string | null>): boolean {
    for (let i = 0; i < literalTypes.length && i < sig.paramTypes.length; i++) {
      const lit = literalTypes[i];
      if (lit === null) continue;
      if (sig.paramTypes[i] === "any") continue;
      if (!this.isTypeCompatible(sig.paramTypes[i], lit)) return false;
    }
    return true;
  }

  // ===== Arithmetic =====

  visitArithmeticExpression = (ctx: ArithmeticExpressionContext): void => {
    const terms = ctx.term();
    for (let i = 1; i < terms.length; i++) {
      const op = this.findOperatorBetween(ctx, terms[i - 1], terms[i]);
      if (!op) continue;
      this.checkArithmeticOperandTypes(op, terms[i - 1], terms[i]);
    }
    return this.visitChildren(ctx) ?? undefined;
  };

  visitTerm = (ctx: TermContext): void => {
    const factors = ctx.factor();
    for (let i = 1; i < factors.length; i++) {
      const op = this.findOperatorBetween(ctx, factors[i - 1], factors[i]);
      if (op && (op.type === ExpressionLexer.DIV || op.type === ExpressionLexer.MODULO)) {
        const divisor = factors[i];
        if (this.isLiteralZero(divisor)) {
          const name = op.type === ExpressionLexer.DIV ? "Division" : "Modulo";
          this.addError(divisor.start!, `${name} by zero: divisor is literal 0.`, true);
        }
      }
      if (op) {
        this.checkMultiplicativeOperandTypes(op, factors[i - 1], factors[i]);
      }
    }
    return this.visitChildren(ctx) ?? undefined;
  };

  private findOperatorBetween(
    parent: ArithmeticExpressionContext | TermContext,
    left: { stop: Token | null },
    right: { start: Token | null },
  ): Token | null {
    const leftEnd = left.stop!.tokenIndex;
    const rightStart = right.start!.tokenIndex;
    for (let i = 0; i < parent.getChildCount(); i++) {
      const child = parent.getChild(i);
      if (child instanceof TerminalNode) {
        const t = child.symbol;
        if (t.tokenIndex > leftEnd && t.tokenIndex < rightStart) return t;
      }
    }
    return null;
  }

  private isLiteralZero(factor: FactorContext): boolean {
    const lit = factor.literal();
    const num = lit?.NUMBER();
    if (!num) return false;
    const value = Number(num.getText());
    return !Number.isNaN(value) && value === 0;
  }

  private checkArithmeticOperandTypes(op: Token, left: TermContext, right: TermContext): void {
    const isMinus = op.type === ExpressionLexer.MINUS;
    const sym = isMinus ? "-" : "+";
    const lt = this.getTermLiteralType(left);
    const rt = this.getTermLiteralType(right);
    if (lt !== null && !this.isValidAdditiveOperand(lt, isMinus)) {
      this.addArithmeticTypeWarning(sym, lt, left.start!);
    }
    if (rt !== null && !this.isValidAdditiveOperand(rt, isMinus)) {
      this.addArithmeticTypeWarning(sym, rt, right.start!);
    }
  }

  private checkMultiplicativeOperandTypes(op: Token, left: FactorContext, right: FactorContext): void {
    const sym = op.text ?? "";
    const lt = this.getFactorLiteralType(left);
    const rt = this.getFactorLiteralType(right);
    if (lt !== null && !this.isNumericType(lt)) this.addArithmeticTypeWarning(sym, lt, left.start!);
    if (rt !== null && !this.isNumericType(rt)) this.addArithmeticTypeWarning(sym, rt, right.start!);
  }

  private isValidAdditiveOperand(type: string, isMinus: boolean): boolean {
    if (isMinus) return this.isNumericType(type);
    return this.isNumericType(type) || type === "string";
  }

  private isNumericType(type: string): boolean {
    return type === "number" || type === "integer";
  }

  private addArithmeticTypeWarning(operator: string, literalType: string, token: Token): void {
    this.addError(token, `Arithmetic operator '${operator}' cannot be applied to ${literalType} literal.`, true);
  }

  // ===== Filter expressions =====

  visitFilterExpression = (ctx: FilterExpressionContext): void => {
    const components = ctx.filterComponent();
    if (components.length < 2) {
      return this.visitChildren(ctx) ?? undefined;
    }

    let lastOperatorIndex = -1;
    let lastWasComparison = false;
    let lastWasLogical = false;

    for (let i = 0; i < components.length; i++) {
      const comp = components[i];
      const opType = this.getFilterOperatorType(comp);
      if (opType === 1) {
        if (lastWasComparison && lastOperatorIndex === i - 1) {
          this.addFilterWarning(
            comp,
            "Possible incomplete filter expression: consecutive comparison operators without an operand between them.",
          );
        }
        lastWasComparison = true;
        lastWasLogical = false;
        lastOperatorIndex = i;
      } else if (opType === 2) {
        if (lastWasComparison && lastOperatorIndex === i - 1) {
          this.addFilterWarning(
            comp,
            "Possible incomplete filter expression: logical operator immediately after comparison operator. Missing operand?",
          );
        }
        if (lastWasLogical && lastOperatorIndex === i - 1) {
          this.addFilterWarning(
            comp,
            "Possible incomplete filter expression: consecutive logical operators without an operand between them.",
          );
        }
        lastWasComparison = false;
        lastWasLogical = true;
        lastOperatorIndex = i;
      } else {
        lastWasComparison = false;
        lastWasLogical = false;
      }
    }

    if (lastOperatorIndex === components.length - 1) {
      const last = components[lastOperatorIndex];
      if (lastWasComparison) {
        this.addFilterWarning(
          last,
          "Possible incomplete filter expression: ends with comparison operator without a right-hand operand.",
        );
      } else if (lastWasLogical) {
        this.addFilterWarning(
          last,
          "Possible incomplete filter expression: ends with logical operator without a right-hand operand.",
        );
      }
    }
    return this.visitChildren(ctx) ?? undefined;
  };

  /** 0 = not an operator, 1 = comparison, 2 = logical binary (AND/OR). */
  private getFilterOperatorType(comp: FilterComponentContext): number {
    const soo = comp.stringOrOperator();
    if (!soo) return 0;
    if (soo.getChildCount() !== 1 || !(soo.getChild(0) instanceof TerminalNode)) return 0;
    switch ((soo.getChild(0) as TerminalNode).symbol.type) {
      case ExpressionLexer.GT:
      case ExpressionLexer.LT:
      case ExpressionLexer.GTE:
      case ExpressionLexer.LTE:
      case ExpressionLexer.EQ:
      case ExpressionLexer.NEQ:
        return 1;
      case ExpressionLexer.AND:
      case ExpressionLexer.OR:
        return 2;
      default:
        return 0;
    }
  }

  private addFilterWarning(comp: FilterComponentContext, message: string): void {
    this.addError(comp.start!, message, true);
  }

  // ===== Array index =====

  visitArrayIndex = (ctx: ArrayIndexContext): void => {
    const num = ctx.NUMBER();
    if (num) {
      const text = num.getText();
      if (text.includes(".")) {
        this.addError(
          num.symbol,
          `Array index should be an integer, but found floating-point number '${text}'.`,
          true,
        );
      }
    }
    return this.visitChildren(ctx) ?? undefined;
  };

  // ===== Literal helpers =====

  private getTermLiteralType(term: TermContext): string | null {
    const factors = term.factor();
    return factors.length === 1 ? this.getFactorLiteralType(factors[0]) : null;
  }

  private getFactorLiteralType(factor: FactorContext): string | null {
    const lit = factor.literal();
    if (!lit) return null;
    if (lit.STRING_LITERAL()) return "string";
    if (lit.NUMBER()) return "number";
    if (lit.BOOLEAN_LITERAL()) return "boolean";
    if (lit.arrayLiteral()) return "array";
    if (lit.NULL_LITERAL()) return "null";
    return null;
  }

  /** Literal type of an expression, or null if it's not a plain literal. */
  private getLiteralType(expr: ExpressionContext | null): string | null {
    if (!expr) return null;
    const comp = expr.comparisonExpression();
    if (!comp) return null;
    const logicals = comp.logicalExpression();
    if (logicals.length !== 1) return null;
    const arith = logicals[0].arithmeticExpression();
    if (!arith) return null;
    const terms = arith.term();
    if (terms.length !== 1) return null;
    const factors = terms[0].factor();
    if (factors.length !== 1) return null;
    return this.getFactorLiteralType(factors[0]);
  }

  private isTypeCompatible(expected: string, actual: string): boolean {
    if (expected === actual) return true;
    return this.isNumericType(expected) && this.isNumericType(actual);
  }
}
