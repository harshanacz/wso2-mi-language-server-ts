/**
 * A small XML Schema compiler exposing the slice of Apache Xerces' org.apache.xerces.xs API the schema generator
 * reads (XSModel, element and type declarations, particles, model groups, attribute uses, enumeration facets).
 * It covers single document schemas: global elements/types/groups/attributeGroups, references, extension and
 * restriction, choice/sequence/all, wildcards, list/union and enumeration facets.
 */
import { parseDOM, DOMElement } from "../../syntaxTree/dom/dom.js";

export class XSList<T> implements Iterable<T> {
  constructor(private readonly items: T[] = []) {}
  getLength(): number { return this.items.length; }
  item(i: number): T | null { return this.items[i] ?? null; }
  values(): T[] { return this.items; }
  [Symbol.iterator](): Iterator<T> { return this.items[Symbol.iterator](); }
}

export const XSConstants = { ELEMENT_DECLARATION: 2, TYPE_DEFINITION: 3, ATTRIBUTE_DECLARATION: 1 };

export abstract class XSTerm {}

export class XSWildcard extends XSTerm {}

export class XSModelGroup extends XSTerm {
  static readonly COMPOSITOR_SEQUENCE = 1;
  static readonly COMPOSITOR_CHOICE = 2;
  static readonly COMPOSITOR_ALL = 3;
  constructor(private readonly compositor: number, private readonly particles: XSParticle[]) { super(); }
  getCompositor(): number { return this.compositor; }
  getParticles(): XSList<XSParticle> { return new XSList(this.particles); }
}

export class XSParticle {
  constructor(private readonly term: XSTerm, private readonly min: number, private readonly max: number) {}
  getTerm(): XSTerm { return this.term; }
  getMinOccurs(): number { return this.min; }
  /** -1 for unbounded, like Xerces. */
  getMaxOccurs(): number { return this.max; }
}

export abstract class XSTypeDefinition {
  constructor(public name: string | null) {}
  getName(): string | null { return this.name; }
  abstract getBaseType(): XSTypeDefinition | null;
}

export class XSSimpleTypeDefinition extends XSTypeDefinition {
  enumeration: string[] = [];
  constructor(name: string | null, public base: XSTypeDefinition | null, public primitive: XSSimpleTypeDefinition | null = null) {
    super(name);
  }
  getBaseType(): XSTypeDefinition | null { return this.base; }
  getPrimitiveType(): XSSimpleTypeDefinition | null { return this.primitive; }
  getLexicalEnumeration(): XSList<string> { return new XSList(this.enumeration); }
}

export class XSAttributeDeclaration {
  constructor(private readonly name: string, private readonly type: XSSimpleTypeDefinition) {}
  getName(): string { return this.name; }
  getTypeDefinition(): XSSimpleTypeDefinition { return this.type; }
}

export class XSAttributeUse {
  constructor(private readonly decl: XSAttributeDeclaration, private readonly required: boolean) {}
  getAttrDeclaration(): XSAttributeDeclaration { return this.decl; }
  getRequired(): boolean { return this.required; }
}

export class XSComplexTypeDefinition extends XSTypeDefinition {
  static readonly CONTENTTYPE_EMPTY = 1;
  static readonly CONTENTTYPE_SIMPLE = 2;
  static readonly CONTENTTYPE_ELEMENT = 3;
  static readonly CONTENTTYPE_MIXED = 4;
  contentType = XSComplexTypeDefinition.CONTENTTYPE_EMPTY;
  particle: XSParticle | null = null;
  simpleType: XSSimpleTypeDefinition | null = null;
  attributeUses: XSAttributeUse[] = [];
  base: XSTypeDefinition | null = null;
  getBaseType(): XSTypeDefinition | null { return this.base; }
  getContentType(): number { return this.contentType; }
  getParticle(): XSParticle | null { return this.particle; }
  getSimpleType(): XSSimpleTypeDefinition | null { return this.simpleType; }
  getAttributeUses(): XSList<XSAttributeUse> { return new XSList(this.attributeUses); }
}

