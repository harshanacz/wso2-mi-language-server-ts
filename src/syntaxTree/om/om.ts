/**
 * Minimal replacement for the parts of Apache Axiom (OM) used by the syntax tree serializers.
 * toString() output mirrors Axiom's StAX based serialization for the shapes the serializers produce.
 */
import { parseDOM, DOMElement, DOMNode } from "../dom/dom.js";

export class OMNamespace {
  constructor(public readonly uri: string, public readonly prefix: string) {}
  getNamespaceURI(): string { return this.uri; }
  getPrefix(): string { return this.prefix; }
}

export interface OMNode { toString(): string; }

export class OMText implements OMNode {
  constructor(public text: string, public cdata = false) {
    if (text === null || text === undefined) this.text = "";
  }
  getText(): string { return this.text; }
  toString(): string {
    return this.cdata ? "<![CDATA[" + this.text + "]]>" : escapeText(this.text);
  }
}

export class OMComment implements OMNode {
  constructor(public value: string) {}
  toString(): string { return "<!--" + this.value + "-->"; }
}

export function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

export class OMAttribute {
  constructor(public localName: string, public value: string, public ns: OMNamespace | null) {}
  qname(): string {
    return this.ns && this.ns.prefix ? this.ns.prefix + ":" + this.localName : this.localName;
  }
}

export class OMElement implements OMNode {
  localName: string;
  ns: OMNamespace | null;
  attributes: OMAttribute[] = [];
  declared: OMNamespace[] = [];
  /** attributes and namespace declarations in the order they were added (Axiom writes them in that order) */
  order: (OMAttribute | OMNamespace)[] = [];
  children: OMNode[] = [];
  parent: OMElement | null = null;
  private factory: OMFactory;

  constructor(factory: OMFactory, localName: string, ns: OMNamespace | null) {
    this.factory = factory;
    this.localName = localName;
    this.ns = ns;
  }

  getOMFactory(): OMFactory { return this.factory; }
  getLocalName(): string { return this.localName; }
  setLocalName(n: string): void { this.localName = n; }
  setNamespace(ns: OMNamespace | null): void { this.ns = ns; }
  getNamespace(): OMNamespace | null { return this.ns; }

  addAttribute(name: string, value: string, ns: OMNamespace | null | undefined): OMAttribute {
    const existing = this.attributes.find((a) => a.localName === name && (a.ns?.uri ?? "") === (ns?.uri ?? ""));
    if (existing) {
      existing.value = value;
      return existing;
    }
    const a = new OMAttribute(name, value, ns && ns.uri !== "" ? ns : null);
    this.attributes.push(a);
    this.order.push(a);
    return a;
  }

  declareNamespace(uri: string, prefix: string): OMNamespace {
    const existing = this.declared.find((n) => n.prefix === prefix);
    if (existing) return existing;
    const ns = new OMNamespace(uri, prefix);
    this.declared.push(ns);
    this.order.push(ns);
    return ns;
  }

  addChild(child: OMNode | null | undefined): void {
    if (!child) return;
    if (child instanceof OMElement) child.parent = this;
    this.children.push(child);
  }

  setText(text: string | null | undefined): void {
    this.children = this.children.filter((c) => !(c instanceof OMText));
    this.children.unshift(new OMText(text ?? ""));
  }

  getFirstElement(): OMElement | undefined {
    return this.children.find((c) => c instanceof OMElement) as OMElement | undefined;
  }

  /** namespace bindings in scope, for the purpose of skipping redundant declarations */
  private inScope(ancestors: Map<string, string>): Map<string, string> {
    return ancestors;
  }

