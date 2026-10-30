// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/breakpoint/BreakpointMediatorVisitor.java by the java2ts converter (see tools/java2ts).
import { size, get, removeFrom } from "../../../../syntaxTree/javaCompat.js";
import { AIAgent } from "../../../../syntaxTree/pojo/connector/ai/AIAgent.js";
import { AIChat } from "../../../../syntaxTree/pojo/connector/ai/AIChat.js";
import { AbstractMediatorVisitor } from "../../../AbstractMediatorVisitor.js";
import { Aggregate } from "../../../../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { Bam } from "../../../../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Bean } from "../../../../syntaxTree/pojo/mediator/extension/Bean.js";
import { Breakpoint } from "../../entity/Breakpoint.js";
import { Builder } from "../../../../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { Cache } from "../../../../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { Call } from "../../../../syntaxTree/pojo/mediator/core/call/Call.js";
import { CallTemplate } from "../../../../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Callout } from "../../../../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { Clone } from "../../../../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { ConditionalRouter } from "../../../../syntaxTree/pojo/mediator/filter/condRouter/ConditionalRouter.js";
import { Connector } from "../../../../syntaxTree/pojo/connector/Connector.js";
import { DataServiceCall } from "../../../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { Datamapper } from "../../../../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { DbMediator } from "../../../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { DebugInfo } from "../../entity/debuginfo/DebugInfo.js";
import { Drop } from "../../../../syntaxTree/pojo/mediator/core/Drop.js";
import { Ejb } from "../../../../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { Enqueue } from "../../../../syntaxTree/pojo/mediator/advanced/Enqueue.js";
import { Enrich } from "../../../../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { EntitlementService } from "../../../../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { Event } from "../../../../syntaxTree/pojo/mediator/advanced/Event.js";
import { FastXSLT } from "../../../../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { Filter } from "../../../../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { Foreach } from "../../../../syntaxTree/pojo/mediator/eip/Foreach.js";
import { Header } from "../../../../syntaxTree/pojo/mediator/core/Header.js";
import { IDebugInfo } from "../../entity/debuginfo/IDebugInfo.js";
import { Iterate } from "../../../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { Jsontransform } from "../../../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { KnowledgeBase } from "../../../../syntaxTree/pojo/connector/ai/KnowledgeBase.js";
import { Log } from "../../../../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback } from "../../../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Makefault } from "../../../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { Ntlm } from "../../../../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { OauthService } from "../../../../syntaxTree/pojo/mediator/other/OauthService.js";
import { PayloadFactory } from "../../../../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { PojoCommand } from "../../../../syntaxTree/pojo/mediator/extension/command/PojoCommand.js";
import { Property } from "../../../../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyGroup } from "../../../../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { PublishEvent } from "../../../../syntaxTree/pojo/mediator/other/publishEvent/PublishEvent.js";
import { Respond } from "../../../../syntaxTree/pojo/mediator/core/Respond.js";
import { Rewrite } from "../../../../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";
import { Rule } from "../../../../syntaxTree/pojo/mediator/other/rule/Rule.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { ScatterGather } from "../../../../syntaxTree/pojo/mediator/eip/ScatterGather.js";
import { Script } from "../../../../syntaxTree/pojo/mediator/extension/Script.js";
import { Send } from "../../../../syntaxTree/pojo/mediator/core/Send.js";
import { SequenceMediator } from "../../../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Smooks } from "../../../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Spring } from "../../../../syntaxTree/pojo/mediator/extension/Spring.js";
import { Store } from "../../../../syntaxTree/pojo/mediator/core/Store.js";
import { Switch } from "../../../../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { Throttle } from "../../../../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";
import { ThrowError } from "../../../../syntaxTree/pojo/mediator/core/ThrowError.js";
import { Transaction } from "../../../../syntaxTree/pojo/mediator/advanced/Transaction.js";
import { Validate } from "../../../../syntaxTree/pojo/mediator/core/validate/Validate.js";
import { Variable } from "../../../../syntaxTree/pojo/mediator/core/Variable.js";
import { VisitorUtils } from "../VisitorUtils.js";
import { Xquery } from "../../../../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";
import { Xslt } from "../../../../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";

