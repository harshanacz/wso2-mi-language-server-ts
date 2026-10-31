// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/ExpressionHelperProvider.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";
import { CompletionItem } from "../lsp.js";
import { isEmpty, contains, get, entrySet, StringUtils } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { Edit } from "../mediator/tryout/pojo/Edit.js";
import { ExpressionCompletionUtils } from "./ExpressionCompletionUtils.js";
import { ExpressionConstants } from "./ExpressionConstants.js";
import { ExpressionParam } from "./pojo/ExpressionParam.js";
import { Functions } from "./pojo/Functions.js";
import { HelperPanelData } from "./pojo/HelperPanelData.js";
import { HelperPanelItem } from "./pojo/HelperPanelItem.js";
import { JsonElement } from "../gson.js";
import { JsonPrimitive } from "../gson.js";
import { MediatorInfo } from "../mediator/tryout/pojo/MediatorInfo.js";
import { MediatorTryoutInfo } from "../mediator/tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../mediator/tryout/pojo/MediatorTryoutRequest.js";
import { Params } from "../mediator/tryout/pojo/Params.js";
import { Path } from "../host/nio.js";
import { Position } from "../lsp.js";
import { Properties } from "../mediator/tryout/pojo/Properties.js";
import { Property } from "../mediator/tryout/pojo/Property.js";
import { Range } from "../lsp.js";
import { ServerLessTryoutHandler } from "../mediator/schema/generate/ServerLessTryoutHandler.js";
import { Utils } from "../../syntaxTree/utils.js";
import { Type as PropType } from "../mediator/tryout/pojo/Properties.js";
import { Type as ParamType } from "../mediator/tryout/pojo/Params.js";

export class ExpressionHelperProvider {
  static readonly __fields: string[] = ["tryoutHandler", "projectPath"];

  static readonly PROPERTIES_SECOND_LEVEL: Map<PropType, string> = new Map([[PropType.SYNAPSE, "properties.synapse"], [PropType.AXIS2, "properties.axis2"]]);

  static readonly PARAMS_SECOND_LEVEL: Map<PropType | ParamType, string> = new Map([[ParamType.QUERY, "params.queryParams"], [ParamType.PATH, "params.pathParams"], [ParamType.FUNC, "params.functionParams"]]);

