// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/UnitTest.java by the java2ts converter (see tools/java2ts).
import { MockServices } from "./MockServices.js";
import { STNode } from "../../stNode.js";
import { TestCases } from "./TestCases.js";
import { UnitTestArtifacts } from "./UnitTestArtifacts.js";

export class UnitTest extends STNode {
  unitTestArtifacts?: UnitTestArtifacts;

  testCases?: TestCases;

  mockServices?: MockServices;

  getTestArtifacts(): UnitTestArtifacts {
    return this.unitTestArtifacts;

  }

  setTestArtifacts(unitTestArtifacts: UnitTestArtifacts): void {
    this.unitTestArtifacts = unitTestArtifacts;

  }

  getTestCases(): TestCases {
    return this.testCases;

  }

  setTestCases(testCases: TestCases): void {
    this.testCases = testCases;

  }

  getMockServices(): MockServices {
    return this.mockServices;

  }

  setMockServices(mockServices: MockServices): void {
    this.mockServices = mockServices;

  }
}
