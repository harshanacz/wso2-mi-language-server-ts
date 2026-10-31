// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/ExpressionCompletionsProvider.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";
import { CompletionItemKind } from "../lsp.js";
import { equals, isEmpty, contains, size, get, matches, Logger, Level, StringBuilder, StringUtils } from "../../syntaxTree/javaCompat.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { Edit } from "../mediator/tryout/pojo/Edit.js";
import { ExpressionCompletionContext } from "./pojo/ExpressionCompletionContext.js";
import { ExpressionCompletionRequest } from "./pojo/ExpressionCompletionRequest.js";
import { ExpressionCompletionResponse } from "./pojo/ExpressionCompletionResponse.js";
import { ExpressionCompletionType } from "./pojo/ExpressionCompletionType.js";
import { ExpressionCompletionUtils } from "./ExpressionCompletionUtils.js";
import { ExpressionConstants } from "./ExpressionConstants.js";
import { ExpressionParam } from "./pojo/ExpressionParam.js";
import { JsonObject } from "../gson.js";
import { MediatorInfo } from "../mediator/tryout/pojo/MediatorInfo.js";
import { MediatorTryoutInfo } from "../mediator/tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../mediator/tryout/pojo/MediatorTryoutRequest.js";
import { Params } from "../mediator/tryout/pojo/Params.js";
import { Path } from "../host/nio.js";
import { Pattern } from "../host/regex.js";
import { Position } from "../lsp.js";
import { Properties } from "../mediator/tryout/pojo/Properties.js";
import { Property } from "../mediator/tryout/pojo/Property.js";
import { Range } from "../lsp.js";
import { ServerLessTryoutHandler } from "../mediator/schema/generate/ServerLessTryoutHandler.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class ExpressionCompletionsProvider {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("ExpressionCompletionsProvider");

  static readonly PROJECT_PATH_REGEX: Pattern = Pattern.compile(
            Pattern.quote("file:" + JFile.separator + JFile.separator) + "(.+?)" +
                    Pattern.quote(String(Path.of("src", "main", "wso2mi"))) + ".*");

  static readonly EXPRESSION_REGEX: string = "\\$\\{([^}]*)}?$";

  static projectPath?: string;

  constructor() {

  }

  static getCompletions(param: ExpressionParam): ICompletionResponse;
  static getCompletions(document: DOMDocument, position: Position, valuePrefix: string, cursorOffset: number): ICompletionResponse;
  static getCompletions(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [param] = args;


                if (ExpressionCompletionUtils.isValidRequest(param)) {
                    try {
                        let document = null;
                        if (param.getDocumentUri() != null) {
                            document = Utils.getDOMDocument(new JFile(param.getDocumentUri()));
                        }
                        let expressionInput = param.getExpression() != null ? param.getExpression() : StringUtils.EMPTY;
                        let expression = ExpressionConstants.EXPRESSION_PREFIX + expressionInput;
                        return ExpressionCompletionsProvider.getCompletions(document, param.getPosition(), expression, param.getOffset() + 2);
                    } catch (e) {
                        ExpressionCompletionsProvider.LOGGER.log(Level.SEVERE, "Error while getting the DOM document", e);
                    }
                }
                return new ExpressionCompletionResponse();

        break;
      }
      case 4: {
        const [document, position, valuePrefix, cursorOffset] = args;


                try {
                    let isNewMediator = ExpressionCompletionUtils.getMediatorPosition(document, position) != position;
                    let request = new ExpressionCompletionRequest(document, position);
                    let response = new ExpressionCompletionResponse();
                    ExpressionCompletionsProvider.doComplete(valuePrefix, request, response, cursorOffset, isNewMediator);
                    return response;
                } catch (e) {
                    ExpressionCompletionsProvider.LOGGER.log(Level.SEVERE, "Error while getting the mediator position", e);
                }
                return null;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static doComplete(valuePrefix: string, request: ICompletionRequest, response: ICompletionResponse, offset: number, isNewMediator: boolean): ICompletionResponse;
  static doComplete(valuePrefix: string, request: ICompletionRequest, response: ICompletionResponse, isNewMediator: boolean): ICompletionResponse;
  static doComplete(...args: any[]): any {
    switch (args.length) {
      case 5: {
        const [valuePrefix, request, response, offset, isNewMediator] = args;


                ExpressionCompletionsProvider.fillAttributeValueWithExpression(valuePrefix, request, response, offset, isNewMediator);
                return response;

        break;
      }
      case 4: {
        const [valuePrefix, request, response, isNewMediator] = args;


                try {
                    ExpressionCompletionsProvider.fillAttributeValueWithExpression(valuePrefix, request, response, 0, isNewMediator);
                } catch (e) {
                    ExpressionCompletionsProvider.LOGGER.log(Level.SEVERE, "Error while getting the completion items", e);
                }
                return response;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static getMediatorProperties(request: ICompletionRequest, isNewMediator: boolean): MediatorTryoutInfo {
    if (request.getXMLDocument() == null) {
        return null;
    }
    let projectPath = ExpressionCompletionsProvider.getProjectPath(request.getXMLDocument().getDocumentURI());
    let serverLessTryoutHandler = new ServerLessTryoutHandler(projectPath);

    let documentUri = Utils.getAbsolutePath(request.getXMLDocument().getDocumentURI());
    let payload = ExpressionCompletionUtils.getInputPayload(projectPath, documentUri, request.getPosition());


    let line = request.getPosition().getLine();
    let column = request.getPosition().getCharacter();
    let editArray = null;
    if (isNewMediator) {
        let position = new Position(line, column);
        let edit = new Edit("<log />", new Range(position, position));
        editArray = new Array(1);
        editArray[0] = edit;
        column++;
    }


    let propertyRequest =
            new MediatorTryoutRequest(documentUri, line, column, payload, editArray);
    let info = serverLessTryoutHandler.handle(propertyRequest);
    let configs = ExpressionCompletionUtils.getConfigs(projectPath);
    info.setInputConfigs(configs);
    info.setOutputConfigs(configs);
    return info;

  }

  static getProjectPath(documentURI: string): string {
    if (StringUtils.isNotEmpty(ExpressionCompletionsProvider.projectPath)) {
        return ExpressionCompletionsProvider.projectPath;
    }
    let matcher = ExpressionCompletionsProvider.PROJECT_PATH_REGEX.matcher(documentURI);
    if (!matcher.matches()) {
        return null;
    }
    ExpressionCompletionsProvider.projectPath = matcher.group(1);
    return ExpressionCompletionsProvider.projectPath;

  }

  static fillAttributeValueWithExpression(valuePrefix: string, request: ICompletionRequest, response: ICompletionResponse, offset: number, isNewMediator: boolean): void {
    let expression = ExpressionCompletionsProvider.extractExpressionString(valuePrefix, request, offset);
    if (StringUtils.isEmpty(expression)) {
        ExpressionCompletionUtils.addRootLevelCompletions(response, StringUtils.EMPTY);
    } else {
        let segment = ExpressionCompletionsProvider.parseExpression(expression);
        ExpressionCompletionsProvider.processCompletions(request, response, segment, isNewMediator);
    }

  }

  static extractExpressionString(valuePrefix: string, request: ICompletionRequest, offset: number): string {
    let expressionString = null;
    if (offset > 0) {
        expressionString = valuePrefix.substring(0, offset);
    } else {
        let startPosition = request.getReplaceRange().getStart();
        let endPosition = request.getPosition();
        let startOffset = request.getXMLDocument().offsetAt(startPosition);
        let endOffset = request.getXMLDocument().offsetAt(endPosition);
        let offsetDiff = endOffset - startOffset;
        if (offsetDiff > 0) {
            expressionString = valuePrefix.substring(0, offsetDiff);
        }
    }
    let pattern = Pattern.compile(ExpressionCompletionsProvider.EXPRESSION_REGEX);
    let matcher = pattern.matcher(expressionString);
    if (matcher.matches()) {
        return matcher.group(1);
    }
    return null;

  }

  static processCompletions(request: ICompletionRequest, response: ICompletionResponse, segment: ExpressionCompletionContext, isNewMediator: boolean): void {
    if (equals(ExpressionCompletionType.ROOT_LEVEL, segment.getType())) {
        let filterText = isEmpty(segment.getSegment()) ? StringUtils.EMPTY :
                get(segment.getSegment(), size(segment.getSegment()) - 1);
        ExpressionCompletionUtils.addRootLevelCompletions(response, filterText);
    } else if (equals(ExpressionCompletionType.OBJECT_TRAVERSAL, segment.getType())) {
        if (!isEmpty(segment.getSegment())) {
            let segments = segment.getSegment();
            if (contains(ExpressionConstants.ROOT_LEVEL_TOKENS, get(segments, 0))) {
                let info = ExpressionCompletionsProvider.getMediatorProperties(request, isNewMediator);
                if (info != null) {
                    ExpressionCompletionsProvider.getCompletionItems(request, response, info, segment);
                }
            }
        }
    } else if (equals(ExpressionCompletionType.OPERATOR, segment.getType())) {
        ExpressionCompletionUtils.addOperatorCompletions(request, response);
    }

  }

  static parseExpression(expression: string): ExpressionCompletionContext {
    let currentSegment = new ExpressionCompletionContext();
    let currentSegmentValue = new StringBuilder();
    for (let i = 0; i < expression.length; i++) {
        let c = expression.charAt(i);
        if (c == '.' || c == '[') {  
            currentSegment.addSegment(String(currentSegmentValue));
            currentSegment.setType(ExpressionCompletionType.OBJECT_TRAVERSAL);
            currentSegment.setNeedNext(true);
            currentSegmentValue = new StringBuilder();
        } else if (c == ',') {  
            currentSegment.addSegment(String(currentSegmentValue));
            currentSegment = new ExpressionCompletionContext(currentSegment, ExpressionCompletionType.ROOT_LEVEL);
            currentSegmentValue = new StringBuilder();
        } else if (c == '(' || ExpressionCompletionsProvider.isOperatorCharacter(c, String(currentSegmentValue))) {

            currentSegment = new ExpressionCompletionContext(currentSegment);
            currentSegment.addSegment(String(c));
            currentSegment = new ExpressionCompletionContext(currentSegment, ExpressionCompletionType.ROOT_LEVEL);
            currentSegmentValue = new StringBuilder();
        } else if (c == ' ') { 
            if (equals(ExpressionCompletionType.ROOT_LEVEL, currentSegment.getType()) ||
                    (currentSegment.getParent() != null && contains(ExpressionConstants.OPERATORS_CHARS, get(currentSegment.getParent().getSegment(), 0)))) {
                currentSegment.addSegment(String(currentSegmentValue));
                currentSegment =
                        new ExpressionCompletionContext(currentSegment, ExpressionCompletionType.ROOT_LEVEL);
                currentSegmentValue = new StringBuilder();
                continue;
            }
            currentSegment.setType(ExpressionCompletionType.OPERATOR);
            currentSegmentValue.append(c);
        } else if (c == ')') { 
            currentSegment.setType(ExpressionCompletionType.OPERATOR);
        } else if (c != '\'' && c != '\"' && c != ']') { 
            currentSegmentValue.append(c);
            if (i == expression.length - 1) {
                currentSegment.addSegment(String(currentSegmentValue));
                currentSegment.setNeedNext(false);
            }
        }
    }
    return currentSegment;

  }

  static isOperatorCharacter(c: string, string: string): boolean {
    if (contains(ExpressionConstants.OPERATORS_CHARS, String(c)) ||
            contains(ExpressionConstants.OPERATORS_CHARS, string + c)) {
        return true;
    }
    return false;

  }

  static getCompletionItems(request: ICompletionRequest, response: ICompletionResponse, info: MediatorTryoutInfo, context: ExpressionCompletionContext): void {
    let expressionSegments = context.getSegment();
    let mediatorInfo = info.getInput();
    let firstSegment = get(expressionSegments, 0);

    switch (firstSegment) {
        case ExpressionConstants.VARS:
            ExpressionCompletionsProvider.handleVariableCompletions(request, response, mediatorInfo, expressionSegments, context);
            break;
        case ExpressionConstants.PROPS:
        case ExpressionConstants.PROPERTIES:
            ExpressionCompletionsProvider.handleAttributeCompletions(request, response, mediatorInfo, expressionSegments, context);
            break;
        case ExpressionConstants.HEADERS:
            ExpressionCompletionsProvider.handleHeaderCompletions(request, response, mediatorInfo, expressionSegments, context);
            break;
        case ExpressionConstants.PARAMS:
            ExpressionCompletionsProvider.handleParamsCompletions(request, response, mediatorInfo, context);
            break;
        case ExpressionConstants.PAYLOAD:
            ExpressionCompletionsProvider.handlePayloadCompletions(request, response, mediatorInfo, context);
            break;
        case ExpressionConstants.CONFIGS:
            ExpressionCompletionsProvider.handleConfigCompletions(request, response, mediatorInfo, expressionSegments, context);
        default:

    }

  }

  static handleVariableCompletions(request: ICompletionRequest, response: ICompletionResponse, mediatorInfo: MediatorInfo, expressionSegments: string[], context: ExpressionCompletionContext): void {
    let properties = mediatorInfo.getVariables();
    let itemValues = ExpressionCompletionsProvider.findItemValues(expressionSegments.slice(1), properties,
            context.isNeedNext());
    ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);

  }

  static handleAttributeCompletions(request: ICompletionRequest, response: ICompletionResponse, mediatorInfo: MediatorInfo, expressionSegments: string[], context: ExpressionCompletionContext): void {
    let mediatorInfoProperties = mediatorInfo.getProperties();
    if (size(expressionSegments) == 2 && !context.isNeedNext()) {
        ExpressionCompletionUtils.addAttributeSecondLevelCompletions(request, response, get(expressionSegments, 1));
        return;
    }
    if (size(expressionSegments) > 1) {
        let properties = ExpressionCompletionsProvider.getAttributeProperties(mediatorInfoProperties, get(expressionSegments, 1));
        expressionSegments = expressionSegments.slice(2);
        let itemValues = ExpressionCompletionsProvider.findItemValues(expressionSegments, properties, context.isNeedNext());
        ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);
    } else {
        ExpressionCompletionUtils.addAttributeSecondLevelCompletions(request, response, StringUtils.EMPTY);
    }

  }

  static getAttributeProperties(attributes: Properties, segment: string): Property[] {
    switch (segment) {
        case ExpressionConstants.AXIS2:
            return attributes.getAxis2();
        case ExpressionConstants.SYNAPSE:
            return attributes.getSynapse();
        default:
            return [];
    }

  }

  static handleHeaderCompletions(request: ICompletionRequest, response: ICompletionResponse, mediatorInfo: MediatorInfo, expressionSegments: string[], context: ExpressionCompletionContext): void {
    let properties = mediatorInfo.getHeaders();
    let itemValues = ExpressionCompletionsProvider.findItemValues(expressionSegments.slice(1), properties,
            context.isNeedNext());
    ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);

  }

  static handleParamsCompletions(request: ICompletionRequest, response: ICompletionResponse, mediatorInfo: MediatorInfo, context: ExpressionCompletionContext): void {
    let expressionSegments = context.getSegment();
    let mediatorInfoParams = mediatorInfo.getParams();
    if (size(expressionSegments) == 1 || (size(expressionSegments) == 2 && !context.isNeedNext())) {
        ExpressionCompletionUtils.addParamsSecondLevelCompletions(request, response,
                size(expressionSegments) == 1 ? StringUtils.EMPTY : get(expressionSegments, 1));
    } else if (size(expressionSegments) > 1) {
        let params = ExpressionCompletionsProvider.getParams(mediatorInfoParams, get(expressionSegments, 1));
        let itemValues = ExpressionCompletionsProvider.findItemValues(expressionSegments.slice(2), params,
                context.isNeedNext());
        ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);
    }

  }

  static getParams(params: Params, type: string): Property[] {
    switch (type) {
        case ExpressionConstants.QUERY_PARAMS:
            return params.getQueryParams();
        case ExpressionConstants.PATH_PARAMS:
            return params.getPathParams();
        case ExpressionConstants.FUNCTION_PARAMS:
            return params.getFunctionParams();
        default:
            return [];
    }

  }

  static handlePayloadCompletions(request: ICompletionRequest, response: ICompletionResponse, mediatorInfo: MediatorInfo, context: ExpressionCompletionContext): void {
    let payload = mediatorInfo.getPayload();
    if (payload != null && Utils.isJSONObject(payload.getAsString())) {
        let payloadJsonObject = Utils.getJsonObject(payload.getAsString());
        if (size(context.getSegment()) == 1) {
            if (context.isNeedNext()) {
                let items = payloadJsonObject.keySet();
                ExpressionCompletionsProvider.addCompletionItems(request, response, items);
            }
            return;
        }
        let itemValues = ExpressionCompletionsProvider.traverseJsonObject(context.getSegment(), payloadJsonObject, context.isNeedNext());
        ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);
    }

  }

  static handleConfigCompletions(request: ICompletionRequest, response: ICompletionResponse, info: MediatorInfo, expressionSegments: string[], context: ExpressionCompletionContext): void {
    let properties = info.getConfigs();
    let itemValues = ExpressionCompletionsProvider.findItemValues(expressionSegments.slice(1), properties,
            context.isNeedNext());
    ExpressionCompletionsProvider.addCompletionItems(request, response, itemValues);

  }

  static addCompletionItems(request: ICompletionRequest, response: ICompletionResponse, itemValues: string[]): void {
    if (itemValues != null) {
        for (let item of itemValues) {
            ExpressionCompletionUtils.addCompletionItem(request, response, item, ExpressionConstants.OBJECT,
                    CompletionItemKind.Value, 0, false);
        }
    }

  }

  static findItemValues(expressionSegments: string[], properties: Property[], needNext: boolean): string[] {
    let property = null;
    let items = [];
    for (let p of properties) {
        items.push(p.getKey());
    }
    if (expressionSegments.length === 0) {
        return items;
    } else if (size(expressionSegments) == 1 && !needNext) {
        return ExpressionCompletionsProvider.filterCompletionItems(items, get(expressionSegments, 0));
    }
    for (let p of properties) {
        if (equals(p.getKey(), get(expressionSegments, 0))) {
            property = p;
            break;
        }
    }
    if (property != null) {
        let value = property.getValue();
        if (!StringUtils.isEmpty(value)) {
            return ExpressionCompletionsProvider.traverseJsonObject(expressionSegments, value, needNext);
        } else if (property.getProperties() != null) {
            return ExpressionCompletionsProvider.findItemValues(expressionSegments.slice(1),
                    property.getProperties(), needNext);
        }
    }
    return [];

  }

  static traverseJsonObject(expressionSegments: string[], value: string, needNext: boolean): string[];
  static traverseJsonObject(expressionSegments: string[], jsonObject: JsonObject, needNext: boolean): string[];
  static traverseJsonObject(...args: any[]): any {
    switch (args.length) {
      case 3: {
        if (typeof args[1] === 'string') {
          const [expressionSegments, value, needNext] = args;


                  if (!StringUtils.isEmpty(value) && Utils.isJSONObject(value)) {
                      let jsonObject = Utils.getJsonObject(value);
                      return ExpressionCompletionsProvider.traverseJsonObject(expressionSegments, jsonObject, needNext);
                  }
                  return [];

        } else if (args[1] instanceof JsonObject) {
          const [expressionSegments, jsonObject, needNext] = args;


                  if (isEmpty(expressionSegments) || jsonObject == null) {
                      return [];
                  }
                  let currentObject = jsonObject;
                  let filterText = StringUtils.EMPTY;

                  for (let i = 1; i < size(expressionSegments); i++) {
                      let segment = get(expressionSegments, i);
                      if (isEmpty(segment) || (i == size(expressionSegments) - 1 && !needNext)) {
                          filterText = segment;
                      } else {
                          if (currentObject.has(segment) && get(currentObject, segment).isJsonObject()) {
                              currentObject = currentObject.getAsJsonObject(segment);
                          } else {
                              return [];
                          }
                      }
                  }
                  return currentObject.isJsonObject() ?
                          ExpressionCompletionsProvider.filterCompletionItems(currentObject.keySet(), filterText) : [];

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static filterCompletionItems(items: string[], filter: string): string[] {
    if (isEmpty(filter)) {
        return items;
    } else {
        let filteredItems = [];
        for (let item of items) {
            if (item.startsWith(filter)) {
                filteredItems.push(item);
            }
        }
        return filteredItems;
    }

  }
}
