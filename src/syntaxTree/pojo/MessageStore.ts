// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/MessageStore.java by the java2ts converter (see tools/java2ts).
import { MessageStoreType } from "./MessageStoreType.js";
import { Parameter } from "./misc/common/Parameter.js";
import { STNode } from "../stNode.js";

export class MessageStore extends STNode {
  parameter?: Parameter[];

  name?: string;

  clazz?: string;

  type?: MessageStoreType;

  getParameter(): Parameter[] {
    return this.parameter;

  }

  setParameter(parameter: Parameter[]): void {
    this.parameter = parameter;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getType(): MessageStoreType {
    return this.type;

  }

  setType(type: MessageStoreType): void {
    this.type = type;

  }
}
