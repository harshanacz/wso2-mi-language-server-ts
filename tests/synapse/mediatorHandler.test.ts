import { makeTempDir } from "./helpers.js";
import { System } from "../../src/syntaxTree/javaCompat.js";
import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { setResourceRoot } from "../../src/synapse/resources.js";
import { MediatorHandler } from "../../src/synapse/mediatorService/MediatorHandler.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { Position, Range, TextDocumentIdentifier } from "../../src/synapse/lsp.js";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

setResourceRoot(resolve(__dirname, "../../resources"));
System.setProperty("user.home", makeTempDir("mihome"));

const m = (o: Record<string, unknown>): Map<string, unknown> => new Map(Object.entries(o));

function handler(version = "4.4.0"): MediatorHandler {
  const h = new MediatorHandler();
  h.init(makeTempDir("proj"), version, new ConnectorHolder());
  return h;
}

describe("mediator handler", () => {
  it("initialises with the bundled mediator list, templates and ui schemas", () => {
    const h = handler();
    expect(h.isInitialized()).toBe(true);
    expect(h.templateMap!.size).toBeGreaterThan(40);
    expect(h.uiSchemaMap!.size).toBeGreaterThan(40);
    const list = h.mediatorList!;
    expect(list.has("favourites")).toBe(true);
    expect(list.getAsJsonObject("favourites").has("items")).toBe(true);
  });

  it("generates a log mediator config from form data", () => {
    const h = handler();
    const range = new Range(new Position(3, 4), new Position(3, 4));
    const res = h.generateSynapseConfig("", range, "log", m({ category: "INFO", level: "custom", description: "hi", properties: [] }), ["level"]);
    expect(res).not.toBeNull();
    const text = (res as any).getTextEdits()[0].getNewText();
    expect(text.startsWith("<log")).toBe(true);
    expect(text).toContain('category="INFO"');
    expect(text).toContain('level="custom"');
    expect(text).toContain('description="hi"');
  });

  it("reads existing mediator values back into the ui schema", () => {
    const h = handler();
    const dir = makeTempDir("doc");
    const file = join(dir, "seq.xml");
    writeFileSync(file, '<?xml version="1.0" encoding="UTF-8"?>\n<sequence name="s" xmlns="http://ws.apache.org/ns/synapse">\n    <log category="WARN" level="full"/>\n</sequence>\n');
    const id = new TextDocumentIdentifier("file://" + file);
    const schema = h.getUISchemaWithValues(id, new Position(2, 5))!;
    expect(schema).not.toBeNull();
    expect(JSON.stringify(schema.toJSON())).toContain("WARN");
  });

  it("lists supported mediators for a position and hides terminal ones after a send", () => {
    const h = handler();
    const dir = makeTempDir("doc2");
    const file = join(dir, "seq.xml");
    writeFileSync(file, '<sequence name="s" xmlns="http://ws.apache.org/ns/synapse">\n    <log/>\n    <respond/>\n</sequence>\n');
    const id = new TextDocumentIdentifier("file://" + file);
    const afterLog = h.getSupportedMediators(id, new Position(1, 11))!;
    expect(afterLog.has("favourites")).toBe(true);
    const afterRespond = h.getSupportedMediators(id, new Position(2, 14))!;
    expect(afterRespond.size()).toBe(0);
  });
});
