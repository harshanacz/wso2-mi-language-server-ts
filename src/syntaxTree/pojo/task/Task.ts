// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/task/Task.java by the java2ts converter (see tools/java2ts).
import { MediatorProperty } from "../mediator/core/MediatorProperty.js";
import { STNode } from "../../stNode.js";
import { TaskTrigger } from "./TaskTrigger.js";

export class Task extends STNode {
  trigger?: TaskTrigger;

  property?: MediatorProperty[];

  clazz?: string;

  name?: string;

  group?: string;

  pinnedServers?: string;

  getTrigger(): TaskTrigger {
    return this.trigger;

  }

  setTrigger(trigger: TaskTrigger): void {
    this.trigger = trigger;

  }

  getProperty(): MediatorProperty[] {
    return this.property;

  }

  setProperty(property: MediatorProperty[]): void {
    this.property = property;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getGroup(): string {
    return this.group;

  }

  setGroup(group: string): void {
    this.group = group;

  }

  getPinnedServers(): string {
    return this.pinnedServers;

  }

  setPinnedServers(pinnedServers: string): void {
    this.pinnedServers = pinnedServers;

  }
}
