import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { fixture, makeTempDir, removeDir, MockClient, copyFileToDirectory } from "./helpers.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { NewProjectConnectorLoader } from "../../src/synapse/connectors/NewProjectConnectorLoader.js";
import { InboundConnectorHolder } from "../../src/synapse/inbound/conector/InboundConnectorHolder.js";
import { Constant } from "../../src/syntaxTree/constant.js";
import { Utils } from "../../src/syntaxTree/utils.js";

/** Ports NewDependentProjectConnectorLoaderTest. */
class TestableLoader extends (NewProjectConnectorLoader as any) {
  constructor(client: any, holder: any, inbound: any, private readonly home: string) {
    super(client, holder, inbound);
  }
  getUserHome(): string { return this.home; }
  getConnectorsZipFolderPaths(): string[] { return this.connectorsZipFolderPath; }
  copyToProjectIfNeeded(_zips: any[]): void {}
}

const CONNECTOR_REL = [Constant.SRC, Constant.MAIN, Constant.WSO2MI, Constant.RESOURCES, Constant.CONNECTORS].join("/");
const zip = (name: string) => fixture("synapse/connector/zips/" + name);

describe("NewProjectConnectorLoader with dependent projects", () => {
  let tempHome: string;
  let projectRoot: string;
  let loader: any;

  beforeEach(() => {
    tempHome = makeTempDir("mi-test-home-");
    projectRoot = makeTempDir("mi-test-project-");
    writeFileSync(join(projectRoot, "pom.xml"), "");
    mkdirSync(join(projectRoot, "src"));
    const holder = ConnectorHolder.getInstance();
    holder.clearConnectors();
    loader = new TestableLoader(new MockClient(), holder, new InboundConnectorHolder(), tempHome);
  });
  afterEach(() => {
    ConnectorHolder.getInstance().clearConnectors();
    removeDir(tempHome);
    removeDir(projectRoot);
  });

  const projectId = () => basename(projectRoot) + "_" + Utils.getHash(projectRoot);
  const downloadedDir = () => {
    const d = join(tempHome, Constant.WSO2_MI, Constant.CONNECTORS, projectId(), Constant.DOWNLOADED);
    mkdirSync(d, { recursive: true });
    return d;
  };
  const extractedDir = () => {
    const d = join(tempHome, Constant.WSO2_MI, Constant.INTEGRATION_PROJECT_DEPENDENCIES, projectId(), Constant.EXTRACTED);
    mkdirSync(d, { recursive: true });
    return d;
  };
  const connectorDirOf = (root: string) => {
    const d = join(root, CONNECTOR_REL);
    mkdirSync(d, { recursive: true });
    return d;
  };
  const get = (n: string) => ConnectorHolder.getInstance().getConnector(n);

  it("no dependency extracted dir: only base paths", () => {
    loader.init(projectRoot);
    expect(loader.getConnectorsZipFolderPaths().length).toBe(2);
  });
  it("empty dependency extracted dir: only base paths", () => {
    extractedDir();
    loader.init(projectRoot);
    expect(loader.getConnectorsZipFolderPaths().length).toBe(2);
  });
  it("dependency project with connectors: path added", () => {
    const dir = connectorDirOf(join(extractedDir(), "dep-project-A"));
    loader.init(projectRoot);
    loader.loadConnector();
    const paths = loader.getConnectorsZipFolderPaths();
    expect(paths.length).toBe(3);
    expect(paths).toContain(dir);
  });
  it("dependency project without connectors: path not added", () => {
    mkdirSync(join(extractedDir(), "dep-project-B", "src", "main"), { recursive: true });
    loader.init(projectRoot);
    loader.loadConnector();
    expect(loader.getConnectorsZipFolderPaths().length).toBe(2);
  });
  it("multiple dependency projects: only those with connectors", () => {
    const ex = extractedDir();
    const dir = connectorDirOf(join(ex, "dep-with-connectors"));
    mkdirSync(join(ex, "dep-without-connectors", "src"), { recursive: true });
    loader.init(projectRoot);
    loader.loadConnector();
    const paths = loader.getConnectorsZipFolderPaths();
    expect(paths.length).toBe(3);
    expect(paths).toContain(dir);
  });
  it("multiple dependency projects with connectors: all paths added", () => {
    const ex = extractedDir();
    const a = connectorDirOf(join(ex, "dep-A"));
    const b = connectorDirOf(join(ex, "dep-B"));
    loader.init(projectRoot);
    loader.loadConnector();
    const paths = loader.getConnectorsZipFolderPaths();
    expect(paths.length).toBe(4);
    expect(paths).toContain(a);
    expect(paths).toContain(b);
  });
  it("loadConnector refreshes dependency paths", () => {
    loader.init(projectRoot);
    expect(loader.getConnectorsZipFolderPaths().length).toBe(2);
    const dir = connectorDirOf(join(extractedDir(), "new-dep"));
    loader.loadConnector();
    const paths = loader.getConnectorsZipFolderPaths();
    expect(paths.length).toBe(3);
    expect(paths).toContain(dir);
  });
  it("downloaded connector is marked fromProject", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), downloadedDir());
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http")).not.toBeNull();
    expect(get("http").isFromProject()).toBe(true);
  });
  it("project and downloaded connectors both marked fromProject", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(projectRoot));
    copyFileToDirectory(zip("mi-connector-file-4.0.36.zip"), downloadedDir());
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http").isFromProject()).toBe(true);
    expect(get("file").isFromProject()).toBe(true);
  });
  it("downloaded and dependency connectors marked correctly", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), downloadedDir());
    copyFileToDirectory(zip("mi-connector-file-4.0.36.zip"), connectorDirOf(join(extractedDir(), "dep-project")));
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http").isFromProject()).toBe(true);
    expect(get("file").isFromProject()).toBe(false);
  });
  it("same connector in project and dependency is loaded once and marked fromProject", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(projectRoot));
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(join(extractedDir(), "dep-project")));
    loader.init(projectRoot);
    loader.loadConnector();
    expect(ConnectorHolder.getInstance().getConnectors().length).toBe(1);
    expect(get("http").isFromProject()).toBe(true);
  });
  it("project connector is marked fromProject", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(projectRoot));
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http").isFromProject()).toBe(true);
  });
  it("dependency connector is not marked fromProject", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(join(extractedDir(), "dep-project")));
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http").isFromProject()).toBe(false);
  });
  it("mixed connectors are marked correctly", () => {
    copyFileToDirectory(zip("mi-connector-http-0.1.8.zip"), connectorDirOf(projectRoot));
    copyFileToDirectory(zip("mi-connector-csv-3.0.0.zip"), downloadedDir());
    copyFileToDirectory(zip("mi-connector-file-4.0.36.zip"), connectorDirOf(join(extractedDir(), "dep-project")));
    loader.init(projectRoot);
    loader.loadConnector();
    expect(get("http").isFromProject()).toBe(true);
    expect(get("csv").isFromProject()).toBe(true);
    expect(get("file").isFromProject()).toBe(false);
  });
});
