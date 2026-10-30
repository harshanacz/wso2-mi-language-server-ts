// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/DebuggerHelper.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, size, get, Logger, Level } from "../../syntaxTree/javaCompat.js";
import { API } from "../../syntaxTree/pojo/api/API.js";
import { ApiVisitor } from "./visitor/breakpoint/ApiVisitor.js";
import { Breakpoint } from "./entity/Breakpoint.js";
import { BreakpointValidity } from "./entity/BreakpointValidity.js";
import { Constant } from "../../syntaxTree/constant.js";
import { IDebugInfo } from "./entity/debuginfo/IDebugInfo.js";
import { InboundEndpoint } from "../../syntaxTree/pojo/inbound/InboundEndpoint.js";
import { InboundEndpointVisitor } from "./visitor/breakpoint/InboundEndpointVisitor.js";
import { JsonElement } from "../gson.js";
import { NamedSequence } from "../../syntaxTree/pojo/NamedSequence.js";
import { Proxy } from "../../syntaxTree/pojo/proxy/Proxy.js";
import { ProxyVisitor } from "./visitor/breakpoint/ProxyVisitor.js";
import { STNode } from "../../syntaxTree/stNode.js";
import { SequenceVisitor } from "./visitor/breakpoint/SequenceVisitor.js";
import { StepOverApiVisitor } from "./visitor/stepover/StepOverApiVisitor.js";
import { StepOverInboundEndpointVisitor } from "./visitor/stepover/StepOverInboundEndpointVisitor.js";
import { StepOverInfo } from "./entity/StepOverInfo.js";
import { StepOverProxyVisitor } from "./visitor/stepover/StepOverProxyVisitor.js";
import { StepOverSequenceVisitor } from "./visitor/stepover/StepOverSequenceVisitor.js";
import { StepOverTemplateVisitor } from "./visitor/stepover/StepOverTemplateVisitor.js";
import { SyntaxTreeGenerator } from "../../syntaxTree/SyntaxTreeGenerator.js";
import { Template } from "../../syntaxTree/pojo/template/Template.js";
import { TemplateVisitor } from "./visitor/breakpoint/TemplateVisitor.js";
import { Utils } from "../../syntaxTree/utils.js";
import { Visitor } from "./visitor/Visitor.js";
import { JFile } from "../host/JFile.js";

export class DebuggerHelper {
  static readonly __fields: string[] = ["syntaxTree", "filePath"];

  static readonly LOGGER: Logger = Logger.getLogger("DebuggerHelper");

  syntaxTree?: STNode;

  filePath?: string;

  constructor(filePath: string);
  constructor(syntaxTree: STNode);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'string') {
          const [filePath] = args;


                  this.filePath = filePath;
                  try {
                      this.syntaxTree = this.getSyntaxTree();
                  } catch (e) {
                      DebuggerHelper.LOGGER.log(Level.SEVERE, "Error while generating syntax tree for: " + filePath, e);
                  }

        } else if (args[0] instanceof STNode) {
          const [syntaxTree] = args;


                  this.syntaxTree = syntaxTree;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  validateBreakpoints(breakpoints: Breakpoint[]): BreakpointValidity[] {
    let debugInfos = this.generateDebugInfo(breakpoints);
    let validationList = [];
    for (let i = 0; i < size(breakpoints); i++) {
        let breakPoint = get(breakpoints, i);
        let debugInfo = get(debugInfos, i);
        let breakpointValidity = new BreakpointValidity(breakPoint.getLine(),
                breakPoint.getColumn(), debugInfo.isValid(), debugInfo.getError());
        validationList.push(breakpointValidity);
    }
    return validationList;

  }

  generateDebugInfoJson(breakpoints: Breakpoint[]): JsonElement[] {
    let debugInfos = this.generateDebugInfo(breakpoints);
    let out = [];
    for (let debugInfo of debugInfos) {
        if (debugInfo.isValid()) {
            out.push(debugInfo.toJson());
        } else {
            out.push(null);
        }
    }
    return out;

  }

  generateDebugInfo(breakPoints: Breakpoint[]): IDebugInfo[] {
    let tag = this.syntaxTree.getTag();
    let breakpointsCopy = Array.from(breakPoints);
    let breakpointInfoMap = new Map<Breakpoint, IDebugInfo>();
    for (let breakpoint of breakPoints) {
        breakpointInfoMap.set(breakpoint, null);
    }
    let visitor: Visitor | undefined;
    if (equalsIgnoreCase(Constant.API, tag)) {
        visitor = new ApiVisitor((this.syntaxTree as API), breakpointsCopy, breakpointInfoMap);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.PROXY, tag)) {
        visitor = new ProxyVisitor((this.syntaxTree as Proxy), breakpointsCopy,
                breakpointInfoMap);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.SEQUENCE, tag)) {
        visitor = new SequenceVisitor((this.syntaxTree as NamedSequence), breakpointsCopy,
                breakpointInfoMap);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.INBOUND_ENDPOINT, tag)) {
        visitor = new InboundEndpointVisitor((this.syntaxTree as InboundEndpoint),
                breakpointsCopy, breakpointInfoMap);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.TEMPLATE, tag)) {
        visitor = new TemplateVisitor((this.syntaxTree as Template), breakpointsCopy,
                breakpointInfoMap);
        visitor.startVisit();
    }
    let debugInfos = new Array(size(breakPoints));
    for (let bp of breakPoints) {
        let debugInfo = get(breakpointInfoMap, bp);
        let index = breakPoints.indexOf(bp);
        debugInfos[index] = debugInfo;
    }
    return debugInfos;

  }

  getStepOverBreakpoints(breakpoint: Breakpoint): StepOverInfo {
    let tag = this.syntaxTree.getTag();
    let stepOverInfo = new StepOverInfo();
    let visitor: Visitor | undefined;
    if (equalsIgnoreCase(Constant.API, tag)) {
        visitor = new StepOverApiVisitor((this.syntaxTree as API), breakpoint, stepOverInfo);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.PROXY, tag)) {
        visitor = new StepOverProxyVisitor((this.syntaxTree as Proxy), breakpoint, stepOverInfo);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.SEQUENCE, tag)) {
        visitor = new StepOverSequenceVisitor((this.syntaxTree as NamedSequence), breakpoint, stepOverInfo);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.INBOUND_ENDPOINT, tag)) {
        visitor = new StepOverInboundEndpointVisitor((this.syntaxTree as InboundEndpoint), breakpoint, stepOverInfo);
        visitor.startVisit();
    } else if (equalsIgnoreCase(Constant.TEMPLATE, tag)) {
        visitor = new StepOverTemplateVisitor((this.syntaxTree as Template), breakpoint, stepOverInfo);
        visitor.startVisit();
    }
    return stepOverInfo;

  }

  getSyntaxTree(): STNode {
    let file = new JFile(this.filePath);
    let document = Utils.getDOMDocument(file);
    return SyntaxTreeGenerator.buildTree(document.getDocumentElement());

  }
}