export class XSElementDeclaration extends XSTerm {
  constructor(private readonly name: string, public type: XSTypeDefinition) { super(); }
  getName(): string { return this.name; }
  getTypeDefinition(): XSTypeDefinition { return this.type; }
}

/** XSNamedMap of global components, iterated in Xerces SymbolHash order (25 buckets, newest first within a bucket). */
export class XSNamedMap<T> extends XSList<T> {}

function javaHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

function symbolHashOrder<T>(entries: Array<[string, T]>): T[] {
  const buckets = new Map<number, T[]>();
  for (const [k, v] of entries) {
    const b = (javaHash(k) & 0x7fffffff) % 25;
    if (!buckets.has(b)) buckets.set(b, []);
    buckets.get(b)!.unshift(v);
  }
  return [...buckets.keys()].sort((a, b) => a - b).flatMap((b) => buckets.get(b)!);
}

export class XSModel {
  constructor(private readonly elements: Array<[string, XSElementDeclaration]>) {}
  getComponents(type: number): XSNamedMap<XSElementDeclaration> {
    return new XSNamedMap(type === XSConstants.ELEMENT_DECLARATION ? symbolHashOrder(this.elements) : []);
  }
}

// ------------------------------------------------------------------------------------------------------------

const BUILTIN_PARENTS: Record<string, string> = {
  normalizedString: "string", token: "normalizedString", language: "token", NMTOKEN: "token", Name: "token",
  NCName: "Name", ID: "NCName", IDREF: "NCName", ENTITY: "NCName",
  integer: "decimal", nonPositiveInteger: "integer", negativeInteger: "nonPositiveInteger", long: "integer", int: "long",
  short: "int", byte: "short", nonNegativeInteger: "integer", unsignedLong: "nonNegativeInteger",
  unsignedInt: "unsignedLong", unsignedShort: "unsignedInt", unsignedByte: "unsignedShort", positiveInteger: "nonNegativeInteger",
  NMTOKENS: "anySimpleType", IDREFS: "anySimpleType", ENTITIES: "anySimpleType",
};
const PRIMITIVES = ["string", "boolean", "decimal", "float", "double", "duration", "dateTime", "time", "date", "gYearMonth",
  "gYear", "gMonthDay", "gDay", "gMonth", "hexBinary", "base64Binary", "anyURI", "QName", "NOTATION"];

const ANY_TYPE = new XSComplexTypeDefinition("anyType");
const ANY_SIMPLE = new XSSimpleTypeDefinition("anySimpleType", ANY_TYPE);
ANY_TYPE.contentType = XSComplexTypeDefinition.CONTENTTYPE_MIXED;
ANY_TYPE.particle = new XSParticle(new XSModelGroup(XSModelGroup.COMPOSITOR_SEQUENCE, [new XSParticle(new XSWildcard(), 0, -1)]), 1, 1);
const builtins = new Map<string, XSSimpleTypeDefinition>();

function builtin(name: string): XSSimpleTypeDefinition | null {
  if (name === "anySimpleType") return ANY_SIMPLE;
  const cached = builtins.get(name);
  if (cached) return cached;
  let t: XSSimpleTypeDefinition;
  if (PRIMITIVES.includes(name)) {
    t = new XSSimpleTypeDefinition(name, ANY_SIMPLE);
    t.primitive = t;
  } else if (BUILTIN_PARENTS[name]) {
    const parent = builtin(BUILTIN_PARENTS[name])!;
    t = new XSSimpleTypeDefinition(name, parent, parent.primitive);
  } else {
    return null;
  }
  builtins.set(name, t);
  return t;
}

const local = (q: string): string => (q.includes(":") ? q.substring(q.indexOf(":") + 1) : q);
const prefixOf = (q: string): string => (q.includes(":") ? q.substring(0, q.indexOf(":")) : "");