export class BreakpointMediatorVisitor extends AbstractMediatorVisitor {
  static readonly __fields: string[] = ["breakpoints", "breakpoint", "debugInfo", "mediatorPosition", "mediatorCount", "done"];

  breakpoints?: Breakpoint[];

  breakpoint?: Breakpoint;

  debugInfo?: IDebugInfo;

  mediatorPosition?: string;

  mediatorCount: number = 0;

  done: boolean = false;

  constructor(breakpoints: Breakpoint[], debugInfo: IDebugInfo);
  constructor(breakpoint: Breakpoint);
  constructor(...args: any[]) {
    super();
    switch (args.length) {
      case 2: {
        const [breakpoints, debugInfo] = args;


                this.breakpoints = breakpoints;
                this.breakpoint = get(breakpoints, 0);
                this.debugInfo = debugInfo;
                this.mediatorCount = 0;
                this.done = false;

        break;
      }
      case 1: {
        const [breakpoint] = args;


                this.breakpoint = breakpoint;
                this.debugInfo = new DebugInfo();
                this.mediatorCount = 0;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  isDone(): boolean {
    return this.done;

  }

  nextBreakpoint(): void {
    removeFrom(this.breakpoints, this.breakpoint);
    if (size(this.breakpoints) > 0) {
        this.done = false;
        this.breakpoint = get(this.breakpoints, 0);
        this.resetDebugInfo();
    }

  }

  resetDebugInfo(): void {
    this.debugInfo.setMediatorPosition(null);
    this.debugInfo.setValid(true);
    this.debugInfo.setError(null);

  }

  getBreakpoints(): Breakpoint[] {
    return this.breakpoints;

  }

  getBreakpoint(): Breakpoint {
    return this.breakpoint;

  }

  getDebugInfo(): IDebugInfo {
    return this.debugInfo;

  }

  visitSimpleMediator(node: STNode): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.mediatorPosition = String(this.mediatorCount);
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            this.markAsInvalid("Breakpoint is not in the starting tag of the mediator:" + node.getTag());
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitConnector(node: Connector): void {
    this.visitSimpleMediator(node);

  }

  visitPropertyGroup(node: PropertyGroup): void {
    this.visitSimpleMediator(node);

  }

  visitJsontransform(node: Jsontransform): void {
    this.visitSimpleMediator(node);

  }

  visitMakefault(node: Makefault): void {
    this.visitSimpleMediator(node);

  }

  visitSmooks(node: Smooks): void {
    this.visitSimpleMediator(node);

  }

  visitHeader(node: Header): void {
    this.visitSimpleMediator(node);

  }

  visitDataServiceCall(node: DataServiceCall): void {
    this.visitSimpleMediator(node);

  }

  visitTransaction(node: Transaction): void {
    this.visitSimpleMediator(node);

  }

  visitDatamapper(node: Datamapper): void {
    this.visitSimpleMediator(node);

  }

  visitPojoCommand(node: PojoCommand): void {
    this.visitSimpleMediator(node);

  }

  visitPayloadFactory(node: PayloadFactory): void {
    this.visitSimpleMediator(node);

  }

  visitEntitlementService(node: EntitlementService): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getOnReject(), this.breakpoint)) {
                this.mediatorPosition += " " + "0";
                VisitorUtils.visitMediators(node.getOnReject().getMediatorList(), visitor);
            } else if (VisitorUtils.checkNodeInRange(node.getOnAccept(), this.breakpoint)) {
                this.mediatorPosition += " " + "1";
                VisitorUtils.visitMediators(node.getOnAccept().getMediatorList(), visitor);
            } else if (VisitorUtils.checkNodeInRange(node.getObligations(), this.breakpoint)) {
                this.mediatorPosition += " " + "2";
                VisitorUtils.visitMediators(node.getObligations().getMediatorList(), visitor);
            } else if (VisitorUtils.checkNodeInRange(node.getAdvice(), this.breakpoint)) {
                this.mediatorPosition += " " + "3";
                VisitorUtils.visitMediators(node.getAdvice().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Entitlement Service");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitThrottle(node: Throttle): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getOnReject(), this.breakpoint)) {
                this.mediatorPosition += " " + "0";
                VisitorUtils.visitMediators(node.getOnReject().getMediatorList(), visitor);
            } else if (VisitorUtils.checkNodeInRange(node.getOnAccept(), this.breakpoint)) {
                this.mediatorPosition += " " + "1";
                VisitorUtils.visitMediators(node.getOnAccept().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Throttle Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitCache(node: Cache): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getOnCacheHit(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getOnCacheHit().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Cache Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitEnqueue(node: Enqueue): void {
    this.visitSimpleMediator(node);

  }

  visitDbreport(node: DbMediator): void {
    this.visitSimpleMediator(node);

  }

  visitDblookup(node: DbMediator): void {
    this.visitSimpleMediator(node);

  }

  visitEvent(node: Event): void {
    this.visitSimpleMediator(node);

  }

  visitRespond(node: Respond): void {
    this.visitSimpleMediator(node);

  }

  visitPublishEvent(node: PublishEvent): void {
    this.visitSimpleMediator(node);

  }

  visitSwitch(node: Switch): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.get_default(), this.breakpoint)) {
                this.mediatorPosition += " " + "0";
                VisitorUtils.visitMediators(node.get_default().getMediatorList(), visitor);
            } else {
                let cases = node.get_case();
                if (cases != null) {
                    for (let i = 0; i < cases.length; i++) {
                        if (VisitorUtils.checkNodeInRange(cases[i], this.breakpoint)) {
                            this.mediatorPosition += " " + (i + 1);
                            VisitorUtils.visitMediators(cases[i].getMediatorList(), visitor);
                            break;
                        }
                    }
                }
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Switch Mediator");
            }
        }

    } else {
        this.mediatorCount += 1;
    }

  }

