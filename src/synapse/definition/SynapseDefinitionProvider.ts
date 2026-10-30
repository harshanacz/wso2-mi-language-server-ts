// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/definition/SynapseDefinitionProvider.java by the java2ts converter (see tools/java2ts).
import { equals, equalsIgnoreCase, contains, get, Logger, Level } from "../../syntaxTree/javaCompat.js";
import { ConfigFinder } from "../utils/ConfigFinder.js";
import { Constant } from "../../syntaxTree/constant.js";
import { DOMDocument } from "../../syntaxTree/dom/dom.js";
import { ExtendedLocation } from "../utils/ExtendedLocation.js";
import { LegacyConfigFinder } from "../utils/LegacyConfigFinder.js";
import { Position, CancelChecker } from "../lsp.js";
import { Range } from "../lsp.js";
import { ResourceResponse } from "../resourceFinder/pojo/ResourceResponse.js";
import { Utils } from "../../syntaxTree/utils.js";
import { JFile } from "../host/JFile.js";

export class KeyAndTypeHolder {
  static readonly __fields: string[] = ["key", "type"];

  key?: string;

  type?: string;

  constructor(key: string, type: string) {
    this.key = key;
    this.type = type;

  }

  getKey(): string {
    return this.key;

  }

  getType(): string {
    return this.type;

  }

  isNull(): boolean {
    return this.key == null && this.type == null;

  }
}

export class SynapseDefinitionProvider {
  static readonly LOGGER: Logger = Logger.getLogger("SynapseDefinitionProvider");

  static sequenceAttributes: string[] = ["inSequence", "outSequence", "faultSequence", "sequence"
            , "onAccept", "onReject", "obligation", "advice", "onError"];

  static endpointAttributes: string[] = ["endpointKey", "targetEndpoint", "endpoint"];

  static readonly TYPE_TO_SINGULAR: Map<string, string> = new Map([["endpoints", "endpoint"], ["sequences", "sequence"], ["templates", "template"], ["message-stores", "messageStore"], ["data-services", "dataService"], ["local-entries", "localEntry"]]);

  static definition(document: DOMDocument, position: Position, projectPath: string, cancelChecker: CancelChecker, dependentResources: Map<string, ResourceResponse>): ExtendedLocation {
    cancelChecker.checkCanceled();
    let result = new ExtendedLocation(null, null, false);

    let offset: number | undefined;
    try {
        offset = document.offsetAt(position);
    } catch (e) {
        SynapseDefinitionProvider.LOGGER.log(Level.WARNING, "Error while reading file content", e);
        return result;
    }

    let keyAndType = SynapseDefinitionProvider.getKeyAndType(document, offset);
    if (!keyAndType.isNull()) {
        let isLegacyProject = Utils.isLegacyProject(projectPath);

        let path = null;
        try {
            if (isLegacyProject) {
                path = LegacyConfigFinder.findEsbComponentPath(keyAndType.getKey(), keyAndType.getType(),
                        projectPath);
            } else {
                path = ConfigFinder.findEsbComponentPath(keyAndType.getKey(), keyAndType.getType(),
                        projectPath);
            }
        } catch (e) {
            SynapseDefinitionProvider.LOGGER.log(Level.WARNING, "Error while reading file content", e);
        }
        if (path == null) {
            let singularType = get(SynapseDefinitionProvider.TYPE_TO_SINGULAR, keyAndType.getType());
            let resourceResponse = get(dependentResources, singularType);
            if (Utils.hasResourceForKey(keyAndType.getKey(), resourceResponse)) {
                return new ExtendedLocation(null, null, true);
            }
        } else {
            let range = SynapseDefinitionProvider.getDefinitionRange(path);
            return new ExtendedLocation(path, range, false);
        }
    }
    return result;

  }

  static getKeyAndType(document: DOMDocument, offset: number): KeyAndTypeHolder {
    let clickedAttr = document.findAttrAt(offset);
    if (clickedAttr != null && clickedAttr.getNodeAttrName().getEnd() <= offset) {
        let node = document.findNodeAt(offset);
        let type = null;
        let key = null;
        if (equalsIgnoreCase(Constant.ENDPOINT, node.getNodeName()) || equalsIgnoreCase(Constant.SEQUENCE, node.getNodeName())) {
            type = node.getNodeName().toLowerCase() + "s";
            key = node.getAttribute(Constant.KEY);
        } else if (equalsIgnoreCase(Constant.CALL_TEMPLATE, node.getNodeName())) {
            type = "templates";
            key = node.getAttribute(Constant.TARGET);
        } else if (equals("tool", node.getNodeName())) {
            type = "templates";
            key = node.getAttribute(Constant.TEMPLATE);
        } else if (equalsIgnoreCase(Constant.STORE, node.getNodeName())) {
            type = "message-stores";
            key = node.getAttribute(Constant.MESSAGE_STORE);
        } else if (equals("dataServiceCall", node.getNodeName())) {
            type = "data-services";
            key = node.getAttribute(Constant.SERVICE_NAME);
        } else {
            if (contains(SynapseDefinitionProvider.sequenceAttributes, clickedAttr.getNodeName())) {
                type = "sequences";
                key = clickedAttr.getNodeValue();
            } else if (contains(SynapseDefinitionProvider.endpointAttributes, clickedAttr.getNodeName())) {
                type = "endpoints";
                key = clickedAttr.getNodeValue();
            } else if (equals("configKey", clickedAttr.getNodeName())) {
                key = clickedAttr.getNodeValue();
                type = "local-entries";
            } else {
                let attKey = clickedAttr.getNodeValue();
                if (attKey != null) {
                    if (contains(attKey, Constant.GOV_REGISTRY_PREFIX) || contains(attKey, Constant.CONF_REGISTRY_PREFIX)) {
                        key = attKey;
                    }
                }
            }
        }
        let keyAndTypeHolder = new KeyAndTypeHolder(key, type);
        return keyAndTypeHolder;
    }
    return new KeyAndTypeHolder(null, null);

  }

  static getDefinitionRange(path: string): Range {
    let file = new JFile(path);
    let range: Range | undefined;
    try {
        let document = Utils.getDOMDocument(file);
        let node = Utils.getRootElementFromConfigXml(document);
        if (node == null) {
            return new Range(new Position(0, 0), new Position(0, 1));
        }
        let start = document.positionAt(node.getStart());
        let end = document.positionAt(node.getEnd());
        range = new Range(start, end);
    } catch (e) {
        range = new Range(new Position(0, 0), new Position(0, 1));
    }
    return range;

  }
}
