
import { AbstractParseTreeVisitor } from "antlr4ng";


import { ExpressionContext } from "./ExpressionParser.js";
import { ConditionalExpressionContext } from "./ExpressionParser.js";
import { ComparisonExpressionContext } from "./ExpressionParser.js";
import { LogicalExpressionContext } from "./ExpressionParser.js";
import { ArithmeticExpressionContext } from "./ExpressionParser.js";
import { TermContext } from "./ExpressionParser.js";
import { FactorContext } from "./ExpressionParser.js";
import { KeywordsContext } from "./ExpressionParser.js";
import { ConfigAccessContext } from "./ExpressionParser.js";
import { HeaderAccessContext } from "./ExpressionParser.js";
import { ParameterAccessContext } from "./ExpressionParser.js";
import { PropertyAccessContext } from "./ExpressionParser.js";
import { PropertyNameContext } from "./ExpressionParser.js";
import { LiteralContext } from "./ExpressionParser.js";
import { JsonPathExpressionContext } from "./ExpressionParser.js";
import { VariableAccessContext } from "./ExpressionParser.js";
import { ArrayLiteralContext } from "./ExpressionParser.js";
import { PayloadAccessContext } from "./ExpressionParser.js";
import { ArrayIndexContext } from "./ExpressionParser.js";
import { MultipleArrayIndicesContext } from "./ExpressionParser.js";
import { SliceArrayIndexContext } from "./ExpressionParser.js";
import { SignedExpressionsContext } from "./ExpressionParser.js";
import { FilterExpressionContext } from "./ExpressionParser.js";
import { FilterComponentContext } from "./ExpressionParser.js";
import { StringOrOperatorContext } from "./ExpressionParser.js";
import { FunctionCallContext } from "./ExpressionParser.js";
import { FunctionCallSuffixContext } from "./ExpressionParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ExpressionParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class ExpressionParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `ExpressionParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.conditionalExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConditionalExpression?: (ctx: ConditionalExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.comparisonExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComparisonExpression?: (ctx: ComparisonExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.logicalExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalExpression?: (ctx: LogicalExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.arithmeticExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArithmeticExpression?: (ctx: ArithmeticExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.term`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerm?: (ctx: TermContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.factor`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFactor?: (ctx: FactorContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.keywords`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitKeywords?: (ctx: KeywordsContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.configAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConfigAccess?: (ctx: ConfigAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.headerAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHeaderAccess?: (ctx: HeaderAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.parameterAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameterAccess?: (ctx: ParameterAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.propertyAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyAccess?: (ctx: PropertyAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.propertyName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyName?: (ctx: PropertyNameContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral?: (ctx: LiteralContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.jsonPathExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitJsonPathExpression?: (ctx: JsonPathExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.variableAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableAccess?: (ctx: VariableAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.arrayLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayLiteral?: (ctx: ArrayLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.payloadAccess`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPayloadAccess?: (ctx: PayloadAccessContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.arrayIndex`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayIndex?: (ctx: ArrayIndexContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.multipleArrayIndices`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultipleArrayIndices?: (ctx: MultipleArrayIndicesContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.sliceArrayIndex`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSliceArrayIndex?: (ctx: SliceArrayIndexContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.signedExpressions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSignedExpressions?: (ctx: SignedExpressionsContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.filterExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilterExpression?: (ctx: FilterExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.filterComponent`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilterComponent?: (ctx: FilterComponentContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.stringOrOperator`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringOrOperator?: (ctx: StringOrOperatorContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.functionCall`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionCall?: (ctx: FunctionCallContext) => Result;
    /**
     * Visit a parse tree produced by `ExpressionParser.functionCallSuffix`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionCallSuffix?: (ctx: FunctionCallSuffixContext) => Result;
}

