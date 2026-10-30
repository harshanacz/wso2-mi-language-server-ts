// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { makeTempDir, removeDir } from "./helpers.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { Connector } from "../../src/synapse/connectors/entity/Connector.js";
import { AbstractResourceFinder } from "../../src/synapse/resourceFinder/AbstractResourceFinder.js";
import { ArtifactResource } from "../../src/synapse/resourceFinder/pojo/ArtifactResource.js";
import { LoadDependentResourcesResponse } from "../../src/synapse/resourceFinder/pojo/LoadDependentResourcesResponse.js";
import { RegistryResource } from "../../src/synapse/resourceFinder/pojo/RegistryResource.js";
import { ResourceResponse } from "../../src/synapse/resourceFinder/pojo/ResourceResponse.js";
import { Constant } from "../../src/syntaxTree/constant.js";
import { Utils } from "../../src/syntaxTree/utils.js";
import { Files, Path, FileTime } from "../../src/synapse/host/nio.js";

/** Ports LoadDependentResourcesTest (conflict detection in AbstractResourceFinder.loadDependentResources). */
const assertEquals = (e: any, a: any) => expect(a).toEqual(e);
const assertTrue = (c: any, msg?: string) => expect(!!c, msg).toBe(true);
const assertFalse = (c: any, msg?: string) => expect(!!c, msg).toBe(false);
const assertNotNull = (v: any) => expect(v ?? null).not.toBeNull();

class TestResourceFinder extends AbstractResourceFinder {
  private userHome = "";
  private readonly projectResources = new Map<string, Map<string, ResourceResponse>>();
  setUserHome(h: string) { this.userHome = h; }
  getUserHome(): string { return this.userHome; }
  setProjectResources(p: string, r: Map<string, ResourceResponse>) { this.projectResources.set(p, r); }
  findAllResources(p: string): Map<string, ResourceResponse> { return this.projectResources.get(p) ?? new Map(); }
  findResources(..._a: any[]): any { return null; }
  getArtifactFolder(type: string): string { return type + "s"; }
}

