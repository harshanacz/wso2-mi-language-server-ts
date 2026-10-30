// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/utils/DirectoryTreeUtils.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase } from "../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { DOMDocument } from "../../../syntaxTree/dom/dom.js";
import { DOMElement } from "../../../syntaxTree/dom/dom.js";
import { Utils } from "../../../syntaxTree/utils.js";
import { WorkspaceFolder } from "../../lsp.js";
import { JFile } from "../../host/JFile.js";

export class DirectoryTreeUtils {
  static readonly __fields: string[] = [];

  static isLegacyProject(workspaceFolder: WorkspaceFolder): boolean {
    let projectFilePath = workspaceFolder.getUri() + JFile.separator + Constant.DOT_PROJECT;
    return Utils.isFileExists(projectFilePath);

  }

  static getProjectType(projectPath: string): string {
    let pomFilePath = projectPath + JFile.separator + Constant.POM;
    let pomFile = new JFile(pomFilePath);
    if (pomFile.exists()) {
        try {
            let domDocument = Utils.getDOMDocument(pomFile);
            let projectElement = DirectoryTreeUtils.getProjectElement(domDocument);
            if (projectElement != null) {
                let propertiesNode = Utils.getChildNodeByName(projectElement, Constant.PROPERTIES);
                let projectType = Utils.getChildNodeByName(propertiesNode, Constant.PROJECT_TYPE);
                if (projectType != null) {
                    return Utils.getInlineString(projectType.getFirstChild());
                }
            }
        } catch (e) {
            return null;
        }
    }
    return null;

  }

  static getProjectElement(domDocument: DOMDocument): DOMElement {
    let children = domDocument.getChildren();
    for (let child of children) {
        if (child instanceof DOMElement) {
            let element = (child as DOMElement);
            if (equalsIgnoreCase(Constant.PROJECT, element.getNodeName())) {
                return element;
            }
        }
    }
    return null;

  }
}