  visitSpring(node: Spring): void {
    this.visitSimpleMediator(node);

  }

  visitRule(node: Rule): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getChildMediators(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getChildMediators().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Rule Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitConditionalRouter(node: ConditionalRouter): void {
    this.visitSimpleMediator(node);

  }

  visitLoopback(node: Loopback): void {
    this.visitSimpleMediator(node);

  }

  visitStore(node: Store): void {
    this.visitSimpleMediator(node);

  }

  visitValidate(node: Validate): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getOnFail(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getOnFail().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Validate Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitFilter(node: Filter): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getThen(), this.breakpoint)) {
                this.mediatorPosition += " " + "1";
                VisitorUtils.visitMediators(node.getThen().getMediatorList(), visitor);
            } else if (VisitorUtils.checkNodeInRange(node.getElse_(), this.breakpoint)) {
                this.mediatorPosition += " " + "0";
                VisitorUtils.visitMediators(node.getElse_().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Filter Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitSend(node: Send): void {
    this.visitSimpleMediator(node);

  }

  visitClone(node: Clone): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            let targets = node.getTarget();
            if (targets != null) {
                for (let i = 0; i < targets.length; i++) {
                    if (VisitorUtils.checkNodeInRange(targets[i], this.breakpoint)) {
                        this.mediatorPosition += " " + i;
                        VisitorUtils.visitMediators(targets[i].getSequence().getMediatorList(), visitor);
                        break;
                    }
                }
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Clone Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitClass(node: any): void {
    this.visitSimpleMediator(node);

  }

  visitAggregate(node: Aggregate): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Aggregate Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitLog(node: Log): void {
    this.visitSimpleMediator(node);

  }

  visitEjb(node: Ejb): void {
    this.visitSimpleMediator(node);

  }

  visitNTLM(node: Ntlm): void {
    this.visitSimpleMediator(node);

  }

  visitRewrite(node: Rewrite): void {
    this.visitSimpleMediator(node);

  }

  visitCallTemplate(node: CallTemplate): void {
    this.visitSimpleMediator(node);

  }

  visitCall(node: Call): void {
    this.visitSimpleMediator(node);

  }

  visitIterate(node: Iterate): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getTarget(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getTarget().getSequence().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Iterate Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitProperty(node: Property): void {
    this.visitSimpleMediator(node);

  }

  visitVariable(node: Variable): void {
    this.visitSimpleMediator(node);

  }

  visitScatterGather(node: ScatterGather): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.mediatorPosition = String(this.mediatorCount);
        this.done = true;
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            let targets = node.getTargets();
            if (targets != null) {
                for (let i = 0; i < targets.length; i++) {
                    if (VisitorUtils.checkNodeInRange(targets[i], this.breakpoint)) {
                        this.mediatorPosition += " " + i;
                        VisitorUtils.visitMediators(targets[i].getSequence().getMediatorList(), visitor);
                        break;
                    }
                }
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Scatter Gather Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitForeach(node: Foreach): void {
    if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
        this.done = true;
        this.mediatorPosition = String(this.mediatorCount);
        if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
            this.debugInfo.setMediatorPosition(this.mediatorPosition);
        } else {
            let visitor = new BreakpointMediatorVisitor(this.breakpoint);
            if (VisitorUtils.checkNodeInRange(node.getSequence(), this.breakpoint)) {
                VisitorUtils.visitMediators(node.getSequence().getMediatorList(), visitor);
            }
            if (visitor.mediatorPosition != null) {
                this.mediatorPosition += " " + visitor.mediatorPosition;
                this.debugInfo.setMediatorPosition(this.mediatorPosition);
            } else {
                this.markAsInvalid("Invalid breakpoint in Foreach Mediator");
            }
        }
    } else {
        this.mediatorCount += 1;
    }

  }

  visitEnrich(node: Enrich): void {
    this.visitSimpleMediator(node);

  }

  visitScript(node: Script): void {
    this.visitSimpleMediator(node);

  }

  visitBean(node: Bean): void {
    this.visitSimpleMediator(node);

  }

  visitXquery(node: Xquery): void {
    this.visitSimpleMediator(node);

  }

  visitBuilder(node: Builder): void {
    this.visitSimpleMediator(node);

  }

  visitDrop(node: Drop): void {
    this.visitSimpleMediator(node);

  }

  visitXslt(node: Xslt): void {
    this.visitSimpleMediator(node);

  }

  visitBam(node: Bam): void {
    this.visitSimpleMediator(node);

  }

  visitFastXSLT(node: FastXSLT): void {
    this.visitSimpleMediator(node);

  }

  visitOauthService(node: OauthService): void {
    this.visitSimpleMediator(node);

  }

  visitCallout(node: Callout): void {
    this.visitSimpleMediator(node);

  }

  visitSequence(node: SequenceMediator): void {
    this.visitSimpleMediator(node);

  }

  visitThrowError(node: ThrowError): void {
    this.visitSimpleMediator(node);

  }

  visitAIChat(node: AIChat): void {
    this.visitConnector((node as Connector));

  }

  visitAIAgent(node: AIAgent): void {
    this.visitConnector((node as Connector));

  }

  visitAIKnowledgeBase(node: KnowledgeBase): void {
    this.visitConnector((node as Connector));

  }

  markAsInvalid(error: string): void {
    this.mediatorPosition = null;
    this.debugInfo.setMediatorPosition(null);
    this.debugInfo.setValid(false);
    this.debugInfo.setError(error);

  }
}
