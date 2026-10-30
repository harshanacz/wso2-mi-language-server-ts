// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { RewriteRewriterule } from "./RewriteRewriterule.js";

export class Rewrite extends Mediator {
  static readonly __fields: string[] = ["rewriterule", "inProperty", "outProperty", "description", "traceFilter"];

  rewriterule?: RewriteRewriterule[];

  inProperty?: string;

  outProperty?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("Rewrite");

  }

  getRewriterule(): RewriteRewriterule[] {
    return this.rewriterule;

  }

  setRewriterule(rewriterule: RewriteRewriterule[]): void {
    this.rewriterule = rewriterule;

  }

  getInProperty(): string {
    return this.inProperty;

  }

  setInProperty(inProperty: string): void {
    this.inProperty = inProperty;

  }

  getOutProperty(): string {
    return this.outProperty;

  }

  setOutProperty(outProperty: string): void {
    this.outProperty = outProperty;

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
