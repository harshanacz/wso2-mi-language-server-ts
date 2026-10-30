import { describe, it, expect } from "vitest";
import { validateExpression, expressionValidation } from "../../src/expression/index.js";

// Ported from the Java ExpressionValidatorTest (wso2/mi-language-server).
const v = validateExpression;
const ok = (expr: string) => expect(v(expr).map((e) => e.message)).toEqual([]);
const firstMsg = (expr: string) => {
  const errors = v(expr);
  expect(errors.length).toBeGreaterThan(0);
  return errors[0].message;
};

describe("function argument count", () => {
  it("valid call has no errors", () => ok('toUpper("hello")'));
  it("multi-overload same arity accepts valid type", () => ok('length("hello")'));
  it("too few args", () =>
    expect(firstMsg('subString("hello")')).toContain("expects 2-3 argument(s) but received 1"));
  it("too many args", () =>
    expect(firstMsg('toUpper("a", "b")')).toContain("expects 1 argument(s) but received 2"));
  it("overload both arities valid", () => {
    ok('subString("x", 1)');
    ok('subString("x", 1, 3)');
  });
  it("zero args when one expected", () =>
    expect(firstMsg("toUpper()")).toContain("expects 1 argument(s) but received 0"));
  it("now() no args", () => ok("now()"));
  it("now() with args", () =>
    expect(firstMsg('now("x")')).toContain("expects 0 argument(s) but received 1"));
  it("replace missing third arg", () =>
    expect(firstMsg('replace("s", "old")')).toContain("expects 3 argument(s) but received 2"));
  it("pow missing second arg", () =>
    expect(firstMsg("pow(2)")).toContain("expects 2 argument(s) but received 1"));
  it("length too many args", () => expect(v('length("a", "b", "c")').length).toBeGreaterThan(0));
});

describe("literal argument types", () => {
  it("string where number expected", () =>
    expect(firstMsg('abs("hello")')).toContain("expects argument 1 to be"));
  it("number where string expected", () =>
    expect(firstMsg("toUpper(123)")).toContain("expects argument 1 to be string but received number"));
  it("number compatible with integer", () => ok('subString("x", 1)'));
  it("any type accepts all", () => {
    ok('exists("hello")');
    ok("exists(42)");
    ok("exists(true)");
  });
  it("non-literal arg skips type check", () => ok("abs(payload.price)"));
  it("boolean where string expected", () =>
    expect(firstMsg("toUpper(true)")).toContain("expects argument 1 to be string but received boolean"));
});

describe("warnings and overrides", () => {
  it("warning flag preserved", () =>
    expect(v("payload[?(@ > >)]").some((e) => e.warning)).toBe(true));
  it("round 1 arg", () => ok("round(3.5)"));
  it("round 2 args", () => ok("round(3.14159, 2)"));
  it("boolean 1 arg", () => ok('boolean("true")'));
  it("boolean no args", () =>
    expect(firstMsg("boolean()")).toContain("expects 1 argument(s) but received 0"));
  it("property secondary function, 1 arg", () => ok('xpath("//foo").property("name")'));
  it("property secondary function, 2 args", () => ok('xpath("//foo").property("name", "scope")'));
});

describe("syntax vs semantic", () => {
  it("syntax error short-circuits semantic validation", () =>
    expect(firstMsg('toUpper("hello"')).not.toContain("expects"));
  it("valid complex expression", () => ok("subString(toUpper(payload.name), 0, length(payload.name))"));
});

describe("functions.json completeness", () => {
  it("formatDateTime 2 args", () => ok('formatDateTime("2026-01-01", "yyyy-MM-dd")'));
  it("formatDateTime 3 args", () => ok('formatDateTime("2026-01-01", "yyyy-MM-dd", "dd/MM/yyyy")'));
  it("log 2 args", () => ok("log(100, 10)"));
  it("registry 2 args", () => ok('registry("conf:/path", "propKey")'));
  it("xpath 2 args", () => ok('xpath("//element", "varName")'));
  it("urlEncode 2 args", () => ok('urlEncode("hello world", "UTF-8")'));
  it("boolean() fails", () => expect(v("boolean()").length).toBeGreaterThan(0));
});

describe("division / modulo by zero", () => {
  it("division by literal zero", () => {
    const errors = v("payload.x / 0");
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain("Division by zero");
    expect(errors[0].warning).toBe(true);
  });
  it("modulo by literal zero", () => {
    const errors = v("payload.x % 0");
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain("Modulo by zero");
    expect(errors[0].warning).toBe(true);
  });
  it("division by non-zero", () => ok("payload.x / 5"));
  it("division by dynamic value", () => ok("payload.x / payload.y"));
  it("division by 0.0", () => {
    const errors = v("10 / 0.0");
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain("Division by zero");
  });
});

describe("unary NOT", () => {
  it("!true", () => ok("!true"));
  it("!payload.active", () => ok("!payload.active"));
  it("!(payload.x > 5)", () => ok("!(payload.x > 5)"));
  it("!!true", () => ok("!!true"));
});

describe("arithmetic operand types", () => {
  const has = (expr: string, text: string) =>
    expect(v(expr).some((e) => e.message.includes(text))).toBe(true);
  it("string + number ok", () => ok('"hello" + 123'));
  it("string - number warns", () => {
    has('"hello" - 123', "cannot be applied to string");
    expect(v('"hello" - 123').every((e) => e.warning)).toBe(true);
  });
  it("string * number warns", () => has('"hello" * 2', "cannot be applied to string"));
  it("boolean + number warns", () => has("true + 1", "cannot be applied to boolean"));
  it("boolean - boolean warns", () => has("true - false", "cannot be applied to boolean"));
  it("number + number ok", () => ok("5 + 3"));
  it("dynamic + string ok", () => ok('payload.x + "str"'));
  it("boolean / number warns", () => has("true / 2", "cannot be applied to boolean"));
});

describe("array index", () => {
  it("floating-point index warns", () => {
    const errors = v("payload[1.5]");
    expect(errors.some((e) => e.warning && e.message.includes("Array index should be an integer"))).toBe(true);
  });
});

describe("synapse/expressionValidation handler", () => {
  it("strips ${ } wrapper and reports valid", () => {
    expect(expressionValidation({ expression: "${toUpper(payload.name)}" })).toEqual({ isValid: true, errors: [] });
  });
  it("returns wire-format errors", () => {
    const res = expressionValidation({ expression: '${toUpper("a", "b")}' });
    expect(res.isValid).toBe(false);
    expect(res.errors[0]).toMatchObject({
      line: 1,
      charPositionInLine: 0,
      warning: false,
      expression: 'toUpper("a", "b")',
    });
    expect(typeof res.errors[0].offendingSymbol).toBe("string");
  });
  it("warnings make isValid false, like the Java server", () => {
    expect(expressionValidation({ expression: "payload.x / 0" }).isValid).toBe(false);
  });
});
