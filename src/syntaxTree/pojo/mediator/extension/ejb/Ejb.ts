// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/extension/ejb/Ejb.java by the java2ts converter (see tools/java2ts).
import { EjbArgs } from "./EjbArgs.js";
import { Mediator } from "../../Mediator.js";

export class Ejb extends Mediator {
  args?: EjbArgs;

  beanstalk?: string;

  clazz?: string;

  sessionId?: string;

  remove: boolean = false;

  method?: string;

  target?: string;

  jndiName?: string;

  id?: string;

  stateful: boolean = false;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("EJB");

  }

  getArgs(): EjbArgs {
    return this.args;

  }

  setArgs(args: EjbArgs): void {
    this.args = args;

  }

  getBeanstalk(): string {
    return this.beanstalk;

  }

  setBeanstalk(beanstalk: string): void {
    this.beanstalk = beanstalk;

  }

  getClazz(): string {
    return this.clazz;

  }

  setClazz(clazz: string): void {
    this.clazz = clazz;

  }

  getSessionId(): string {
    return this.sessionId;

  }

  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;

  }

  isRemove(): boolean {
    return this.remove;

  }

  setRemove(remove: boolean): void {
    this.remove = remove;

  }

  getMethod(): string {
    return this.method;

  }

  setMethod(method: string): void {
    this.method = method;

  }

  getTarget(): string {
    return this.target;

  }

  setTarget(target: string): void {
    this.target = target;

  }

  getJndiName(): string {
    return this.jndiName;

  }

  setJndiName(jndiName: string): void {
    this.jndiName = jndiName;

  }

  getId(): string {
    return this.id;

  }

  setId(id: string): void {
    this.id = id;

  }

  isStateful(): boolean {
    return this.stateful;

  }

  setStateful(stateful: boolean): void {
    this.stateful = stateful;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
