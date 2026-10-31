// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/Utils.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, contains, size, get, matches, jsplit, format, Logger, Level, StringBuilder, StringUtils } from "../../../../../syntaxTree/javaCompat.js";
import { Utils as SynUtils } from "../../../../../syntaxTree/utils.js";
import { AbstractMediatorVisitor } from "../../../../AbstractMediatorVisitor.js";
import { ConfigFinder } from "../../../../utils/ConfigFinder.js";
import { Constant } from "../../../../../syntaxTree/constant.js";
import { ExpressionConstants } from "../../../../expression/ExpressionConstants.js";
import { JsonArray } from "../../../../gson.js";
import { JsonObject } from "../../../../gson.js";
import { JsonPrimitive } from "../../../../gson.js";
import { Mediator } from "../../../../../syntaxTree/pojo/mediator/Mediator.js";
import { MediatorSchemaVisitor } from "./MediatorSchemaVisitor.js";
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { NamedSequence } from "../../../../../syntaxTree/pojo/NamedSequence.js";
import { Position } from "../../../../lsp.js";
import { Properties } from "../../../tryout/pojo/Properties.js";
import { Property } from "../../../tryout/pojo/Property.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Sequence } from "../../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { SequenceVisitor } from "./SequenceVisitor.js";
import { SyntaxTreeGenerator } from "../../../../../syntaxTree/SyntaxTreeGenerator.js";
import { Template } from "../../../../../syntaxTree/pojo/template/Template.js";
import { JFile } from "../../../../host/JFile.js";

export class Utils {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("Utils");

