/**
 * A tiny element tree with the serialisation of the JDK identity Transformer (INDENT=yes), which is what the Java
 * data service generator uses to print the DOM it builds. Attributes come out sorted by name, as in Xerces.
 */
export class XElement {
  private readonly attrs = new Map<string, string>();
  private readonly kids: (XElement | string)[] = [];

  constructor(readonly name: string) {}

  setAttribute(name: string, value: string): void {
    this.attrs.set(name, value);
  }

  appendChild(child: XElement): XElement {
    this.kids.push(child);
    return child;
  }

  setTextContent(text: string): void {
    this.kids.length = 0;
    if (text !== "") this.kids.push(text);
  }

  serialize(indentAmount: number, depth = 0): string {
    const pad = " ".repeat(indentAmount * depth);
    let out = pad + "<" + this.name;
    for (const key of [...this.attrs.keys()].sort()) out += " " + key + '="' + escapeAttr(this.attrs.get(key)!) + '"';
    if (this.kids.length === 0) return out + "/>";
    if (this.kids.every((k) => typeof k === "string")) {
      return out + ">" + escapeText(this.kids.join("")) + "</" + this.name + ">";
    }
    out += ">";
    for (const kid of this.kids) {
      out += "\n" + (typeof kid === "string" ? pad + " ".repeat(indentAmount) + escapeText(kid) : kid.serialize(indentAmount, depth + 1));
    }
    return out + "\n" + pad + "</" + this.name + ">";
  }
}

export class XDocument {
  private root: XElement | null = null;

  createElement(name: string): XElement {
    return new XElement(name);
  }

  appendChild(el: XElement): XElement {
    this.root = el;
    return el;
  }

  /** Output of the identity transformer: an XML declaration immediately followed by the indented root element. */
  serialize(indentAmount: number): string {
    return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + (this.root ? this.root.serialize(indentAmount) : "");
  }
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#13;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/\t/g, "&#9;").replace(/\n/g, "&#10;").replace(/\r/g, "&#13;");
}