class Compiler {
  readonly types = new Map<string, XSTypeDefinition>();
  readonly typeDefs = new Map<string, DOMElement>();
  readonly elementDefs = new Map<string, DOMElement>();
  readonly elements = new Map<string, XSElementDeclaration>();
  readonly groups = new Map<string, DOMElement>();
  readonly attrGroups = new Map<string, DOMElement>();
  readonly attributes = new Map<string, DOMElement>();
  xsPrefix = "";

  constructor(private readonly schema: DOMElement) {
    const tag = schema.getTagName() ?? "";
    this.xsPrefix = prefixOf(tag);
  }

  kids(el: DOMElement, ...names: string[]): DOMElement[] {
    return el.getChildren().filter((c): c is DOMElement => c.isElement() && (names.length === 0 || names.includes(local((c as DOMElement).getTagName() ?? "")))) as DOMElement[];
  }
  kid(el: DOMElement, ...names: string[]): DOMElement | null { return this.kids(el, ...names)[0] ?? null; }
  attr(el: DOMElement, n: string): string | null { return el.getAttribute(n); }

  compile(): XSModel {
    for (const c of this.kids(this.schema)) {
      const n = this.attr(c, "name");
      switch (local(c.getTagName() ?? "")) {
        case "complexType":
        case "simpleType": if (n) this.typeDefs.set(n, c); break;
        case "element": if (n) this.elementDefs.set(n, c); break;
        case "group": if (n) this.groups.set(n, c); break;
        case "attributeGroup": if (n) this.attrGroups.set(n, c); break;
        case "attribute": if (n) this.attributes.set(n, c); break;
      }
    }
    const out: Array<[string, XSElementDeclaration]> = [];
    for (const name of this.elementDefs.keys()) out.push([name, this.globalElement(name)]);
    return new XSModel(out);
  }

  globalElement(name: string): XSElementDeclaration {
    let e = this.elements.get(name);
    if (e) return e;
    const def = this.elementDefs.get(name)!;
    // placeholder first so recursive references resolve to the same declaration
    e = new XSElementDeclaration(name, ANY_TYPE);
    this.elements.set(name, e);
    e.type = this.elementType(def);
    return e;
  }

  elementType(def: DOMElement): XSTypeDefinition {
    const t = this.attr(def, "type");
    if (t) return this.resolveType(t);
    const ct = this.kid(def, "complexType");
    if (ct) return this.complexType(ct, null);
    const st = this.kid(def, "simpleType");
    if (st) return this.simpleType(st, null);
    return ANY_TYPE;
  }

  resolveType(q: string): XSTypeDefinition {
    const p = prefixOf(q);
    const n = local(q);
    if (p !== "" && p === this.xsPrefix) {
      return n === "anyType" ? ANY_TYPE : builtin(n) ?? ANY_SIMPLE;
    }
    const cached = this.types.get(n);
    if (cached) return cached;
    const def = this.typeDefs.get(n);
    if (def) {
      return local(def.getTagName() ?? "") === "complexType" ? this.complexType(def, n) : this.simpleType(def, n);
    }
    if (n === "anyType") return ANY_TYPE;
    return builtin(n) ?? ANY_SIMPLE;
  }

  resolveSimple(q: string): XSSimpleTypeDefinition {
    const t = this.resolveType(q);
    return t instanceof XSSimpleTypeDefinition ? t : ANY_SIMPLE;
  }

