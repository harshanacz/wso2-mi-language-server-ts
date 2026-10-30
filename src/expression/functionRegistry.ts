import functionsJson from "./functions.json";
import type { FunctionSignature } from "./types.js";

interface FunctionsFile {
  [category: string]: {
    items?: Array<{
      label: string;
      details?: string;
      signature?: Record<string, string>;
    }>;
  };
}

function extractFunctionName(label: string): string {
  const paren = label.indexOf("(");
  return paren > 0 ? label.substring(0, paren).trim() : label.trim();
}

function makeSignature(name: string, paramTypes: string[], description: string): FunctionSignature {
  return { name, paramTypes, arity: paramTypes.length, description };
}

/**
 * Port of FunctionRegistry.java. Loads function signatures from functions.json
 * (bundled at build time, so it works in Node and in the browser) and supports
 * overloaded functions.
 */
export class FunctionRegistry {
  private static instance: FunctionRegistry | undefined;
  private readonly functionMap = new Map<string, FunctionSignature[]>();

  private constructor() {
    this.loadFunctions();
  }

  static getInstance(): FunctionRegistry {
    FunctionRegistry.instance ??= new FunctionRegistry();
    return FunctionRegistry.instance;
  }

  getOverloads(functionName: string): FunctionSignature[] {
    return this.functionMap.get(functionName) ?? [];
  }

  hasFunction(functionName: string): boolean {
    return this.functionMap.has(functionName);
  }

  /** Human readable usage, e.g. `subString(string, integer[, integer])`. */
  getUsageString(functionName: string): string {
    const overloads = this.getOverloads(functionName);
    if (overloads.length === 0) {
      return `${functionName}(...)`;
    }
    if (overloads.length === 1) {
      return `${functionName}(${overloads[0].paramTypes.join(", ")})`;
    }
    const minArity = this.getMinArity(functionName);
    const maxArity = this.getMaxArity(functionName);
    const maxSig = overloads.find((s) => s.arity === maxArity) ?? overloads[0];
    const parts = maxSig.paramTypes.map((p, i) => (i >= minArity ? `[${p}]` : p));
    let out = functionName + "(";
    parts.forEach((p, i) => {
      if (i > 0) out += ", ";
      out += p;
    });
    return out + ")";
  }

  getMinArity(functionName: string): number {
    const overloads = this.getOverloads(functionName);
    return overloads.length ? Math.min(...overloads.map((s) => s.arity)) : 0;
  }

  getMaxArity(functionName: string): number {
    const overloads = this.getOverloads(functionName);
    return overloads.length ? Math.max(...overloads.map((s) => s.arity)) : 0;
  }

  private loadFunctions(): void {
    const root = functionsJson as unknown as FunctionsFile;
    for (const category of Object.values(root)) {
      if (!category || !Array.isArray(category.items)) continue;
      for (const item of category.items) {
        const funcName = extractFunctionName(item.label);
        const paramTypes = item.signature ? Object.values(item.signature).map(String) : [];
        const sig = makeSignature(funcName, paramTypes, item.details ?? "");
        const list = this.functionMap.get(funcName);
        if (list) list.push(sig);
        else this.functionMap.set(funcName, [sig]);
      }
    }
    // `property` is a SECONDARY_FUNCTIONS token in the grammar, so it's not in functions.json.
    if (!this.functionMap.has("property")) {
      this.functionMap.set("property", [
        makeSignature("property", ["string"], "Get property value"),
        makeSignature("property", ["string", "string"], "Get property value with scope"),
      ]);
    }
  }
}
