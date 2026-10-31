import { makeTempDir, removeDir } from "./helpers.js";
import { System } from "../../src/syntaxTree/javaCompat.js";
import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { setResourceRoot } from "../../src/synapse/resources.js";
import { Position } from "../../src/synapse/lsp.js";
import { ExpressionParam } from "../../src/synapse/expression/pojo/ExpressionParam.js";
import { ExpressionSignatureProvider } from "../../src/synapse/expression/ExpressionSignatureProvider.js";
import { ExpressionCompletionsProvider } from "../../src/synapse/expression/ExpressionCompletionsProvider.js";
import { ExpressionCompletionUtils } from "../../src/synapse/expression/ExpressionCompletionUtils.js";

setResourceRoot(resolve(__dirname, "../../resources"));
System.setProperty("user.home", makeTempDir("mihome"));

describe("expression providers", () => {
  it("loads function completions grouped by category", () => {
    const fns = ExpressionCompletionUtils.getFunctions();
    expect(fns.size).toBeGreaterThan(3);
    const all = [...fns.values()].flatMap((f) => f.getItems());
    expect(all.some((i) => i.getLabel() === "length(value:array)")).toBe(true);
  });

  it("signature help follows the active parameter", () => {
    const help = ExpressionSignatureProvider.getFunctionSignatures(new ExpressionParam("subString(payload, ", 19));
    expect(help).not.toBeNull();
    expect(help!.getActiveParameter()).toBe(1);
    expect(help!.getSignatures()[0].getLabel()).toBe("subString(value:string, beginIndex:integer)");
    expect(ExpressionSignatureProvider.getFunctionSignatures(new ExpressionParam("payload", 3))).toBeNull();
  });

  it("root level completions include objects and functions", () => {
    const res: any = ExpressionCompletionsProvider.getCompletions(new ExpressionParam(null as any, new Position(0, 0), "", 0));
    const labels = res.getItems().map((i: any) => i.getLabel());
    for (const l of ["vars", "props", "params", "headers", "payload", "configs", "length(value:array)"]) expect(labels).toContain(l);
    const vars = res.getItems().find((i: any) => i.getLabel() === "vars");
    expect(vars.getSortText()).toBe("0_vars");
    expect(vars.getInsertTextFormat()).toBe(1);
  });

  it("filters root level completions by prefix", () => {
    const res: any = ExpressionCompletionsProvider.getCompletions(new ExpressionParam(null as any, new Position(0, 0), "pa", 2));
    const labels = res.getItems().map((i: any) => i.getLabel());
    expect(labels).toContain("params");
    expect(labels).toContain("payload");
    expect(labels).not.toContain("vars");
  });
});

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ExpressionHelperProvider } from "../../src/synapse/expression/ExpressionHelperProvider.js";


describe("expression completions with a document", () => {
  it("offers properties and variables set before the cursor", () => {
    const dir = makeTempDir("exprproj");
    try {
      const apiDir = join(dir, "src/main/wso2mi/artifacts/apis");
      mkdirSync(apiDir, { recursive: true });
      const api = join(apiDir, "T.xml");
      writeFileSync(api, `<?xml version="1.0" encoding="UTF-8"?>
<api context="/t" name="T" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/x">
        <inSequence>
            <property name="foo" value="bar" scope="default"/>
            <variable name="v1" type="STRING" value="1"/>
            <log level="full"/>
        </inSequence>
    </resource>
</api>
`);
      const pos = new Position(6, 12);
      const props: any = ExpressionCompletionsProvider.getCompletions(new ExpressionParam(api, pos, "props.", 6));
      expect(props.getItems().map((i: any) => i.getLabel())).toEqual(["synapse", "axis2"]);
      const vars: any = ExpressionCompletionsProvider.getCompletions(new ExpressionParam(api, pos, "vars.", 5));
      expect(vars.getItems().map((i: any) => i.getLabel())).toEqual(["v1"]);
    } finally {
      removeDir(dir);
    }
  });
});

describe("expression completions: second level", () => {
  it("offers entries under props.synapse and vars", () => {
    const dir = makeTempDir("exprproj2");
    try {
      const apiDir = join(dir, "src/main/wso2mi/artifacts/apis");
      mkdirSync(apiDir, { recursive: true });
      const api = join(apiDir, "T.xml");
      writeFileSync(api, `<?xml version="1.0" encoding="UTF-8"?>
<api context="/t" name="T" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/x/{id}?q=1">
        <inSequence>
            <property name="foo" value="bar" scope="default"/>
            <property name="ax" value="1" scope="axis2"/>
            <variable name="v1" type="STRING" value="1"/>
            <log level="full"/>
        </inSequence>
    </resource>
</api>
`);
      const pos = new Position(7, 8);
      const get = (e: string) => {
        const r: any = ExpressionCompletionsProvider.getCompletions(new ExpressionParam(api, pos, e, e.length));
        return r.getItems().map((i: any) => i.getLabel());
      };
      expect(get("props.synapse.")).toContain("foo");
      expect(get("props.axis2.")).toContain("ax");
      expect(get("vars.")).toContain("v1");
      expect(get("params.")).toEqual(expect.arrayContaining(["pathParams", "queryParams"]));
      expect(get("params.pathParams.")).toContain("id");
      expect(get("params.queryParams.")).toContain("q");
    } finally {
      removeDir(dir);
    }
  });
});

describe("expression helper panel", () => {
  it("collects properties, variables, params and functions at the cursor", () => {
    const dir = makeTempDir("exprproj3");
    try {
      const apiDir = join(dir, "src/main/wso2mi/artifacts/apis");
      mkdirSync(apiDir, { recursive: true });
      const api = join(apiDir, "T.xml");
      writeFileSync(api, `<?xml version="1.0" encoding="UTF-8"?>
<api context="/t" name="T" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/x/{id}?q=1">
        <inSequence>
            <property name="foo" value="bar" scope="default"/>
            <variable name="v1" type="STRING" value="1"/>
            <log level="full"/>
        </inSequence>
    </resource>
</api>
`);
      const data: any = new ExpressionHelperProvider(dir).getExpressionHelperData(new ExpressionParam(api, new Position(7, 8)));
      expect(data.getVariables().map((i: any) => i.getLabel())).toContain("v1");
      const props = data.getProperties().map((i: any) => i.getLabel());
      expect(props).toEqual(expect.arrayContaining(["SYNAPSE", "AXIS2"]));
      const params = data.getParams().map((i: any) => i.getLabel());
      expect(params).toEqual(expect.arrayContaining(["QUERY", "PATH", "FUNC"]));
      expect(data.getFunctions().size).toBeGreaterThan(3);
    } finally {
      removeDir(dir);
    }
  });
});
