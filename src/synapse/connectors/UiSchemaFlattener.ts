// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/UiSchemaFlattener.java by the java2ts converter (see tools/java2ts).
import { equals, get, parseBoolean, isBlank, StringUtils } from "../../syntaxTree/javaCompat.js";
import { Constant } from "../../syntaxTree/constant.js";
import { JsonArray } from "../gson.js";
import { OperationParameter } from "./entity/OperationParameter.js";

export class UiSchemaFlattener {
  static readonly __fields: string[] = [];

  constructor() {

  }

  static flatten(elements: JsonArray): OperationParameter[] {
    let out = [];
    if (elements != null) {
        UiSchemaFlattener.walk(elements, out);
    }
    return out;

  }

  static walk(elements: JsonArray, out: OperationParameter[]): void {
    for (let raw of elements) {
        if (!raw.isJsonObject()) {
            continue;
        }
        let element = raw.getAsJsonObject();
        let type = element.has(Constant.TYPE) ? get(element, Constant.TYPE).getAsString() : null;
        if (type == null || !element.has(Constant.VALUE) || !get(element, Constant.VALUE).isJsonObject()) {
            continue;
        }
        let value = element.getAsJsonObject(Constant.VALUE);
        if (equals(Constant.ATTRIBUTE_GROUP, type)) {
            if (value.has(Constant.ELEMENTS) && get(value, Constant.ELEMENTS).isJsonArray()) {
                UiSchemaFlattener.walk(value.getAsJsonArray(Constant.ELEMENTS), out);
            }
        } else if (equals(Constant.ATTRIBUTE, type)) {
            if (value.has(Constant.HIDDEN) && get(value, Constant.HIDDEN).getAsBoolean()) {
                continue;
            }
            let name = value.has(Constant.NAME) ? get(value, Constant.NAME).getAsString() : null;
            if (StringUtils.isBlank(name)) {
                continue;
            }
            let description: string | undefined;
            if (value.has(Constant.HELP_TIP)) {
                description = get(value, Constant.HELP_TIP).getAsString();
            } else if (value.has(Constant.DISPLAY_NAME)) {
                description = get(value, Constant.DISPLAY_NAME).getAsString();
            } else {
                description = StringUtils.EMPTY;
            }
            let required = false;
            if (value.has(Constant.REQUIRED)) {
                let req = get(value, Constant.REQUIRED);
                if (req.isJsonPrimitive()) {
                    required = parseBoolean(req.getAsString());
                }
            }
            let param = new OperationParameter(name, description, required);
            param.setXsdType(UiSchemaFlattener.mapInputTypeToXsd(
                    value.has(Constant.INPUT_TYPE) ? get(value, Constant.INPUT_TYPE).getAsString() : null));
            if (value.has(Constant.DEFAULT_VALUE)) {
                let def = get(value, Constant.DEFAULT_VALUE);
                if (def.isJsonPrimitive()) {
                    param.setDefaultValue(def.getAsString());
                }
            }
            out.push(param);
        }
    }

  }

  static mapInputTypeToXsd(inputType: string): string {
    if (inputType == null) {
        return "xs:string";
    }
    switch (inputType) {
        case "number":
        case "integer":
            return "integerOrExpression";
        case "boolean":
        case "booleanOrExpression":
        case "checkbox":
            return "xs:boolean";
        default:
            return "xs:string";
    }

  }
}
