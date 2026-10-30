// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/AbstractFactory.java by the java2ts converter (see tools/java2ts).
import { DOMElement } from "../dom/dom.js";
import { STNode } from "../stNode.js";

export abstract class AbstractFactory {
  projectPath?: string;

  miVersion?: string;

  abstract create(element: DOMElement): STNode;

  abstract populateAttributes(node: STNode, element: DOMElement): void;

  getMiVersion(): string {
    return this.miVersion;

  }

  setMiVersion(miVersion: string): void {
    this.miVersion = miVersion;

  }

  getProjectPath(): string {
    return this.projectPath;

  }

  setProjectPath(projectPath: string): void {
    this.projectPath = projectPath;

  }
}
