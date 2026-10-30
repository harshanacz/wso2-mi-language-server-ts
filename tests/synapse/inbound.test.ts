import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { makeTempDir, extractConnectorZips } from "./helpers.js";
import { ConnectorHolder } from "../../src/synapse/connectors/ConnectorHolder.js";
import { ConnectorReader } from "../../src/synapse/connectors/ConnectorReader.js";
import { InboundConnectorHolder } from "../../src/synapse/inbound/conector/InboundConnectorHolder.js";
import { JsonParser } from "../../src/synapse/gson.js";

/** Ports InboundEndpointInfoTest. */
describe("InboundEndpointInfo", () => {
  let sqs: any;
  beforeAll(() => {
    const temp = makeTempDir("inbound-info-test-");
    extractConnectorZips(temp, "synapse/connector/zips");
    const file = join(temp, "mi-inbound-amazonsqs-2.0.2", "resources", "uischema.json");
    expect(existsSync(file)).toBe(true);
    sqs = JsonParser.parseString(readFileSync(file, "utf8")).getAsJsonObject();
  });

  const exists = (params: any[], name: string, required: boolean) => {
    const p = params.find((x) => x.getName() === name);
    expect(p, "Parameter '" + name + "' should exist").toBeDefined();
    expect(p.isRequired()).toBe(required);
  };

  it("downloaded connector", () => {
    const info = InboundConnectorHolder.buildInboundEndpointInfo(sqs, "downloaded");
    expect(info.getName()).toBe("amazonSQSInbound");
    expect(info.getId()).toBe("org.wso2.carbon.inbound.amazonsqs.AmazonSQSPollingConsumer");
    expect(info.getDisplayName()).toBe("Amazon SQS");
    expect(info.getDescription()).toBe("Configure Amazon SQS settings.");
    expect(info.getType()).toBe("event-integration");
    expect(info.getSource()).toBe("downloaded");
  });
  it("parameters flattened", () => {
    const params = InboundConnectorHolder.buildInboundEndpointInfo(sqs, "downloaded").getParameters();
    expect(params.length).toBeGreaterThan(0);
    exists(params, "name", true);
    exists(params, "interval", true);
    exists(params, "destination", true);
    exists(params, "accessKey", false);
    exists(params, "secretKey", false);
    exists(params, "sequential", false);
  });
  it("hidden attributes excluded", () => {
    const params = InboundConnectorHolder.buildInboundEndpointInfo(sqs, "downloaded").getParameters();
    expect(params.find((p: any) => p.getName() === "class")).toBeUndefined();
  });
  it("checkbox mapped to boolean", () => {
    const params = InboundConnectorHolder.buildInboundEndpointInfo(sqs, "downloaded").getParameters();
    expect(params.find((p: any) => p.getName() === "sequential").getXsdType()).toBe("xs:boolean");
  });
  it("bundled source", () => {
    const schema = JsonParser.parseString(
      '{"name":"HTTP","id":"http","title":"HTTP","type":"inbuilt-inbound-endpoint",' +
        '"elements":[{"type":"attributeGroup","value":{"groupName":"Generic","elements":[' +
        '{"type":"attribute","value":{"name":"port","displayName":"Port","inputType":"integer","required":"true"}}]}}]}',
    ).getAsJsonObject();
    const info = InboundConnectorHolder.buildInboundEndpointInfo(schema, "bundled");
    expect(info.getName()).toBe("HTTP");
    expect(info.getId()).toBe("http");
    expect(info.getDisplayName()).toBe("HTTP");
    expect(info.getType()).toBe("inbuilt-inbound-endpoint");
    expect(info.getSource()).toBe("bundled");
    expect(info.getParameters().length).toBe(1);
    const port = info.getParameters()[0];
    expect(port.getName()).toBe("port");
    expect(port.getXsdType()).toBe("integerOrExpression");
    expect(port.isRequired()).toBe(true);
  });
  it("empty elements", () => {
    const schema = JsonParser.parseString('{"name":"empty","id":"empty","title":"Empty","elements":[]}').getAsJsonObject();
    const info = InboundConnectorHolder.buildInboundEndpointInfo(schema, "bundled");
    expect(info.getName()).toBe("empty");
    expect(info.getParameters().length).toBe(0);
  });
  it("missing fields", () => {
    const info = InboundConnectorHolder.buildInboundEndpointInfo(JsonParser.parseString('{"name":"minimal"}').getAsJsonObject(), "downloaded");
    expect(info.getName()).toBe("minimal");
    expect(info.getId() ?? null).toBeNull();
    expect(info.getDisplayName() ?? null).toBeNull();
    expect(info.getDescription() ?? null).toBeNull();
    expect(info.getType() ?? null).toBeNull();
    expect(info.getParameters().length).toBe(0);
  });
});

/** Ports ConnectorInfoEndpointTest. */
describe("ConnectorInfoEndpoint", () => {
  let temp: string;
  let holder: ConnectorHolder;
  beforeAll(() => {
    temp = makeTempDir("connector-info-test-");
    extractConnectorZips(temp, "synapse/connector/zips");
  });
  beforeEach(() => {
    holder = ConnectorHolder.getInstance();
    holder.clearConnectors();
  });
  const read = (name: string) => new ConnectorReader().readConnector(join(temp, name), "");

  it("read connector returns full metadata", () => {
    const c = read("mi-connector-http-0.1.8");
    expect(c.getName()).toBe("http");
    expect(c.getVersion()).toBe("0.1.8");
    expect(c.getDisplayName()).toBe("HTTP");
    expect(c.getActions().length).toBeGreaterThan(0);
    expect([...c.getConnectionUiSchema().values()].length).toBeGreaterThan(0);
  });
  it("operations have parameters", () => {
    const get = read("mi-connector-http-0.1.8").getAction("get");
    expect(get.getTag()).toBe("http.get");
    expect(get.getParameters().length).toBeGreaterThan(0);
    expect(get.getAllowedConnectionTypes().length).toBeGreaterThan(0);
  });
  it("invalid path returns null", () => {
    expect(read("nonexistent-connector-1.0.0")).toBeNull();
  });
  it("holder upsert new connector", () => {
    holder.addConnector(read("mi-connector-http-0.1.8"));
    expect(holder.getConnector("http")).not.toBeNull();
    expect(holder.getConnectors().length).toBe(1);
  });
  it("holder upsert replaces existing", () => {
    holder.addConnector(read("mi-connector-http-0.1.8"));
    expect(holder.getConnector("http").getVersion()).toBe("0.1.8");
    holder.addConnector(read("mi-connector-file-4.0.36"));
    const http2 = read("mi-connector-http-0.1.8");
    if (holder.exists(http2.getName())) holder.removeConnector(http2.getName());
    holder.addConnector(http2);
    expect(holder.getConnectors().length).toBe(2);
    expect(holder.getConnector("http")).not.toBeNull();
    expect(holder.getConnector("file")).not.toBeNull();
  });
  it("remove non existent is fine", () => {
    holder.removeConnector("nonexistent");
    expect(holder.getConnectors().length).toBe(0);
  });
  it("inbound zip gives empty operations", () => {
    const c = read("mi-inbound-amazonsqs-2.0.2");
    expect(c).not.toBeNull();
    expect(c.getActions().length).toBe(0);
  });
  it("parameter types", () => {
    const get = read("mi-connector-http-0.1.8").getAction("get");
    for (const p of get.getParameters()) {
      expect(p.getName()).not.toBeNull();
      expect(p.getXsdType()).not.toBeNull();
      expect(["xs:string", "xs:boolean", "integerOrExpression"]).toContain(p.getXsdType());
    }
  });
});
