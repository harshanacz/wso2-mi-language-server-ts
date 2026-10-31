import "./helpers.js";
import { describe, it, expect } from "vitest";
import { Utils } from "../../src/syntaxTree/utils.js";

describe("Utils.formatXml", () => {
  it("indents nested elements by four spaces and keeps text-only elements inline", () => {
    expect(Utils.formatXml("<endpoint><http uri-template=\"http://a/b?x=1&amp;y=2\" method=\"get\"><timeout><duration>5</duration></timeout></http></endpoint>")).toBe(
      '<endpoint>\n    <http method="get" uri-template="http://a/b?x=1&amp;y=2">\n        <timeout>\n            <duration>5</duration>\n        </timeout>\n    </http>\n</endpoint>',
    );
  });
  it("drops whitespace only nodes and self closes empty elements", () => {
    expect(Utils.formatXml("<a>\n   <b>\n  </b>\n  <c/>\n</a>")).toBe("<a>\n    <b/>\n    <c/>\n</a>");
  });
  it("returns malformed or blank input unchanged", () => {
    expect(Utils.formatXml("<a><b></a>")).toBe("<a><b></a>");
    expect(Utils.formatXml("  ")).toBe("  ");
    expect(Utils.formatXml(null)).toBe(null);
  });
});