describe("LoadDependentResources", () => {
  let tempUserHome: string;
  let mainProjectPath: string;
  let resourceFinder: TestResourceFinder;

  const createPomXml = (dir: Path, g: string, a: string, v: string, versioned = false) => {
    const pom = '<?xml version="1.0" encoding="UTF-8"?>\n<project xmlns="http://maven.apache.org/POM/4.0.0">\n'
      + "  <modelVersion>4.0.0</modelVersion>\n  <groupId>" + g + "</groupId>\n  <artifactId>" + a + "</artifactId>\n"
      + "  <version>" + v + "</version>\n  <packaging>pom</packaging>\n  <properties>\n"
      + "    <projectType>integration-project</projectType>\n"
      + (versioned ? "    <versionedDeployment>true</versionedDeployment>\n" : "")
      + "  </properties>\n</project>\n";
    Files.writeString(dir.resolve("pom.xml"), pom);
  };
  const createVersionedPomXml = (dir: Path, g: string, a: string, v: string) => createPomXml(dir, g, a, v, true);

  const createDependencyBaseDir = (): Path => {
    const projectName = mainProjectPath.substring(mainProjectPath.lastIndexOf("/") + 1);
    const hash = Utils.getHash(mainProjectPath);
    const depDir = Path.of(tempUserHome).resolve(Constant.WSO2_MI).resolve(Constant.INTEGRATION_PROJECT_DEPENDENCIES)
      .resolve(projectName + Constant.UNDERSCORE + hash);
    Files.createDirectories(depDir.resolve(Constant.EXTRACTED));
    Files.createDirectories(depDir.resolve(Constant.DOWNLOADED));
    return depDir;
  };
  const createDependentProject = (depBaseDir: Path, dirName: string, g: string, a: string, v: string): Path => {
    const p = depBaseDir.resolve(Constant.EXTRACTED).resolve(dirName);
    Files.createDirectories(p);
    createPomXml(p, g, a, v);
    return p;
  };
  const createDownloadedFile = (depBaseDir: Path, g: string, a: string, v: string, ext: string): Path => {
    const f = depBaseDir.resolve(Constant.DOWNLOADED).resolve(g + Constant.HYPHEN + a + Constant.HYPHEN + v + ext);
    Files.createFile(f);
    return f;
  };
  const buildResources = (type: string, ...names: string[]): Map<string, ResourceResponse> => {
    const map = new Map<string, ResourceResponse>();
    const response = new ResourceResponse();
    const resources: any[] = [];
    for (const name of names) {
      const a = new ArtifactResource();
      a.setName(name);
      a.setType(type);
      resources.push(a);
    }
    response.setResources(resources);
    map.set(type, response);
    return map;
  };
  const registerConnectorInHolder = (shortName: string, zipBaseName: string) => {
    const c = new Connector();
    c.setName(shortName);
    const i = zipBaseName.lastIndexOf("-");
    c.setArtifactId(i > 0 ? zipBaseName.substring(0, i) : zipBaseName);
    c.setExtractedConnectorPath("/fake/extracted/" + zipBaseName);
    c.setFromProject(true);
    ConnectorHolder.getInstance().addConnector(c);
  };
  const buildConnectorZipResources = (...zipBaseNames: string[]): Map<string, ResourceResponse> => {
    const regs: any[] = [];
    for (const b of zipBaseNames) {
      const r = new RegistryResource();
      const key = "resources:connectors/" + b + Constant.ZIP_EXTENSION;
      r.setRegistryKey(key);
      r.setRegistryPath(key);
      regs.push(r);
    }
    const resp = new ResourceResponse();
    resp.setRegistryResources(regs);
    return new Map([["connector", resp]]);
  };
  const buildRegistryResources = (type: string, ...keys: string[]): Map<string, ResourceResponse> => {
    const regs: any[] = [];
    for (const k of keys) {
      const r = new RegistryResource();
      r.setRegistryKey(k);
      r.setRegistryPath(k);
      regs.push(r);
    }
    const resp = new ResourceResponse();
    resp.setRegistryResources(regs);
    return new Map([[type, resp]]);
  };
  const mergeResourceMaps = (...maps: Map<string, ResourceResponse>[]) => {
    const merged = new Map<string, ResourceResponse>();
    for (const m of maps) for (const [k, v] of m) merged.set(k, v);
    return merged;
  };
  const deps = (r: any) => r.getConflictingDependencies();
  const hasConflict = (r: any, id: string) => deps(r).some((c: any) => id === c.getArtifactId());
  const hasConflictVersion = (r: any, v: string) => deps(r).some((c: any) => v === c.getVersion());
  const hasConflictGroupId = (r: any, g: string) => deps(r).some((c: any) => g === c.getGroupId());
  const hasConflictingArtifact = (r: any, n: string) => deps(r).some((c: any) => c.getConflictingArtifacts() != null && c.getConflictingArtifacts().includes(n));
  const hasConflictingConnector = (r: any, n: string) => deps(r).some((c: any) => c.getConflictingConnectors() != null && c.getConflictingConnectors().includes(n));

  beforeEach(() => {
    tempUserHome = makeTempDir("load-dep-test-").replace(/\\/g, "/");
    mainProjectPath = tempUserHome + "/main_project";
    Files.createDirectories(Path.of(mainProjectPath));
    createPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");
    resourceFinder = new TestResourceFinder();
    resourceFinder.setUserHome(tempUserHome);
    ConnectorHolder.getInstance().clearConnectors();
  });
  afterEach(() => {
    ConnectorHolder.getInstance().clearConnectors();
    removeDir(tempUserHome);
  });

  it("testNoDependencyDirectoryReturnsNoProjectsFound", () => {

        const result = resourceFinder.loadDependentResources(mainProjectPath);
        assertEquals(LoadDependentResourcesResponse.STATUS_NO_DEPS_FOUND, result.getStatus());
  });

  it("testNoExtractedDirectoryReturnsNoProjectsFound", () => {

        const depBaseDir = createDependencyBaseDir();
        Files.delete(depBaseDir.resolve(Constant.EXTRACTED));

        const result = resourceFinder.loadDependentResources(mainProjectPath);
        assertEquals(LoadDependentResourcesResponse.STATUS_NO_DEPS_FOUND, result.getStatus());
  });

  it("testSuccessfulLoadReturnsSuccessMessage", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "mainSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "depSequence"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
  });

  it("testSuccessfulLoadPopulatesDependentResourcesMap", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "mainSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "depSequence"));

        resourceFinder.loadDependentResources(mainProjectPath);

        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        const sequences = loaded.get("sequence").getResources();
        assertEquals(1, sequences.length);
        assertEquals("depSequence", sequences[0].getName());
  });

  it("testMultipleNonConflictingDepsAllLoaded", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sequence1"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sequence2"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        const loaded = resourceFinder.getDependentResourcesMap();
        const sequences = loaded.get("sequence").getResources();
        assertEquals(2, sequences.length);
        const names = [];
        sequences.forEach((r) => names.push(r.getName()));
        assertTrue(names.includes("sequence1"));
        assertTrue(names.includes("sequence2"));
  });

  it("testEmptyExtractedDirReturnsSuccess", () => {

        createDependencyBaseDir(); // Extracted dir exists but is empty

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        assertTrue((resourceFinder.getDependentResourcesMap().size === 0));
  });

  it("testConflictWithMainProjectReturnsConflictMessage", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
  });

  it("testConflictMessageContainsDependencyCoordinates", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertTrue(hasConflictGroupId(result, "com.example"));
        assertTrue(hasConflict(result, "dep1"));
        assertTrue(hasConflictVersion(result, "1.0.0"));
  });

  it("testConflictMessageListsConflictingArtifactNames", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        const depResources = new Map<string, ResourceResponse>();
        for (const [k, v] of buildResources("sequence", "sharedSeq")) depResources.set(k, v);
        for (const [k, v] of buildResources("endpoint", "sharedEndpoint")) depResources.set(k, v);

        resourceFinder.setProjectResources(mainProjectPath,
                mergeResourceMaps(buildResources("sequence", "sharedSeq"),
                                  buildResources("endpoint", "sharedEndpoint")));
        resourceFinder.setProjectResources(dep1.toString(), depResources);

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertTrue(hasConflictingArtifact(result, "sharedSeq"));
        assertTrue(hasConflictingArtifact(result, "sharedEndpoint"));
  });

  it("testConflictingDependencyNotLoadedIntoResourcesMap", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));

        resourceFinder.loadDependentResources(mainProjectPath);

        const loaded = resourceFinder.getDependentResourcesMap();
        // No resources from dep1 should appear; the map should be empty or lack sequence entries
        assertTrue((loaded.size === 0) || loaded.get("sequence") == null
                || loaded.get("sequence").getResources() == null
                || loaded.get("sequence").getResources().length === 0);
  });

  it("testConflictBetweenDependentProjectsDetected", () => {

        const depBaseDir = createDependencyBaseDir();
        // dep1 is created first and back-dated so its mtime is deterministically older than dep2's
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSequence"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        // dep2 (bdep2) conflicts with dep1 which was loaded first
        assertTrue(hasConflict(result, "dep2"));
  });

  it("testFirstDependencyLoadedWhenSecondConflicts", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSequence"));

        resourceFinder.loadDependentResources(mainProjectPath);

        // dep1 (adep1) was processed first and should be loaded
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        assertEquals(1, loaded.get("sequence").getResources().length);
        assertEquals("sharedSequence", loaded.get("sequence").getResources()[0].getName());
  });

  it("testMultipleConflictingDependenciesAllReportedInMessage", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "dep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSequence"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflict(result, "dep1"));
        assertTrue(hasConflict(result, "dep2"));
        assertTrue(hasConflictVersion(result, "1.0.0"));
        assertTrue(hasConflictVersion(result, "2.0.0"));
  });

  it("testConflictCausesExtractedDirectoryDeletion", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        // Add a file inside the dep1 directory to confirm recursive deletion
        Files.createFile(dep1.resolve("some_artifact.xml"));

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));

        resourceFinder.loadDependentResources(mainProjectPath);

        assertFalse(Files.exists(dep1), "Conflicting dependency's extracted directory should be deleted");
  });

  it("testConflictCausesDownloadedCarFileDeletion", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const carFile = createDownloadedFile(depBaseDir, "com.example", "dep1", "1.0.0", Constant.CAR_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));

        resourceFinder.loadDependentResources(mainProjectPath);

        assertFalse(Files.exists(carFile), "Downloaded .car file should be deleted on conflict");
  });

  it("testConflictCausesDownloadedZipFileDeletion", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const zipFile = createDownloadedFile(depBaseDir, "com.example", "dep1", "1.0.0", Constant.ZIP_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));

        resourceFinder.loadDependentResources(mainProjectPath);

        assertFalse(Files.exists(zipFile), "Downloaded .zip file should be deleted on conflict");
  });

  it("testNonConflictingDependencyIsNotCleanedUp", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const carFile = createDownloadedFile(depBaseDir, "com.example", "dep1", "1.0.0", Constant.CAR_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "mainSequence"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "dep1Sequence"));

        resourceFinder.loadDependentResources(mainProjectPath);

        assertTrue(Files.exists(dep1), "Non-conflicting dep's extracted dir should not be deleted");
        assertTrue(Files.exists(carFile), "Non-conflicting dep's downloaded file should not be deleted");
  });

  it("testOnlyConflictingDependencyIsCleanedUpNotNonConflicting", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");
        const dep2Car = createDownloadedFile(depBaseDir, "com.example", "dep2", "2.0.0", Constant.CAR_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "dep1UniqueSeq"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSeq"));

        resourceFinder.loadDependentResources(mainProjectPath);

        // dep1 (adep1) is non-conflicting: should still exist
        assertTrue(Files.exists(dep1), "Non-conflicting dep1 should not be deleted");
        // dep2 (bdep2) conflicts with main project: should be cleaned up
        assertFalse(Files.exists(dep2), "Conflicting dep2 extracted dir should be deleted");
        assertFalse(Files.exists(dep2Car), "Conflicting dep2 downloaded .car should be deleted");
  });

  it("testConnectorFromDepLoadedSuccessfully", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
  });

  it("testConnectorConflictWithExistingConnectorInHolderReturnsConflictMessage", () => {

        // "salesforce" connector already loaded from the main project
        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflict(result, "dep1"));
  });

  it("testConnectorConflictMessageListsConflictingConnectorZipName", () => {

        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertFalse((result.getConflictingDependencies().length === 0));
        assertTrue(hasConflictingConnector(result, "mi-connector-salesforce-1.0.0"));
  });

  it("testConnectorOnlyConflictWithNoArtifactConflictStillTriggersReport", () => {

        // Artifacts are different — only the connector clashes
        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "mainSequence"));
        resourceFinder.setProjectResources(dep1.toString(),
                mergeResourceMaps(buildResources("sequence", "depSequence"),
                        buildConnectorZipResources("mi-connector-salesforce-1.0.0")));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflictingConnector(result, "mi-connector-salesforce-1.0.0"));
        // No artifact conflict — the artifact list must be empty
        assertTrue((result.getConflictingDependencies()[0].getConflictingArtifacts().length === 0));
  });

  it("testConnectorConflictBetweenDepProjectsDetected", () => {

        // ConnectorHolder is empty — both deps are new
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));  // same connector → conflict

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        // dep2 (bdep2) conflicts with dep1 processed first
        assertTrue(hasConflict(result, "dep2"));
  });

  it("testConnectorConflictBetweenDepProjectsFirstDepStillLoaded", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                mergeResourceMaps(buildResources("sequence", "dep1Sequence"),
                        buildConnectorZipResources("mi-connector-salesforce-1.0.0")));
        resourceFinder.setProjectResources(dep2.toString(),
                mergeResourceMaps(buildResources("sequence", "dep2Sequence"),
                        buildConnectorZipResources("mi-connector-salesforce-1.0.0")));

        resourceFinder.loadDependentResources(mainProjectPath);

        // dep1 was processed without conflict and must be in the resources map
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        assertEquals(1, loaded.get("sequence").getResources().length);
        assertEquals("dep1Sequence", loaded.get("sequence").getResources()[0].getName());
  });

  it("testNonConflictingConnectorDepIsNotCleanedUp", () => {

        // Holder has "salesforce"; dep has "googlepubsub" — no overlap
        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const carFile = createDownloadedFile(depBaseDir, "com.example", "dep1", "1.0.0", Constant.CAR_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-googlepubsub-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        assertTrue(Files.exists(dep1), "Non-conflicting dep extracted dir should not be deleted");
        assertTrue(Files.exists(carFile), "Non-conflicting dep downloaded file should not be deleted");
  });

  it("testMixedArtifactAndConnectorConflictBothReportedInMessage", () => {

        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, buildResources("sequence", "sharedSequence"));
        resourceFinder.setProjectResources(dep1.toString(),
                mergeResourceMaps(buildResources("sequence", "sharedSequence"),
                        buildConnectorZipResources("mi-connector-salesforce-1.0.0")));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertTrue(hasConflictingArtifact(result, "sharedSequence"));
        assertTrue(hasConflictingConnector(result, "mi-connector-salesforce-1.0.0"));
  });

  it("testHttpConnectorInDepIsAlwaysSkippedNoConflict", () => {

        // Even if http is registered in the holder, a dep carrying it must not be flagged
        registerConnectorInHolder("http", "mi-connector-http-0.1.14");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-http-0.1.14"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "mi-connector-http must never trigger a conflict");
  });

  it("testConnectorConflictDetectedWhenComponentNameCasingDiffersFromZipName", () => {

        // The CSV module connector's component name attribute in connector.xml is "CSV" (uppercase),
        // while the zip file is named mi-module-csv-1.0.0.zip (lowercase). Conflict detection
        // now uses the artifact ID (mi-module-csv) derived from the zip name, not the component name.
        registerConnectorInHolder("CSV", "mi-module-csv-1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-module-csv-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "Connector conflict must be detected regardless of component name casing");
        assertTrue(hasConflictingConnector(result, "mi-module-csv-1.0.0"));
  });

  it("testHttpConnectorInDepDoesNotBlockLoadingWhenOtherConnectorAlsoPresent", () => {

        // dep has both http (skipped) and a unique salesforce connector — should load fine
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-http-0.1.14", "mi-connector-salesforce-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
  });

  it("testConfigPropertiesRegistryKeyIsSkippedAndDoesNotCauseConflict", () => {

        // Both main project and dep carry resources:conf/config.properties — must not conflict
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath,
                buildRegistryResources("registry", "resources:conf/config.properties"));
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("registry", "resources:conf/config.properties"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "resources:conf/config.properties must never trigger a conflict");
  });

  it("testConfigPropertiesSkippedButOtherConflictingKeyStillDetected", () => {

        // config.properties is shared (skipped), but sample.xslt also conflicts — must still report
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        const mainResources = mergeResourceMaps(
                buildRegistryResources("registry", "resources:conf/config.properties"),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));
        const depResources = mergeResourceMaps(
                buildRegistryResources("registry", "resources:conf/config.properties"),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        resourceFinder.setProjectResources(mainProjectPath, mainResources);
        resourceFinder.setProjectResources(dep1.toString(), depResources);

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflictingArtifact(result, "gov:/xslt/sample.xslt"));
        assertFalse(hasConflictingArtifact(result, "resources:conf/config.properties"),
                "config.properties must not appear in the conflict report");
  });

  it("testArtifactXmlSkippedAndDoesNotCauseConflict", () => {

        // Both deps carry resources:artifact.xml — must not conflict
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("registry", "resources:artifact.xml"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildRegistryResources("registry", "resources:artifact.xml"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "resources:artifact.xml must never trigger a conflict");
  });

  it("testRegistryArtifactXmlSkippedAndDoesNotCauseConflict", () => {

        // Both deps carry resources:registry/artifact.xml — must not conflict
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("registry", "resources:registry/artifact.xml"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildRegistryResources("registry", "resources:registry/artifact.xml"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "resources:registry/artifact.xml must never trigger a conflict");
  });

  it("testArtifactXmlNotAddedToExistingResourceNamesAfterSuccessfulLoad", () => {

        // dep1 loads with artifact.xml; dep2 has the same artifact.xml plus a unique real resource.
        // artifact.xml must not be added to existingResourceNames, so dep2 loads fine.
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                mergeResourceMaps(buildRegistryResources("registry", "resources:artifact.xml"),
                        buildResources("sequence", "dep1Sequence")));
        resourceFinder.setProjectResources(dep2.toString(),
                mergeResourceMaps(buildRegistryResources("registry", "resources:artifact.xml"),
                        buildResources("sequence", "dep2Sequence")));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        const loaded = resourceFinder.getDependentResourcesMap();
        assertEquals(2, loaded.get("sequence").getResources().length);
  });

  it("testUserRegistryResourceEndingWithArtifactXmlIsDetectedAsConflict", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        // Main project already has a user-created registry resource whose key ends with artifact.xml
        resourceFinder.setProjectResources(mainProjectPath,
                buildRegistryResources("registry", "gov:/config/artifact.xml"));
        // dep1 also has the same user-created key → should be detected as a conflict
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("registry", "gov:/config/artifact.xml"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "A user registry resource ending with artifact.xml must trigger a conflict");
        assertTrue(hasConflictingArtifact(result, "gov:/config/artifact.xml"));
  });

  it("testConflictMessageListsArtifactsInSortedOrder", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        // Main project has several resources whose names sort as: alphaSeq < betaSeq < gammaSeq
        resourceFinder.setProjectResources(mainProjectPath,
                buildResources("sequence", "gammaSeq", "alphaSeq", "betaSeq"));
        // dep1 conflicts with all three
        resourceFinder.setProjectResources(dep1.toString(),
                buildResources("sequence", "betaSeq", "gammaSeq", "alphaSeq"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        const artifacts = result.getConflictingDependencies()[0].getConflictingArtifacts();
        // All three must appear in the list
        assertTrue(artifacts.includes("alphaSeq"));
        assertTrue(artifacts.includes("betaSeq"));
        assertTrue(artifacts.includes("gammaSeq"));
        // Alphabetical order: alphaSeq before betaSeq before gammaSeq
        assertTrue(artifacts.indexOf("alphaSeq") < artifacts.indexOf("betaSeq"),
                "alphaSeq must appear before betaSeq in the conflict list");
        assertTrue(artifacts.indexOf("betaSeq") < artifacts.indexOf("gammaSeq"),
                "betaSeq must appear before gammaSeq in the conflict list");
  });

  it("testConnectorZipInResourcesRegistryKeySkippedAndDoesNotCauseConflict", () => {

        // Both deps carry resources:connectors/mi-connector-http-0.1.14.zip as a registry resource key
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("registry", "resources:connectors/mi-connector-http-0.1.14.zip"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildRegistryResources("registry", "resources:connectors/mi-connector-http-0.1.14.zip"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "resources:connectors/* must never trigger a conflict");
  });

  it("testConnectorVersionDifferenceStillRaisesConflict", () => {

        // dep1 has salesforce 1.0.0, dep2 has salesforce 2.0.0 — different versions, same connector
        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-salesforce-1.0.0"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildConnectorZipResources("mi-connector-salesforce-2.0.0"));  // different version, same connector

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "Different versions of the same connector must still be flagged as a conflict");
        assertTrue(hasConflict(result, "dep2"));
        assertTrue(hasConflictingConnector(result, "mi-connector-salesforce-2.0.0"));
  });

  it("testPreviouslyLoadedDepConnectorDoesNotConflictWithItselfOnSubsequentLoad", () => {

        // Simulate the second-dependency-added scenario:
        // dep1 was successfully loaded in a prior run. Its connector was registered in ConnectorHolder
        // by the subsequent updateConnectors() call, but marked as NOT fromProject (it came from a dep).
        // When loadDependentResources is called again (because dep2 was added), dep1 must not be
        // flagged as conflicting against its own connector that is already in ConnectorHolder.
        registerConnectorInHolder("salesforce", "mi-connector-salesforce-1.0.0");
        // Simulate that the connector came from a dependency (not the main project)
        ConnectorHolder.getInstance().getConnectors()[0].setFromProject(false);

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                mergeResourceMaps(buildResources("sequence", "dep1Sequence"),
                        buildConnectorZipResources("mi-connector-salesforce-1.0.0")));  // dep1's connector is in holder
        resourceFinder.setProjectResources(dep2.toString(),
                mergeResourceMaps(buildResources("sequence", "dep2Sequence"),
                        buildConnectorZipResources("mi-connector-googlepubsub-1.0.0"))); // dep2 has a different connector

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "dep1 must not conflict against its own connector already in ConnectorHolder");
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        assertEquals(2, loaded.get("sequence").getResources().length);
  });

  it("testFirstAddedDepWinsWhenAlphabeticallyLaterDepHasSameConnector", () => {

        const depBaseDir = createDependencyBaseDir();
        // "NoIssue" is created first — simulates it being added to the project earlier.
        // Its directory name starts with 'N', which sorts AFTER 'L' alphabetically, so
        // without timestamp-based ordering it would incorrectly be processed last.
        const noIssue = createDependentProject(depBaseDir, "NoIssue", "com.example", "NoIssue", "1.0.0");
        // Back-date noIssue's mtime so the ordering is deterministic even when both dirs
        // are created within the same millisecond (common in fast CI environments).
        Files.setLastModifiedTime(noIssue, FileTime.fromMillis(Date.now() - 5000));
        // "LowEmailConnector" is created second — simulates it being added later.
        // Its directory name starts with 'L', which sorts BEFORE 'N' alphabetically.
        const lowEmail = createDependentProject(depBaseDir, "LowEmailConnector", "com.example", "LowEmailConnector", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(noIssue.toString(),
                buildConnectorZipResources("mi-connector-email-2.0.1"));
        resourceFinder.setProjectResources(lowEmail.toString(),
                buildConnectorZipResources("mi-connector-email-1.0.14"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "A connector conflict must be reported");
        // "LowEmailConnector" (added second) must be the one that is rejected
        assertTrue(hasConflict(result, "LowEmailConnector"),
                "LowEmailConnector (added later) must be the conflicting dep");
        assertFalse(hasConflict(result, "NoIssue"),
                "NoIssue (added first) must not be flagged as conflicting");
        // NoIssue's connector must be accessible in the loaded resources
        assertTrue(Files.exists(noIssue), "NoIssue dep directory must not be deleted");
        assertFalse(Files.exists(lowEmail), "LowEmailConnector dep directory must be deleted");
  });

  it("testRegistryResourceLoadedSuccessfully", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("xslt"));
        const registryResources = loaded.get("xslt").getRegistryResources();
        assertEquals(1, registryResources.length);
        assertEquals("gov:/xslt/sample.xslt", (registryResources[0] as RegistryResource).getRegistryKey());
  });

  it("testRegistryResourceKeyConflictWithMainProjectReturnsConflictMessage", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath,
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflictingArtifact(result, "gov:/xslt/sample.xslt"));
        assertTrue(hasConflict(result, "dep1"));
  });

  it("testRegistryResourceKeyConflictBetweenDependentProjects", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        // dep2 (bdep2) conflicts with dep1 which was loaded first
        assertTrue(hasConflict(result, "dep2"));
        // dep1 (adep1) should still be loaded
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("xslt"));
        assertEquals(1, loaded.get("xslt").getRegistryResources().length);
  });

  it("testMixedArtifactAndRegistryConflictBothReportedInMessage", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        const mainResources = mergeResourceMaps(
                buildResources("sequence", "sharedSequence"),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));
        const depResources = mergeResourceMaps(
                buildResources("sequence", "sharedSequence"),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        resourceFinder.setProjectResources(mainProjectPath, mainResources);
        resourceFinder.setProjectResources(dep1.toString(), depResources);

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus());
        assertTrue(hasConflictingArtifact(result, "sharedSequence"));
        assertTrue(hasConflictingArtifact(result, "gov:/xslt/sample.xslt"));
  });

  it("testNonConflictingRegistryResourceNotCleanedUp", () => {

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        const carFile = createDownloadedFile(depBaseDir, "com.example", "dep1", "1.0.0", Constant.CAR_EXTENSION);

        resourceFinder.setProjectResources(mainProjectPath,
                buildRegistryResources("xslt", "gov:/xslt/other.xslt"));
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus());
        assertTrue(Files.exists(dep1), "Non-conflicting dep's extracted dir should not be deleted");
        assertTrue(Files.exists(carFile), "Non-conflicting dep's downloaded file should not be deleted");
  });

  it("testVersionedDeploymentSameArtifactNameInTwoDepsDoesNotConflict", () => {

        // Overwrite main project pom with versionedDeployment=true
        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSeq"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "Same base name in two deps must not conflict under versioned deployment");
        const loaded = resourceFinder.getDependentResourcesMap();
        // Both sequences must be present (under their FQNs)
        assertNotNull(loaded.get("sequence"));
        assertEquals(2, loaded.get("sequence").getResources().length);
  });

  it("testVersionedDeploymentResourceLoadedUnderFQN", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "mySequence"));

        resourceFinder.loadDependentResources(mainProjectPath);

        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        const sequences = loaded.get("sequence").getResources();
        assertEquals(1, sequences.length);
        // Resource is stored under its FQN, not the original name
        assertEquals("com.example__dep1__mySequence", sequences[0].getName());
  });

  it("testVersionedDeploymentConflictWhenFQNMatchesExistingResource", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        // Main project already has a resource whose name equals the FQN of dep1's resource
        resourceFinder.setProjectResources(mainProjectPath,
                buildResources("sequence", "com.example__dep1__sharedSeq"));
        // dep1's "sharedSeq" transforms to "com.example__dep1__sharedSeq" → conflicts
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "FQN match must trigger a conflict under versioned deployment");
        assertTrue(hasConflictingArtifact(result, "com.example__dep1__sharedSeq"));
  });

  it("testVersionedDeploymentSameRegistryKeyInTwoDepsDoesNotConflict", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "adep1", "com.example", "dep1", "1.0.0");
        const dep2 = createDependentProject(depBaseDir, "bdep2", "com.example", "dep2", "2.0.0");

        // Both deps have the same xslt file — with versioned deployment they transform to different FQNs
        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_SUCCESS, result.getStatus(),
                "Same registry key in two deps must not conflict under versioned deployment");
        const loaded = resourceFinder.getDependentResourcesMap();
        // Both registry resources must be present (under their FQNs)
        assertNotNull(loaded.get("xslt"));
        assertEquals(2, loaded.get("xslt").getRegistryResources().length);
  });

  it("testVersionedDeploymentConflictWhenTwoDepsProduceSameFQN", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        // dep1 is created first (older mtime) so it takes priority
        const dep1 = createDependentProject(depBaseDir, "dep1-v1", "com.example", "shared-lib", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        // dep2 is created later with the same groupId+artifactId — same FQN after transformation
        const dep2 = createDependentProject(depBaseDir, "dep1-v2", "com.example", "shared-lib", "2.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(), buildResources("sequence", "sharedSeq"));
        resourceFinder.setProjectResources(dep2.toString(), buildResources("sequence", "sharedSeq"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "Two deps with same groupId+artifactId+name must conflict under versioned deployment");
        // dep2 (added later) is the conflicting one
        assertTrue(hasConflict(result, "shared-lib"),
                "Conflict should name the shared-lib artifactId");
        assertTrue(hasConflictVersion(result, "2.0.0"),
                "dep2 (version 2.0.0, added later) should be flagged as conflicting");
        assertFalse(hasConflictVersion(result, "1.0.0"),
                "dep1 (version 1.0.0, added first) should NOT be flagged");
        // dep1 directory must survive; dep2 must be cleaned up
        assertTrue(Files.exists(dep1), "dep1 (added first) must not be deleted");
        assertFalse(Files.exists(dep2), "dep2 (added later) must be cleaned up");
        // dep1's resource is loaded under its FQN
        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("sequence"));
        const sequences = loaded.get("sequence").getResources();
        assertEquals(1, sequences.length);
        assertEquals("com.example__shared-lib__sharedSeq", sequences[0].getName());
  });

  it("testVersionedDeploymentRegistryResourceLoadedUnderFQN", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildRegistryResources("xslt", "gov:/xslt/sample.xslt"));

        resourceFinder.loadDependentResources(mainProjectPath);

        const loaded = resourceFinder.getDependentResourcesMap();
        assertNotNull(loaded.get("xslt"));
        const registryResources = loaded.get("xslt").getRegistryResources();
        assertEquals(1, registryResources.length);
        // Registry key must be the FQN, not the original path
        assertEquals("gov:/xslt/com.example__dep1__sample.xslt",
                (registryResources[0] as RegistryResource).getRegistryKey());
  });

  it("testVersionedDeploymentConnectorConflictWithMainProjectConnector", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        // Email connector already loaded from the main project
        registerConnectorInHolder("email", "mi-connector-email-2.0.1");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-email-1.0.0"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "Connector conflict must be detected under versioned deployment");
        assertTrue(hasConflictingConnector(result, "mi-connector-email-1.0.0"));
        assertFalse(Files.exists(dep1), "Conflicting dep directory must be cleaned up");
  });

  it("testVersionedDeploymentConnectorConflictBetweenTwoDeps", () => {

        createVersionedPomXml(Path.of(mainProjectPath), "com.example", "main-project", "1.0.0");

        const depBaseDir = createDependencyBaseDir();
        const dep1 = createDependentProject(depBaseDir, "dep1", "com.example", "dep1", "1.0.0");
        Files.setLastModifiedTime(dep1, FileTime.fromMillis(Date.now() - 5000));
        const dep2 = createDependentProject(depBaseDir, "dep2", "com.example", "dep2", "1.0.0");

        resourceFinder.setProjectResources(mainProjectPath, new Map<string, ResourceResponse>());
        // Both deps carry the same connector (different versions → same core name)
        resourceFinder.setProjectResources(dep1.toString(),
                buildConnectorZipResources("mi-connector-email-2.0.1"));
        resourceFinder.setProjectResources(dep2.toString(),
                buildConnectorZipResources("mi-connector-email-1.0.14"));

        const result = resourceFinder.loadDependentResources(mainProjectPath);

        assertEquals(LoadDependentResourcesResponse.STATUS_CONFLICT, result.getStatus(),
                "Same connector in two deps must conflict under versioned deployment");
        assertTrue(hasConflict(result, "dep2"),
                "dep2 (added later) must be flagged as the conflicting dependency");
        assertFalse(hasConflict(result, "dep1"),
                "dep1 (added first) must not be flagged");
        assertTrue(Files.exists(dep1), "dep1 (added first) must not be deleted");
        assertFalse(Files.exists(dep2), "dep2 (conflicting) must be cleaned up");
  });

});
