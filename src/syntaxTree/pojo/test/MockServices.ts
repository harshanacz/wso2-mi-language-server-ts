// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/MockServices.java by the java2ts converter (see tools/java2ts).
import { MockService } from "./MockService.js";
import { STNode } from "../../stNode.js";

export class MockServices extends STNode {
  static readonly __fields: string[] = ["services"];

  services?: MockService[];

  getServices(): MockService[] {
    return this.services;

  }

  setServices(services: MockService[]): void {
    this.services = services;

  }
}
