// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/MessageProcessor.java by the java2ts converter (see tools/java2ts).
import { MessageProcessorType } from "./MessageProcessorType.js";
import { Parameter } from "./misc/common/Parameter.js";
import { STNode } from "../stNode.js";

export class MessageProcessor extends STNode {
  static readonly __fields: string[] = ["parameter", "name", "clazz", "messageStore", "targetEndpoint", "type"];

  parameter?: Parameter[];

  name?: string;

  clazz?: string;

  messageStore?: string;

  targetEndpoint?: string;

  type?: MessageProcessorType;

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

  getMessageStore(): string {
    return this.messageStore;

  }

  setMessageStore(messageStore: string): void {
    this.messageStore = messageStore;

  }

  getTargetEndpoint(): string {
    return this.targetEndpoint;

  }

  setTargetEndpoint(targetEndpoint: string): void {
    this.targetEndpoint = targetEndpoint;

  }

  getType(): MessageProcessorType {
    return this.type;

  }

  setType(type: MessageProcessorType): void {
    this.type = type;

  }
}
