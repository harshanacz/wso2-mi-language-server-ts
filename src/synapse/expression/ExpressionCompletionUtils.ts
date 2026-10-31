// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/ExpressionCompletionUtils.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";
import { CompletionItem, CompletionItemKind, InsertTextFormat, SignatureInformation, ParameterInformation } from "../lsp.js";
import { equals, contains, size, get, Logger, Level, entrySet, unmodifiable, StringUtils } from "../../syntaxTree/javaCompat.js";
import { API } from "../../syntaxTree/pojo/api/API.js";
import { APIResource } from "../../syntaxTree/pojo/api/APIResource.js";
import { ConfigParser } from "../parser/config/ConfigParser.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { DOMElement } from "../../syntaxTree/dom/dom.js";
import { ExpressionConstants } from "./ExpressionConstants.js";
import { ExpressionParam } from "./pojo/ExpressionParam.js";
import { FunctionCompletionItem } from "./pojo/FunctionCompletionItem.js";
import { Functions } from "./pojo/Functions.js";
import { InvalidMediator } from "../../syntaxTree/pojo/mediator/InvalidMediator.js";
import { JsonArray } from "../gson.js";
import { JsonElement } from "../gson.js";
import { JsonObject } from "../gson.js";
import { MediatorFactoryFinder } from "../../syntaxTree/factory/mediators/MediatorFactoryFinder.js";
import { Path } from "../host/nio.js";
import { Position } from "../lsp.js";
import { Property } from "../mediator/tryout/pojo/Property.js";
import { Proxy } from "../../syntaxTree/pojo/proxy/Proxy.js";
import { STNode } from "../../syntaxTree/stNode.js";
import { StandardCharsets } from "../host/nio.js";
import { SyntaxTreeGenerator } from "../../syntaxTree/SyntaxTreeGenerator.js";
import { Template } from "../../syntaxTree/pojo/template/Template.js";
import { Utils } from "../../syntaxTree/utils.js";
import { readResourceText } from "../resources.js";
import { Utils as SchemaVisitorUtils } from "../mediator/schema/generate/visitor/Utils.js";
import { JFile } from "../host/JFile.js";

export class ExpressionCompletionUtils {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("ExpressionCompletionUtils");

  static readonly FUNCTIONS_JSON_PATH: string = "org/eclipse/lemminx/expression/functions.json";

  static readonly FUNCTIONS: Map<string, Functions> = new Map();

  static readonly OPERATOR_COMPLETIONS: string[][] = [];

