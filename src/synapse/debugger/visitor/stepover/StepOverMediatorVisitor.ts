// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/debugger/visitor/stepover/StepOverMediatorVisitor.java by the java2ts converter (see tools/java2ts).
import { isEmpty, size, get } from "../../../../syntaxTree/javaCompat.js";
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
import { Iterate } from "../../../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { Jsontransform } from "../../../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { KnowledgeBase } from "../../../../syntaxTree/pojo/connector/ai/KnowledgeBase.js";
import { Log } from "../../../../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback } from "../../../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Makefault } from "../../../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { Mediator } from "../../../../syntaxTree/pojo/mediator/Mediator.js";
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
import { Sequence } from "../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { SequenceMediator } from "../../../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Smooks } from "../../../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Spring } from "../../../../syntaxTree/pojo/mediator/extension/Spring.js";
import { StepOverInfo } from "../../entity/StepOverInfo.js";
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

export class StepOverMediatorVisitor extends AbstractMediatorVisitor {
  static readonly __fields: string[] = ["breakpoint", "stepOverInfo", "isFound", "done"];

  breakpoint?: Breakpoint;

  stepOverInfo?: StepOverInfo;

  isFound: boolean = false;

  done: boolean = false;

  constructor(breakpoint: Breakpoint, stepOverInfo: StepOverInfo) {
    super();
    this.breakpoint = breakpoint;
    this.stepOverInfo = stepOverInfo;

  }

