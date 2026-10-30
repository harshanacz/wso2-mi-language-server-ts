// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/entity/debuginfo/IDebugInfo.java by the java2ts converter (see tools/java2ts).
import { JsonElement } from "../../../gson.js";

export interface IDebugInfo {
  setMediatorPosition(mediatorPosition: string): void;

  getMediatorPosition(): string;

  isValid(): boolean;

  setValid(valid: boolean): void;

  getError(): string;

  setError(error: string): void;

  toJson(): JsonElement;

  clone(): IDebugInfo;
}
