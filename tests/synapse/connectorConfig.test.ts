import { makeTempDir, removeDir } from "./helpers.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { IllegalArgumentException } from "../../src/syntaxTree/javaCompat.js";
import { ConnectorConfigService, IllegalStateException } from "../../src/synapse/parser/connectorConfig/ConnectorConfigService.js";
import { ConnectorConfig } from "../../src/synapse/parser/connectorConfig/ConnectorConfig.js";
import { UpdateConnectorDependencyRequest } from "../../src/synapse/parser/connectorConfig/UpdateConnectorDependencyRequest.js";
import { ResetConnectorDependencyRequest } from "../../src/synapse/parser/connectorConfig/ResetConnectorDependencyRequest.js";
import { UpdateConnectorFlagsRequest } from "../../src/synapse/parser/connectorConfig/UpdateConnectorFlagsRequest.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { Connector } from "../../src/synapse/connectors/entity/Connector.js";
import { UpdateGlobalConnectorFlagsRequest } from "../../src/synapse/parser/connectorConfig/UpdateGlobalConnectorFlagsRequest.js";

// port of ConnectorConfigServiceTest
let tmp: string;
beforeEach(() => {
  tmp = makeTempDir("connector-config");
});
afterEach(() => removeDir(tmp));

const CONFIG = "src/main/wso2mi/resources/connectors/connector-config.json";
function writeConfigFile(content: string): void {
  mkdirSync(join(tmp, "src/main/wso2mi/resources/connectors"), { recursive: true });
  writeFileSync(join(tmp, CONFIG), content);
}