  static visitSequence(projectPath: string, seq: Sequence, info: MediatorTryoutInfo, position: Position): void;
  static visitSequence(projectPath: string, seq: Sequence, info: MediatorTryoutInfo, position: Position, isSplitAndAggregate: boolean): void;
  static visitSequence(...args: any[]): any {
    switch (args.length) {
      case 4: {
        const [projectPath, seq, info, position] = args;


                Utils.visitSequence(projectPath, seq, info, position, false);

        break;
      }
      case 5: {
        const [projectPath, seq, info, position, isSplitAndAggregate] = args;


                if (seq != null && Utils.needToVisit(seq, position)) {
                    let isSplit = Utils.splitPayloadIfRequired(info, isSplitAndAggregate);
                    let mediatorList = seq.getMediatorList();
                    if (mediatorList != null) {
                        Utils.visitMediators(projectPath, mediatorList, info, position);
                    }
                    if (Utils.isAggregateNeeded(isSplit, seq, position)) {
                        Utils.aggregatePayload(info);
                    }
                }

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static needToVisit(node: STNode, position: Position): boolean {
    let line = node.getRange().startTagRange.start.getLine();
    let column = node.getRange().startTagRange.start.getCharacter();
    if (line > position.getLine() || (line == position.getLine() && column > position.getCharacter())) {
        return false;
    }
    return true;

  }

  static splitPayloadIfRequired(info: MediatorTryoutInfo, isSplitAndAggregate: boolean): boolean {
    if (isSplitAndAggregate) {
        let input = info.getOutput().getPayload();
        if (input != null) {
            let payload = input.getAsString();
            let jsonArray = SynUtils.getJsonArray(payload);
            if (jsonArray != null) {
                let payloadElement = new JsonPrimitive(String(get(jsonArray, 0)));
                info.setInputPayload(payloadElement);
                info.setOutputPayload(payloadElement);
                return true;
            }
        }
    }
    return false;

  }

  static isSplitNeeded(isSplit: boolean, sequence: Sequence, position: Position): boolean {
    if (!isSplit) {
        return false;
    }
    return Utils.checkNodeInRange(sequence, position);

  }

  static isAggregateNeeded(isSplit: boolean, sequence: Sequence, position: Position): boolean {
    if (!isSplit) {
        return false;
    }
    return Utils.isOutOfSequence(sequence, position) || !Utils.checkNodeInRange(sequence, position);

  }

  static aggregatePayload(info: MediatorTryoutInfo): void {
    let output = info.getOutput().getPayload();
    if (output != null) {
        let payload = output.getAsString();
        let outputElement = SynUtils.getJsonElement(payload);
        let jsonArray = new JsonArray();
        jsonArray.push(outputElement);
        info.setOutputPayload(new JsonPrimitive(String(jsonArray)));
    }

  }

  static visitMediators(projectPath: string, mediatorList: Mediator[], info: MediatorTryoutInfo, position: Position): void;
  static visitMediators(projectPath: string, mediatorList: Mediator[], info: MediatorTryoutInfo, position: Position, needRangeCheck: boolean): void;
  static visitMediators(...args: any[]): any {
    switch (args.length) {
      case 4: {
        const [projectPath, mediatorList, info, position] = args;


                Utils.visitMediators(projectPath, mediatorList, info, position, true);

        break;
      }
      case 5: {
        const [projectPath, mediatorList, info, position, needRangeCheck] = args;


                if (mediatorList == null || isEmpty(mediatorList) || !Utils.needToVisit(get(mediatorList, 0), position)) {
                    return;
                }
                info.replaceInputWithOutput();
                let mediatorVisitor = new MediatorSchemaVisitor(projectPath, info, position);
                for (let mediator of mediatorList) {
                    Utils.visitMediator(mediator, mediatorVisitor);
                    if (needRangeCheck && Utils.checkNodeInRange(mediator, position)) {
                        break;
                    }
                    info.replaceInputWithOutput();
                }

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static visitMediator(node: Mediator, visitor: AbstractMediatorVisitor): void {
    let tag = node.getTag();
    tag = SynUtils.sanitizeTag(tag);

    let visitFn: string | undefined;
    visitFn = "visit" + tag.substring(0, 1).toUpperCase() + tag.substring(1);
    const method = (visitor as any)[visitFn];
    if (typeof method !== "function") {
        Utils.LOGGER.log(Level.SEVERE, "No visit method found for mediator: " + tag);
        return;
    }
    try {
        method.call(visitor, node);
    } catch (e) {
        Utils.LOGGER.log(Level.SEVERE, "Error while invoking visit method for mediator: " + tag, e);
    }
  }

  static checkNodeInRange(node: STNode, position: Position): boolean {
    let line = position.getLine();
    let column = position.getCharacter();
    if (node == null) {
        return false;
    }
    let startLine = node.getRange().startTagRange.start.getLine();
    let startColumn = node.getRange().startTagRange.start.getCharacter();
    let endLine: number | undefined;
    let endColumn: number | undefined;
    if (node.getRange().endTagRange == null) {
        endLine = node.getRange().startTagRange.end.getLine();
        endColumn = node.getRange().startTagRange.end.getCharacter();
    } else {
        endLine = node.getRange().endTagRange.end.getLine();
        endColumn = node.getRange().endTagRange.end.getCharacter();
    }
    if (line < startLine || (startLine < line && line < endLine)) {
        return true;
    } else if (startLine == line && endLine == line) {
        return (startColumn <= column && column < endColumn);
    } else if (startLine == line) {
        return startColumn <= column;
    } else if (endLine == line) {
        return column < endColumn;
    } else {
        return false;
    }

  }

  static isOutOfSequence(node: Sequence, position: Position): boolean {
    let line = position.getLine();
    let column = position.getCharacter();
    if (node == null) {
        return false;
    }
    let startLine = node.getRange().startTagRange.start.getLine();
    let startColumn = node.getRange().startTagRange.start.getCharacter();
    let endLine: number | undefined;
    let endColumn: number | undefined;
    if (node.getRange().endTagRange == null) {
        endLine = node.getRange().startTagRange.end.getLine();
        endColumn = node.getRange().startTagRange.end.getCharacter();
    } else {
        endLine = node.getRange().endTagRange.end.getLine();
        endColumn = node.getRange().endTagRange.end.getCharacter();
    }
    return startLine > line || (line == startLine && column < startColumn) || line > endLine ||
            (line == endLine && column > endColumn);

  }

  static convertToJsonObject(property: Property, jsonObject: JsonObject): void {
    if (property.getProperties() != null) {
        for (let prop of property.getProperties()) {
            if (prop.getProperties() != null) {
                let obj = new JsonObject();
                Utils.convertToJsonObject(prop, obj);
                jsonObject.add(prop.getKey(), obj);
            } else {
                jsonObject.add(prop.getKey(), new JsonPrimitive(prop.getValue()));
            }
        }
    }

  }

  static visitNamedSequence(projectPath: string, key: string, info: MediatorTryoutInfo, position: Position): void {
    try {
        let sequencePath = Utils.getArtifactPath(key, projectPath, "sequences");
        if (sequencePath != null) {
            let domDocument =
                    SynUtils.getDOMDocument(new JFile(sequencePath));
            let sequence =
                    (SyntaxTreeGenerator.buildTree(domDocument.getDocumentElement()) as NamedSequence);
            if (sequence != null) {
                Utils.visitMediators(projectPath, sequence.getMediatorList(), info, position, false);
            }
        }
    } catch (e) {
        Utils.LOGGER.log(Level.SEVERE, format("Error while visiting named sequence: %s", key), e);
    }

  }

  static getArtifactPath(key: string, projectPath: string, type: string): string {
    try {
        return ConfigFinder.findEsbComponentPath(key, type, projectPath);
    } catch (e) {
        return null;
    }

  }

  static visitSequenceTemplate(projectPath: string, target: string, info: MediatorTryoutInfo, position: Position): void {
    try {
        let sequencePath = Utils.getArtifactPath(target, projectPath, "templates");
        if (sequencePath != null) {
            let domDocument =
                    SynUtils.getDOMDocument(new JFile(sequencePath));
            let sequence =
                    ((SyntaxTreeGenerator.buildTree(domDocument.getDocumentElement()) as Template)).getSequence();
            if (sequence != null) {
                Utils.visitMediators(projectPath, sequence.getMediatorList(), info, position, false);
            }
        }
    } catch (e) {
        Utils.LOGGER.log(Level.SEVERE, format("Error while visiting sequence template: %s", target), e);
    }

  }

  static getIterateContent(info: MediatorTryoutInfo, collectionToIterate: string): string {
    if (StringUtils.isEmpty(collectionToIterate)) {
        return StringUtils.EMPTY;
    }
    collectionToIterate = collectionToIterate.substring(2, collectionToIterate.length - 1); 
    let part = jsplit(collectionToIterate, "\\.")[0];
    part = jsplit(part, "\\[")[0];
    switch (part) {
        case ExpressionConstants.PAYLOAD:
            if (equals(collectionToIterate, part)) {
                return info.getOutput().getPayload().getAsString();
            }
            return Utils.getTargetElement(info.getOutput().getPayload().getAsString(),
                    collectionToIterate.substring(part.length + 1));
        case ExpressionConstants.VARS:
            return Utils.getTargetElement(info.getOutput().getVariables(),
                    collectionToIterate.substring(part.length + 1));
        case ExpressionConstants.PROPS:
        case ExpressionConstants.PROPERTIES:
            return Utils.getTargetElement(info.getOutput().getProperties(),
                    collectionToIterate.substring(part.length + 1));
    }
    return StringUtils.EMPTY;

  }

  static getTargetElement(properties: Properties, targetExpression: string): string;
  static getTargetElement(variables: Property[], targetExpression: string): string;
  static getTargetElement(value: string, targetExpression: string): string;
  static getTargetElement(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (args[0] instanceof Properties) {
          const [properties, targetExpression] = args;


                  let propType = jsplit(targetExpression, "\\.")[0];
                  if (contains(propType, "[")) {
                      propType = jsplit(propType, "\\[")[0];
                  }
                  if (StringUtils.isNotEmpty(propType)) {
                      switch (propType) {
                          case ExpressionConstants.SYNAPSE:
                              return Utils.getTargetElement(properties.getSynapse(),
                                      targetExpression.substring(propType.length + 1));
                          case ExpressionConstants.AXIS2:
                              return Utils.getTargetElement(properties.getAxis2(),
                                      targetExpression.substring(propType.length + 1));
                      }
                  }
                  return StringUtils.EMPTY;

        } else if (Array.isArray(args[0])) {
          const [variables, targetExpression] = args;


                  let varName = jsplit(targetExpression, "\\.")[0];
                  if (contains(varName, "[")) {
                      varName = jsplit(varName, "\\[")[0];
                  }
                  for (let property of variables) {
                      if (equals(property.getKey(), varName)) {
                          return Utils.getTargetElement(property.getValue(),
                                  targetExpression.substring(varName.length + 1));
                      }
                  }
                  return StringUtils.EMPTY;

        } else if (typeof args[0] === 'string') {
          const [value, targetExpression] = args;


                  let element = SynUtils.getJsonElement(value);
                  if (element == null) {
                      return StringUtils.EMPTY;
                  }
                  let elements = Utils.parsePathExpression(targetExpression);
                  for (let ele of elements) {
                      if (matches(ele, "\\d+")) {
                          let index = parseInt(ele);
                          if (element.isJsonArray() && size(element.getAsJsonArray()) > index) {
                              element = get(element.getAsJsonArray(), index);
                          } else {
                              return StringUtils.EMPTY;
                          }
                      } else {
                          if (element.isJsonObject() && element.getAsJsonObject().has(ele)) {
                              element = get(element.getAsJsonObject(), ele);
                          } else {
                              return StringUtils.EMPTY;
                          }
                      }
                  }
                  return String(element);

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static parsePathExpression(pathExpression: string): string[] {
    let elements = [];

    let chars = pathExpression.split("");
    let element = new StringBuilder();
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] == '.' || chars[i] == '[' || chars[i] == ']') {
            if (StringUtils.isNotEmpty(String(element))) {
                elements.push(String(element));
                element = new StringBuilder();
            }
        } else if (chars[i] != '\'' && chars[i] != '\"') {
            element.append(chars[i]);
        }
    }
    if (StringUtils.isNotEmpty(String(element))) {
        elements.push(String(element));
    }
    return elements;

  }

  static visitSequenceByKey(key: string, projectPath: string, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    let seqPath = ConfigFinder.findEsbComponentPath(key, Constant.SEQUENCES, projectPath);
    if (seqPath != null) {
        let seqFile = new JFile(seqPath);
        let document = SynUtils.getDOMDocument(seqFile);
        if (document == null) {
            return;
        }
        let sequenceNode = (SyntaxTreeGenerator.buildTree(document.getDocumentElement()) as NamedSequence);
        let sequenceVisitor = new SequenceVisitor(projectPath);
        sequenceVisitor.visit(sequenceNode, info, request);
    }

  }

  constructor() {

  }
}
