/** Ports of the helpers in customservice/synapse/utils/Utils.java used by the syntax tree. */

export function unescapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

export function escapeXml(text: string | null | undefined): string | null | undefined {
  if (text === null || text === undefined) return text;
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
