// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/proxy/Proxy.java by the java2ts converter (see tools/java2ts).
import { EnableDisable } from "../api/EnableDisable.js";
import { Parameter } from "../misc/common/Parameter.js";
import { ProxyPolicy } from "./ProxyPolicy.js";
import { ProxyPublishWSDL } from "./ProxyPublishWSDL.js";
import { ProxyTarget } from "./ProxyTarget.js";
import { STNode } from "../../stNode.js";

export class Proxy extends STNode {
  static readonly __fields: string[] = ["target", "publishWSDL", "policies", "enableAddressing", "enableSec", "enableRM", "parameters", "description", "name", "transports", "pinnedServers", "serviceGroup", "startOnLoad", "statistics", "trace"];

  target?: ProxyTarget;

  publishWSDL?: ProxyPublishWSDL;

  policies?: ProxyPolicy[];

  enableAddressing?: STNode;

  enableSec?: STNode;

  enableRM?: STNode;

  parameters?: Parameter[];

  description?: string;

  name?: string;

  transports?: string;

  pinnedServers?: string;

  serviceGroup?: string;

  startOnLoad: boolean = false;

  statistics?: EnableDisable;

  trace?: EnableDisable;

  getName(): string {
    return this.name;

  }

  setName(name: string): void {
    this.name = name;

  }

  getTransports(): string {
    return this.transports;

  }

  setTransports(transports: string): void {
    this.transports = transports;

  }

  getPinnedServers(): string {
    return this.pinnedServers;

  }

  setPinnedServers(pinnedServers: string): void {
    this.pinnedServers = pinnedServers;

  }

  getServiceGroup(): string {
    return this.serviceGroup;

  }

  setServiceGroup(serviceGroup: string): void {
    this.serviceGroup = serviceGroup;

  }

  isStartOnLoad(): boolean {
    return this.startOnLoad;

  }

  setStartOnLoad(startOnLoad: boolean): void {
    this.startOnLoad = startOnLoad;

  }

  getStatistics(): EnableDisable {
    return this.statistics;

  }

  setStatistics(statistics: EnableDisable): void {
    this.statistics = statistics;

  }

  getTrace(): EnableDisable {
    return this.trace;

  }

  setTrace(trace: EnableDisable): void {
    this.trace = trace;

  }

  getTarget(): ProxyTarget {
    return this.target;

  }

  setTarget(target: ProxyTarget): void {
    this.target = target;

  }

  getPublishWSDL(): ProxyPublishWSDL {
    return this.publishWSDL;

  }

  setPublishWSDL(publishWSDL: ProxyPublishWSDL): void {
    this.publishWSDL = publishWSDL;

  }

  getPolicies(): ProxyPolicy[] {
    return this.policies;

  }

  setPolicies(policies: ProxyPolicy[]): void {
    this.policies = policies;

  }

  getEnableAddressing(): STNode {
    return this.enableAddressing;

  }

  setEnableAddressing(enableAddressing: STNode): void {
    this.enableAddressing = enableAddressing;

  }

  getEnableSec(): STNode {
    return this.enableSec;

  }

  setEnableSec(enableSec: STNode): void {
    this.enableSec = enableSec;

  }

  getEnableRM(): STNode {
    return this.enableRM;

  }

  setEnableRM(enableRM: STNode): void {
    this.enableRM = enableRM;

  }

  getParameters(): Parameter[] {
    return this.parameters;

  }

  setParameters(parameters: Parameter[]): void {
    this.parameters = parameters;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