describe("ConnectorConfigService", () => {
  it("ReadConfig > ReturnsEmptyConfigWhenFileAbsent", () => {
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config ?? null).not.toBeNull();
    expect(config.version).toEqual("1.0");
    expect(config.connectors ?? null).not.toBeNull();
    expect(config.connectors.size === 0).toBe(true);
  });

  it("ReadConfig > ParsesExistingFile", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" }
    ]
    }
    }
    }`);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.connectors.get("mi-connector-file") ?? null).not.toBeNull();
    const deps = config.connectors.get("mi-connector-file").dependencies;
    expect(deps.length).toEqual(1);
    expect(deps[0].connectionType).toEqual("MYSQL");
    expect(deps[0].version).toEqual("9.0.0");
  });

  it("WriteConfig > CreatesFileAndCanBeReadBack", () => {
    const config = new ConnectorConfig();
    config.version = "1.0";
    ConnectorConfigService.writeConfig(tmp, config);
    expect(existsSync(join(tmp, "src/main/wso2mi/resources/connectors/connector-config.json"))).toBe(true);
    const readBack = ConnectorConfigService.readConfig(tmp);
    expect(readBack ?? null).not.toBeNull();
    expect(readBack.version).toEqual("1.0");
  });

  it("InitIfAbsent > CreatesFileWhenAbsent", () => {
    ConnectorConfigService.initIfAbsent(tmp);
    expect(existsSync(join(tmp, "src/main/wso2mi/resources/connectors/connector-config.json"))).toBe(true);
  });

  it("InitIfAbsent > DoesNotOverwriteExistingFile", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": { "dependencies": [] }
    }
    }`);
    ConnectorConfigService.initIfAbsent(tmp);
    // Existing data should still be there
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.connectors.has("mi-connector-file")).toBe(true);
  });

  it("UpdateDependencyOverride > AddsNewOverrideToEmptyConfig", () => {
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "MYSQL";
    req.version = "9.0.0";
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const deps = config.connectors.get("mi-connector-file").dependencies;
    expect(deps.length).toEqual(1);
    expect(deps[0].connectionType).toEqual("MYSQL");
    expect(deps[0].version).toEqual("9.0.0");
  });

  it("UpdateDependencyOverride > UpdatesExistingOverrideByConnectionType", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "8.0.33" }
    ]
    }
    }
    }`);
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "MYSQL";
    req.version = "9.0.0";
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const deps = config.connectors.get("mi-connector-file").dependencies;
    // Should update in-place, not add a second entry
    expect(deps.length).toEqual(1);
    expect(deps[0].version).toEqual("9.0.0");
  });

  it("UpdateDependencyOverride > SetsOmitTrue", () => {
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "SFTP";
    req.omit = true;
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const dep = config.connectors.get("mi-connector-file").dependencies[0];
    expect(dep.omit).toEqual(true);
    expect(dep.connectionType).toEqual("SFTP");
  });

  it("UpdateDependencyOverride > BlankStringFieldsNormalizedToNullOnAdd", () => {
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.connectionType = "MYSQL";
    req.version = "  "; // blank — should become null
    req.groupId = "";   // blank — should become null
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const dep = config.connectors.get("mi-connector-db").dependencies[0];
    expect(dep.connectionType).toEqual("MYSQL");
    expect(dep.version ?? null).toBeNull();
    expect(dep.groupId ?? null).toBeNull();
  });

  it("UpdateDependencyOverride > BlankStringFieldsNormalizedToNullOnUpdate", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-db": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0", "groupId": "com.mysql" }
    ]
    }
    }
    }`);
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.connectionType = "MYSQL";
    req.version = "  "; // blank — should clear the existing version to null
    req.groupId = "";   // blank — should clear the existing groupId to null
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const dep = config.connectors.get("mi-connector-db").dependencies[0];
    expect(dep.version ?? null).toBeNull();
    expect(dep.groupId ?? null).toBeNull();
  });

  it("UpdateDependencyOverride > AddsSecondOverrideForDifferentConnectionType", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" }
    ]
    }
    }
    }`);
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "SFTP";
    req.omit = true;
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const deps = config.connectors.get("mi-connector-file").dependencies;
    expect(deps.length).toEqual(2);
  });

  it("ResetDependencyOverrides > ThrowsWhenArtifactIdIsBlank", () => {
    const req = new ResetConnectorDependencyRequest();
    req.connectorArtifactId = "  ";
    expect(() => ConnectorConfigService.resetDependencyOverrides(tmp, req)).toThrow(IllegalArgumentException);
  });

  it("ResetDependencyOverrides > RemovesSpecificConnectionType", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" },
    { "connectionType": "SFTP", "omit": true }
    ]
    }
    }
    }`);
    const req = new ResetConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "SFTP";
    ConnectorConfigService.resetDependencyOverrides(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const deps = config.connectors.get("mi-connector-file").dependencies;
    expect(deps.length).toEqual(1);
    expect(deps[0].connectionType).toEqual("MYSQL");
  });

  it("ResetDependencyOverrides > RemovesAllOverridesForConnector", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" },
    { "connectionType": "SFTP", "omit": true }
    ]
    }
    }
    }`);
    const req = new ResetConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = undefined; // null = reset all
    ConnectorConfigService.resetDependencyOverrides(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.connectors.get("mi-connector-file") ?? null).toBeNull();
  });

  it("ResetDependencyOverrides > RemovesEntireConnectorKeyWhenLastOverrideRemoved", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" }
    ]
    }
    }
    }`);
    const req = new ResetConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "MYSQL";
    ConnectorConfigService.resetDependencyOverrides(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    // When the last override is removed the connector key itself is cleaned up
    expect(config.connectors.get("mi-connector-file") ?? null).toBeNull();
  });

  it("ResetDependencyOverrides > NoOpWhenConnectorNotInConfig", () => {
    writeConfigFile(`{ "version": "1.0", "connectors": {} }`);
    const req = new ResetConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-nonexistent";
    req.connectionType = undefined;
    // Should not throw
    ConnectorConfigService.resetDependencyOverrides(tmp, req);
  });

  it("UpdateConnectorFlags > ThrowsWhenArtifactIdIsNull", () => {
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = undefined;
    req.omit = true;
    expect(() => ConnectorConfigService.updateConnectorFlags(tmp, req)).toThrow(IllegalArgumentException);
  });

  it("UpdateConnectorFlags > ThrowsWhenArtifactIdIsBlank", () => {
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "   ";
    req.omit = true;
    expect(() => ConnectorConfigService.updateConnectorFlags(tmp, req)).toThrow(IllegalArgumentException);
  });

  it("UpdateConnectorFlags > SetsOmitTrue", () => {
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.omit = true;
    ConnectorConfigService.updateConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const cfg = config.connectors.get("mi-connector-db");
    expect(cfg ?? null).not.toBeNull();
    expect(cfg.omit).toEqual(true);
    expect(cfg.omitAllDrivers ?? null).toBeNull();
  });

  it("UpdateConnectorFlags > SetsOmitAllDriversTrue", () => {
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.omitAllDrivers = true;
    ConnectorConfigService.updateConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const cfg = config.connectors.get("mi-connector-db");
    expect(cfg ?? null).not.toBeNull();
    expect(cfg.omitAllDrivers).toEqual(true);
    expect(cfg.omit ?? null).toBeNull();
  });

  it("UpdateConnectorFlags > ClearingFlagRemovesConnectorEntryWhenNothingElseSet", () => {
    // Start with only omit=true — no dependencies
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-db": { "omit": true }
    }
    }`);
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.omit = false; // clear it
    ConnectorConfigService.updateConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    // All fields are now null/empty — the connector key must be pruned
    expect(config.connectors.get("mi-connector-db") ?? null).toBeNull();
  });

  it("UpdateConnectorFlags > ClearingOneFlag RetainsOtherFlag", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-db": { "omit": true, "omitAllDrivers": true }
    }
    }`);
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.omit = false; // clear omit, leave omitAllDrivers
    ConnectorConfigService.updateConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const cfg = config.connectors.get("mi-connector-db");
    expect(cfg ?? null).not.toBeNull();
    expect(cfg.omit ?? null).toBeNull();
    expect(cfg.omitAllDrivers).toEqual(true);
  });

  it("UpdateConnectorFlags > ConnectorEntryKeptWhenDependenciesRemain", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-db": {
    "omit": true,
    "dependencies": [ { "connectionType": "MYSQL", "version": "9.0.0" } ]
    }
    }
    }`);
    const req = new UpdateConnectorFlagsRequest();
    req.connectorArtifactId = "mi-connector-db";
    req.omit = false; // clear omit — dependencies still present
    ConnectorConfigService.updateConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    const cfg = config.connectors.get("mi-connector-db");
    expect(cfg ?? null).not.toBeNull();
    expect(cfg.omit ?? null).toBeNull();
    expect(cfg.dependencies ?? null).not.toBeNull();
    expect(cfg.dependencies.length).toEqual(1);
  });

  it("UpdateGlobalConnectorFlags > SetsOmitAllDrivers", () => {
    const req = new UpdateGlobalConnectorFlagsRequest();
    req.omitAllDrivers = true;
    ConnectorConfigService.updateGlobalConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.omitAllDrivers).toEqual(true);
    expect(config.omitAllConnectors ?? null).toBeNull();
  });

  it("UpdateGlobalConnectorFlags > SetsOmitAllConnectors", () => {
    const req = new UpdateGlobalConnectorFlagsRequest();
    req.omitAllConnectors = true;
    ConnectorConfigService.updateGlobalConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.omitAllConnectors).toEqual(true);
    expect(config.omitAllDrivers ?? null).toBeNull();
  });

  it("UpdateGlobalConnectorFlags > ClearsBothFlags", () => {
    writeConfigFile(`{
    "version": "1.0",
    "omitAllDrivers": true,
    "omitAllConnectors": true,
    "connectors": {}
    }`);
    const req = new UpdateGlobalConnectorFlagsRequest();
    req.omitAllDrivers = false;
    req.omitAllConnectors = false;
    ConnectorConfigService.updateGlobalConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.omitAllDrivers ?? null).toBeNull();
    expect(config.omitAllConnectors ?? null).toBeNull();
  });

  it("UpdateGlobalConnectorFlags > NullRequestFieldsAreNoOp", () => {
    writeConfigFile(`{
    "version": "1.0",
    "omitAllDrivers": true,
    "connectors": {}
    }`);
    // Only set omitAllConnectors — omitAllDrivers must be left untouched
    const req = new UpdateGlobalConnectorFlagsRequest();
    req.omitAllConnectors = true;
    ConnectorConfigService.updateGlobalConnectorFlags(tmp, req);
    const config = ConnectorConfigService.readConfig(tmp);
    expect(config.omitAllDrivers).toEqual(true);
    expect(config.omitAllConnectors).toEqual(true);
  });

  it("FindOverrideByConnectorName > MatchesByArtifactId", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-file": {
    "dependencies": [
    { "connectionType": "MYSQL", "version": "9.0.0" }
    ]
    }
    }
    }`);
    const result = ConnectorConfigService.findOverrideByConnectorNameAndConnectionType(
    tmp, "mi-connector-file", "MYSQL");
    expect(result ?? null).not.toBeNull();
    expect(result.version).toEqual("9.0.0");
  });

  it("FindOverrideByConnectorName > ReturnsNullWhenNoMatch", () => {
    writeConfigFile(`{ "version": "1.0", "connectors": {} }`);
    const result = ConnectorConfigService.findOverrideByConnectorNameAndConnectionType(
    tmp, "file", "MYSQL");
    expect(result ?? null).toBeNull();
  });

  it("FindOverrideByConnectorName > OmitOverride", () => {
    writeConfigFile(`{
    "version": "1.0",
    "connectors": {
    "mi-connector-db": {
    "dependencies": [
    { "connectionType": "ORACLE", "omit": true }
    ]
    }
    }
    }`);
    const result = ConnectorConfigService.findOverrideByConnectorNameAndConnectionType(
    tmp, "mi-connector-db", "ORACLE");
    expect(result ?? null).not.toBeNull();
    expect(result.omit).toEqual(true);
  });

  it("treats a malformed or unknown-field config as an error instead of overwriting it", () => {
    writeConfigFile("{ not json");
    expect(() => ConnectorConfigService.readConfig(tmp)).toThrow(IllegalStateException);
    writeConfigFile('{ "version": "1.0", "bogus": 1 }');
    expect(() => ConnectorConfigService.readConfig(tmp)).toThrow(IllegalStateException);
  });

  it("writes Jackson style pretty printed json, keeping the declared field order and skipping nulls", () => {
    const req = new UpdateConnectorDependencyRequest();
    req.connectorArtifactId = "mi-connector-file";
    req.connectionType = "MYSQL";
    req.version = "9.0.0";
    ConnectorConfigService.updateDependencyOverride(tmp, req);
    expect(readFileSync(join(tmp, CONFIG), "utf8")).toBe(
      [
        "{",
        '  "version" : "1.0",',
        '  "connectors" : {',
        '    "mi-connector-file" : {',
        '      "dependencies" : [ {',
        '        "connectionType" : "MYSQL",',
        '        "version" : "9.0.0"',
        "      } ]",
        "    }",
        "  }",
        "}",
      ].join("\n"),
    );
  });

  it("merges descriptor.yml dependencies with overrides and marks active connection types", () => {
    const connectorDir = join(tmp, "extracted", "mi-connector-file-1.0.0");
    mkdirSync(connectorDir, { recursive: true });
    writeFileSync(join(connectorDir, "descriptor.yml"), [
      "dependencies:",
      "  - groupId: com.mysql",
      "    artifactId: mysql-connector-j",
      "    version: 8.0.33",
      "    connectionType: MYSQL",
      "  - groupId: org.postgresql",
      "    artifactId: postgresql",
      "    version: 42.0.0",
      "    connectionType: POSTGRES",
      "  - groupId: commons-io",
      "    artifactId: commons-io",
      "    version: 2.0",
    ].join("\n"));
    const entries = join(tmp, "src/main/wso2mi/artifacts/local-entries");
    mkdirSync(entries, { recursive: true });
    writeFileSync(join(entries, "conn.xml"),
      '<localEntry key="c" xmlns="http://ws.apache.org/ns/synapse"><file.init><connectionType>mysql</connectionType></file.init></localEntry>');
    writeFileSync(join(entries, "broken.xml"), "<localEntry><unclosed></localEntry>");

    const holder = ConnectorHolder.getInstance();
    const connector = new Connector();
    connector.setName("file");
    connector.setArtifactId("mi-connector-file");
    connector.setExtractedConnectorPath(connectorDir);
    holder.addConnector(connector);
    try {
      const req = new UpdateConnectorDependencyRequest();
      req.connectorArtifactId = "mi-connector-file";
      req.connectionType = "MYSQL";
      req.version = "9.0.0";
      ConnectorConfigService.updateDependencyOverride(tmp, req);

      const response = ConnectorConfigService.buildDependencyResponse(tmp, "mi-connector-file");
      const deps = response.dependencies!;
      expect(deps.map((d) => d.connectionType ?? null)).toEqual(["MYSQL", "POSTGRES", null]);
      expect(deps[0]).toMatchObject({ defaultVersion: "8.0.33", overriddenVersion: "9.0.0", isOverridden: true, omit: false, isConnectionTypeActive: true });
      expect(deps[1]).toMatchObject({ isOverridden: false, isConnectionTypeActive: false });
      expect(deps[2]).toMatchObject({ isOverridden: false, isConnectionTypeActive: true });

      const all = ConnectorConfigService.buildDependencyResponse(tmp, null).allConnectors!;
      expect(all.get("mi-connector-file")!.dependencies!.length).toBe(3);

      ConnectorConfigService.updateGlobalConnectorFlags(tmp, Object.assign(new UpdateGlobalConnectorFlagsRequest(), { omitAllDrivers: true }));
      expect(ConnectorConfigService.isOmitAllDrivers(tmp, "mi-connector-file")).toBe(true);
      expect(ConnectorConfigService.buildDependencyResponse(tmp, "mi-connector-file").dependencies!.every((d) => d.omit)).toBe(true);
    } finally {
      holder.getConnectors().splice(0, holder.getConnectors().length);
    }
  });
});