  simpleType(def: DOMElement, name: string | null): XSSimpleTypeDefinition {
    if (name && this.types.has(name)) return this.types.get(name) as XSSimpleTypeDefinition;
    const t = new XSSimpleTypeDefinition(name, ANY_SIMPLE);
    if (name) this.types.set(name, t);
    const restriction = this.kid(def, "restriction");
    const list = this.kid(def, "list");
    const union = this.kid(def, "union");
    if (restriction) {
      let base: XSSimpleTypeDefinition;
      const b = this.attr(restriction, "base");
      const inner = this.kid(restriction, "simpleType");
      base = b ? this.resolveSimple(b) : inner ? this.simpleType(inner, null) : ANY_SIMPLE;
      t.base = base;
      t.primitive = base.primitive;
      const enums = this.kids(restriction, "enumeration").map((e) => this.attr(e, "value") ?? "");
      t.enumeration = enums.length > 0 ? enums : [...base.enumeration];
    } else if (list) {
      t.base = ANY_SIMPLE;
    } else if (union) {
      t.base = ANY_SIMPLE;
    }
    return t;
  }

  complexType(def: DOMElement, name: string | null): XSComplexTypeDefinition {
    if (name && this.types.has(name)) return this.types.get(name) as XSComplexTypeDefinition;
    const t = new XSComplexTypeDefinition(name);
    if (name) this.types.set(name, t);
    t.base = ANY_TYPE;
    const mixed = this.attr(def, "mixed") === "true";
    const sc = this.kid(def, "simpleContent");
    const cc = this.kid(def, "complexContent");
    if (sc) {
      const deriv = this.kid(sc, "extension", "restriction")!;
      const base = this.resolveType(this.attr(deriv, "base") ?? "anyType");
      t.base = base;
      t.contentType = XSComplexTypeDefinition.CONTENTTYPE_SIMPLE;
      if (base instanceof XSComplexTypeDefinition) {
        t.simpleType = base.simpleType;
      } else {
        t.simpleType = base as XSSimpleTypeDefinition;
      }
      if (local(deriv.getTagName() ?? "") === "restriction") {
        const anon = new XSSimpleTypeDefinition(null, t.simpleType, t.simpleType?.primitive ?? null);
        const enums = this.kids(deriv, "enumeration").map((e) => this.attr(e, "value") ?? "");
        anon.enumeration = enums.length > 0 ? enums : [...(t.simpleType?.enumeration ?? [])];
        t.simpleType = anon;
      }
      t.attributeUses = this.attributeUses(deriv);
      if (base instanceof XSComplexTypeDefinition) this.mergeBaseAttributes(t, base, local(deriv.getTagName() ?? "") === "extension");
    } else if (cc) {
      const deriv = this.kid(cc, "extension", "restriction")!;
      const isExt = local(deriv.getTagName() ?? "") === "extension";
      const base = this.resolveType(this.attr(deriv, "base") ?? "anyType");
      t.base = base;
      const own = this.contentParticle(deriv);
      const baseParticle = base instanceof XSComplexTypeDefinition ? base.particle : null;
      if (isExt && baseParticle && own) {
        t.particle = new XSParticle(new XSModelGroup(XSModelGroup.COMPOSITOR_SEQUENCE, [baseParticle, own]), 1, 1);
      } else if (isExt) {
        t.particle = own ?? baseParticle;
      } else {
        t.particle = own;
      }
      t.contentType = t.particle ? (mixed || this.attr(cc, "mixed") === "true" ? XSComplexTypeDefinition.CONTENTTYPE_MIXED : XSComplexTypeDefinition.CONTENTTYPE_ELEMENT)
        : XSComplexTypeDefinition.CONTENTTYPE_EMPTY;
      t.attributeUses = this.attributeUses(deriv);
      if (base instanceof XSComplexTypeDefinition) this.mergeBaseAttributes(t, base, isExt);
    } else {
      t.particle = this.contentParticle(def);
      t.contentType = t.particle ? (mixed ? XSComplexTypeDefinition.CONTENTTYPE_MIXED : XSComplexTypeDefinition.CONTENTTYPE_ELEMENT)
        : XSComplexTypeDefinition.CONTENTTYPE_EMPTY;
      t.attributeUses = this.attributeUses(def);
    }
    return t;
  }