  serialize(scope: Map<string, string>): string {
    const local = new Map(scope);
    let decls = "";
    let name = this.localName;
    if (this.ns && (this.ns.uri !== "" || this.ns.prefix !== "")) {
      const p = this.ns.prefix;
      if (p) name = p + ":" + this.localName;
      if (local.get(p) !== this.ns.uri) {
        decls += p ? ` xmlns:${p}="${escapeAttr(this.ns.uri)}"` : ` xmlns="${escapeAttr(this.ns.uri)}"`;
        local.set(p, this.ns.uri);
      }
    } else if (local.get("") !== undefined && local.get("") !== "") {
      decls += ` xmlns=""`;
      local.set("", "");
    }
    let attrs = "";
    for (const item of this.order) {
      if (item instanceof OMAttribute) {
        const a = item;
        if (a.ns && a.ns.prefix && local.get(a.ns.prefix) !== a.ns.uri) {
          attrs += ` xmlns:${a.ns.prefix}="${escapeAttr(a.ns.uri)}"`;
          local.set(a.ns.prefix, a.ns.uri);
        }
        attrs += ` ${a.qname()}="${escapeAttr(a.value)}"`;
      } else {
        const d = item;
        if (local.get(d.prefix) !== d.uri) {
          attrs += d.prefix ? ` xmlns:${d.prefix}="${escapeAttr(d.uri)}"` : ` xmlns="${escapeAttr(d.uri)}"`;
          local.set(d.prefix, d.uri);
        }
      }
    }
    if (this.children.every((c) => c instanceof OMText && !c.cdata && c.text === "")) return `<${name}${decls}${attrs}/>`;
    let body = "";
    for (const c of this.children) body += c instanceof OMElement ? c.serialize(local) : c.toString();
    return `<${name}${decls}${attrs}>${body}</${name}>`;
  }

  toString(): string {
    return this.serialize(new Map());
  }
}

export class OMFactory {
  createOMElement(localName: string, ns?: OMNamespace | null): OMElement {
    return new OMElement(this, localName, ns ?? null);
  }
  createOMNamespace(uri: string, prefix: string): OMNamespace { return new OMNamespace(uri, prefix); }
  createOMText(text: string, type?: number): OMText { return new OMText(text, type === 12); }
  createOMComment(_parent: OMElement | null | undefined, value: string): OMComment { return new OMComment(value); }
}

export const OMAbstractFactory = {
  factory: new OMFactory(),
  getOMFactory(): OMFactory { return this.factory; },
};

function fromDom(f: OMFactory, el: DOMElement, scope: Map<string, string>): OMElement {
  const prefix = el.getPrefix() ?? "";
  const local = el.getLocalName();
  const attrs = el.getAttributeNodes();
  const nsDecls: OMNamespace[] = [];
  const attributes: [string, string][] = [];
  const myScope = new Map(scope);
  for (const a of attrs) {
    const n = a.getName();
    if (n === "xmlns") { myScope.set("", a.getValue() ?? ""); nsDecls.push(new OMNamespace(a.getValue() ?? "", "")); }
    else if (n.startsWith("xmlns:")) { myScope.set(n.slice(6), a.getValue() ?? ""); nsDecls.push(new OMNamespace(a.getValue() ?? "", n.slice(6))); }
    else attributes.push([n, unescape(a.getValue() ?? "")]);
  }
  const uri = myScope.get(prefix) ?? "";
  const e = f.createOMElement(local ?? "", new OMNamespace(uri, prefix));
  for (const d of nsDecls) e.declareNamespace(d.uri, d.prefix);
  for (const [n, v] of attributes) {
    const i = n.indexOf(":");
    if (i > 0) e.addAttribute(n.slice(i + 1), v, new OMNamespace(myScope.get(n.slice(0, i)) ?? "", n.slice(0, i)));
    else e.addAttribute(n, v, null);
  }
  for (const c of el.getChildren() as DOMNode[]) {
    if (c instanceof DOMElement) e.addChild(fromDom(f, c, myScope));
    else if (c.isCDATA()) e.addChild(new OMText(c.getTextContent() ?? "", true));
    else if (c.isText()) e.addChild(new OMText(unescape(c.getTextContent() ?? "")));
    else if (c.isComment()) e.addChild(new OMComment(c.getTextContent() ?? ""));
  }
  return e;
}

function unescape(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}

/** Equivalent of AXIOMUtil.stringToOM */
export function stringToOM(text: string): OMElement | null {
  const doc = parseDOM(text, "file:///om.xml", false);
  const root = doc.getDocumentElement();
  if (!root) return null;
  return fromDom(OMAbstractFactory.getOMFactory(), root, new Map());
}

/** Equivalent of AXIOMUtil.stringToOM (throws like Axiom on malformed input is not modelled; returns null). */
export const parseOM = stringToOM;
