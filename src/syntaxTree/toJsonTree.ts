// Hand ported from the Java original (see git history for the generated base).
/** Equivalent of Gson.toJsonTree for syntax tree nodes (Map -> object, enums via toJSON, undefined dropped). */
export function toJsonTree(value: unknown): any {
  return JSON.parse(JSON.stringify(value, (_k, v) => (v instanceof Map ? Object.fromEntries(v) : v)));
}
