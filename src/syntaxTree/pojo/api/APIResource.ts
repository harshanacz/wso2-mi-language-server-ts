// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/api/APIResource.java by the java2ts converter (see tools/java2ts).
import { System } from "../../javaCompat.js";
import { STNode } from "../../stNode.js";
import { Sequence } from "../misc/common/Sequence.js";

export class APIResource extends STNode {
  api?: string;

  inSequence?: Sequence;

  outSequence?: Sequence;

  faultSequence?: Sequence;

  methods?: string[];

  protocol?: string[];

  inSequenceAttribute?: string;

  outSequenceAttribute?: string;

  faultSequenceAttribute?: string;

  uriTemplate?: string;

  urlMapping?: string;

  getApi(): string {
    return this.api;

  }

  setApi(api: string): void {
    this.api = api;

  }

  getInSequence(): Sequence {
    return this.inSequence;

  }

  setInSequence(inSequence: Sequence): void {
    this.inSequence = inSequence;

  }

  getOutSequence(): Sequence {
    return this.outSequence;

  }

  setOutSequence(outSequence: Sequence): void {
    this.outSequence = outSequence;

  }

  getFaultSequence(): Sequence {
    return this.faultSequence;

  }

  setFaultSequence(faultSequence: Sequence): void {
    this.faultSequence = faultSequence;

  }

  getMethods(): string[] {
    return this.methods;

  }

  setMethods(methods: string[]): void {
    this.methods = methods;

  }

  getProtocol(): string[] {
    return this.protocol;

  }

  setProtocol(protocol: string[]): void {
    this.protocol = protocol;

  }

  getInSequenceAttribute(): string {
    return this.inSequenceAttribute;

  }

  setInSequenceAttribute(inSequenceAttribute: string): void {
    this.inSequenceAttribute = inSequenceAttribute;

  }

  getOutSequenceAttribute(): string {
    return this.outSequenceAttribute;

  }

  setOutSequenceAttribute(outSequenceAttribute: string): void {
    this.outSequenceAttribute = outSequenceAttribute;

  }

  getFaultSequenceAttribute(): string {
    return this.faultSequenceAttribute;

  }

  setFaultSequenceAttribute(faultSequenceAttribute: string): void {
    this.faultSequenceAttribute = faultSequenceAttribute;

  }

  getUriTemplate(): string {
    return this.uriTemplate;

  }

  setUriTemplate(uriTemplate: string): void {
    this.uriTemplate = uriTemplate;

  }

  getUrlMapping(): string {
    return this.urlMapping;

  }

  setUrlMapping(urlMapping: string): void {
    this.urlMapping = urlMapping;

  }

  addMethod(method: string): void {
    if (this.methods == null) {
        this.methods = new Array(1);
        this.methods[0] = method;
    } else {
        let newMethod = new Array(this.methods.length + 1);
        System.arraycopy(this.methods, 0, method, 0, this.methods.length);
        newMethod[this.methods.length] = method;
        this.methods = newMethod;
    }

  }

  getResourcePath(): string {
    if (this.urlMapping != null) {
        return this.urlMapping;
    } else {
        return this.uriTemplate;
    }

  }
}