  tryoutHandler?: ServerLessTryoutHandler;

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.tryoutHandler = new ServerLessTryoutHandler(projectPath);

  }

  getExpressionHelperData(param: ExpressionParam): HelperPanelData {
    if (!ExpressionCompletionUtils.isValidRequest(param)) {
        return this.getBasicHelperData();
    }
    if (param.getNeedLastMediator()) {
        return this.getLastMediatorHelperData(param);
    }
    try {
        let isNewMediator = this.isNewMediator(param);
        let payload =
                ExpressionCompletionUtils.getInputPayload(this.projectPath, param.getDocumentUri(), param.getPosition());
        if (param.getPosition() == null) {
            return this.getBasicHelperData();
        }
        let request =
                new MediatorTryoutRequest(param.getDocumentUri(), param.getPosition().getLine(),
                        param.getPosition().getCharacter(), payload, null);
        let tryoutInfo = this.getMediatorTryoutInfo(request, isNewMediator);
        let propsData = isNewMediator ? tryoutInfo.getInput() : tryoutInfo.getInput();
        return this.createHelperData(propsData, ExpressionCompletionUtils.getFunctions());
    } catch (e) {
        return this.getBasicHelperData();
    }

  }

  getLastMediatorHelperData(param: ExpressionParam): HelperPanelData {
    if (!ExpressionCompletionUtils.isValidRequest(param)) {
        return this.getBasicHelperData();
    }
    try {
        let documentTruePath = Path.of(Utils.getAbsolutePath(param.getDocumentUri()));
        let position =
                ExpressionCompletionUtils.getLastMediatorPosition(String(documentTruePath), param.getPosition());
        return this.getExpressionHelperData(new ExpressionParam(String(documentTruePath), position));
    } catch (e) {
        return this.getBasicHelperData();
    }

  }

  isNewMediator(param: ExpressionParam): boolean {
    let mediatorPosition =
            ExpressionCompletionUtils.getMediatorPosition(param.getDocumentUri(), param.getPosition());
    return mediatorPosition != param.getPosition();

  }

  getBasicHelperData(payload: string): HelperPanelData;
  getBasicHelperData(): HelperPanelData;
  getBasicHelperData(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [payload] = args;


                let helperData = this.getBasicHelperData();
                helperData.setPayload(this.createDataList(new JsonPrimitive(payload)));
                return helperData;

        break;
      }
      case 0: {
        let helperData = new HelperPanelData();
        let configurables = ExpressionCompletionUtils.getConfigs(this.projectPath);
        helperData.setConfigs(this.createDataList(configurables, ExpressionConstants.CONFIGS));
        this.setFunctions(helperData, ExpressionCompletionUtils.getFunctions());
        return helperData;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getMediatorTryoutInfo(request: MediatorTryoutRequest, isNewMediator: boolean): MediatorTryoutInfo {

    if (isNewMediator) {
        let position = new Position(request.getLine(), request.getColumn());
        let edit = new Edit("<log />", new Range(position, position));
        let editArray = new Array(1);
        editArray[0] = edit;
        request = new MediatorTryoutRequest(request.getFile(), request.getLine(), request.getColumn() + 1,
                request.getInputPayload(), editArray);
    }
    let info = this.tryoutHandler.handle(request);
    let configurables = ExpressionCompletionUtils.getConfigs(this.projectPath);
    info.setInputConfigs(configurables);
    info.setOutputConfigs(configurables);
    return info;

  }

  createHelperData(propsData: MediatorInfo, functions: Map<string, Functions>): HelperPanelData {
    let helperData = new HelperPanelData();
    this.setFunctions(helperData, functions);
    helperData.setVariables(this.createDataList(propsData.getVariables(), ExpressionConstants.VARS));
    helperData.setPayload(this.createDataList(propsData.getPayload()));
    helperData.setProperties(this.createDataList(propsData.getProperties()));
    helperData.setParams(this.createDataList(propsData.getParams()));
    helperData.setConfigs(this.createDataList(propsData.getConfigs(), ExpressionConstants.CONFIGS));
    helperData.setHeaders(this.createDataList(propsData.getHeaders(), ExpressionConstants.HEADERS));
    return helperData;

  }

  setFunctions(helperData: HelperPanelData, functions: Map<string, Functions>): void {
    let clonedFunctionsMap = new Map();
    for (let entry of entrySet(functions)) {
        let key = entry.getKey();
        let value = entry.getValue();
        clonedFunctionsMap.set(key, value.deepCopy());
    }
    helperData.setFunctions(clonedFunctionsMap);

  }

  createDataList(attributes: Properties): CompletionItem[];
  createDataList(params: Params): CompletionItem[];
  createDataList(payload: JsonPrimitive): CompletionItem[];
  createDataList(properties: Property[], expressionPrefix: string): CompletionItem[];
  createDataList(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof Properties) {
          const [attributes] = args;


                  let dataList = [];

                  for (let entry of entrySet(ExpressionHelperProvider.PROPERTIES_SECOND_LEVEL)) {
                      let label = Utils.toCamelCase(String(entry.getKey()));
                      let item = new HelperPanelItem(label, entry.getValue());
                      item.addChildren(this.createDataList(attributes.getPropertiesByType(entry.getKey()), entry.getValue()));
                      dataList.push(item);
                  }
                  return dataList;

        } else if (args[0] instanceof Params) {
          const [params] = args;


                  let dataList = [];
                  for (let entry of entrySet(ExpressionHelperProvider.PARAMS_SECOND_LEVEL)) {
                      let label = Utils.toCamelCase(String(entry.getKey()));
                      let item = new HelperPanelItem(label, entry.getValue());
                      item.addChildren(this.createDataList(params.getPropertiesByType(entry.getKey()), entry.getValue()));
                      dataList.push(item);
                  }
                  return dataList;

        } else if (args[0] instanceof JsonPrimitive) {
          const [payload] = args;


                  let dataList = [];
                  if (payload != null) {
                      let element = Utils.getJsonElement(payload.getAsString());
                      if (element != null) {
                          let item = new HelperPanelItem(ExpressionConstants.PAYLOAD, ExpressionConstants.PAYLOAD);
                          ((item as HelperPanelItem)).addChildren(this.addJsonChildren(element, ExpressionConstants.PAYLOAD));
                          dataList.push(item);
                      }
                  }
                  return dataList;

        }
        break;
      }
      case 2: {
        const [properties, expressionPrefix] = args;


                let dataList = [];
                for (let variable of properties) {
                    let variableName = variable.getKey();
                    let referenceValue = contains(variableName, Constant.DOT) || contains(variableName, Constant.SPACE) ?
                            "[\"" + variableName + "\"]" : variableName;
                    let expression = expressionPrefix + Constant.DOT + referenceValue;
                    let item = new HelperPanelItem(variable.getKey(), expression);
                    let value = variable.getValue();
                    if (variable.getProperties() != null && !isEmpty(variable.getProperties())) {
                        item.addChildren(this.createDataList(variable.getProperties(), expression));
                    } else if (value != null) {
                        item.addChildren(this.addJsonChildren(Utils.getJsonElement(value), expression));
                    }
                    dataList.push(item);
                }
                return dataList;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  addJsonChildren(jsonObject: JsonElement, expressionPrefix: string): CompletionItem[] {
    let dataList = [];
    if (jsonObject != null) {
        if (jsonObject.isJsonObject()) {
            for (let entry of entrySet(jsonObject.getAsJsonObject())) {
                let expressionSuffix = this.getExpressionSuffix(entry.getKey());
                let expression = expressionPrefix + expressionSuffix;
                let item = new HelperPanelItem(entry.getKey(), expression);
                let value = entry.getValue();
                item.addChildren(this.addJsonChildren(value, expression));
                dataList.push(item);
            }
        } else if (jsonObject.isJsonArray()) {
            let jsonArray = jsonObject.getAsJsonArray();
            expressionPrefix = expressionPrefix + ExpressionConstants.ARRAY_COMPLETION_INSERT_TEXT;
            let item =
                    new HelperPanelItem(ExpressionConstants.ARRAY_COMPLETION_LABEL, expressionPrefix);
            item.addChildren(this.addJsonChildren(get(jsonArray, 0), expressionPrefix));
            dataList.push(item);
        }
    }
    return dataList;

  }

  getExpressionSuffix(key: string): string {
    if (contains(key, Constant.DOT) || contains(key, " ")) {
        return "[\"" + key + "\"]";
    }
    return Constant.DOT + key;

  }
}
