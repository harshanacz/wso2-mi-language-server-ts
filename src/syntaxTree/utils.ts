/** Ports of the helpers in customservice/synapse/utils/Utils.java used by the syntax tree. */

export function unescapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

export function escapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

import { DOMNode, DOMElement, DOMAttr, parseDOM } from "./dom/dom.js";

function attributeXmlString(node: DOMNode): string {
  const children = node.getAttributeNodes();
  let xml = "";
  if (children && children.length > 0) {
    xml = " ";
    for (const child of children) {
      xml += child.getName() + '="' + unescapeXml(child.getValue()) + '" ';
    }
  }
  return xml;
}

export const Utils = {
  getInlineString(node: DOMNode | null | undefined, requiresXmlUnescaping = true): string {
    let inline = "";
    if (node) {
      if (node.isCDATA()) {
        inline = "<![CDATA[" + node.getTextContent() + "]]>";
      } else if (node.isText()) {
        inline = requiresXmlUnescaping ? (unescapeXml(node.getTextContent()) as string) : (node.getTextContent() as string);
      } else if (node instanceof DOMElement) {
        if (node.isSelfClosed()) {
          inline = "<" + node.getNodeName() + attributeXmlString(node) + "/>";
        } else if (!node.isOrphanEndTag()) {
          inline = "<" + node.getNodeName() + attributeXmlString(node) + ">";
          const children = node.getChildren();
          if (children && children.length > 0) {
            if (children[0] instanceof DOMElement) inline += "\n";
            for (const child of children) {
              inline += Utils.getInlineString(child);
              if (child instanceof DOMElement) inline += "\n";
            }
          }
          inline += "</" + escapeXml(node.getNodeName()) + ">";
        }
      }
    }
    return inline;
  },

  parseInt(n: string | null | undefined): number {
    if (n === null || n === undefined || n === "") return -1;
    return /^[+-]?\d+$/.test(n) && Math.abs(Number(n)) <= 2147483647 ? Number(n) : -1;
  },

  getChildNodeByName(node: DOMNode, name: string): DOMNode | null {
    for (const c of node.getChildren()) {
      if (name.toLowerCase() === (c.getNodeName() ?? "").toLowerCase()) return c;
    }
    return null;
  },

  getDOMDocument(content: string) {
    return parseDOM(content);
  },

  unescapeXml,

  removeCDATATag(value: string | null | undefined): string {
    if (!value) return "";
    return value.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
  },

  getFirstElement(element: DOMElement): DOMElement | null {
    for (const c of element.getChildren()) if (c instanceof DOMElement) return c;
    return null;
  },

  containsIgnoreCase(list: string[], name: string): boolean {
    return list.some((s) => s.toLowerCase() === (name ?? "").toLowerCase());
  },

  compareVersions(v1: string, v2: string): number {
    const a = v1.split("."), b = v2.split(".");
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = i < a.length ? parseInt(a[i], 10) : 0;
      const y = i < b.length ? parseInt(b[i], 10) : 0;
      if (x < y) return -1;
      if (x > y) return 1;
    }
    return 0;
  },

  getEnumFromValue,
};

/** Port of Utils.getEnumFromValue: Enum.valueOf by name, falling back to matching getValue(). */
export function getEnumFromValue(value: string | null | undefined, enumClass: any): any {
  if (value !== null && value !== undefined) {
    try {
      return enumClass.valueOf(value);
    } catch {
      for (const e of enumClass.values()) {
        if (typeof e.getValue === "function" && e.getValue() === value) return e;
      }
    }
  }
  return null;
}
