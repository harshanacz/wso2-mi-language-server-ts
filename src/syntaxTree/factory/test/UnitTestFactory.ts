// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/test/UnitTestFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Artifact } from "../../pojo/test/Artifact.js";
import { AssertEquals } from "../../pojo/test/AssertEquals.js";
import { AssertNotNull } from "../../pojo/test/AssertNotNull.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { MockService } from "../../pojo/test/MockService.js";
import { MockServices } from "../../pojo/test/MockServices.js";
import { STNode } from "../../stNode.js";
import { TestArtifact } from "../../pojo/test/TestArtifact.js";
import { TestCase } from "../../pojo/test/TestCase.js";
import { TestCaseAssertions } from "../../pojo/test/TestCaseAssertions.js";
import { TestCaseInput } from "../../pojo/test/TestCaseInput.js";
import { TestCases } from "../../pojo/test/TestCases.js";
import { TestConnectorResources } from "../../pojo/test/TestConnectorResources.js";
import { TestProperties } from "../../pojo/test/TestProperties.js";
import { TestProperty } from "../../pojo/test/TestProperty.js";
import { TestRegistryResource } from "../../pojo/test/TestRegistryResource.js";
import { TestRegistryResources } from "../../pojo/test/TestRegistryResources.js";
import { TestSupportiveArtifacts } from "../../pojo/test/TestSupportiveArtifacts.js";
import { UnitTest } from "../../pojo/test/UnitTest.js";
import { UnitTestArtifacts } from "../../pojo/test/UnitTestArtifacts.js";
import { Utils } from "../../utils.js";

