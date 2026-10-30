// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/DebugInfo.java by the java2ts converter (see tools/java2ts).
import { IDebugInfo } from "./IDebugInfo.js";
import { JsonElement } from "../../../gson.js";

export class DebugInfo implements IDebugInfo {
  static readonly __fields: string[] = ["mediatorPosition", "_isValid", "error"];

  mediatorPosition: string | null = null;

  _isValid: boolean = true;

  error: string | null = null;

  isValid(): boolean {
    return this._isValid;

  }

  setValid(valid: boolean): void {
    this._isValid = valid;

  }

  getError(): string {
    return this.error;

  }

  setError(error: string): void {
    this.error = error;

  }

  toJson(): JsonElement {
    throw new Error("toJson method is not implemented");

  }

  setMediatorPosition(mediatorPosition: string): void {
    this.mediatorPosition = mediatorPosition;

  }

  getMediatorPosition(): string {
    return this.mediatorPosition;

  }

  clone(): IDebugInfo {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this) as IDebugInfo;

  }

  toString(): string {
    return "DebugInfo{" +
            "mediatorPosition='" + this.mediatorPosition + '\'' +
            ", isValid=" + this._isValid +
            ", error='" + this.error + '\'' +
            '}';

  }
}
