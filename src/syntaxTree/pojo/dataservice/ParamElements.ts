// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/ParamElements.java by the java2ts converter (see tools/java2ts).
import { ParamValidateCustom } from "./ParamValidateCustom.js";
import { ParamValidateDoubleRange } from "./ParamValidateDoubleRange.js";
import { ParamValidateLength } from "./ParamValidateLength.js";
import { ParamValidateLongRange } from "./ParamValidateLongRange.js";
import { ParamValidatePattern } from "./ParamValidatePattern.js";

export class ParamElements {
  static readonly __fields: string[] = ["validateCustom", "validateLength", "validatePattern", "validateLongRange", "validateDoubleRange"];

  validateCustom?: ParamValidateCustom | undefined;

  validateLength?: ParamValidateLength | undefined;

  validatePattern?: ParamValidatePattern | undefined;

  validateLongRange?: ParamValidateLongRange | undefined;

  validateDoubleRange?: ParamValidateDoubleRange | undefined;

  getValidateCustom(): ParamValidateCustom | undefined {
    return this.validateCustom;

  }

  setValidateCustom(validateCustom: ParamValidateCustom | undefined): void {
    this.validateCustom = validateCustom;

  }

  getValidateLength(): ParamValidateLength | undefined {
    return this.validateLength;

  }

  setValidateLength(validateLength: ParamValidateLength | undefined): void {
    this.validateLength = validateLength;

  }

  getValidatePattern(): ParamValidatePattern | undefined {
    return this.validatePattern;

  }

  setValidatePattern(validatePattern: ParamValidatePattern | undefined): void {
    this.validatePattern = validatePattern;

  }

  getValidateLongRange(): ParamValidateLongRange | undefined {
    return this.validateLongRange;

  }

  setValidateLongRange(validateLongRange: ParamValidateLongRange | undefined): void {
    this.validateLongRange = validateLongRange;

  }

  getValidateDoubleRange(): ParamValidateDoubleRange | undefined {
    return this.validateDoubleRange;

  }

  setValidateDoubleRange(validateDoubleRange: ParamValidateDoubleRange | undefined): void {
    this.validateDoubleRange = validateDoubleRange;

  }
}
