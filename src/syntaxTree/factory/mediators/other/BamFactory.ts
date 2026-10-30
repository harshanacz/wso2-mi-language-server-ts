// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/BamFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Bam } from "../../../pojo/mediator/other/bam/Bam.js";
import { BamServerProfile } from "../../../pojo/mediator/other/bam/BamServerProfile.js";
import { BamServerProfileStreamConfig } from "../../../pojo/mediator/other/bam/BamServerProfileStreamConfig.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class BamFactory extends AbstractMediatorFactory {
  static readonly BAM: string = "bam";

  createSpecificMediator(element: DOMElement): Mediator {
    let bam = new Bam();
    bam.elementNode(element);
    this.populateAttributes(bam, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.SERVER_PROFILE)) {
                let serverProfile = this.createBamServerProfile(child);
                bam.setServerProfile(serverProfile);
            }
        }
    }
    return bam;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Bam)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Bam)).setTraceFilter(traceFilter);
    }

  }

  createBamServerProfile(node: DOMNode): BamServerProfile {
    let bamServerProfile = new BamServerProfile();
    bamServerProfile.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        bamServerProfile.setName(name);
    }
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.STREAM_CONFIG)) {
                let streamConfig = this.createBamServerProfileStreamConfig(child);
                bamServerProfile.setStreamConfig(streamConfig);
            }
        }
    }
    return bamServerProfile;

  }

  createBamServerProfileStreamConfig(node: DOMNode): BamServerProfileStreamConfig {
    let bamServerProfileStreamConfig = new BamServerProfileStreamConfig();
    bamServerProfileStreamConfig.elementNode((node as DOMElement));
    let name = node.getAttribute(Constant.NAME);
    if (name != null) {
        bamServerProfileStreamConfig.setName(name);
    }
    let version = node.getAttribute(Constant.VERSION);
    if (version != null) {
        bamServerProfileStreamConfig.setVersion(version);
    }
    return bamServerProfileStreamConfig;

  }

  getTagName(): string {
    return BamFactory.BAM;

  }
}
