// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/VisitorUtils.java by the java2ts converter (see tools/java2ts).
import { size, get, Logger, Level, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { AbstractMediatorVisitor } from "../../AbstractMediatorVisitor.js";
import { Breakpoint } from "../entity/Breakpoint.js";
import { BreakpointMediatorVisitor } from "./breakpoint/BreakpointMediatorVisitor.js";
import { IDebugInfo } from "../entity/debuginfo/IDebugInfo.js";
import { Mediator } from "../../../syntaxTree/pojo/mediator/Mediator.js";
import { STNode } from "../../../syntaxTree/stNode.js";
import { StepOverMediatorVisitor } from "./stepover/StepOverMediatorVisitor.js";
import { Utils } from "../../../syntaxTree/utils.js";

export class VisitorUtils {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("VisitorUtils");

  static checkNodeInRange(node: STNode, breakpoint: Breakpoint): boolean {
    if (node == null) {
        return false;
    }
    let startLine = node.getRange().startTagRange.start.getLine();
    let startColumn = node.getRange().startTagRange.start.getCharacter();
    let endLine: number | undefined;
    let endColumn: number | undefined;
    if (node.isSelfClosed()) {
        endLine = node.getRange().startTagRange.end.getLine();
        endColumn = node.getRange().startTagRange.end.getCharacter();
    } else {
        endLine = node.getRange().endTagRange.end.getLine();
        endColumn = node.getRange().endTagRange.end.getCharacter();
    }
    if (startLine < breakpoint.getLine() && breakpoint.getLine() < endLine) {
        return true;
    } else if (startLine == breakpoint.getLine() && endLine == breakpoint.getLine()) {
        return breakpoint.getColumn() == null ||
                (startColumn <= breakpoint.getColumn() && breakpoint.getColumn() < endColumn);
    } else if (startLine == breakpoint.getLine()) {
        return breakpoint.getColumn() == null || startColumn <= breakpoint.getColumn();
    } else if (endLine == breakpoint.getLine()) {
        return breakpoint.getColumn() == null || breakpoint.getColumn() < endColumn;
    } else {
        return false;
    }

  }

  static checkValidBreakpoint(node: STNode, breakpoint: Breakpoint): boolean {
    if (node == null) {
        return false;
    }
    let startLine = node.getRange().startTagRange.start.getLine(); 
    let startColumn = node.getRange().startTagRange.start.getCharacter(); 

    let endLine = node.getRange().startTagRange.end.getLine(); 
    let endColumn = node.getRange().startTagRange.end.getCharacter(); 
    if (startLine < breakpoint.getLine() && breakpoint.getLine() < endLine) {
        return true;
    } else if (startLine == breakpoint.getLine() || endLine == breakpoint.getLine()) {
        return breakpoint.getColumn() == null ||
                (startColumn <= breakpoint.getColumn() && breakpoint.getColumn() < endColumn);
    } else {
        return false;
    }

  }

  static visitMediators(mediators: Mediator[], visitor: BreakpointMediatorVisitor): void;
  static visitMediators(mediators: Mediator[], visitor: BreakpointMediatorVisitor, debugInfos: Map<Breakpoint, IDebugInfo>): void;
  static visitMediators(mediators: Mediator[], visitor: StepOverMediatorVisitor): void;
  static visitMediators(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (args[1] instanceof BreakpointMediatorVisitor) {
          const [mediators, visitor] = args;


                  VisitorUtils.visitMediators(mediators, visitor, new Map());

        } else if (args[1] instanceof StepOverMediatorVisitor) {
          const [mediators, visitor] = args;


                  if (mediators != null && size(mediators) > 0) {
                      for (let i = 0; i < size(mediators); i++) {
                          VisitorUtils.visitMediator(get(mediators, i), visitor);
                          if (visitor.isDone()) {
                              break;
                          }
                      }
                  }

        }
        break;
      }
      case 3: {
        const [mediators, visitor, debugInfos] = args;


                if (mediators != null && size(mediators) > 0) {
                    for (let i = 0; i < size(mediators); i++) {

                        VisitorUtils.visitMediator(get(mediators, i), visitor);
                        if (visitor.isDone()) {
                            let debugInfo = null;
                            try {
                                debugInfo = visitor.getDebugInfo().clone();
                            } catch (e) {
                                VisitorUtils.LOGGER.log(Level.SEVERE, "Error while cloning debug info", e);
                            }
                            debugInfos.set(visitor.getBreakpoint(), debugInfo);
                            if (visitor.getBreakpoints() != null && size(visitor.getBreakpoints()) > 0) {
                                visitor.nextBreakpoint();
                                i--;
                            }
                        }
                    }
                }

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static visitMediator(node: Mediator, visitor: AbstractMediatorVisitor): void {
    let tag = node.getTag();
    tag = Utils.sanitizeTag(tag);

    let visitFn: string | undefined;
    visitFn = "visit" + tag.substring(0, 1).toUpperCase() + tag.substring(1);
    try {
        let method = (visitor as any)[visitFn];
        if (typeof method !== "function") throw new Error("NoSuchMethodException: " + visitFn);
        method.call(visitor, node);
    } catch (e) {
        VisitorUtils.LOGGER.log(Level.SEVERE, "No visit method found for mediator: " + tag, e);
    }

  }

  static markAsInvalid(breakpoint: Breakpoint, error: string, debugInfo: IDebugInfo, breakpointInfoMap: Map<Breakpoint, IDebugInfo>, breakpoints: Breakpoint[]): void {
    removeFrom(breakpoints, breakpoint);
    debugInfo.setValid(false);
    debugInfo.setError(error);
    breakpointInfoMap.set(breakpoint, debugInfo);

  }
}
