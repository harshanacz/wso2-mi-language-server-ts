import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { fixture, makeTempDir, extractConnectorZips } from "./helpers.js";
import { join } from "node:path";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { ConnectorReader } from "../../src/synapse/connectors/ConnectorReader.js";
import { ConnectionFinder } from "../../src/synapse/connectors/ConnectionFinder.js";
import { ConnectionHandler } from "../../src/synapse/connectors/ConnectionHandler.js";

describe("ConnectorReader (ConnectorReaderTest)", () => {
  let temp: string;
  beforeAll(() => {
    temp = makeTempDir("connector-reader-test-");
    extractConnectorZips(temp, "synapse/connector/zips");
  });

  it("testValidConnector", () => {
    const connector = new ConnectorReader().readConnector(join(temp, "mi-connector-http-0.1.8"), "");
    expect(connector).not.toBeNull();
    expect(connector.getName()).toBe("http");
    expect(connector.getVersion()).toBe("0.1.8");
    expect(connector.getActions().length).toBe(8);
    expect(connector.getDisplayName()).toBe("HTTP");
    expect(connector.getConnectionUiSchema().size).toBe(2);
    const get = connector.getAction("get");
    expect(get).not.toBeNull();
    expect(get.getName()).toBe("get");
    expect(get.getDisplayName()).toBe("GET");
    expect(get.getTag()).toBe("http.get");
    expect(get.getParameters().length).toBe(19);
    expect(get.getAllowedConnectionTypes().length).toBe(2);
    expect(get.getAllowedConnectionTypes()).toContain("HTTP");
    expect(get.getAllowedConnectionTypes()).toContain("HTTPS");
  });

  it("testInvalidConnector", () => {
    const connector = new ConnectorReader().readConnector(join(temp, "invalid-connector-0.1.0"), "");
    expect(connector).toBeNull();
  });
});

describe("ConnectionFinder (ConnectionFinderTest)", () => {
  let holder: ConnectorHolder;
  beforeEach(() => {
    holder = ConnectorHolder.getInstance();
    const temp = makeTempDir("connector-reader-test-");
    extractConnectorZips(temp, "synapse/connector/zips");
    holder.addConnector(new ConnectorReader().readConnector(join(temp, "mi-connector-http-0.1.8"), ""));
  });

  it("testConnectorConnection", () => {
    const either = ConnectionFinder.findConnections(fixture("synapse/connector/test_project"), "http", holder, false);
    expect(either).not.toBeNull();
    const connections = either.getLeft();
    expect(connections).not.toBeNull();
    expect(connections.getConnections().length).toBe(2);
  });
});

describe("ConnectionHandler (ConnectionHandlerTest)", () => {
  let handler: ConnectionHandler;
  let http: any;
  beforeAll(() => {
    const temp = makeTempDir("connector-reader-test-");
    extractConnectorZips(temp, "synapse/connector/zips");
    handler = new ConnectionHandler();
    http = new ConnectorReader().readConnector(join(temp, "mi-connector-http-0.1.8"), null);
    handler.init(ConnectorHolder.getInstance());
  });
  beforeEach(() => {
    const holder = ConnectorHolder.getInstance();
    holder.clearConnectors();
    holder.addConnector(http);
  });

  const local = (n: string) => fixture("synapse/connector/test_project/src/main/wso2mi/artifacts/local-entries/" + n);
  const assertValid = (schema: any, name: string) => {
    expect(schema).not.toBeNull();
    expect(schema.get("connectionName")).not.toBeNull();
    expect(schema.get("connectionName").getAsString()).toBe(name);
  };

  it("testGetConnectionSchemaFromValidName", () => {
    assertValid(handler.getConnectionUiSchema("http", "http"), "HTTP");
    assertValid(handler.getConnectionUiSchema("http", "https"), "HTTPS");
  });
  it("testGetConnectionSchemaFromInvalidName", () => {
    expect(handler.getConnectionUiSchema("invalid", "invalid")).toBeNull();
  });
  it("testGetConnectionSchemaForValidConnectionFile", () => {
    assertValid(handler.getConnectionUiSchema(local("HttpsCon.xml")), "HTTPS");
  });
  it("testGetConnectionSchemaForInvalidConnectionFile", () => {
    expect(handler.getConnectionUiSchema(local("testLocalEntry.xml"))).toBeNull();
  });
  it("testGetConnectionSchemaForMissingConnector", () => {
    expect(handler.getConnectionUiSchema(local("InvalidConnectorConnection.xml"))).toBeNull();
  });
  it("testGetConnectionSchemaForWrongConnectionType", () => {
    expect(handler.getConnectionUiSchema(local("InvalidConnectionType.xml"))).toBeNull();
  });
});

