import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { MustacheFactory, StringWriter } from "../../src/synapse/mustache/Mustache.js";

const f = new MustacheFactory();
const render = (tpl: string, data: unknown): string => f.compile(tpl, "t").execute(new StringWriter(), data).toString();
const m = (o: Record<string, unknown>): Map<string, unknown> => new Map(Object.entries(o));

describe("mustache", () => {
  it("escapes variables as XML and leaves triple mustaches raw", () => {
    expect(render('a="{{x}}" b={{{x}}} c={{&x}}', m({ x: '<&">' }))).toBe('a="&lt;&amp;&quot;&gt;" b=<&"> c=<&">');
  });
  it("sections iterate lists, test booleans and strings, and push map scopes", () => {
    expect(render("{{#a}}[{{.}}]{{/a}}", m({ a: ["x", "y"] }))).toBe("[x][y]");
    expect(render("{{#a}}yes{{/a}}{{^a}}no{{/a}}", m({ a: false }))).toBe("no");
    expect(render("{{#a}}yes{{/a}}{{^a}}no{{/a}}", m({ a: "" }))).toBe("no");
    expect(render("{{#a}}yes{{/a}}{{^a}}no{{/a}}", m({}))).toBe("no");
    expect(render("{{#a}}{{b}}{{/a}}", m({ a: m({ b: 1 }) }))).toBe("1");
    expect(render("{{#a}}{{b}}-{{c}}{{/a}}", m({ c: "outer", a: [m({ b: 1 }), m({ b: 2, c: "inner" })] }))).toBe("1-outer2-inner");
  });
  it("answers empty/size of collections like the Java reflection handler", () => {
    expect(render("{{#empty}}E{{/empty}}{{^empty}}N{{/empty}}", m({ k: 1 }))).toBe("N");
    expect(render("{{#empty}}E{{/empty}}{{^empty}}N{{/empty}}", m({}))).toBe("E");
  });
  it("drops standalone section tag lines", () => {
    const tpl = "start\n{{#a}}\n  line {{x}}\n{{/a}}\nend\n";
    expect(render(tpl, m({ a: true, x: "1" }))).toBe("start\n  line 1\nend\n");
    expect(render(tpl, m({ a: false }))).toBe("start\nend\n");
  });
  it("renders the bundled log template", () => {
    const tpl = readFileSync("resources/mediators/430/templates/log.mustache", "utf8");
    const out = render(tpl, m({ selfClosed: true, level: "custom", category: "INFO" }));
    expect(out.trim()).toBe('<log category="INFO" level="custom"  />');
  });
});
