
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ExpressionParserVisitor } from "./ExpressionParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ExpressionParser extends antlr.Parser {
    public static readonly JSONPATH_PARAMS = 1;
    public static readonly JSONPATH_FUNCTIONS = 2;
    public static readonly VAR = 3;
    public static readonly PAYLOAD = 4;
    public static readonly HEADERS = 5;
    public static readonly CONFIG = 6;
    public static readonly PARAMS = 7;
    public static readonly PROPERTY = 8;
    public static readonly AND = 9;
    public static readonly OR = 10;
    public static readonly NOT = 11;
    public static readonly DOUBLE_DOT = 12;
    public static readonly ASTERISK = 13;
    public static readonly PLUS = 14;
    public static readonly MINUS = 15;
    public static readonly DIV = 16;
    public static readonly MODULO = 17;
    public static readonly EQ = 18;
    public static readonly NEQ = 19;
    public static readonly GT = 20;
    public static readonly LT = 21;
    public static readonly GTE = 22;
    public static readonly LTE = 23;
    public static readonly LPAREN = 24;
    public static readonly RPAREN = 25;
    public static readonly LBRACKET = 26;
    public static readonly RBRACKET = 27;
    public static readonly DOT = 28;
    public static readonly COMMA = 29;
    public static readonly COLON = 30;
    public static readonly QUOTE = 31;
    public static readonly BOOLEAN_LITERAL = 32;
    public static readonly NUMBER = 33;
    public static readonly PARAM_ACCESS = 34;
    public static readonly PROPERTY_ACCESS = 35;
    public static readonly FUNCTIONS = 36;
    public static readonly SECONDARY_FUNCTIONS = 37;
    public static readonly STRING_LITERAL = 38;
    public static readonly NULL_LITERAL = 39;
    public static readonly ID = 40;
    public static readonly QUESTION = 41;
    public static readonly AT = 42;
    public static readonly WS = 43;
    public static readonly INVALID = 44;
    public static readonly RULE_expression = 0;
    public static readonly RULE_conditionalExpression = 1;
    public static readonly RULE_comparisonExpression = 2;
    public static readonly RULE_logicalExpression = 3;
    public static readonly RULE_arithmeticExpression = 4;
    public static readonly RULE_term = 5;
    public static readonly RULE_factor = 6;
    public static readonly RULE_keywords = 7;
    public static readonly RULE_configAccess = 8;
    public static readonly RULE_headerAccess = 9;
    public static readonly RULE_parameterAccess = 10;
    public static readonly RULE_propertyAccess = 11;
    public static readonly RULE_propertyName = 12;
    public static readonly RULE_literal = 13;
    public static readonly RULE_jsonPathExpression = 14;
    public static readonly RULE_variableAccess = 15;
    public static readonly RULE_arrayLiteral = 16;
    public static readonly RULE_payloadAccess = 17;
    public static readonly RULE_arrayIndex = 18;
    public static readonly RULE_multipleArrayIndices = 19;
    public static readonly RULE_sliceArrayIndex = 20;
    public static readonly RULE_signedExpressions = 21;
    public static readonly RULE_filterExpression = 22;
    public static readonly RULE_filterComponent = 23;
    public static readonly RULE_stringOrOperator = 24;
    public static readonly RULE_functionCall = 25;
    public static readonly RULE_functionCallSuffix = 26;

    public static readonly literalNames = [
        null, null, null, "'vars'", null, "'headers'", "'configs'", "'params'", 
        null, null, null, "'!'", "'..'", "'*'", "'+'", "'-'", "'/'", "'%'", 
        "'=='", "'!='", "'>'", "'<'", "'>='", "'<='", "'('", "')'", "'['", 
        "']'", "'.'", "','", "':'", null, null, null, null, null, null, 
        "'property'", null, "'null'", null, "'?'", "'@'"
    ];

    public static readonly symbolicNames = [
        null, "JSONPATH_PARAMS", "JSONPATH_FUNCTIONS", "VAR", "PAYLOAD", 
        "HEADERS", "CONFIG", "PARAMS", "PROPERTY", "AND", "OR", "NOT", "DOUBLE_DOT", 
        "ASTERISK", "PLUS", "MINUS", "DIV", "MODULO", "EQ", "NEQ", "GT", 
        "LT", "GTE", "LTE", "LPAREN", "RPAREN", "LBRACKET", "RBRACKET", 
        "DOT", "COMMA", "COLON", "QUOTE", "BOOLEAN_LITERAL", "NUMBER", "PARAM_ACCESS", 
        "PROPERTY_ACCESS", "FUNCTIONS", "SECONDARY_FUNCTIONS", "STRING_LITERAL", 
        "NULL_LITERAL", "ID", "QUESTION", "AT", "WS", "INVALID"
    ];
    public static readonly ruleNames = [
        "expression", "conditionalExpression", "comparisonExpression", "logicalExpression", 
        "arithmeticExpression", "term", "factor", "keywords", "configAccess", 
        "headerAccess", "parameterAccess", "propertyAccess", "propertyName", 
        "literal", "jsonPathExpression", "variableAccess", "arrayLiteral", 
        "payloadAccess", "arrayIndex", "multipleArrayIndices", "sliceArrayIndex", 
        "signedExpressions", "filterExpression", "filterComponent", "stringOrOperator", 
        "functionCall", "functionCallSuffix",
    ];

    public get grammarFileName(): string { return "ExpressionParser.g4"; }
    public get literalNames(): (string | null)[] { return ExpressionParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return ExpressionParser.symbolicNames; }
    public get ruleNames(): string[] { return ExpressionParser.ruleNames; }
    public get serializedATN(): number[] { return ExpressionParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, ExpressionParser._ATN, ExpressionParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 0, ExpressionParser.RULE_expression);
        try {
            this.state = 57;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 54;
                this.comparisonExpression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 55;
                this.conditionalExpression();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 56;
                this.match(ExpressionParser.EOF);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditionalExpression(): ConditionalExpressionContext {
        let localContext = new ConditionalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 2, ExpressionParser.RULE_conditionalExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 59;
            this.comparisonExpression();
            this.state = 65;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 60;
                this.match(ExpressionParser.QUESTION);
                this.state = 61;
                this.expression();
                this.state = 62;
                this.match(ExpressionParser.COLON);
                this.state = 63;
                this.expression();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparisonExpression(): ComparisonExpressionContext {
        let localContext = new ComparisonExpressionContext(this.context, this.state);
        this.enterRule(localContext, 4, ExpressionParser.RULE_comparisonExpression);
        let _la: number;
        try {
            this.state = 79;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 67;
                this.logicalExpression();
                this.state = 72;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 16515072) !== 0)) {
                    {
                    {
                    this.state = 68;
                    _la = this.tokenStream.LA(1);
                    if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 16515072) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 69;
                    this.logicalExpression();
                    }
                    }
                    this.state = 74;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 75;
                this.logicalExpression();
                this.state = 76;
                _la = this.tokenStream.LA(1);
                if(!(_la === 18 || _la === 19)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 77;
                this.match(ExpressionParser.NULL_LITERAL);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public logicalExpression(): LogicalExpressionContext {
        let localContext = new LogicalExpressionContext(this.context, this.state);
        this.enterRule(localContext, 6, ExpressionParser.RULE_logicalExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.arithmeticExpression();
            this.state = 86;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ExpressionParser.AND:
                {
                this.state = 82;
                this.match(ExpressionParser.AND);
                this.state = 83;
                this.logicalExpression();
                }
                break;
            case ExpressionParser.OR:
                {
                this.state = 84;
                this.match(ExpressionParser.OR);
                this.state = 85;
                this.logicalExpression();
                }
                break;
            case ExpressionParser.EQ:
            case ExpressionParser.NEQ:
            case ExpressionParser.GT:
            case ExpressionParser.LT:
            case ExpressionParser.GTE:
            case ExpressionParser.LTE:
            case ExpressionParser.RPAREN:
            case ExpressionParser.RBRACKET:
            case ExpressionParser.COMMA:
            case ExpressionParser.COLON:
            case ExpressionParser.QUESTION:
                break;
            default:
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arithmeticExpression(): ArithmeticExpressionContext {
        let localContext = new ArithmeticExpressionContext(this.context, this.state);
        this.enterRule(localContext, 8, ExpressionParser.RULE_arithmeticExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 88;
            this.term();
            this.state = 93;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14 || _la === 15) {
                {
                {
                this.state = 89;
                _la = this.tokenStream.LA(1);
                if(!(_la === 14 || _la === 15)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 90;
                this.term();
                }
                }
                this.state = 95;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public term(): TermContext {
        let localContext = new TermContext(this.context, this.state);
        this.enterRule(localContext, 10, ExpressionParser.RULE_term);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.factor();
            this.state = 101;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 204800) !== 0)) {
                {
                {
                this.state = 97;
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 204800) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 98;
                this.factor();
                }
                }
                this.state = 103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public factor(): FactorContext {
        let localContext = new FactorContext(this.context, this.state);
        this.enterRule(localContext, 12, ExpressionParser.RULE_factor);
        try {
            this.state = 118;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ExpressionParser.LBRACKET:
            case ExpressionParser.BOOLEAN_LITERAL:
            case ExpressionParser.NUMBER:
            case ExpressionParser.STRING_LITERAL:
            case ExpressionParser.NULL_LITERAL:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 104;
                this.literal();
                }
                break;
            case ExpressionParser.FUNCTIONS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 105;
                this.functionCall();
                }
                break;
            case ExpressionParser.VAR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 106;
                this.variableAccess();
                }
                break;
            case ExpressionParser.PAYLOAD:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 107;
                this.payloadAccess();
                }
                break;
            case ExpressionParser.HEADERS:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 108;
                this.headerAccess();
                }
                break;
            case ExpressionParser.CONFIG:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 109;
                this.configAccess();
                }
                break;
            case ExpressionParser.PARAMS:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 110;
                this.parameterAccess();
                }
                break;
            case ExpressionParser.PROPERTY:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 111;
                this.propertyAccess();
                }
                break;
            case ExpressionParser.LPAREN:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 112;
                this.match(ExpressionParser.LPAREN);
                this.state = 113;
                this.expression();
                this.state = 114;
                this.match(ExpressionParser.RPAREN);
                }
                break;
            case ExpressionParser.NOT:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 116;
                this.match(ExpressionParser.NOT);
                this.state = 117;
                this.factor();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 14, ExpressionParser.RULE_keywords);
        try {
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 120;
                this.match(ExpressionParser.DOT);
                this.state = 121;
                this.match(ExpressionParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 122;
                this.match(ExpressionParser.DOT);
                this.state = 123;
                this.match(ExpressionParser.PAYLOAD);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 124;
                this.match(ExpressionParser.DOT);
                this.state = 125;
                this.match(ExpressionParser.HEADERS);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 126;
                this.match(ExpressionParser.DOT);
                this.state = 127;
                this.match(ExpressionParser.CONFIG);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 128;
                this.match(ExpressionParser.DOT);
                this.state = 129;
                this.match(ExpressionParser.PARAMS);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 130;
                this.match(ExpressionParser.DOT);
                this.state = 131;
                this.match(ExpressionParser.PROPERTY);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 132;
                this.match(ExpressionParser.DOT);
                this.state = 133;
                this.match(ExpressionParser.PARAM_ACCESS);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 134;
                this.match(ExpressionParser.DOT);
                this.state = 135;
                this.match(ExpressionParser.PROPERTY_ACCESS);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 136;
                this.match(ExpressionParser.DOT);
                this.state = 137;
                this.match(ExpressionParser.FUNCTIONS);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 138;
                this.match(ExpressionParser.DOT);
                this.state = 139;
                this.match(ExpressionParser.SECONDARY_FUNCTIONS);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public configAccess(): ConfigAccessContext {
        let localContext = new ConfigAccessContext(this.context, this.state);
        this.enterRule(localContext, 16, ExpressionParser.RULE_configAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 142;
            this.match(ExpressionParser.CONFIG);
            this.state = 143;
            this.propertyName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public headerAccess(): HeaderAccessContext {
        let localContext = new HeaderAccessContext(this.context, this.state);
        this.enterRule(localContext, 18, ExpressionParser.RULE_headerAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.match(ExpressionParser.HEADERS);
            this.state = 146;
            this.propertyName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameterAccess(): ParameterAccessContext {
        let localContext = new ParameterAccessContext(this.context, this.state);
        this.enterRule(localContext, 20, ExpressionParser.RULE_parameterAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 148;
            this.match(ExpressionParser.PARAMS);
            {
            this.state = 149;
            this.match(ExpressionParser.DOT);
            this.state = 150;
            this.match(ExpressionParser.PARAM_ACCESS);
            this.state = 151;
            this.propertyName();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertyAccess(): PropertyAccessContext {
        let localContext = new PropertyAccessContext(this.context, this.state);
        this.enterRule(localContext, 22, ExpressionParser.RULE_propertyAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
            this.match(ExpressionParser.PROPERTY);
            {
            this.state = 154;
            this.match(ExpressionParser.DOT);
            this.state = 155;
            this.match(ExpressionParser.PROPERTY_ACCESS);
            this.state = 156;
            this.propertyName();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public propertyName(): PropertyNameContext {
        let localContext = new PropertyNameContext(this.context, this.state);
        this.enterRule(localContext, 24, ExpressionParser.RULE_propertyName);
        let _la: number;
        try {
            this.state = 167;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 158;
                this.match(ExpressionParser.DOT);
                this.state = 159;
                this.match(ExpressionParser.ID);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 160;
                this.keywords();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 162;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 28) {
                    {
                    this.state = 161;
                    this.match(ExpressionParser.DOT);
                    }
                }

                this.state = 164;
                this.match(ExpressionParser.LBRACKET);
                this.state = 165;
                this.match(ExpressionParser.STRING_LITERAL);
                this.state = 166;
                this.match(ExpressionParser.RBRACKET);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 26, ExpressionParser.RULE_literal);
        try {
            this.state = 174;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ExpressionParser.LBRACKET:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 169;
                this.arrayLiteral();
                }
                break;
            case ExpressionParser.BOOLEAN_LITERAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 170;
                this.match(ExpressionParser.BOOLEAN_LITERAL);
                }
                break;
            case ExpressionParser.NUMBER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 171;
                this.match(ExpressionParser.NUMBER);
                }
                break;
            case ExpressionParser.STRING_LITERAL:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 172;
                this.match(ExpressionParser.STRING_LITERAL);
                }
                break;
            case ExpressionParser.NULL_LITERAL:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 173;
                this.match(ExpressionParser.NULL_LITERAL);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public jsonPathExpression(): JsonPathExpressionContext {
        let localContext = new JsonPathExpressionContext(this.context, this.state);
        this.enterRule(localContext, 28, ExpressionParser.RULE_jsonPathExpression);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 202;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
                    case 1:
                        {
                        this.state = 176;
                        this.match(ExpressionParser.DOT);
                        this.state = 177;
                        this.match(ExpressionParser.JSONPATH_FUNCTIONS);
                        }
                        break;
                    case 2:
                        {
                        this.state = 178;
                        this.match(ExpressionParser.DOUBLE_DOT);
                        this.state = 179;
                        this.match(ExpressionParser.ASTERISK);
                        }
                        break;
                    case 3:
                        {
                        this.state = 180;
                        this.match(ExpressionParser.DOUBLE_DOT);
                        this.state = 181;
                        this.match(ExpressionParser.ID);
                        }
                        break;
                    case 4:
                        {
                        this.state = 182;
                        this.match(ExpressionParser.DOT);
                        this.state = 183;
                        this.match(ExpressionParser.ID);
                        }
                        break;
                    case 5:
                        {
                        this.state = 184;
                        this.keywords();
                        }
                        break;
                    case 6:
                        {
                        this.state = 186;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if (_la === 28) {
                            {
                            this.state = 185;
                            this.match(ExpressionParser.DOT);
                            }
                        }

                        this.state = 188;
                        this.match(ExpressionParser.LBRACKET);
                        this.state = 189;
                        this.arrayIndex();
                        this.state = 190;
                        this.match(ExpressionParser.RBRACKET);
                        }
                        break;
                    case 7:
                        {
                        this.state = 192;
                        this.match(ExpressionParser.DOT);
                        this.state = 193;
                        this.match(ExpressionParser.ASTERISK);
                        }
                        break;
                    case 8:
                        {
                        this.state = 194;
                        this.match(ExpressionParser.DOUBLE_DOT);
                        this.state = 195;
                        this.match(ExpressionParser.ID);
                        this.state = 200;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
                        case 1:
                            {
                            this.state = 196;
                            this.match(ExpressionParser.LBRACKET);
                            this.state = 197;
                            this.arrayIndex();
                            this.state = 198;
                            this.match(ExpressionParser.RBRACKET);
                            }
                            break;
                        }
                        }
                        break;
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 204;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 15, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public variableAccess(): VariableAccessContext {
        let localContext = new VariableAccessContext(this.context, this.state);
        this.enterRule(localContext, 30, ExpressionParser.RULE_variableAccess);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(ExpressionParser.VAR);
            this.state = 218;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                {
                this.state = 207;
                this.match(ExpressionParser.DOT);
                this.state = 208;
                this.match(ExpressionParser.ID);
                }
                break;
            case 2:
                {
                this.state = 209;
                this.match(ExpressionParser.DOT);
                this.state = 210;
                this.match(ExpressionParser.STRING_LITERAL);
                }
                break;
            case 3:
                {
                this.state = 211;
                this.keywords();
                }
                break;
            case 4:
                {
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 28) {
                    {
                    this.state = 212;
                    this.match(ExpressionParser.DOT);
                    }
                }

                this.state = 215;
                this.match(ExpressionParser.LBRACKET);
                this.state = 216;
                this.match(ExpressionParser.STRING_LITERAL);
                this.state = 217;
                this.match(ExpressionParser.RBRACKET);
                }
                break;
            }
            this.state = 221;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                this.state = 220;
                this.jsonPathExpression();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayLiteral(): ArrayLiteralContext {
        let localContext = new ArrayLiteralContext(this.context, this.state);
        this.enterRule(localContext, 32, ExpressionParser.RULE_arrayLiteral);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(ExpressionParser.LBRACKET);
            this.state = 232;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167777265) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                {
                this.state = 224;
                this.expression();
                this.state = 229;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 29) {
                    {
                    {
                    this.state = 225;
                    this.match(ExpressionParser.COMMA);
                    this.state = 226;
                    this.expression();
                    }
                    }
                    this.state = 231;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 234;
            this.match(ExpressionParser.RBRACKET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public payloadAccess(): PayloadAccessContext {
        let localContext = new PayloadAccessContext(this.context, this.state);
        this.enterRule(localContext, 34, ExpressionParser.RULE_payloadAccess);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 236;
            this.match(ExpressionParser.PAYLOAD);
            this.state = 238;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                {
                this.state = 237;
                this.jsonPathExpression();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arrayIndex(): ArrayIndexContext {
        let localContext = new ArrayIndexContext(this.context, this.state);
        this.enterRule(localContext, 36, ExpressionParser.RULE_arrayIndex);
        let _la: number;
        try {
            this.state = 253;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 240;
                this.match(ExpressionParser.NUMBER);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 241;
                this.match(ExpressionParser.STRING_LITERAL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 242;
                this.expression();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 243;
                this.multipleArrayIndices();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 244;
                this.sliceArrayIndex();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 245;
                this.match(ExpressionParser.ASTERISK);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 247;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 41) {
                    {
                    this.state = 246;
                    this.match(ExpressionParser.QUESTION);
                    }
                }

                this.state = 249;
                this.match(ExpressionParser.LPAREN);
                this.state = 250;
                this.filterExpression();
                this.state = 251;
                this.match(ExpressionParser.RPAREN);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public multipleArrayIndices(): MultipleArrayIndicesContext {
        let localContext = new MultipleArrayIndicesContext(this.context, this.state);
        this.enterRule(localContext, 38, ExpressionParser.RULE_multipleArrayIndices);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 255;
            this.expression();
            this.state = 258;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 256;
                this.match(ExpressionParser.COMMA);
                this.state = 257;
                this.expression();
                }
                }
                this.state = 260;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 29);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sliceArrayIndex(): SliceArrayIndexContext {
        let localContext = new SliceArrayIndexContext(this.context, this.state);
        this.enterRule(localContext, 40, ExpressionParser.RULE_sliceArrayIndex);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 263;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167842801) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                {
                this.state = 262;
                this.signedExpressions();
                }
            }

            this.state = 265;
            this.match(ExpressionParser.COLON);
            this.state = 267;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167842801) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                {
                this.state = 266;
                this.signedExpressions();
                }
            }

            this.state = 273;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 30) {
                {
                this.state = 269;
                this.match(ExpressionParser.COLON);
                this.state = 271;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167842801) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                    {
                    this.state = 270;
                    this.signedExpressions();
                    }
                }

                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public signedExpressions(): SignedExpressionsContext {
        let localContext = new SignedExpressionsContext(this.context, this.state);
        this.enterRule(localContext, 42, ExpressionParser.RULE_signedExpressions);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 275;
                this.match(ExpressionParser.MINUS);
                }
            }

            this.state = 278;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public filterExpression(): FilterExpressionContext {
        let localContext = new FilterExpressionContext(this.context, this.state);
        this.enterRule(localContext, 44, ExpressionParser.RULE_filterExpression);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 281;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 280;
                    this.filterComponent();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 283;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public filterComponent(): FilterComponentContext {
        let localContext = new FilterComponentContext(this.context, this.state);
        this.enterRule(localContext, 46, ExpressionParser.RULE_filterComponent);
        try {
            this.state = 293;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ExpressionParser.VAR:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 285;
                this.variableAccess();
                }
                break;
            case ExpressionParser.PAYLOAD:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 286;
                this.payloadAccess();
                }
                break;
            case ExpressionParser.HEADERS:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 287;
                this.headerAccess();
                }
                break;
            case ExpressionParser.CONFIG:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 288;
                this.configAccess();
                }
                break;
            case ExpressionParser.PARAMS:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 289;
                this.parameterAccess();
                }
                break;
            case ExpressionParser.PROPERTY:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 290;
                this.propertyAccess();
                }
                break;
            case ExpressionParser.FUNCTIONS:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 291;
                this.functionCall();
                }
                break;
            case ExpressionParser.JSONPATH_PARAMS:
            case ExpressionParser.AND:
            case ExpressionParser.OR:
            case ExpressionParser.NOT:
            case ExpressionParser.ASTERISK:
            case ExpressionParser.PLUS:
            case ExpressionParser.MINUS:
            case ExpressionParser.DIV:
            case ExpressionParser.EQ:
            case ExpressionParser.NEQ:
            case ExpressionParser.GT:
            case ExpressionParser.LT:
            case ExpressionParser.GTE:
            case ExpressionParser.LTE:
            case ExpressionParser.LPAREN:
            case ExpressionParser.RPAREN:
            case ExpressionParser.DOT:
            case ExpressionParser.COMMA:
            case ExpressionParser.COLON:
            case ExpressionParser.BOOLEAN_LITERAL:
            case ExpressionParser.NUMBER:
            case ExpressionParser.STRING_LITERAL:
            case ExpressionParser.ID:
            case ExpressionParser.QUESTION:
            case ExpressionParser.AT:
            case ExpressionParser.WS:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 292;
                this.stringOrOperator();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stringOrOperator(): StringOrOperatorContext {
        let localContext = new StringOrOperatorContext(this.context, this.state);
        this.enterRule(localContext, 48, ExpressionParser.RULE_stringOrOperator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 295;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1946021378) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3907) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public functionCall(): FunctionCallContext {
        let localContext = new FunctionCallContext(this.context, this.state);
        this.enterRule(localContext, 50, ExpressionParser.RULE_functionCall);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 297;
            this.match(ExpressionParser.FUNCTIONS);
            this.state = 298;
            this.match(ExpressionParser.LPAREN);
            this.state = 307;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167777265) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                {
                this.state = 299;
                this.expression();
                this.state = 304;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 29) {
                    {
                    {
                    this.state = 300;
                    this.match(ExpressionParser.COMMA);
                    this.state = 301;
                    this.expression();
                    }
                    }
                    this.state = 306;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 309;
            this.match(ExpressionParser.RPAREN);
            this.state = 311;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                this.state = 310;
                this.functionCallSuffix();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public functionCallSuffix(): FunctionCallSuffixContext {
        let localContext = new FunctionCallSuffixContext(this.context, this.state);
        this.enterRule(localContext, 52, ExpressionParser.RULE_functionCallSuffix);
        let _la: number;
        try {
            this.state = 328;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 313;
                this.match(ExpressionParser.DOT);
                this.state = 314;
                this.match(ExpressionParser.SECONDARY_FUNCTIONS);
                this.state = 315;
                this.match(ExpressionParser.LPAREN);
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - -1)) & ~0x1F) === 0 && ((1 << (_la - -1)) & 167777265) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 211) !== 0)) {
                    {
                    this.state = 316;
                    this.expression();
                    this.state = 321;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 29) {
                        {
                        {
                        this.state = 317;
                        this.match(ExpressionParser.COMMA);
                        this.state = 318;
                        this.expression();
                        }
                        }
                        this.state = 323;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                this.state = 326;
                this.match(ExpressionParser.RPAREN);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 327;
                this.jsonPathExpression();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,44,331,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,1,0,1,0,3,0,58,8,0,1,1,1,1,1,1,1,1,1,1,1,1,3,1,66,8,1,1,2,1,
        2,1,2,5,2,71,8,2,10,2,12,2,74,9,2,1,2,1,2,1,2,1,2,3,2,80,8,2,1,3,
        1,3,1,3,1,3,1,3,3,3,87,8,3,1,4,1,4,1,4,5,4,92,8,4,10,4,12,4,95,9,
        4,1,5,1,5,1,5,5,5,100,8,5,10,5,12,5,103,9,5,1,6,1,6,1,6,1,6,1,6,
        1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,3,6,119,8,6,1,7,1,7,1,7,1,7,
        1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
        3,7,141,8,7,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,
        1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,3,12,163,8,12,1,12,1,12,
        1,12,3,12,168,8,12,1,13,1,13,1,13,1,13,1,13,3,13,175,8,13,1,14,1,
        14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,187,8,14,1,14,1,
        14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,3,14,201,8,
        14,4,14,203,8,14,11,14,12,14,204,1,15,1,15,1,15,1,15,1,15,1,15,1,
        15,3,15,214,8,15,1,15,1,15,1,15,3,15,219,8,15,1,15,3,15,222,8,15,
        1,16,1,16,1,16,1,16,5,16,228,8,16,10,16,12,16,231,9,16,3,16,233,
        8,16,1,16,1,16,1,17,1,17,3,17,239,8,17,1,18,1,18,1,18,1,18,1,18,
        1,18,1,18,3,18,248,8,18,1,18,1,18,1,18,1,18,3,18,254,8,18,1,19,1,
        19,1,19,4,19,259,8,19,11,19,12,19,260,1,20,3,20,264,8,20,1,20,1,
        20,3,20,268,8,20,1,20,1,20,3,20,272,8,20,3,20,274,8,20,1,21,3,21,
        277,8,21,1,21,1,21,1,22,4,22,282,8,22,11,22,12,22,283,1,23,1,23,
        1,23,1,23,1,23,1,23,1,23,1,23,3,23,294,8,23,1,24,1,24,1,25,1,25,
        1,25,1,25,1,25,5,25,303,8,25,10,25,12,25,306,9,25,3,25,308,8,25,
        1,25,1,25,3,25,312,8,25,1,26,1,26,1,26,1,26,1,26,1,26,5,26,320,8,
        26,10,26,12,26,323,9,26,3,26,325,8,26,1,26,1,26,3,26,329,8,26,1,
        26,0,0,27,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
        40,42,44,46,48,50,52,0,5,1,0,18,23,1,0,18,19,1,0,14,15,2,0,13,13,
        16,17,8,0,1,1,9,11,13,16,18,25,28,30,32,33,38,38,40,43,382,0,57,
        1,0,0,0,2,59,1,0,0,0,4,79,1,0,0,0,6,81,1,0,0,0,8,88,1,0,0,0,10,96,
        1,0,0,0,12,118,1,0,0,0,14,140,1,0,0,0,16,142,1,0,0,0,18,145,1,0,
        0,0,20,148,1,0,0,0,22,153,1,0,0,0,24,167,1,0,0,0,26,174,1,0,0,0,
        28,202,1,0,0,0,30,206,1,0,0,0,32,223,1,0,0,0,34,236,1,0,0,0,36,253,
        1,0,0,0,38,255,1,0,0,0,40,263,1,0,0,0,42,276,1,0,0,0,44,281,1,0,
        0,0,46,293,1,0,0,0,48,295,1,0,0,0,50,297,1,0,0,0,52,328,1,0,0,0,
        54,58,3,4,2,0,55,58,3,2,1,0,56,58,5,0,0,1,57,54,1,0,0,0,57,55,1,
        0,0,0,57,56,1,0,0,0,58,1,1,0,0,0,59,65,3,4,2,0,60,61,5,41,0,0,61,
        62,3,0,0,0,62,63,5,30,0,0,63,64,3,0,0,0,64,66,1,0,0,0,65,60,1,0,
        0,0,65,66,1,0,0,0,66,3,1,0,0,0,67,72,3,6,3,0,68,69,7,0,0,0,69,71,
        3,6,3,0,70,68,1,0,0,0,71,74,1,0,0,0,72,70,1,0,0,0,72,73,1,0,0,0,
        73,80,1,0,0,0,74,72,1,0,0,0,75,76,3,6,3,0,76,77,7,1,0,0,77,78,5,
        39,0,0,78,80,1,0,0,0,79,67,1,0,0,0,79,75,1,0,0,0,80,5,1,0,0,0,81,
        86,3,8,4,0,82,83,5,9,0,0,83,87,3,6,3,0,84,85,5,10,0,0,85,87,3,6,
        3,0,86,82,1,0,0,0,86,84,1,0,0,0,86,87,1,0,0,0,87,7,1,0,0,0,88,93,
        3,10,5,0,89,90,7,2,0,0,90,92,3,10,5,0,91,89,1,0,0,0,92,95,1,0,0,
        0,93,91,1,0,0,0,93,94,1,0,0,0,94,9,1,0,0,0,95,93,1,0,0,0,96,101,
        3,12,6,0,97,98,7,3,0,0,98,100,3,12,6,0,99,97,1,0,0,0,100,103,1,0,
        0,0,101,99,1,0,0,0,101,102,1,0,0,0,102,11,1,0,0,0,103,101,1,0,0,
        0,104,119,3,26,13,0,105,119,3,50,25,0,106,119,3,30,15,0,107,119,
        3,34,17,0,108,119,3,18,9,0,109,119,3,16,8,0,110,119,3,20,10,0,111,
        119,3,22,11,0,112,113,5,24,0,0,113,114,3,0,0,0,114,115,5,25,0,0,
        115,119,1,0,0,0,116,117,5,11,0,0,117,119,3,12,6,0,118,104,1,0,0,
        0,118,105,1,0,0,0,118,106,1,0,0,0,118,107,1,0,0,0,118,108,1,0,0,
        0,118,109,1,0,0,0,118,110,1,0,0,0,118,111,1,0,0,0,118,112,1,0,0,
        0,118,116,1,0,0,0,119,13,1,0,0,0,120,121,5,28,0,0,121,141,5,3,0,
        0,122,123,5,28,0,0,123,141,5,4,0,0,124,125,5,28,0,0,125,141,5,5,
        0,0,126,127,5,28,0,0,127,141,5,6,0,0,128,129,5,28,0,0,129,141,5,
        7,0,0,130,131,5,28,0,0,131,141,5,8,0,0,132,133,5,28,0,0,133,141,
        5,34,0,0,134,135,5,28,0,0,135,141,5,35,0,0,136,137,5,28,0,0,137,
        141,5,36,0,0,138,139,5,28,0,0,139,141,5,37,0,0,140,120,1,0,0,0,140,
        122,1,0,0,0,140,124,1,0,0,0,140,126,1,0,0,0,140,128,1,0,0,0,140,
        130,1,0,0,0,140,132,1,0,0,0,140,134,1,0,0,0,140,136,1,0,0,0,140,
        138,1,0,0,0,141,15,1,0,0,0,142,143,5,6,0,0,143,144,3,24,12,0,144,
        17,1,0,0,0,145,146,5,5,0,0,146,147,3,24,12,0,147,19,1,0,0,0,148,
        149,5,7,0,0,149,150,5,28,0,0,150,151,5,34,0,0,151,152,3,24,12,0,
        152,21,1,0,0,0,153,154,5,8,0,0,154,155,5,28,0,0,155,156,5,35,0,0,
        156,157,3,24,12,0,157,23,1,0,0,0,158,159,5,28,0,0,159,168,5,40,0,
        0,160,168,3,14,7,0,161,163,5,28,0,0,162,161,1,0,0,0,162,163,1,0,
        0,0,163,164,1,0,0,0,164,165,5,26,0,0,165,166,5,38,0,0,166,168,5,
        27,0,0,167,158,1,0,0,0,167,160,1,0,0,0,167,162,1,0,0,0,168,25,1,
        0,0,0,169,175,3,32,16,0,170,175,5,32,0,0,171,175,5,33,0,0,172,175,
        5,38,0,0,173,175,5,39,0,0,174,169,1,0,0,0,174,170,1,0,0,0,174,171,
        1,0,0,0,174,172,1,0,0,0,174,173,1,0,0,0,175,27,1,0,0,0,176,177,5,
        28,0,0,177,203,5,2,0,0,178,179,5,12,0,0,179,203,5,13,0,0,180,181,
        5,12,0,0,181,203,5,40,0,0,182,183,5,28,0,0,183,203,5,40,0,0,184,
        203,3,14,7,0,185,187,5,28,0,0,186,185,1,0,0,0,186,187,1,0,0,0,187,
        188,1,0,0,0,188,189,5,26,0,0,189,190,3,36,18,0,190,191,5,27,0,0,
        191,203,1,0,0,0,192,193,5,28,0,0,193,203,5,13,0,0,194,195,5,12,0,
        0,195,200,5,40,0,0,196,197,5,26,0,0,197,198,3,36,18,0,198,199,5,
        27,0,0,199,201,1,0,0,0,200,196,1,0,0,0,200,201,1,0,0,0,201,203,1,
        0,0,0,202,176,1,0,0,0,202,178,1,0,0,0,202,180,1,0,0,0,202,182,1,
        0,0,0,202,184,1,0,0,0,202,186,1,0,0,0,202,192,1,0,0,0,202,194,1,
        0,0,0,203,204,1,0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,29,1,0,
        0,0,206,218,5,3,0,0,207,208,5,28,0,0,208,219,5,40,0,0,209,210,5,
        28,0,0,210,219,5,38,0,0,211,219,3,14,7,0,212,214,5,28,0,0,213,212,
        1,0,0,0,213,214,1,0,0,0,214,215,1,0,0,0,215,216,5,26,0,0,216,217,
        5,38,0,0,217,219,5,27,0,0,218,207,1,0,0,0,218,209,1,0,0,0,218,211,
        1,0,0,0,218,213,1,0,0,0,219,221,1,0,0,0,220,222,3,28,14,0,221,220,
        1,0,0,0,221,222,1,0,0,0,222,31,1,0,0,0,223,232,5,26,0,0,224,229,
        3,0,0,0,225,226,5,29,0,0,226,228,3,0,0,0,227,225,1,0,0,0,228,231,
        1,0,0,0,229,227,1,0,0,0,229,230,1,0,0,0,230,233,1,0,0,0,231,229,
        1,0,0,0,232,224,1,0,0,0,232,233,1,0,0,0,233,234,1,0,0,0,234,235,
        5,27,0,0,235,33,1,0,0,0,236,238,5,4,0,0,237,239,3,28,14,0,238,237,
        1,0,0,0,238,239,1,0,0,0,239,35,1,0,0,0,240,254,5,33,0,0,241,254,
        5,38,0,0,242,254,3,0,0,0,243,254,3,38,19,0,244,254,3,40,20,0,245,
        254,5,13,0,0,246,248,5,41,0,0,247,246,1,0,0,0,247,248,1,0,0,0,248,
        249,1,0,0,0,249,250,5,24,0,0,250,251,3,44,22,0,251,252,5,25,0,0,
        252,254,1,0,0,0,253,240,1,0,0,0,253,241,1,0,0,0,253,242,1,0,0,0,
        253,243,1,0,0,0,253,244,1,0,0,0,253,245,1,0,0,0,253,247,1,0,0,0,
        254,37,1,0,0,0,255,258,3,0,0,0,256,257,5,29,0,0,257,259,3,0,0,0,
        258,256,1,0,0,0,259,260,1,0,0,0,260,258,1,0,0,0,260,261,1,0,0,0,
        261,39,1,0,0,0,262,264,3,42,21,0,263,262,1,0,0,0,263,264,1,0,0,0,
        264,265,1,0,0,0,265,267,5,30,0,0,266,268,3,42,21,0,267,266,1,0,0,
        0,267,268,1,0,0,0,268,273,1,0,0,0,269,271,5,30,0,0,270,272,3,42,
        21,0,271,270,1,0,0,0,271,272,1,0,0,0,272,274,1,0,0,0,273,269,1,0,
        0,0,273,274,1,0,0,0,274,41,1,0,0,0,275,277,5,15,0,0,276,275,1,0,
        0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,279,3,0,0,0,279,43,1,0,0,
        0,280,282,3,46,23,0,281,280,1,0,0,0,282,283,1,0,0,0,283,281,1,0,
        0,0,283,284,1,0,0,0,284,45,1,0,0,0,285,294,3,30,15,0,286,294,3,34,
        17,0,287,294,3,18,9,0,288,294,3,16,8,0,289,294,3,20,10,0,290,294,
        3,22,11,0,291,294,3,50,25,0,292,294,3,48,24,0,293,285,1,0,0,0,293,
        286,1,0,0,0,293,287,1,0,0,0,293,288,1,0,0,0,293,289,1,0,0,0,293,
        290,1,0,0,0,293,291,1,0,0,0,293,292,1,0,0,0,294,47,1,0,0,0,295,296,
        7,4,0,0,296,49,1,0,0,0,297,298,5,36,0,0,298,307,5,24,0,0,299,304,
        3,0,0,0,300,301,5,29,0,0,301,303,3,0,0,0,302,300,1,0,0,0,303,306,
        1,0,0,0,304,302,1,0,0,0,304,305,1,0,0,0,305,308,1,0,0,0,306,304,
        1,0,0,0,307,299,1,0,0,0,307,308,1,0,0,0,308,309,1,0,0,0,309,311,
        5,25,0,0,310,312,3,52,26,0,311,310,1,0,0,0,311,312,1,0,0,0,312,51,
        1,0,0,0,313,314,5,28,0,0,314,315,5,37,0,0,315,324,5,24,0,0,316,321,
        3,0,0,0,317,318,5,29,0,0,318,320,3,0,0,0,319,317,1,0,0,0,320,323,
        1,0,0,0,321,319,1,0,0,0,321,322,1,0,0,0,322,325,1,0,0,0,323,321,
        1,0,0,0,324,316,1,0,0,0,324,325,1,0,0,0,325,326,1,0,0,0,326,329,
        5,25,0,0,327,329,3,28,14,0,328,313,1,0,0,0,328,327,1,0,0,0,329,53,
        1,0,0,0,38,57,65,72,79,86,93,101,118,140,162,167,174,186,200,202,
        204,213,218,221,229,232,238,247,253,260,263,267,271,273,276,283,
        293,304,307,311,321,324,328
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!ExpressionParser.__ATN) {
            ExpressionParser.__ATN = new antlr.ATNDeserializer().deserialize(ExpressionParser._serializedATN);
        }

        return ExpressionParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(ExpressionParser.literalNames, ExpressionParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return ExpressionParser.vocabulary;
    }

    private static readonly decisionsToDFA = ExpressionParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comparisonExpression(): ComparisonExpressionContext | null {
        return this.getRuleContext(0, ComparisonExpressionContext);
    }
    public conditionalExpression(): ConditionalExpressionContext | null {
        return this.getRuleContext(0, ConditionalExpressionContext);
    }
    public EOF(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.EOF, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_expression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comparisonExpression(): ComparisonExpressionContext {
        return this.getRuleContext(0, ComparisonExpressionContext)!;
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.QUESTION, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.COLON, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_conditionalExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComparisonExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public logicalExpression(): LogicalExpressionContext[];
    public logicalExpression(i: number): LogicalExpressionContext | null;
    public logicalExpression(i?: number): LogicalExpressionContext[] | LogicalExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LogicalExpressionContext);
        }

        return this.getRuleContext(i, LogicalExpressionContext);
    }
    public GT(): antlr.TerminalNode[];
    public GT(i: number): antlr.TerminalNode | null;
    public GT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.GT);
    	} else {
    		return this.getToken(ExpressionParser.GT, i);
    	}
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.LT);
    	} else {
    		return this.getToken(ExpressionParser.LT, i);
    	}
    }
    public GTE(): antlr.TerminalNode[];
    public GTE(i: number): antlr.TerminalNode | null;
    public GTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.GTE);
    	} else {
    		return this.getToken(ExpressionParser.GTE, i);
    	}
    }
    public LTE(): antlr.TerminalNode[];
    public LTE(i: number): antlr.TerminalNode | null;
    public LTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.LTE);
    	} else {
    		return this.getToken(ExpressionParser.LTE, i);
    	}
    }
    public EQ(): antlr.TerminalNode[];
    public EQ(i: number): antlr.TerminalNode | null;
    public EQ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.EQ);
    	} else {
    		return this.getToken(ExpressionParser.EQ, i);
    	}
    }
    public NEQ(): antlr.TerminalNode[];
    public NEQ(i: number): antlr.TerminalNode | null;
    public NEQ(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.NEQ);
    	} else {
    		return this.getToken(ExpressionParser.NEQ, i);
    	}
    }
    public NULL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NULL_LITERAL, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_comparisonExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitComparisonExpression) {
            return visitor.visitComparisonExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LogicalExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public arithmeticExpression(): ArithmeticExpressionContext {
        return this.getRuleContext(0, ArithmeticExpressionContext)!;
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.AND, 0);
    }
    public logicalExpression(): LogicalExpressionContext | null {
        return this.getRuleContext(0, LogicalExpressionContext);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.OR, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_logicalExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitLogicalExpression) {
            return visitor.visitLogicalExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArithmeticExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public term(): TermContext[];
    public term(i: number): TermContext | null;
    public term(i?: number): TermContext[] | TermContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TermContext);
        }

        return this.getRuleContext(i, TermContext);
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.PLUS);
    	} else {
    		return this.getToken(ExpressionParser.PLUS, i);
    	}
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.MINUS);
    	} else {
    		return this.getToken(ExpressionParser.MINUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_arithmeticExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitArithmeticExpression) {
            return visitor.visitArithmeticExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TermContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public factor(): FactorContext[];
    public factor(i: number): FactorContext | null;
    public factor(i?: number): FactorContext[] | FactorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FactorContext);
        }

        return this.getRuleContext(i, FactorContext);
    }
    public ASTERISK(): antlr.TerminalNode[];
    public ASTERISK(i: number): antlr.TerminalNode | null;
    public ASTERISK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.ASTERISK);
    	} else {
    		return this.getToken(ExpressionParser.ASTERISK, i);
    	}
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.DIV);
    	} else {
    		return this.getToken(ExpressionParser.DIV, i);
    	}
    }
    public MODULO(): antlr.TerminalNode[];
    public MODULO(i: number): antlr.TerminalNode | null;
    public MODULO(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.MODULO);
    	} else {
    		return this.getToken(ExpressionParser.MODULO, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_term;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitTerm) {
            return visitor.visitTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FactorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public functionCall(): FunctionCallContext | null {
        return this.getRuleContext(0, FunctionCallContext);
    }
    public variableAccess(): VariableAccessContext | null {
        return this.getRuleContext(0, VariableAccessContext);
    }
    public payloadAccess(): PayloadAccessContext | null {
        return this.getRuleContext(0, PayloadAccessContext);
    }
    public headerAccess(): HeaderAccessContext | null {
        return this.getRuleContext(0, HeaderAccessContext);
    }
    public configAccess(): ConfigAccessContext | null {
        return this.getRuleContext(0, ConfigAccessContext);
    }
    public parameterAccess(): ParameterAccessContext | null {
        return this.getRuleContext(0, ParameterAccessContext);
    }
    public propertyAccess(): PropertyAccessContext | null {
        return this.getRuleContext(0, PropertyAccessContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RPAREN, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NOT, 0);
    }
    public factor(): FactorContext | null {
        return this.getRuleContext(0, FactorContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_factor;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitFactor) {
            return visitor.visitFactor(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class KeywordsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.DOT, 0)!;
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.VAR, 0);
    }
    public PAYLOAD(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PAYLOAD, 0);
    }
    public HEADERS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.HEADERS, 0);
    }
    public CONFIG(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.CONFIG, 0);
    }
    public PARAMS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PARAMS, 0);
    }
    public PROPERTY(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PROPERTY, 0);
    }
    public PARAM_ACCESS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PARAM_ACCESS, 0);
    }
    public PROPERTY_ACCESS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PROPERTY_ACCESS, 0);
    }
    public FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.FUNCTIONS, 0);
    }
    public SECONDARY_FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.SECONDARY_FUNCTIONS, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_keywords;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitKeywords) {
            return visitor.visitKeywords(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConfigAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONFIG(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.CONFIG, 0)!;
    }
    public propertyName(): PropertyNameContext {
        return this.getRuleContext(0, PropertyNameContext)!;
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_configAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitConfigAccess) {
            return visitor.visitConfigAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class HeaderAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HEADERS(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.HEADERS, 0)!;
    }
    public propertyName(): PropertyNameContext {
        return this.getRuleContext(0, PropertyNameContext)!;
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_headerAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitHeaderAccess) {
            return visitor.visitHeaderAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PARAMS(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.PARAMS, 0)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public PARAM_ACCESS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PARAM_ACCESS, 0);
    }
    public propertyName(): PropertyNameContext | null {
        return this.getRuleContext(0, PropertyNameContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_parameterAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitParameterAccess) {
            return visitor.visitParameterAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropertyAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PROPERTY(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.PROPERTY, 0)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public PROPERTY_ACCESS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PROPERTY_ACCESS, 0);
    }
    public propertyName(): PropertyNameContext | null {
        return this.getRuleContext(0, PropertyNameContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_propertyAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitPropertyAccess) {
            return visitor.visitPropertyAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PropertyNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.ID, 0);
    }
    public keywords(): KeywordsContext | null {
        return this.getRuleContext(0, KeywordsContext);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LBRACKET, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.STRING_LITERAL, 0);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RBRACKET, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_propertyName;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitPropertyName) {
            return visitor.visitPropertyName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public arrayLiteral(): ArrayLiteralContext | null {
        return this.getRuleContext(0, ArrayLiteralContext);
    }
    public BOOLEAN_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.BOOLEAN_LITERAL, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NUMBER, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.STRING_LITERAL, 0);
    }
    public NULL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NULL_LITERAL, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_literal;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitLiteral) {
            return visitor.visitLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class JsonPathExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.DOT);
    	} else {
    		return this.getToken(ExpressionParser.DOT, i);
    	}
    }
    public JSONPATH_FUNCTIONS(): antlr.TerminalNode[];
    public JSONPATH_FUNCTIONS(i: number): antlr.TerminalNode | null;
    public JSONPATH_FUNCTIONS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.JSONPATH_FUNCTIONS);
    	} else {
    		return this.getToken(ExpressionParser.JSONPATH_FUNCTIONS, i);
    	}
    }
    public DOUBLE_DOT(): antlr.TerminalNode[];
    public DOUBLE_DOT(i: number): antlr.TerminalNode | null;
    public DOUBLE_DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.DOUBLE_DOT);
    	} else {
    		return this.getToken(ExpressionParser.DOUBLE_DOT, i);
    	}
    }
    public ASTERISK(): antlr.TerminalNode[];
    public ASTERISK(i: number): antlr.TerminalNode | null;
    public ASTERISK(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.ASTERISK);
    	} else {
    		return this.getToken(ExpressionParser.ASTERISK, i);
    	}
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.ID);
    	} else {
    		return this.getToken(ExpressionParser.ID, i);
    	}
    }
    public keywords(): KeywordsContext[];
    public keywords(i: number): KeywordsContext | null;
    public keywords(i?: number): KeywordsContext[] | KeywordsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(KeywordsContext);
        }

        return this.getRuleContext(i, KeywordsContext);
    }
    public LBRACKET(): antlr.TerminalNode[];
    public LBRACKET(i: number): antlr.TerminalNode | null;
    public LBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.LBRACKET);
    	} else {
    		return this.getToken(ExpressionParser.LBRACKET, i);
    	}
    }
    public arrayIndex(): ArrayIndexContext[];
    public arrayIndex(i: number): ArrayIndexContext | null;
    public arrayIndex(i?: number): ArrayIndexContext[] | ArrayIndexContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ArrayIndexContext);
        }

        return this.getRuleContext(i, ArrayIndexContext);
    }
    public RBRACKET(): antlr.TerminalNode[];
    public RBRACKET(i: number): antlr.TerminalNode | null;
    public RBRACKET(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.RBRACKET);
    	} else {
    		return this.getToken(ExpressionParser.RBRACKET, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_jsonPathExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitJsonPathExpression) {
            return visitor.visitJsonPathExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VariableAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.VAR, 0)!;
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.ID, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.STRING_LITERAL, 0);
    }
    public keywords(): KeywordsContext | null {
        return this.getRuleContext(0, KeywordsContext);
    }
    public LBRACKET(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LBRACKET, 0);
    }
    public RBRACKET(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RBRACKET, 0);
    }
    public jsonPathExpression(): JsonPathExpressionContext | null {
        return this.getRuleContext(0, JsonPathExpressionContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_variableAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitVariableAccess) {
            return visitor.visitVariableAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.LBRACKET, 0)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.RBRACKET, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.COMMA);
    	} else {
    		return this.getToken(ExpressionParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_arrayLiteral;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitArrayLiteral) {
            return visitor.visitArrayLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PayloadAccessContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PAYLOAD(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.PAYLOAD, 0)!;
    }
    public jsonPathExpression(): JsonPathExpressionContext | null {
        return this.getRuleContext(0, JsonPathExpressionContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_payloadAccess;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitPayloadAccess) {
            return visitor.visitPayloadAccess(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayIndexContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NUMBER, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.STRING_LITERAL, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public multipleArrayIndices(): MultipleArrayIndicesContext | null {
        return this.getRuleContext(0, MultipleArrayIndicesContext);
    }
    public sliceArrayIndex(): SliceArrayIndexContext | null {
        return this.getRuleContext(0, SliceArrayIndexContext);
    }
    public ASTERISK(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.ASTERISK, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LPAREN, 0);
    }
    public filterExpression(): FilterExpressionContext | null {
        return this.getRuleContext(0, FilterExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RPAREN, 0);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.QUESTION, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_arrayIndex;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitArrayIndex) {
            return visitor.visitArrayIndex(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MultipleArrayIndicesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.COMMA);
    	} else {
    		return this.getToken(ExpressionParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_multipleArrayIndices;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitMultipleArrayIndices) {
            return visitor.visitMultipleArrayIndices(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SliceArrayIndexContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.COLON);
    	} else {
    		return this.getToken(ExpressionParser.COLON, i);
    	}
    }
    public signedExpressions(): SignedExpressionsContext[];
    public signedExpressions(i: number): SignedExpressionsContext | null;
    public signedExpressions(i?: number): SignedExpressionsContext[] | SignedExpressionsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(SignedExpressionsContext);
        }

        return this.getRuleContext(i, SignedExpressionsContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_sliceArrayIndex;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitSliceArrayIndex) {
            return visitor.visitSliceArrayIndex(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SignedExpressionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.MINUS, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_signedExpressions;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitSignedExpressions) {
            return visitor.visitSignedExpressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FilterExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public filterComponent(): FilterComponentContext[];
    public filterComponent(i: number): FilterComponentContext | null;
    public filterComponent(i?: number): FilterComponentContext[] | FilterComponentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FilterComponentContext);
        }

        return this.getRuleContext(i, FilterComponentContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_filterExpression;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitFilterExpression) {
            return visitor.visitFilterExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FilterComponentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public variableAccess(): VariableAccessContext | null {
        return this.getRuleContext(0, VariableAccessContext);
    }
    public payloadAccess(): PayloadAccessContext | null {
        return this.getRuleContext(0, PayloadAccessContext);
    }
    public headerAccess(): HeaderAccessContext | null {
        return this.getRuleContext(0, HeaderAccessContext);
    }
    public configAccess(): ConfigAccessContext | null {
        return this.getRuleContext(0, ConfigAccessContext);
    }
    public parameterAccess(): ParameterAccessContext | null {
        return this.getRuleContext(0, ParameterAccessContext);
    }
    public propertyAccess(): PropertyAccessContext | null {
        return this.getRuleContext(0, PropertyAccessContext);
    }
    public functionCall(): FunctionCallContext | null {
        return this.getRuleContext(0, FunctionCallContext);
    }
    public stringOrOperator(): StringOrOperatorContext | null {
        return this.getRuleContext(0, StringOrOperatorContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_filterComponent;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitFilterComponent) {
            return visitor.visitFilterComponent(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StringOrOperatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.QUESTION, 0);
    }
    public AT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.AT, 0);
    }
    public JSONPATH_PARAMS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.JSONPATH_PARAMS, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.STRING_LITERAL, 0);
    }
    public NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NUMBER, 0);
    }
    public BOOLEAN_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.BOOLEAN_LITERAL, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.ID, 0);
    }
    public GT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.GT, 0);
    }
    public LT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LT, 0);
    }
    public GTE(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.GTE, 0);
    }
    public LTE(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LTE, 0);
    }
    public EQ(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.EQ, 0);
    }
    public NEQ(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NEQ, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.PLUS, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.MINUS, 0);
    }
    public DIV(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DIV, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RPAREN, 0);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.COMMA, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.COLON, 0);
    }
    public WS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.WS, 0);
    }
    public AND(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.AND, 0);
    }
    public OR(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.OR, 0);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.NOT, 0);
    }
    public ASTERISK(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.ASTERISK, 0);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_stringOrOperator;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitStringOrOperator) {
            return visitor.visitStringOrOperator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionCallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FUNCTIONS(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.FUNCTIONS, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ExpressionParser.RPAREN, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public functionCallSuffix(): FunctionCallSuffixContext | null {
        return this.getRuleContext(0, FunctionCallSuffixContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.COMMA);
    	} else {
    		return this.getToken(ExpressionParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_functionCall;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionCall) {
            return visitor.visitFunctionCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionCallSuffixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOT(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.DOT, 0);
    }
    public SECONDARY_FUNCTIONS(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.SECONDARY_FUNCTIONS, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ExpressionParser.RPAREN, 0);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ExpressionParser.COMMA);
    	} else {
    		return this.getToken(ExpressionParser.COMMA, i);
    	}
    }
    public jsonPathExpression(): JsonPathExpressionContext | null {
        return this.getRuleContext(0, JsonPathExpressionContext);
    }
    public override get ruleIndex(): number {
        return ExpressionParser.RULE_functionCallSuffix;
    }
    public override accept<Result>(visitor: ExpressionParserVisitor<Result>): Result | null {
        if (visitor.visitFunctionCallSuffix) {
            return visitor.visitFunctionCallSuffix(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
