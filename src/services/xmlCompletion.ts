import { XMLDocument, XMLNode } from "../parser/xmlNode.js";
import { Position, positionToOffset } from "../utils/positionUtils.js";

/** A single completion suggestion returned to the editor. */
export interface CompletionItem {
  label: string;
  kind: "element" | "attribute" | "value" | "closeTag";
  insertText: string;
  detail?: string;
}

/** A list of completion suggestions for a given cursor position. */
export interface CompletionList {
  items: CompletionItem[];
  isIncomplete: boolean;
}

/**
 * Returns completion suggestions for the given cursor position by detecting whether
 * the cursor is after '<', '</', or inside an attribute list. Uses schema data when
 * available, falling back to document-tree scanning.
 */
export function doComplete(
  document: XMLDocument,
  position: Position,
  schemaProvider?: any
): CompletionList {
  const offset = positionToOffset(document.text, position);
  const textBefore = document.text.substring(0, offset);

  // Context: cursor is right after '</'
  if (/<\/$/.test(textBefore)) {
    const node = document.findNodeAt(offset);
    if (node && node.type === "element" && node.name) {
      return {
        items: [{ label: node.name, kind: "closeTag", insertText: `${node.name}>` }],
        isIncomplete: false,
      };
    }
    return { items: [], isIncomplete: false };
  }

  // Context: cursor is right after '<' or '<' + partial tag name (no space yet)
  if (/<\w*$/.test(textBefore)) {
    if (schemaProvider?.hasData()) {
      const node = document.findNodeAt(offset);

      // Determine whether the cursor is still inside this node's open tag (e.g. '<foo|')
      // or in its content area (e.g. '<foo>\n  <|').  When inside the open tag we want
      // to suggest SIBLINGS (children of the parent); when in the content area we want
      // to suggest CHILDREN of the current node.
      let parentName: string | undefined;
      let parentNode: XMLNode | undefined;
      let incompleteChildNode: XMLNode | undefined;
      if (node.type === "element") {
        const nodeText = document.text.substring(node.startOffset, offset);
        const cursorIsInOpenTag = !nodeText.includes(">");
        if (cursorIsInOpenTag) {
          parentName =
            node.parent?.type === "element" ? node.parent.name : undefined;
          parentNode = node.parent?.type === "element" ? node.parent : undefined;
          incompleteChildNode = node;
        } else {
          parentName = node.name;
          parentNode = node;
        }
      }

      let children: { name: string; maxOccurs: number | "unbounded" }[];
      if (parentName === undefined) {
        // Root-level context: prefer children of the top-level container element
        // (e.g. <definitions> in Synapse config) so only config-artifact elements
        // are offered rather than every globally-declared element including mediators.
        children = schemaProvider.getChildElements("definitions");
        if (children.length === 0) {
          children = schemaProvider.getAllElements().map((name: string) => ({
            name,
            maxOccurs: "unbounded" as const,
          }));
        }
      } else {
        // Inside a known element: suggest only its schema-defined children.
        // No getAllElements() fallback — unknown or childless elements get nothing.
        children = schemaProvider.getChildElements(parentName);
      }

      const existingChildCounts = new Map<string, number>();
      for (const child of parentNode?.children ?? []) {
        // The node currently being typed is not an existing occurrence yet.
        if (child === incompleteChildNode || child.type !== "element" || !child.name) continue;
        existingChildCounts.set(child.name, (existingChildCounts.get(child.name) ?? 0) + 1);
      }
      const availableChildren = children.filter(
        (child) =>
          child.maxOccurs === "unbounded" ||
          (existingChildCounts.get(child.name) ?? 0) < child.maxOccurs
      );

      return {
        items: availableChildren.map((child) => ({
          label: child.name,
          kind: "element" as const,
          insertText: `${child.name}>$0</${child.name}>`,
        })),
        isIncomplete: false,
      };
    }

    // Fallback: scan document tree for known element names
    const names = new Set<string>();
    document.traverse((n) => {
      if (n.type === "element" && n.name) names.add(n.name);
    });
    return {
      items: Array.from(names).map((name) => ({
        label: name,
        kind: "element" as const,
        insertText: `${name}>$0</${name}>`,
      })),
      isIncomplete: false,
    };
  }

  // Context: cursor is inside an open tag (attribute position).
  // Use lastIndexOf('<') so this fires even after completed attribute values like
  // '<log level="full" |' where the old \w+\s+\w*$ regex would miss the quote boundary.
  const lastOpenAngle = textBefore.lastIndexOf("<");
  if (lastOpenAngle !== -1) {
    const fragment = textBefore.slice(lastOpenAngle);
    // Confirm: not a close tag, and the `<` hasn't been closed yet.
    if (!fragment.startsWith("</") && !fragment.includes(">")) {
      const tagMatch = /^<([\w:]+)/.exec(fragment);
      if (tagMatch && fragment.length > tagMatch[0].length) {
        const afterTagName = fragment.slice(tagMatch[0].length);
        // Only enter attribute context when there is at least one space after the tag name.
        if (/^\s/.test(afterTagName)) {
          const tagName = tagMatch[1];

          // Collect attribute names already specified in this tag before the cursor.
          const existingAttrs = new Set<string>();

          // 1. Regex search for completed attributes in the current open tag fragment (e.g. attr="val", attr='val', attr=val)
          const attrRegex = /\b([\w:.-]+)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/g;
          let match: RegExpExecArray | null;
          while ((match = attrRegex.exec(afterTagName)) !== null) {
            existingAttrs.add(match[1]);
          }

          // 2. Also check AST node for attributes whose names end before the current cursor offset
          const node = document.findNodeAt(offset);
          if (node && node.type === "element") {
            for (const attr of node.attributes) {
              if (attr.name && offset > attr.nameEnd) {
                existingAttrs.add(attr.name);
              }
            }
          }

          if (schemaProvider?.hasData()) {
            const schemaAttrs: any[] = schemaProvider.getAttributes(tagName) ?? [];
            const schemaAttrNames = new Set<string>(schemaAttrs.map((a: any) => a.name));

            const docAttrs = new Set<string>();
            document.traverse((n) => {
              if (n.type === "element" && n.name === tagName) {
                for (const a of n.attributes) docAttrs.add(a.name);
              }
            });
            const extraDocAttrs = Array.from(docAttrs).filter(
              (a) => !schemaAttrNames.has(a)
            );

            const availableSchemaAttrs = schemaAttrs.filter(
              (attr: any) => !existingAttrs.has(attr.name)
            );
            const availableExtraDocAttrs = extraDocAttrs.filter(
              (attr) => !existingAttrs.has(attr)
            );

            return {
              items: [
                ...availableSchemaAttrs.map((attr: any) => ({
                  label: attr.name,
                  kind: "attribute" as const,
                  insertText: `${attr.name}="$0"`,
                  ...(attr.type ? { detail: attr.type } : {}),
                })),
                ...availableExtraDocAttrs.map((attr) => ({
                  label: attr,
                  kind: "attribute" as const,
                  insertText: `${attr}="$0"`,
                })),
              ],
              isIncomplete: false,
            };
          }

          // Fallback: static common XML attributes
          const attrs = ["xml:lang", "xml:space", "xmlns"];
          const availableFallbackAttrs = attrs.filter((attr) => !existingAttrs.has(attr));
          return {
            items: availableFallbackAttrs.map((attr) => ({
              label: attr,
              kind: "attribute" as const,
              insertText: `${attr}="$0"`,
            })),
            isIncomplete: false,
          };
        }
      }
    }
  }

  return { items: [], isIncomplete: false };
}
