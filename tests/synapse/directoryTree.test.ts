import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { fixture } from "./helpers.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { DirectoryTreeBuilder } from "../../src/synapse/directoryTree/DirectoryTreeBuilder.js";
import { WorkspaceFolder } from "../../src/synapse/lsp.js";
import { JsonObject, JsonArray, JsonElement } from "../../src/synapse/gson.js";

/** Ports DirectoryTreeBuilderTest. */
function sanitize(e: JsonElement): JsonElement {
  if (e instanceof JsonObject) {
    const out = new JsonObject();
    for (const k of e.keySet()) {
      if (k === "path" || k === "registryPath") continue;
      out.add(k, sanitize(e.get(k)!));
    }
    return out;
  }
  if (e instanceof JsonArray) {
    const out = new JsonArray();
    for (const x of e) out.add(sanitize(x));
    return out;
  }
  return e;
}

const project = () => fixture("synapse/resource.finder/test_project");

describe("DirectoryTreeBuilder", () => {
  beforeEach(() => {
    vi.spyOn(ConnectorHolder, "isValidConnector").mockReturnValue(true);
  });
  afterEach(() => vi.restoreAllMocks());

  it("buildDirectoryTreeWithValidProjectFolder", () => {
    const expected = readFileSync(fixture("synapse/directorytree.builder/generated-directory-tree.json"), "utf8");
    const result = DirectoryTreeBuilder.buildDirectoryTree(new WorkspaceFolder(project()));
    expect(sanitize(result.getDirectoryMap().getAsJsonObject()).toString()).toBe(expected);
  });

  it("buildDirectoryTreeWithInvalidValidProjectFolder", () => {
    const result = DirectoryTreeBuilder.buildDirectoryTree(new WorkspaceFolder(fixture("synapse/resource.finder")));
    expect(result.getDirectoryMap()).toBeFalsy();
  });

  it("getProjectExplorerModelWithValidProjectFolder", () => {
    const expected = readFileSync(fixture("synapse/directorytree.builder/generated-project-explorer.json"), "utf8");
    const result = DirectoryTreeBuilder.getProjectExplorerModel(new WorkspaceFolder(project()));
    expect(sanitize(result.getDirectoryMap().getAsJsonObject()).toString()).toBe(expected);
  });

  it("getProjectExplorerModelWithInvalidProjectFolder", () => {
    const result = DirectoryTreeBuilder.getProjectExplorerModel(new WorkspaceFolder(fixture("synapse/resource.finder")));
    expect(result).toBeNull();
  });

  it("getProjectIdentifiersWithArtifactList", () => {
    const p = project();
    const api = p + "/src/main/wso2mi/artifacts/apis/testApi.xml";
    const seq = p + "/src/main/wso2mi/artifacts/sequences/testSequence1.xml";
    const result = DirectoryTreeBuilder.getProjectIdentifiers(new WorkspaceFolder(p), [api, seq]);
    expect(result).toEqual(["apis/testApi", "sequences/testSequence1"]);
  });

  it("getProjectIdentifiersWithEmptyArtifactList", () => {
    expect(DirectoryTreeBuilder.getProjectIdentifiers(new WorkspaceFolder(project()), [])).toEqual([]);
  });
});