import { InboundConnectorHolder } from "../../src/synapse/inbound/conector/InboundConnectorHolder.js";
import { InvalidConfigurationException } from "../../src/syntaxTree/om/errors.js";
import { MockClient, MockConnectorLoader, copyFileToDirectory, forceDelete } from "./helpers.js";

describe("ConnectorLoader (ConnectorLoaderTest)", () => {
  let holder: ConnectorHolder;
  let loader: any;
  let temp: string;
  beforeAll(() => {
    holder = ConnectorHolder.getInstance();
    holder.clearConnectors();
    temp = makeTempDir("mi-language-server-test-");
    loader = new MockConnectorLoader(new MockClient(), holder, new InboundConnectorHolder(), temp);
  });
  const load = (...zips: string[]) => {
    for (const z of zips) copyFileToDirectory(fixture(z), join(temp, "connectors"));
    loader.loadConnector();
  };

  it("init with null project", () => {
    expect(() => loader.init(null)).toThrow(InvalidConfigurationException);
  });
  it("init with invalid project", () => {
    expect(() => loader.init(fixture("synapse/invalid.project"))).toThrow(InvalidConfigurationException);
  });
  it("init with valid project", () => {
    expect(() => loader.init(fixture("synapse/pom.parser/test_pom_parser"))).not.toThrow();
  });
  it("no connectors", () => {
    loader.loadConnector();
    expect(holder.getConnectors().length).toBe(0);
  });
  it("adding a valid connector", () => {
    load("synapse/connector/zips/mi-connector-http-0.1.8.zip");
    expect(holder.getConnectors().length).toBe(1);
    expect(holder.getConnector("http")).not.toBeNull();
  });
  it("adding an invalid connector", () => {
    load("synapse/connector/zips/invalid-connector-0.1.0.zip");
    expect(holder.getConnectors().length).toBe(1);
    expect(holder.getConnector("http")).not.toBeNull();
  });
  it("adding another valid connector", () => {
    load("synapse/connector/zips/mi-connector-file-4.0.36.zip");
    expect(holder.getConnectors().length).toBe(2);
    expect(holder.getConnector("http")).not.toBeNull();
    expect(holder.getConnector("file")).not.toBeNull();
  });
  it("removing the invalid connector", () => {
    forceDelete(join(temp, "connectors", "invalid-connector-0.1.0.zip"));
    loader.loadConnector();
    expect(holder.getConnectors().length).toBe(2);
  });
  it("removing a valid connector", () => {
    forceDelete(join(temp, "connectors", "mi-connector-http-0.1.8.zip"));
    loader.loadConnector();
    expect(holder.getConnectors().length).toBe(1);
    expect(holder.getConnector("file")).not.toBeNull();
  });
  it("adding valid and invalid connectors at the same time", () => {
    load("synapse/connector/zips/invalid-connector-0.1.0.zip", "synapse/connector/zips/mi-connector-http-0.1.8.zip");
    expect(holder.getConnectors().length).toBe(2);
    expect(holder.getConnector("http")).not.toBeNull();
    expect(holder.getConnector("file")).not.toBeNull();
  });
});
