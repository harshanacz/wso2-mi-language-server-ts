// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/InboundEndpointVisitor.java by the java2ts converter (see tools/java2ts).
import { isEmpty, format, Logger, Level, StringUtils } from "../../../../../syntaxTree/javaCompat.js";
import { InboundEndpoint } from "../../../../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Utils } from "./Utils.js";

export class InboundEndpointVisitor {
  static readonly __fields: string[] = ["projectPath"];

  static readonly LOGGER: Logger = Logger.getLogger("InboundEndpointVisitor");

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    let sequence = ((node as InboundEndpoint)).getSequence();
    if (StringUtils.isEmpty(sequence)) {
        return;
    }
    try {
        Utils.visitSequenceByKey(sequence, this.projectPath, info, request);
    } catch (e) {
        InboundEndpointVisitor.LOGGER.log(Level.SEVERE, format("Error occurred while visiting the sequence: %s", sequence), e);
    }

  }
}