export class UnitTestFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let unitTest = new UnitTest();
    unitTest.elementNode(element);

    this.populateChildren(element, unitTest);

    return unitTest;

  }

  populateChildren(element: DOMElement, unitTest: UnitTest): void {
    let children = element.getChildren();
    for (let child of children) {
        let childName = child.getLocalName();
        if (equalsIgnoreCase(Constant.ARTIFACTS, childName)) {
            let artifacts = this.createArtifacts((child as DOMElement));
            unitTest.setTestArtifacts(artifacts);
        } else if (equalsIgnoreCase(Constant.TEST_CASES, childName)) {
            let testCases = this.createTestCases((child as DOMElement));
            unitTest.setTestCases(testCases);
        } else if (equalsIgnoreCase(Constant.MOCK_SERVICES, childName)) {
            let mockServices = this.createMockServices((child as DOMElement));
            unitTest.setMockServices(mockServices);
        }
    }

  }

  createArtifacts(node: DOMElement): UnitTestArtifacts {
    let artifacts = new UnitTestArtifacts();
    artifacts.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.TEST_ARTIFACT, childName)) {
                let testArtifact = this.createTestArtifacts((child as DOMElement));
                artifacts.setTestArtifact(testArtifact);
            } else if (equalsIgnoreCase(Constant.SUPPORTIVE_ARTIFACTS, childName)) {
                let supportiveArtifacts = this.createTestSupportiveArtifacts((child as DOMElement));
                artifacts.setSupportiveArtifact(supportiveArtifacts);
            } else if (equalsIgnoreCase(Constant.REGISTRY_RESOURCES, childName)) {
                let registryResources = this.createTestRegistryResources((child as DOMElement));
                artifacts.setRegistryResource(registryResources);
            } else if (equalsIgnoreCase(Constant.CONNECTOR_RESOURCES, childName)) {
                let connectorResources = this.createTestConnectorResources((child as DOMElement));
                artifacts.setConnectorResource(connectorResources);
            }
        }
    }
    return artifacts;

  }

  createTestArtifacts(node: DOMElement): TestArtifact {
    let testArtifact = new TestArtifact();
    testArtifact.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(Constant.ARTIFACT, child.getLocalName())) {
                let artifact = this.createArtifact((child as DOMElement));
                testArtifact.setArtifact(artifact);
                break;
            }
        }
    }
    return testArtifact;

  }

  createTestSupportiveArtifacts(node: DOMElement): TestSupportiveArtifacts {
    let supportiveArtifacts = new TestSupportiveArtifacts();
    supportiveArtifacts.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let supportiveArtifactList = [];
        for (let child of children) {
            if (equalsIgnoreCase(Constant.ARTIFACT, child.getLocalName())) {
                let artifact = this.createArtifact((child as DOMElement));
                supportiveArtifactList.push(artifact);
            }
        }
        supportiveArtifacts.setArtifacts(supportiveArtifactList.slice());
    }

    return supportiveArtifacts;

  }

  createArtifact(node: DOMElement): Artifact {
    let artifact = new Artifact();
    artifact.elementNode(node);
    artifact.setContent(Utils.getInlineString(node.getFirstChild()));
    return artifact;

  }

  createTestRegistryResources(node: DOMElement): TestRegistryResources {
    let registryResources = new TestRegistryResources();
    registryResources.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let registryResourceList = [];
        for (let child of children) {
            if (equalsIgnoreCase(Constant.REGISTRY_RESOURCE, child.getLocalName())) {
                let registryResource = this.createTestRegistryResource((child as DOMElement));
                registryResourceList.push(registryResource);
            }
        }
        registryResources.setRegistryResources(registryResourceList.slice());
    }

    return registryResources;

  }

  createTestRegistryResource(node: DOMElement): TestRegistryResource {
    let registryResource = new TestRegistryResource();
    registryResource.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.FILE_NAME, childName)) {
                let fileName = this.createSimpleNode((child as DOMElement));
                registryResource.setFileName(fileName);
            } else if (equalsIgnoreCase(Constant.ARTIFACT, childName)) {
                let artifact = this.createSimpleNode((child as DOMElement));
                registryResource.setArtifact(artifact);
            } else if (equalsIgnoreCase(Constant.REGISTRY_PATH, childName)) {
                let registryPath = this.createSimpleNode((child as DOMElement));
                registryResource.setRegistryPath(registryPath);
            } else if (equalsIgnoreCase(Constant.MEDIA_TYPE, childName)) {
                let mediaType = this.createSimpleNode((child as DOMElement));
                registryResource.setMediaType(mediaType);
            }
        }
    }
    return registryResource;

  }

  createTestConnectorResources(node: DOMElement): TestConnectorResources {
    let connectorResources = new TestConnectorResources();
    connectorResources.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let connectorResourceList = [];
        for (let child of children) {
            if (equalsIgnoreCase(Constant.CONNECTOR_RESOURCE, child.getLocalName())) {
                let connectorResource = this.createSimpleNode((child as DOMElement));
                connectorResourceList.push(connectorResource);
            }
        }
        connectorResources.setConnectorResources(connectorResourceList.slice());
    }
    return connectorResources;

  }

  createTestCases(node: DOMElement): TestCases {
    let testCases = new TestCases();
    testCases.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let testCaseList = [];
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.TEST_CASE, childName)) {
                let testCase = this.createTestCase((child as DOMElement));
                testCaseList.push(testCase);
            }
        }
        testCases.setTestCases(testCaseList.slice());
    }
    return testCases;

  }

  createTestCase(node: DOMElement): TestCase {
    let testCase = new TestCase();
    testCase.elementNode(node);

    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        testCase.setName(name);
    }

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.INPUT, childName)) {
                let testCaseInput = this.createTestCaseInput((child as DOMElement));
                testCase.setInput(testCaseInput);
            } else if (equalsIgnoreCase(Constant.ASSERTIONS, childName)) {
                let testCaseAssertions = this.createTestCaseAssertions((child as DOMElement));
                testCase.setAssertions(testCaseAssertions);
            }
        }
    }
    return testCase;

  }

  createTestCaseInput(node: DOMElement): TestCaseInput {
    let testCaseInput = new TestCaseInput();
    testCaseInput.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let nodeName = child.getLocalName();
            if (equalsIgnoreCase(Constant.REQUEST_PATH, nodeName)) {
                let requestPath = this.createSimpleNode((child as DOMElement));
                testCaseInput.setRequestPath(requestPath);
            } else if (equalsIgnoreCase(Constant.REQUEST_METHOD, nodeName)) {
                let requestMethod = this.createSimpleNode((child as DOMElement));
                testCaseInput.setRequestMethod(requestMethod);
            } else if (equalsIgnoreCase(Constant.REQUEST_PROTOCOL, nodeName)) {
                let requestProtocol = this.createSimpleNode((child as DOMElement));
                testCaseInput.setRequestProtocol(requestProtocol);
            } else if (equalsIgnoreCase(Constant.PAYLOAD, nodeName)) {
                let payload = this.createSimpleNode((child as DOMElement));
                testCaseInput.setPayload(payload);
            } else if (equalsIgnoreCase(Constant.PROPERTIES, nodeName)) {
                let properties = this.createTestProperties((child as DOMElement));
                testCaseInput.setProperties(properties);
            }
        }
    }
    return testCaseInput;

  }

  createTestProperties(node: DOMElement): TestProperties {
    let testProperties = new TestProperties();
    testProperties.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (child instanceof DOMElement) {
                let property = this.createTestProperty((child as DOMElement));
                testProperties.addProperty(property);
            }
        }
    }
    return testProperties;

  }

  createTestProperty(node: DOMElement): TestProperty {
    let testProperty = new TestProperty();
    testProperty.elementNode(node);

    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        testProperty.setName(name);
    }
    let value = node.getAttribute(Constant.VALUE);
    if (value != null) {
        testProperty.setValue(value);
    }
    let scope = node.getAttribute(Constant.SCOPE);
    if (scope != null) {
        testProperty.setScope(scope);
    } else {
        testProperty.setScope(Constant.DEFAULT);
    }
    return testProperty;

  }

  createTestCaseAssertions(node: DOMElement): TestCaseAssertions {
    let testCaseAssertions = new TestCaseAssertions();
    testCaseAssertions.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let assertionsList = [];
        for (let child of children) {
            let nodeName = child.getLocalName();
            if (equalsIgnoreCase(Constant.ASSERT_EQUALS, nodeName)) {
                let assertEquals = this.createAssertEquals((child as DOMElement));
                assertionsList.push(assertEquals);
            } else if (equalsIgnoreCase(Constant.ASSERT_NOT_NULL, nodeName)) {
                let assertNotNull = this.createAssertNotNull((child as DOMElement));
                assertionsList.push(assertNotNull);
            }
        }
        testCaseAssertions.setAssertions(assertionsList.slice());
    }
    return testCaseAssertions;

  }

  createAssertEquals(node: DOMElement): AssertEquals {
    let assertEquals = new AssertEquals();
    assertEquals.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.ACTUAL, childName)) {
                let actual = this.createSimpleNode((child as DOMElement));
                assertEquals.setActual(actual);
            } else if (equalsIgnoreCase(Constant.EXPECTED, childName)) {
                let expected = this.createSimpleNode((child as DOMElement));
                assertEquals.setExpected(expected);
            } else if (equalsIgnoreCase(Constant.MESSAGE, childName)) {
                let message = this.createSimpleNode((child as DOMElement));
                assertEquals.setMessage(message);
            }
        }
    }
    return assertEquals;

  }

  createAssertNotNull(node: DOMElement): AssertNotNull {
    let assertNotNull = new AssertNotNull();
    assertNotNull.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.ACTUAL, childName)) {
                let actual = this.createSimpleNode((child as DOMElement));
                assertNotNull.setActual(actual);
            } else if (equalsIgnoreCase(Constant.MESSAGE, childName)) {
                let message = this.createSimpleNode((child as DOMElement));
                assertNotNull.setMessage(message);
            }
        }
    }
    return assertNotNull;

  }

  createSimpleNode(element: DOMElement): STNode {
    let node = new STNode();
    node.elementNode(element);
    let content = Utils.getInlineString(element.getFirstChild());
    node.setTextNode(content);
    return node;

  }

  createMockServices(node: DOMElement): MockServices {
    let mockServices = new MockServices();
    mockServices.elementNode(node);

    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        let mockServiceList = [];
        for (let child of children) {
            let childName = child.getLocalName();
            if (equalsIgnoreCase(Constant.MOCK_SERVICE, childName)) {
                let mockService = this.createMockService((child as DOMElement));
                mockServiceList.push(mockService);
            }
        }
        mockServices.setServices(mockServiceList.slice());
    }
    return mockServices;

  }

  createMockService(node: DOMElement): MockService {
    let mockService = new MockService();
    mockService.elementNode(node);
    mockService.setName(Utils.getInlineString(node.getFirstChild()));
    return mockService;

  }

  populateAttributes(node: STNode, element: DOMElement): void {

  }
}
