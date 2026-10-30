import { resolve } from "node:path";
import { setHostFileSystem } from "../../src/synapse/host/fs.js";
import { NodeFileSystem } from "../../src/synapse/host/nodeFs.js";

setHostFileSystem(new NodeFileSystem());

/** Absolute path of a fixture under tests/fixtures (the Java tests' src/test/resources). */
export function fixture(rel: string): string {
  return resolve(__dirname, "../fixtures", rel.replace(/^\//, ""));
}

import { mkdtempSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { JFile } from "../../src/synapse/host/JFile.js";
import { Utils } from "../../src/syntaxTree/utils.js";

export function makeTempDir(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
}

export function removeDir(p: string): void {
  rmSync(p, { recursive: true, force: true });
}

/** TestUtils.extractConnectorZips: each zip in the fixture folder is extracted to <extractFolder>/<zip name>. */
export function extractConnectorZips(extractFolder: string, resourcePath: string): void {
  const dir = fixture(resourcePath);
  for (const name of readdirSync(dir)) {
    const base = name.substring(0, name.lastIndexOf("."));
    const target = join(extractFolder, base);
    mkdirSync(target, { recursive: true });
    Utils.extractZip(new JFile(join(dir, name)), new JFile(target));
  }
}

import { copyFileSync, rmSync as rm } from "node:fs";
import { basename } from "node:path";
import { NewProjectConnectorLoader } from "../../src/synapse/connectors/NewProjectConnectorLoader.js";
import type { SynapseLanguageClientAPI } from "../../src/synapse/SynapseLanguageClientAPI.js";

/** MockXMLLanguageClient: records notifications. */
export class MockClient implements SynapseLanguageClientAPI {
  statuses: any[] = [];
  removed: any[] = [];
  logs: string[] = [];
  addConnectorStatus(m: any): void { this.statuses.push(m); }
  removeConnectorStatus(m: any): void { this.removed.push(m); }
  tryoutLog(m: string): void { this.logs.push(m); }
}

/** MockConnectorLoader */
export class MockConnectorLoader extends (NewProjectConnectorLoader as any) {
  constructor(client: any, holder: any, inbound: any, private readonly tempPath: string) {
    super(client, holder, inbound);
  }
  copyToProjectIfNeeded(_zips: any[]): void {}
  getConnectorExtractFolder(): JFile { return new JFile(join(this.tempPath, "extracted")); }
  setConnectorsZipFolderPath(_root: string): void {
    const p = join(this.tempPath, "connectors");
    this.connectorsZipFolderPath.push(p);
    this.baseConnectorsZipFolderPaths.push(p);
  }
}

export function copyFileToDirectory(file: string, dir: string): void {
  mkdirSync(dir, { recursive: true });
  copyFileSync(file, join(dir, basename(file)));
}
export function forceDelete(p: string): void { rm(p, { recursive: true, force: true }); }