  static {
    try {
        ExpressionCompletionUtils.loadFunctionCompletions();
    } catch (e) {
        ExpressionCompletionUtils.LOGGER.log(Level.SEVERE, "Failed to load function completions", e);
    }

    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["+", "Addition"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["-", "Subtraction"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["*", "Multiplication"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["/", "Division"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["? ${1} : ${2}", "Ternary operator"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push([">", "Greater than"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["<", "Less than"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push([">=", "Greater than or equal"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["<=", "Less than or equal"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["==", "Equal"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["!=", "Not equal"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["&&", "Logical AND"]);
    ExpressionCompletionUtils.OPERATOR_COMPLETIONS.push(["||", "Logical OR"]);

  }

  static loadFunctionCompletions(): void {
    let jsonContent = readResourceText(ExpressionCompletionUtils.FUNCTIONS_JSON_PATH);
    if (jsonContent == null) {
      ExpressionCompletionUtils.LOGGER.log(Level.SEVERE, "Failed to load synapse expression functions");
      throw new Error("Failed to load synapse expression functions");
    }
    let functionsObject = Utils.getJsonObject(jsonContent);
    if (functionsObject != null) {
      for (const key of functionsObject.keySet()) {
        let functionList: CompletionItem[] = [];
        let functionCategory = functionsObject.getAsJsonObject(key);
        let jsonArray = functionCategory.getAsJsonArray(ExpressionConstants.ITEMS);
        for (let element of jsonArray) {
          let jsonObject = element.getAsJsonObject();
          let label = jsonObject.get(ExpressionConstants.LABEL).getAsString();
          let insertText = jsonObject.get(ExpressionConstants.INSERT_TEXT).getAsString();
          let detail = jsonObject.get(ExpressionConstants.DETAIL).getAsString();
          let order = jsonObject.get(ExpressionConstants.CATEGORY).getAsInt();
          let signature = jsonObject.getAsJsonObject(ExpressionConstants.SIGNATURE);
          functionList.push(ExpressionCompletionUtils.createFunctionCompletionItem(label, insertText, signature, detail,
                  CompletionItemKind.Function, order));
        }
        let sortText = functionCategory.get(ExpressionConstants.SORT_TEXT).getAsString();
        ExpressionCompletionUtils.FUNCTIONS.set(key, new Functions(sortText, functionList));
      }
    }
  }

  static getFunctions(): Map<string, Functions> {
    return unmodifiable(ExpressionCompletionUtils.FUNCTIONS);

  }

  static addRootLevelCompletions(response: ICompletionResponse, filterText: string): void {
    let completionItems = [];
    ExpressionCompletionUtils.getRootLevelObjectCompletions(completionItems);
    ExpressionCompletionUtils.getFunctionCompletions(completionItems);
    for (let item of completionItems) {
        if (item.getLabel().startsWith(filterText)) {
            response.addCompletionItem(item);
        }
    }

  }

  static getRootLevelObjectCompletions(items: CompletionItem[]): void {
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.VARS, ExpressionConstants.VARS,
            "Access defined variables", CompletionItemKind.Keyword, 0, false));
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.PROPS, ExpressionConstants.PROPS,
            "Access mediation attributes", CompletionItemKind.Keyword, 0, false));
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.PARAMS, ExpressionConstants.PARAMS,
            "Access params", CompletionItemKind.Keyword, 0, false));
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.HEADERS, ExpressionConstants.HEADERS,
            "Access defined headers", CompletionItemKind.Keyword, 0, false));
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.PAYLOAD, ExpressionConstants.PAYLOAD,
            "Access defined payload", CompletionItemKind.Keyword, 0, false));
    items.push(ExpressionCompletionUtils.createCompletionItem(ExpressionConstants.CONFIGS, ExpressionConstants.CONFIGS,
            "Access defined configurables", CompletionItemKind.Keyword, 0, false));

  }

  static getFunctionCompletions(items: CompletionItem[]): void {
    let functionCompletions = [];
    for (const functions of ExpressionCompletionUtils.FUNCTIONS.values()) functionCompletions.push(...functions.getItems());
    items.push(...unmodifiable(functionCompletions));

  }

  static addOperatorCompletions(request: ICompletionRequest, response: ICompletionResponse): void {
    for (let i = 0; i < size(ExpressionCompletionUtils.OPERATOR_COMPLETIONS); i++) {
        let operator = get(ExpressionCompletionUtils.OPERATOR_COMPLETIONS, i);
        ExpressionCompletionUtils.addCompletionItem(request, response, get(operator, 0), get(operator, 1), CompletionItemKind.Operator, i,
                contains(get(operator, 0), "${"));
    }

  }

  static addCompletionItem(request: ICompletionRequest, response: ICompletionResponse, completion: string, detail: string, kind: CompletionItemKind, order: number, isSnippet: boolean): CompletionItem;
  static addCompletionItem(request: ICompletionRequest, response: ICompletionResponse, label: string, insertText: string, detail: string, kind: CompletionItemKind, order: number, isSnippet: boolean): CompletionItem;
  static addCompletionItem(...args: any[]): any {
    switch (args.length) {
      case 7: {
        const [request, response, completion, detail, kind, order, isSnippet] = args;


                let insertText = contains(completion, " ") ? "['" + completion + "']" : completion;
                return ExpressionCompletionUtils.addCompletionItem(request, response, completion, insertText, detail, kind, order, isSnippet);

        break;
      }
      case 8: {
        const [request, response, label, insertText, detail, kind, order, isSnippet] = args;


                let item = new CompletionItem();
                item.setLabel(label);
                item.setKind(kind);
                item.setDetail(detail);
                item.setInsertText(insertText);
                item.setSortText(order + "_" + insertText);
                item.setInsertTextFormat(isSnippet ? InsertTextFormat.Snippet : InsertTextFormat.PlainText);
                if (request.isResolveDocumentationSupported()) {
                    ExpressionCompletionUtils.addResolveData(request, item, "AttributeValueCompletionResolver");
                }
                response.addCompletionItem(item);
                return item;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static createFunctionCompletionItem(label: string, insertText: string, signature: JsonObject, detail: string, kind: CompletionItemKind, order: number): CompletionItem {
    let item = new FunctionCompletionItem();
    item.setLabel(label);
    item.setKind(kind);
    item.setDetail(detail);
    item.setInsertText(insertText);
    item.setSortText(order + "_" + insertText);
    item.setInsertTextFormat(InsertTextFormat.Snippet);

    if (signature != null) {
        let signatureInformation = new SignatureInformation();
        signatureInformation.setLabel(label);
        let parameterInformation = ExpressionCompletionUtils.createParameterInformation(signature);
        signatureInformation.setParameters(parameterInformation);
        ((item as FunctionCompletionItem)).setSignature(signatureInformation);
    }
    return item;

  }

  static createParameterInformation(signature: JsonObject): ParameterInformation[] {
    let parameterInformation = [];
    for (let entry of entrySet(signature)) {
        let parameter = new ParameterInformation();
        parameter.setLabel(entry.getKey());
        parameter.setDocumentation(entry.getValue().getAsString());
        parameterInformation.push(parameter);
    }
    return parameterInformation;

  }

  static cloneCompletionItem(item: CompletionItem): CompletionItem {
    let newItem = new CompletionItem();
    newItem.setLabel(item.getLabel());
    newItem.setKind(item.getKind());
    newItem.setDetail(item.getDetail());
    newItem.setInsertText(item.getInsertText());
    newItem.setSortText(item.getSortText());
    newItem.setInsertTextFormat(item.getInsertTextFormat());
    return newItem;

  }

  static createCompletionItem(label: string, insertText: string, detail: string, kind: CompletionItemKind, order: number, isSnippet: boolean): CompletionItem {
    let item = new CompletionItem();
    item.setLabel(label);
    item.setKind(kind);
    item.setDetail(detail);
    item.setInsertText(insertText);
    item.setSortText(order + "_" + insertText);
    item.setInsertTextFormat(isSnippet ? InsertTextFormat.Snippet : InsertTextFormat.PlainText);
    return item;

  }

  static addResolveData(request: ICompletionRequest, item: CompletionItem, participantId: string): void {
    // DataEntryField.createCompletionData: only used when the client resolves documentation (never for expressions).
    let data = new JsonObject();
    data.addProperty("participantId", participantId);
    item.setData(data);

  }

  static addAttributeSecondLevelCompletions(request: ICompletionRequest, response: ICompletionResponse, filterText: string): void {
    ExpressionConstants.ATTRIBUTES_SECOND_LEVEL.forEach(value => {
        if (value.startsWith(filterText)) {
            ExpressionCompletionUtils.addCompletionItem(request, response, value, value, "Attribute", CompletionItemKind.Keyword,
                    0, false);
        }
    });

  }

  static addParamsSecondLevelCompletions(request: ICompletionRequest, response: ICompletionResponse, filterText: string): void {
    ExpressionConstants.PARAMS_SECOND_LEVEL.forEach(value => {
        if (value.startsWith(filterText)) {
            ExpressionCompletionUtils.addCompletionItem(request, response, value, value, "Params", CompletionItemKind.Keyword,
                    0, false);
        }
    });

  }

  static getConfigs(projectPath: string): Property[] {
    let configurables = ConfigParser.getConfigDetails(projectPath);
    if (configurables != null) {
        let configs = [];
        for (let config of configurables) {
            configs.push(new Property(config.getKey(), config.getType()));
        }
        return configs;
    }
    return [];

  }

  static isValidRequest(param: ExpressionParam): boolean {
    return param != null && param.getPosition() != null;

  }

  static getMediatorPosition(documentUri: string, position: Position): Position;
  static getMediatorPosition(document: DOMDocument, position: Position): Position;
  static getMediatorPosition(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (typeof args[0] === 'string') {
          const [documentUri, position] = args;


                  return ExpressionCompletionUtils.getMediatorPosition(Utils.getDOMDocument(new JFile(documentUri)), position);

        } else if (args[0] instanceof DOMDocument) {
          const [document, position] = args;


                  if (document == null) {
                      return null;
                  }
                  let offset = document.offsetAt(position);
                  let node = document.findNodeAt(offset);
                  let mediator = MediatorFactoryFinder.getInstance().getMediator(node);
                  if (mediator != null && !(mediator instanceof InvalidMediator)) {
                      return position;
                  }
                  if (offset > node.getStart() && offset < node.getEnd()) {
                      let children = node.getChildren();
                      let currentNode = null;
                      for (let child of children) {
                          if (offset <= child.getEnd()) {
                              break;
                          }
                          currentNode = child;
                      }
                      if (currentNode != null) {
                          return document.positionAt(currentNode.getStart());
                      }
                  }
                  if (node instanceof DOMElement) {
                      return document.positionAt(((node as DOMElement)).getStartTagCloseOffset());
                  } else {
                      let parentNode = node.getParentNode();
                      if (parentNode instanceof DOMElement) {
                          return document.positionAt(((parentNode as DOMElement)).getStartTagCloseOffset());
                      }
                  }
                  return null;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static getInputPayload(projectPath: string, documentUri: string, position: Position): string;
  static getInputPayload(projectPath: string, fileName: string, key: string): string;
  static getInputPayload(...args: any[]): any {
    switch (args.length) {
      case 3: {
        if (args[2] instanceof Position) {
          const [projectPath, documentUri, position] = args;


                  try {
                      let name = Utils.getFileName(new JFile(documentUri));
                      let document = Utils.getDOMDocumentFromPath(documentUri);
                      let node = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
                      if (node instanceof API) {
                          let resourceKey = ExpressionCompletionUtils.getAPIResourceKey((node as API), position);
                          if ((resourceKey != null)) {
                              return ExpressionCompletionUtils.getInputPayload(projectPath, name, resourceKey);
                          }
                      } else {
                          return ExpressionCompletionUtils.getInputPayload(projectPath, name, StringUtils.EMPTY);
                      }
                  } catch (e) {
                      ExpressionCompletionUtils.LOGGER.log(Level.SEVERE, "Error while reading the document", e);
                  }
                  return StringUtils.EMPTY;

        } else if (typeof args[2] === 'string') {
          const [projectPath, fileName, key] = args;


                  let inputFilePath = Path.of(projectPath, ".tryout", fileName + ".json");
                  if (inputFilePath.toFile().exists()) {
                      let fileContent = Utils.readFile(inputFilePath.toFile());
                      let root = Utils.getJsonObject(fileContent);
                      if (root != null) {
                          if (StringUtils.isNotEmpty(key)) {
                              let resourceScope = root.getAsJsonObject(key);
                              if (resourceScope == null) {
                                  return ExpressionCompletionUtils.extractInputPayload(root, null);
                              }
                              return ExpressionCompletionUtils.extractInputPayload(resourceScope, root);
                          }
                          return ExpressionCompletionUtils.extractInputPayload(root, null);
                      }
                  }
                  return StringUtils.EMPTY;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static getAPIResourceKey(api: API, position: Position): string | undefined {
    if (api == null) {
        return undefined;
    }
    let resources = api.getResource();
    for (let resource of resources) {
        if (ExpressionCompletionUtils.isNodeInRange(resource, position)) {
            if (resource.getUriTemplate() != null) {
                return (resource.getUriTemplate());
            } else {
                return (resource.getUrlMapping());
            }
        }
    }
    return undefined;

  }

  static extractInputPayload(scopePayloads: JsonObject, commonScope: JsonObject): string {
    let defaultPayloadNameObj = get(scopePayloads, Constant.DEFAULT_REQUEST);
    if (defaultPayloadNameObj != null) {
        let defaultName = defaultPayloadNameObj.getAsString();
        let scopeRequests = get(scopePayloads, Constant.REQUESTS);
        if (scopeRequests != null && scopeRequests.isJsonArray()) {
            let match = ExpressionCompletionUtils.findRequestByName(scopeRequests.getAsJsonArray(), defaultName);
            if (match != null) {
                return String(get(match.getAsJsonObject(), Constant.CONTENT));
            }
        }
        if (commonScope != null) {
            let commonRequests = get(commonScope, Constant.REQUESTS);
            if (commonRequests != null && commonRequests.isJsonArray()) {
                let match = ExpressionCompletionUtils.findRequestByName(commonRequests.getAsJsonArray(), defaultName);
                if (match != null) {
                    return String(get(match.getAsJsonObject(), Constant.CONTENT));
                }
            }
        }
    }
    return StringUtils.EMPTY;

  }

  static findRequestByName(requests: JsonArray, name: string): JsonElement {
    return (requests.asList()
            .filter(p => equals(name, get(p.getAsJsonObject(), Constant.NAME).getAsString())
                    && p.getAsJsonObject().has(Constant.CONTENT))[0] ?? null);

  }

  static getLastMediatorPosition(documentUri: string, currentMediatorPosition: Position): Position {
    let document = Utils.getDOMDocument(new JFile(documentUri));
    let node = SyntaxTreeGenerator.buildTree(document.getDocumentElement());
    if (node == null) {
        return currentMediatorPosition;
    }
    switch (node.getTag()) {
        case Constant.API:
            return ExpressionCompletionUtils.getLastMediatorPositionInAPI((node as API), currentMediatorPosition);
        case Constant.SEQUENCE:
            return node.getRange().endTagRange.start;
        case Constant.PROXY:
            return ExpressionCompletionUtils.getLastMediatorPositionInProxy((node as Proxy), currentMediatorPosition);
        case Constant.TEMPLATE:
            return ((node as Template)).getSequence().getRange().endTagRange.start;
    }
    return currentMediatorPosition;

  }

  static getLastMediatorPositionInAPI(node: API, currentMediatorPosition: Position): Position {
    let resources = node.getResource();
    if (resources.length > 0) {
        for (let resource of resources) {
            if (ExpressionCompletionUtils.isNodeInRange(resource, currentMediatorPosition)) {
                return ExpressionCompletionUtils.getLastMediatorPositionInAPIResource(resource, currentMediatorPosition);
            }
        }
    }
    return currentMediatorPosition;

  }

  static getLastMediatorPositionInAPIResource(resource: APIResource, currentMediatorPosition: Position): Position {
    if (ExpressionCompletionUtils.isNodeInRange(resource.getInSequence(), currentMediatorPosition)) {
        return resource.getInSequence().getRange().endTagRange.start;
    } else if (ExpressionCompletionUtils.isNodeInRange(resource.getOutSequence(), currentMediatorPosition)) {
        return resource.getOutSequence().getRange().endTagRange.start;
    } else if (ExpressionCompletionUtils.isNodeInRange(resource.getFaultSequence(), currentMediatorPosition)) {
        return resource.getFaultSequence().getRange().endTagRange.start;
    }
    return currentMediatorPosition;

  }

  static getLastMediatorPositionInProxy(node: Proxy, currentMediatorPosition: Position): Position {
    if (ExpressionCompletionUtils.isNodeInRange(node.getTarget().getInSequence(), currentMediatorPosition)) {
        return node.getTarget().getInSequence().getRange().endTagRange.start;
    } else if (ExpressionCompletionUtils.isNodeInRange(node.getTarget().getOutSequence(), currentMediatorPosition)) {
        return node.getTarget().getOutSequence().getRange().endTagRange.start;
    } else if (ExpressionCompletionUtils.isNodeInRange(node.getTarget().getFaultSequence(), currentMediatorPosition)) {
        return node.getTarget().getFaultSequence().getRange().endTagRange.start;
    }
    return currentMediatorPosition;

  }

  static isNodeInRange(node: STNode, position: Position): boolean {
    return SchemaVisitorUtils.checkNodeInRange(node,
            position);

  }

  constructor() {

  }
}