  mergeBaseAttributes(t: XSComplexTypeDefinition, base: XSComplexTypeDefinition, extension: boolean): void {
    const have = new Set(t.attributeUses.map((u) => u.getAttrDeclaration().getName()));
    for (const u of base.attributeUses) {
      if (!have.has(u.getAttrDeclaration().getName())) t.attributeUses.push(u);
    }
  }

  attributeUses(owner: DOMElement): XSAttributeUse[] {
    const out: XSAttributeUse[] = [];
    for (const c of this.kids(owner, "attribute", "attributeGroup")) {
      const kind = local(c.getTagName() ?? "");
      if (kind === "attribute") {
        const use = this.attr(c, "use");
        if (use === "prohibited") continue;
        let n = this.attr(c, "name");
        let typeDef: XSSimpleTypeDefinition;
        const ref = this.attr(c, "ref");
        let src = c;
        if (ref) {
          n = local(ref);
          src = this.attributes.get(n) ?? c;
        }
        const tn = this.attr(src, "type");
        const inner = this.kid(src, "simpleType");
        typeDef = tn ? this.resolveSimple(tn) : inner ? this.simpleType(inner, null) : ANY_SIMPLE;
        out.push(new XSAttributeUse(new XSAttributeDeclaration(n ?? "", typeDef), use === "required"));
      } else {
        const ref = this.attr(c, "ref");
        const g = ref ? this.attrGroups.get(local(ref)) : null;
        if (g) out.push(...this.attributeUses(g));
      }
    }
    return out;
  }

  contentParticle(owner: DOMElement): XSParticle | null {
    const c = this.kid(owner, "sequence", "choice", "all", "group");
    return c ? this.particle(c) : null;
  }

  occurs(c: DOMElement): [number, number] {
    const min = parseInt(this.attr(c, "minOccurs") ?? "1", 10);
    const m = this.attr(c, "maxOccurs") ?? "1";
    return [min, m === "unbounded" ? -1 : parseInt(m, 10)];
  }

  /** null when the particle is pruned (maxOccurs 0). */
  particle(c: DOMElement): XSParticle | null {
    const kind = local(c.getTagName() ?? "");
    const [min, max] = this.occurs(c);
    if (max === 0) return null;
    switch (kind) {
      case "element": {
        const ref = this.attr(c, "ref");
        if (ref) return new XSParticle(this.globalElement(local(ref)), min, max);
        const decl = new XSElementDeclaration(this.attr(c, "name") ?? "", ANY_TYPE);
        decl.type = this.elementType(c);
        return new XSParticle(decl, min, max);
      }
      case "any":
        return new XSParticle(new XSWildcard(), min, max);
      case "group": {
        const ref = this.attr(c, "ref");
        const g = ref ? this.groups.get(local(ref)) : c;
        const inner = g ? this.kid(g, "sequence", "choice", "all") : null;
        if (!inner) return null;
        const p = this.particle(inner);
        return p ? new XSParticle(p.getTerm(), min, max) : null;
      }
      default: {
        const compositor = kind === "choice" ? XSModelGroup.COMPOSITOR_CHOICE : kind === "all" ? XSModelGroup.COMPOSITOR_ALL : XSModelGroup.COMPOSITOR_SEQUENCE;
        const parts: XSParticle[] = [];
        for (const k of this.kids(c, "element", "any", "group", "sequence", "choice")) {
          const p = this.particle(k);
          if (p) parts.push(p);
        }
        return new XSParticle(new XSModelGroup(compositor, parts), min, max);
      }
    }
  }
}

/** XMLSchemaLoader.load(new DOMInputImpl(null, null, null, xsdText, null)). */
export class XMLSchemaLoader {
  load(xsd: string): XSModel | null {
    const doc = parseDOM(xsd, "file:///schema.xsd", true);
    const root = doc.getDocumentElement();
    if (!root || local(root.getTagName() ?? "") !== "schema") return null;
    return new Compiler(root).compile();
  }
}