  visitSimpleMediator(node: STNode): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            this.isFound = true;
        }
    }

  }

  addToNextBreakpoints(breakpoint: Breakpoint): void {
    if (breakpoint != null) {
        this.stepOverInfo.add(breakpoint);
    }

  }

  getFirstMediatorBreakpoint(sequence: Sequence): Breakpoint;
  getFirstMediatorBreakpoint(mediatorList: Mediator[]): Breakpoint;
  getFirstMediatorBreakpoint(...args: any[]): any {
    switch (args.length) {
      case 1: {
        if (args[0] instanceof Sequence) {
          const [sequence] = args;


                  if (sequence != null) {
                      return this.getFirstMediatorBreakpoint(sequence.getMediatorList());
                  }
                  return null;

        } else if (Array.isArray(args[0])) {
          const [mediatorList] = args;


                  if (mediatorList != null && !isEmpty(mediatorList)) {
                      return this.getBreakpointForNode(get(mediatorList, 0));
                  }
                  return null;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getBreakpointForNode(node: STNode): Breakpoint {
    let line = node.getRange().startTagRange.start.getLine();
    let column = node.getRange().startTagRange.start.getCharacter();
    return new Breakpoint(line, column);

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
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let onAccept = node.getOnAccept();
            let onReject = node.getOnReject();
            let advice = node.getAdvice();
            let obligations = node.getObligations();
            if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onAccept));
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onReject));
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(advice));
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(obligations));
                if (size(this.stepOverInfo) == 4) {
                    this.done = true;
                }
            } else {
                if (VisitorUtils.checkNodeInRange(onReject, this.breakpoint)) {
                    VisitorUtils.visitMediators(onReject.getMediatorList(), this);
                } else if (VisitorUtils.checkNodeInRange(onAccept, this.breakpoint)) {
                    VisitorUtils.visitMediators(onAccept.getMediatorList(), this);
                } else if (VisitorUtils.checkNodeInRange(advice, this.breakpoint)) {
                    VisitorUtils.visitMediators(advice.getMediatorList(), this);
                } else if (VisitorUtils.checkNodeInRange(obligations, this.breakpoint)) {
                    VisitorUtils.visitMediators(obligations.getMediatorList(), this);
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitThrottle(node: Throttle): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let onAccept = node.getOnAccept();
            let onReject = node.getOnReject();
            if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onAccept));
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onReject));
                if (size(this.stepOverInfo) == 2) {
                    this.done = true;
                }
            } else {
                if (VisitorUtils.checkNodeInRange(onReject, this.breakpoint)) {
                    VisitorUtils.visitMediators(onReject.getMediatorList(), this);
                } else if (VisitorUtils.checkNodeInRange(onAccept, this.breakpoint)) {
                    VisitorUtils.visitMediators(onAccept.getMediatorList(), this);
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitCache(node: Cache): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let onCacheHit = node.getOnCacheHit();
            if (onCacheHit != null && onCacheHit.getMediatorList() != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onCacheHit.getMediatorList()));
                } else {
                    if (VisitorUtils.checkNodeInRange(onCacheHit, this.breakpoint)) {
                        VisitorUtils.visitMediators(onCacheHit.getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
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
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let cases = node.get_case();
            let default_ = node.get_default();
            if (cases != null || default_ != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(default_.getMediatorList()));
                    for (let switchCase of cases) {
                        this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(switchCase.getMediatorList()));
                    }
                    let casesLength = 1;
                    if (cases != null) {
                        casesLength = cases.length + 1;
                    }
                    if (!isEmpty(this.stepOverInfo) && size(this.stepOverInfo) == casesLength) {
                        this.done = true;
                    }
                } else {
                    for (let switchCase of cases) {
                        if (switchCase != null && VisitorUtils.checkNodeInRange(switchCase, this.breakpoint)) {
                            VisitorUtils.visitMediators(switchCase.getMediatorList(), this);
                        }
                    }
                    if (default_ != null && VisitorUtils.checkNodeInRange(default_, this.breakpoint)) {
                        VisitorUtils.visitMediators(default_.getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitSpring(node: Spring): void {
    this.visitSimpleMediator(node);

  }

  visitRule(node: Rule): void {
    this.visitSimpleMediator(node);

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
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let onFail = node.getOnFail();
            if (onFail != null && onFail.getMediatorList() != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onFail.getMediatorList()));
                } else {
                    if (VisitorUtils.checkNodeInRange(onFail, this.breakpoint)) {
                        VisitorUtils.visitMediators(onFail.getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitFilter(node: Filter): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let then = node.getThen();
            let else_ = node.getElse_();
            if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                let thenMediators = [];
                let elseMediators = [];
                if (then != null && then.getMediatorList() != null) {
                    thenMediators = then.getMediatorList();
                }
                if (else_ != null && else_.getMediatorList() != null) {
                    elseMediators = else_.getMediatorList();
                }
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(thenMediators));
                this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(elseMediators));
                if (size(this.stepOverInfo) == 2) {
                    this.done = true;
                }
            } else {
                if (VisitorUtils.checkNodeInRange(then, this.breakpoint)) {
                    VisitorUtils.visitMediators(then.getMediatorList(), this);
                } else if (VisitorUtils.checkNodeInRange(else_, this.breakpoint)) {
                    VisitorUtils.visitMediators(else_.getMediatorList(), this);
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitSend(node: Send): void {
    this.visitSimpleMediator(node);

  }

  visitClone(node: Clone): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let targets = node.getTarget();
            if (targets != null && targets.length > 0) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    for (let target of targets) {
                        this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(target.getSequence()));
                    }
                    if (!isEmpty(this.stepOverInfo) && size(this.stepOverInfo) == targets.length) {
                        this.done = true;
                    }
                } else {
                    for (let target of targets) {
                        if (target != null && VisitorUtils.checkNodeInRange(target, this.breakpoint)) {
                            VisitorUtils.visitMediators(target.getSequence().getMediatorList(), this);
                        }
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitClass(node: any): void {
    this.visitSimpleMediator(node);

  }

  visitAggregate(node: Aggregate): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        let onComplete = node.getCorrelateOnOrCompleteConditionOrOnComplete().getOnComplete();
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            if (onComplete != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(onComplete.getMediatorList()));
                } else {
                    if (VisitorUtils.checkNodeInRange(onComplete, this.breakpoint)) {
                        VisitorUtils.visitMediators(onComplete.getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
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
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        let target = node.getTarget();
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            if (target != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(target.getSequence()));
                    if (!isEmpty(this.stepOverInfo)) {
                        this.done = true;
                    }
                } else {
                    if (VisitorUtils.checkNodeInRange(target, this.breakpoint)) {
                        VisitorUtils.visitMediators(target.getSequence().getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitProperty(node: Property): void {
    this.visitSimpleMediator(node);

  }

  visitVariable(node: Variable): void {
    this.visitSimpleMediator(node);

  }

  visitScatterGather(node: ScatterGather): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            let targets = node.getTargets();
            if (targets != null && targets.length > 0) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    for (let target of targets) {
                        this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(target.getSequence()));
                    }
                    if (!isEmpty(this.stepOverInfo) && size(this.stepOverInfo) == targets.length) {
                        this.done = true;
                    }
                } else {
                    for (let target of targets) {
                        if (target != null && VisitorUtils.checkNodeInRange(target, this.breakpoint)) {
                            VisitorUtils.visitMediators(target.getSequence().getMediatorList(), this);
                        }
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
    }

  }

  visitForeach(node: Foreach): void {
    if (this.isFound) {
        this.stepOverInfo.add(this.getBreakpointForNode(node));
        this.done = true;
    } else {
        let sequence = node.getSequence();
        if (VisitorUtils.checkNodeInRange(node, this.breakpoint)) {
            if (sequence != null) {
                if (VisitorUtils.checkValidBreakpoint(node, this.breakpoint)) {
                    this.addToNextBreakpoints(this.getFirstMediatorBreakpoint(sequence));
                    if (!isEmpty(this.stepOverInfo)) {
                        this.done = true;
                    }
                } else {
                    if (VisitorUtils.checkNodeInRange(sequence, this.breakpoint)) {
                        VisitorUtils.visitMediators(sequence.getMediatorList(), this);
                    }
                }
            }
            if (!this.done) {
                this.isFound = true;
            }
        }
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
    this.visitSimpleMediator(node);

  }

  visitAIAgent(node: AIAgent): void {
    this.visitSimpleMediator(node);

  }

  visitAIKnowledgeBase(node: KnowledgeBase): void {
    this.visitSimpleMediator(node);

  }

  isDone(): boolean {
    return this.done;

  }
}
