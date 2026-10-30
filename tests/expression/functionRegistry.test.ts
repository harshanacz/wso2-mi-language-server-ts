import { describe, it, expect } from "vitest";
import { FunctionRegistry } from "../../src/expression/index.js";

// Ported from the Java FunctionRegistryTest (wso2/mi-language-server).
const registry = FunctionRegistry.getInstance();
const arities = (name: string) => registry.getOverloads(name).map((s) => s.arity);

describe("FunctionRegistry", () => {
  it("loads from functions.json", () => {
    for (const f of ["length", "toUpper", "toLower", "abs", "now"]) expect(registry.hasFunction(f)).toBe(true);
  });
  it("unknown function returns false", () => {
    for (const f of ["nonExistentFunction", "", "fooBar123"]) expect(registry.hasFunction(f)).toBe(false);
  });
  it("subString has 2 overloads", () => expect(registry.getOverloads("subString")).toHaveLength(2));
  it("min/max arity, overloaded", () => {
    expect(registry.getMinArity("subString")).toBe(2);
    expect(registry.getMaxArity("subString")).toBe(3);
  });
  it("min/max arity, single overload", () => {
    expect(registry.getMinArity("toUpper")).toBe(1);
    expect(registry.getMaxArity("toUpper")).toBe(1);
  });
  it("min/max arity, zero args", () => {
    expect(registry.getMinArity("now")).toBe(0);
    expect(registry.getMaxArity("now")).toBe(0);
  });
  it("usage string, single", () => expect(registry.getUsageString("toUpper")).toBe("toUpper(string)"));
  it("usage string, overloaded", () => {
    const usage = registry.getUsageString("subString");
    expect(usage).toContain("subString(");
    expect(usage).toContain("[");
  });
  it("usage string, unknown", () => expect(registry.getUsageString("unknownFunc")).toBe("unknownFunc(...)"));
  it("overloads for unknown is empty", () => expect(registry.getOverloads("unknownFunc")).toEqual([]));
  it("min/max arity for unknown is 0", () => {
    expect(registry.getMinArity("unknownFunc")).toBe(0);
    expect(registry.getMaxArity("unknownFunc")).toBe(0);
  });

  describe("overrides", () => {
    it("round has 1-arg and 2-arg overloads", () => {
      expect(registry.getOverloads("round")).toHaveLength(2);
      expect(arities("round")).toEqual(expect.arrayContaining([1, 2]));
    });
    it("boolean takes one 'any' arg", () => {
      const o = registry.getOverloads("boolean");
      expect(o).toHaveLength(1);
      expect(o[0].arity).toBe(1);
      expect(o[0].paramTypes[0]).toBe("any");
    });
    it("property has 1-arg and 2-arg overloads", () => {
      expect(registry.getOverloads("property")).toHaveLength(2);
      expect(arities("property")).toEqual(expect.arrayContaining([1, 2]));
    });
    it("urlEncode has at least 2 overloads", () =>
      expect(registry.getOverloads("urlEncode").length).toBeGreaterThanOrEqual(2));
    it("replace param types", () => {
      const sig = registry.getOverloads("replace")[0];
      expect(sig.arity).toBe(3);
      expect(sig.paramTypes).toEqual(["string", "string", "string"]);
    });
    it("xpath has a 2-arg overload", () => expect(arities("xpath")).toContain(2));
    it("registry has a 2-arg overload", () => expect(arities("registry")).toContain(2));
  });

  describe("functions.json completeness", () => {
    it("formatDateTime has 2 and 3 arg overloads", () =>
      expect(arities("formatDateTime")).toEqual(expect.arrayContaining([2, 3])));
    it("log has 1 and 2 arg overloads", () => expect(arities("log")).toEqual(expect.arrayContaining([1, 2])));
    it("round param types", () => {
      const o = registry.getOverloads("round");
      const one = o.find((s) => s.arity === 1)!;
      const two = o.find((s) => s.arity === 2)!;
      expect(one.paramTypes[0]).toBe("number");
      expect(two.paramTypes[0]).toBe("number");
      expect(two.paramTypes[1]).toBe("integer");
    });
    it("object and array functions loaded", () => {
      expect(registry.hasFunction("object")).toBe(true);
      expect(registry.hasFunction("array")).toBe(true);
      expect(registry.getMinArity("object")).toBe(1);
      expect(registry.getMinArity("array")).toBe(1);
    });
    it("exists takes one 'any' arg", () => {
      expect(registry.hasFunction("exists")).toBe(true);
      expect(registry.getMinArity("exists")).toBe(1);
      expect(registry.getOverloads("exists")[0].paramTypes[0]).toBe("any");
    });
  });
});
