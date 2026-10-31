// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/ExpressionConstants.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";

export class ExpressionConstants {
  static readonly __fields: string[] = [];

  static readonly EXPRESSION_PREFIX: string = "${";

  static readonly OPERATORS_CHARS: string[] = ["+", "-", "*", "/", "?", ":", ">", "<", ">= ", "<=", "==", "!=", "&&", "||", "and", "or",
                    "=", "&", "|"];

  static readonly LABEL: string = "label";

  static readonly INSERT_TEXT: string = "insertText";

  static readonly DETAIL: string = "details";

  static readonly CATEGORY: string = "category";

  static readonly SIGNATURE: string = "signature";

  static readonly VARS: string = "vars";

  static readonly PROPERTIES: string = "properties";

  static readonly PROPS: string = "props";

  static readonly PARAMS: string = "params";

  static readonly AXIS2: string = "axis2";

  static readonly AXIS2_CLIENT: string = "axis2Client";

  static readonly AXIS2_TRANSPORT: string = "axis2Transport";

  static readonly AXIS2_OPERATION: string = "axis2Operation";

  static readonly SYNAPSE: string = "synapse";

  static readonly HEADERS: string = "headers";

  static readonly PAYLOAD: string = "payload";

  static readonly ATTRIBUTES_SECOND_LEVEL: string[] = [ExpressionConstants.SYNAPSE, ExpressionConstants.AXIS2];

  static readonly QUERY_PARAMS: string = "queryParams";

  static readonly PATH_PARAMS: string = "pathParams";

  static readonly FUNCTION_PARAMS: string = "functionParams";

  static readonly CONFIGS: string = "configs";

  static readonly ROOT_LEVEL_TOKENS: string[] = [ExpressionConstants.VARS, ExpressionConstants.PROPERTIES, ExpressionConstants.PROPS, ExpressionConstants.PARAMS, ExpressionConstants.HEADERS, ExpressionConstants.PAYLOAD, ExpressionConstants.CONFIGS];

  static readonly PARAMS_SECOND_LEVEL: string[] = [ExpressionConstants.QUERY_PARAMS, ExpressionConstants.PATH_PARAMS, ExpressionConstants.FUNCTION_PARAMS];

  static readonly OBJECT: string = "Object";

  static readonly ITEMS: string = "items";

  static readonly SORT_TEXT: string = "sortText";

  static readonly ARRAY_COMPLETION_INSERT_TEXT: string = "[0]";

  static readonly ARRAY_COMPLETION_LABEL: string = "[]";

  constructor() {

  }
}
