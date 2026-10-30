import { describe, it, expect } from "vitest";
import { syntaxTreeForDocument, artifactTypeForDocument } from "../../src/syntaxTree/index.js";

const api =
  '<api xmlns="http://ws.apache.org/ns/synapse" name="CalculatorAPI" context="/calculate">' +
  '<resource methods="POST" uri-template="/add"><inSequence><log level="full"/><respond/></inSequence></resource></api>';

describe("synapse/syntaxTree", () => {
  it("builds the JSON tree", () => {
    const r = syntaxTreeForDocument(api, "file:///a.xml") as any;
    expect(r.defFilePath).toBe("file:///a.xml");
    const node = r.syntaxTree.api;
    expect(node.name).toBe("CalculatorAPI");
    expect(node.context).toBe("/calculate");
    expect(node.tag).toBe("api");
    expect(node.resource[0].methods).toEqual(["POST"]);
    expect(node.resource[0].inSequence.mediatorList[0].level).toBe("full");
    expect(node.range.startTagRange.start).toEqual({ line: 0, character: 0 });
    console.log(JSON.stringify(r.syntaxTree).slice(0, 1500));
  });
  it("reports artifact type", () => {
    expect(artifactTypeForDocument("/x/a.xml", api).artifactType).toBe("API");
    expect(artifactTypeForDocument("/x/a.xml", null).error).toContain("File not found");
  });
});
