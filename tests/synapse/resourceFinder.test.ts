import { describe, it, expect } from "vitest";
import { fixture } from "./helpers.js";
import { ResourceFinderFactory } from "../../src/synapse/resourceFinder/ResourceFinderFactory.js";
import { RequestedResource } from "../../src/synapse/resourceFinder/pojo/RequestedResource.js";
import { Either } from "../../src/synapse/lsp.js";

/** Ports ResourceFinderTest. */
const projectPath = fixture("synapse/resource.finder/test_project");
const resourceFinder = ResourceFinderFactory.getResourceFinder(false);

const names = (rs: any[]): string[] => rs.map((r) => r.getName()).sort();
function assertEqualResourceNames(expected: string[], resources: any[]) {
  expect(names(resources)).toEqual([...expected].sort());
}

describe("ResourceFinder", () => {
  it("testAllResources", () => {

        const allResources: Map<string, any> = resourceFinder.findAllResources(projectPath);

        const apiResources = allResources.get("api");
        expect(apiResources.getResources().length).toBe(1);
        expect(apiResources.getRegistryResources() ?? null).toBeNull();
        expect(apiResources.getResources()[0].getName()).toBe("testApi");

        const sequenceResources = allResources.get("sequence");
        expect(sequenceResources.getResources().length).toBe(1);
        expect(sequenceResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["testSequence1"], sequenceResources.getResources());
        assertEqualResourceNames(["testSequence1", "testSequence2"], sequenceResources.getRegistryResources());

        const endpointResources = allResources.get("endpoint");
        expect(endpointResources.getResources().length).toBe(2);
        expect(endpointResources.getRegistryResources().length).toBe(4);
        assertEqualResourceNames(["testEndpoint1", "testEndpoint2"], endpointResources.getResources());
        assertEqualResourceNames(["testEndpoint1", "testEndpoint2", "testEndpoint3", "testEndpoint4"], endpointResources.getRegistryResources());

        const proxyResources = allResources.get("proxyService");
        expect(proxyResources.getResources().length).toBe(1);
        expect(proxyResources.getResources()[0].getName()).toBe("testProxy1");

        const messageProcessorResources = allResources.get("messageProcessor");
        expect(messageProcessorResources.getResources().length).toBe(1);
        expect(messageProcessorResources.getResources()[0].getName()).toBe("testMessageProcessor");

        const messageStoreResources = allResources.get("messageStore");
        expect(messageStoreResources.getResources().length).toBe(1);
        expect(messageStoreResources.getResources()[0].getName()).toBe("testMessageStore");

        const sequenceTemplateResources = allResources.get("sequenceTemplate");
        expect(sequenceTemplateResources.getResources().length).toBe(1);
        expect(sequenceTemplateResources.getRegistryResources().length).toBe(2);
        expect(sequenceTemplateResources.getResources()[0].getName()).toBe("testSequenceTemplate");
        assertEqualResourceNames(["testSequenceTemplate1", "testSequenceTemplate2"],
                sequenceTemplateResources.getRegistryResources());

        const endpointTemplateResources = allResources.get("endpointTemplate");
        expect(endpointTemplateResources.getResources().length).toBe(1);
        expect(endpointTemplateResources.getRegistryResources().length).toBe(2);
        expect(endpointTemplateResources.getResources()[0].getName()).toBe("testEndpointTemplate");
        assertEqualResourceNames(["testEndpointTemplate1", "testEndpointTemplate2"],
                endpointTemplateResources.getRegistryResources());

        const taskResources = allResources.get("task");
        expect(taskResources.getResources().length).toBe(1);
        expect(taskResources.getResources()[0].getName()).toBe("testTask");

        const localEntryResources = allResources.get("localEntry");
        expect(localEntryResources.getResources().length).toBe(2);
        assertEqualResourceNames(["testLocalEntry", "HttpsCon"],
                localEntryResources.getResources());

        const jsResources = allResources.get("js");
        expect(jsResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["test1.js", "test.js"], jsResources.getRegistryResources());

        const jsonResources = allResources.get("json");
        expect(jsonResources.getRegistryResources().length).toBe(4);
        assertEqualResourceNames(["test1.json", "swagger.json", "test.json", "swagger1.json"],
                jsonResources.getRegistryResources());

        const smooksConfigResources = allResources.get("smooksConfig");
        expect(smooksConfigResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["test_smooks_config1.xml", "test_smooks_config.xml"],
                smooksConfigResources.getRegistryResources());

        const wsdlResources = allResources.get("wsdl");
        expect(wsdlResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["wsdlfile.wsdl", "wsdlfile1.wsdl"],
                wsdlResources.getRegistryResources());

        const wsPolicyResources = allResources.get("ws_policy");
        expect(wsPolicyResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["ws_policy1.xml", "ws_policy.xml"], wsPolicyResources.getRegistryResources());

        const xsdResources = allResources.get("xsd");
        expect(xsdResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["sample1.xsd", "sample.xsd"], xsdResources.getRegistryResources());

        const xslResources = allResources.get("xsl");
        expect(xslResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["sample1.xsl", "sample.xsl"], xslResources.getRegistryResources());

        const xsltResources = allResources.get("xslt");
        expect(xsltResources.getRegistryResources().length).toBe(2);
        assertEqualResourceNames(["sample1.xslt", "sample.xslt"], xsltResources.getRegistryResources());

        const yamlResources = allResources.get("yaml");
        expect(yamlResources.getRegistryResources().length).toBe(4);
        assertEqualResourceNames(["swagger.yaml", "sample.yaml", "sample1.yaml", "swagger1.yaml"], yamlResources.getRegistryResources());
  });

  it("testApiResource", () => {

        const apiResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("api"));

        expect(apiResources.getResources().length).toBe(1);
        expect(apiResources.getResources()[0].getName()).toBe("testApi");
  });

  it("testSequenceResource", () => {

        const sequenceResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "sequence"));

        expect(sequenceResources.getResources().length).toBe(1);
        expect(sequenceResources.getRegistryResources().length).toBe(2);

        const expectedSequenceNames = ["testSequence1"];
        const expectedRegistrySequenceNames = ["testSequence1", "testSequence2"];
        assertEqualResourceNames(expectedSequenceNames, sequenceResources.getResources());
        assertEqualResourceNames(expectedRegistrySequenceNames, sequenceResources.getRegistryResources());
  });

  it("testEndpointResource", () => {

        const endpointResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "endpoint"));

        expect(endpointResources.getResources().length).toBe(2);
        expect(endpointResources.getRegistryResources().length).toBe(4);

        const expectedEndpointNames = ["testEndpoint1", "testEndpoint2"];
        const expectedRegistryEndpointNames = ["testEndpoint1", "testEndpoint2", "testEndpoint3",
                "testEndpoint4"];
        assertEqualResourceNames(expectedEndpointNames, endpointResources.getResources());
        assertEqualResourceNames(expectedRegistryEndpointNames, endpointResources.getRegistryResources());
  });

  it("testProxyResource", () => {

        const proxyResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "proxyService"));

        expect(proxyResources.getResources().length).toBe(1);

        expect(proxyResources.getResources()[0].getName()).toBe("testProxy1");
  });

  it("testMessageProcessorResource", () => {

        const messageProcessorResources = resourceFinder.getAvailableResources(projectPath,
                Either.forLeft<string, RequestedResource[]>("messageProcessor"));

        expect(messageProcessorResources.getResources().length).toBe(1);
        expect(messageProcessorResources.getResources()[0].getName()).toBe("testMessageProcessor");
  });

  it("testMessageStoreResource", () => {

        const messageStoreResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "messageStore"));

        expect(messageStoreResources.getResources().length).toBe(1);
        expect(messageStoreResources.getResources()[0].getName()).toBe("testMessageStore");
  });

  it("testSequenceTemplateResource", () => {

        const sequenceTemplateResources = resourceFinder.getAvailableResources(projectPath,
                Either.forLeft<string, RequestedResource[]>("sequenceTemplate"));

        expect(sequenceTemplateResources.getResources().length).toBe(1);
        expect(sequenceTemplateResources.getResources()[0].getName()).toBe("testSequenceTemplate");
  });

  it("testEndpointTemplateResource", () => {

        const endpointTemplateResources = resourceFinder.getAvailableResources(projectPath,
                Either.forLeft<string, RequestedResource[]>("endpointTemplate"));

        expect(endpointTemplateResources.getResources().length).toBe(1);
        expect(endpointTemplateResources.getResources()[0].getName()).toBe("testEndpointTemplate");
  });

  it("testTaskResource", () => {

        const taskResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("task"));

        expect(taskResources.getResources().length).toBe(1);
        expect(taskResources.getResources()[0].getName()).toBe("testTask");
  });

  it("testLocalEntryResource", () => {

        const localEntryResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "localEntry"));

        const localEntries = [localEntryResources.getResources()[0].getName(), localEntryResources.getResources()[1].getName()];
        expect(localEntryResources.getResources().length).toBe(2);
        expect(localEntries).toContain("testLocalEntry");
        expect(localEntries).toContain("HttpsCon");
  });

  it("testJSResource", () => {

        const jsResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("js"));

        expect(jsResources.getRegistryResources().length).toBe(2);
        const expectedJsNames = ["test1.js", "test.js"];
        assertEqualResourceNames(expectedJsNames, jsResources.getRegistryResources());
  });

  it("testJSONResource", () => {

        const jsonResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("json"));

        expect(jsonResources.getRegistryResources().length).toBe(4);

        const expectedJsonNames = ["swagger.json", "test.json", "swagger1.json", "test1.json"];
        assertEqualResourceNames(expectedJsonNames, jsonResources.getRegistryResources());
  });

  it("testSmooksConfigResource", () => {

        const smooksConfigResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "smooksConfig"));

        expect(smooksConfigResources.getRegistryResources().length).toBe(2);
        const expectedSmooksConfigNames = ["test_smooks_config1.xml", "test_smooks_config.xml"];
        assertEqualResourceNames(expectedSmooksConfigNames, smooksConfigResources.getRegistryResources());
  });

  it("testWSDLResource", () => {

        const wsdlResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("wsdl"));

        expect(wsdlResources.getRegistryResources().length).toBe(2);
        const expectedWsdlNames = ["wsdlfile.wsdl", "wsdlfile1.wsdl"];
        assertEqualResourceNames(expectedWsdlNames, wsdlResources.getRegistryResources());
  });

  it("testWSPolicyResource", () => {

        const wsPolicyResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "ws_policy"));

        expect(wsPolicyResources.getRegistryResources().length).toBe(2);
        const expectedPolicyNames = ["ws_policy.xml", "ws_policy1.xml"];
        assertEqualResourceNames(expectedPolicyNames, wsPolicyResources.getRegistryResources());
  });

  it("testXSDResource", () => {

        const xsdResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("xsd"));

        expect(xsdResources.getRegistryResources().length).toBe(2);
        const expectedXsdNames = ["sample.xsd", "sample1.xsd"];
        assertEqualResourceNames(expectedXsdNames, xsdResources.getRegistryResources());
  });

  it("testXSLResource", () => {

        const xslResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("xsl"));

        expect(xslResources.getRegistryResources().length).toBe(2);
        const expectedXslNames = ["sample.xsl", "sample1.xsl"];
        assertEqualResourceNames(expectedXslNames, xslResources.getRegistryResources());
  });

  it("testXSLTResource", () => {

        const xsltResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("xslt"));

        expect(xsltResources.getRegistryResources().length).toBe(2);
        const expectedXsltNames = ["sample.xslt", "sample1.xslt"];
        assertEqualResourceNames(expectedXsltNames, xsltResources.getRegistryResources());
  });

  it("testYAMLResource", () => {

        const yamlResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("yaml"));

        expect(yamlResources.getRegistryResources().length).toBe(4);
        const expectedYamlNames = ["swagger.yaml", "sample.yaml", "sample1.yaml", "swagger1.yaml"];
        assertEqualResourceNames(expectedYamlNames, yamlResources.getRegistryResources());
  });

  it("testRegistryResource", () => {

        const registryResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>(
                "registry"));

        expect(registryResources.getRegistryResources().length).toBe(34);
        expect(registryResources.getResources().length).toBe(0);
  });

  it("testSwaggerResource", () => {

        const swaggerResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("swagger"
        ));

        expect(swaggerResources.getRegistryResources().length).toBe(4);

        const expectedSwaggerNames = ["swagger.yaml", "swagger.json", "swagger1.yaml", "swagger1.json"];
        assertEqualResourceNames(expectedSwaggerNames, swaggerResources.getRegistryResources());
  });

  it("testSchemaResource", () => {

        const schemaResources = resourceFinder.getAvailableResources(projectPath, Either.forLeft<string, RequestedResource[]>("schema"));

        expect(schemaResources.getRegistryResources().length).toBe(6);

        const expectedSchemaNames = ["swagger.json", "test.json", "sample.xsd", "sample1.xsd", "swagger1.json",
                "test1.json"];
        assertEqualResourceNames(expectedSchemaNames, schemaResources.getRegistryResources());
  });

  it("testRequestMultipleArtifactResource", () => {

        const requestedResource1 = new RequestedResource("sequence", true);
        const requestedResource2 = new RequestedResource("endpoint", true);

        const multipleResources = resourceFinder.getAvailableResources(projectPath,
                Either.forRight<string, RequestedResource[]>([requestedResource1, requestedResource2]));

        expect(multipleResources.getResources().length).toBe(3);
        expect(multipleResources.getRegistryResources().length).toBe(6);

        const expectedResourceNames = ["testSequence1", "testEndpoint1", "testEndpoint2"];
        const expectedRegistryResourceNames = ["testSequence1", "testSequence2", "testEndpoint1",
                "testEndpoint2", "testEndpoint3", "testEndpoint4"];
        assertEqualResourceNames(expectedResourceNames, multipleResources.getResources());
        assertEqualResourceNames(expectedRegistryResourceNames, multipleResources.getRegistryResources());
  });

  it("testRequestMultipleArtifactResourceWithoutRegistry", () => {

        const requestedResource1 = new RequestedResource("sequence", false);
        const requestedResource2 = new RequestedResource("endpoint", false);

        const multipleResources = resourceFinder.getAvailableResources(projectPath,
                Either.forRight<string, RequestedResource[]>([requestedResource1, requestedResource2]));

        expect(multipleResources.getResources().length).toBe(3);
        expect(multipleResources.getRegistryResources().length).toBe(0);

        const expectedResourceNames = ["testSequence1", "testEndpoint1", "testEndpoint2"];
        assertEqualResourceNames(expectedResourceNames, multipleResources.getResources());
  });

  it("testRequestMultipleRegistryResource", () => {

        const requestedResource1 = new RequestedResource("json", true);
        const requestedResource2 = new RequestedResource("js", true);

        const multipleResources = resourceFinder.getAvailableResources(projectPath,
                Either.forRight<string, RequestedResource[]>([requestedResource1, requestedResource2]));

        expect(multipleResources.getResources().length).toBe(0);
        expect(multipleResources.getRegistryResources().length).toBe(6);

        const expectedResourceNames = ["swagger.json", "test.json", "test.js", "swagger1.json", "test1.js",
                "test1.json"];
        assertEqualResourceNames(expectedResourceNames, multipleResources.getRegistryResources());
  });

});
