// @ts-nocheck
import { ConnectorHolder } from "../../connectorDeps.js";
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/MediatorFactoryFinder.java by the java2ts converter (see tools/java2ts).
import { contains, get, Logger, Level } from "../../javaCompat.js";
import { AIAddToKnowledgeFactory } from "./ai/AIAddToKnowledgeFactory.js";
import { AIAgentConnectorFactory } from "./ai/AIAgentConnectorFactory.js";
import { AIChatConnectorFactory } from "./ai/AIChatConnectorFactory.js";
import { AIGetFromKnowledgeFactory } from "./ai/AIGetFromKnowledgeFactory.js";
import { AIRAGChatConnectorFactory } from "./ai/AIRAGChatConnectorFactory.js";
import { AbstractMediatorFactory } from "./AbstractMediatorFactory.js";
import { AggregateFactory } from "./eip/AggregateFactory.js";
import { BamFactory } from "./other/BamFactory.js";
import { BeanFactory } from "./extension/BeanFactory.js";
import { BuilderFactory } from "./other/BuilderFactory.js";
import { CacheFactory } from "./advanced/CacheFactory.js";
import { CallFactory } from "./core/CallFactory.js";
import { CallOutFactory } from "./core/CallOutFactory.js";
import { CallTemplateFactory } from "./core/CallTemplateFactory.js";
import { ClassFactory } from "./extension/ClassFactory.js";
import { CloneFactory } from "./advanced/CloneFactory.js";
import { ConditionalRouterFactory } from "./filter/ConditionalRouterFactory.js";
import { ConnectorFactory } from "./ConnectorFactory.js";
import { Constant } from "../../constant.js";
import { DBLookupFactory } from "./advanced/DBLookupFactory.js";
import { DBReportFactory } from "./advanced/DBReportFactory.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { DataMapperFactory } from "./transformation/DataMapperFactory.js";
import { DataServiceFactory } from "./advanced/DataServiceFactory.js";
import { DropFactory } from "./core/DropFactory.js";
import { EjbFactory } from "./extension/EjbFactory.js";
import { EnqueueFactory } from "./advanced/EnqueueFactory.js";
import { EnrichFactory } from "./transformation/EnrichFactory.js";
import { EntitlementFactory } from "./other/EntitlementFactory.js";
import { EventFactory } from "./advanced/EventFactory.js";
import { FastXSLTFactory } from "./transformation/FastXSLTFactory.js";
import { FaultFactory } from "./transformation/FaultFactory.js";
import { FilterFactory } from "./filter/FilterFactory.js";
import { ForeachFactory } from "./eip/ForeachFactory.js";
import { HeaderFactory } from "./core/HeaderFactory.js";
import { InvalidMediatorFactory } from "./InvalidMediatorFactory.js";
import { IterateFactory } from "./eip/IterateFactory.js";
import { JsonTransformFactory } from "./transformation/JsonTransformFactory.js";
import { LogFactory } from "./core/LogFactory.js";
import { LoopbackFactory } from "./core/LoopbackFactory.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { NtlmFactory } from "./other/NtlmFactory.js";
import { OauthServiceFactory } from "./other/OauthServiceFactory.js";
import { PayloadFactoryFactory } from "./transformation/PayloadFactoryFactory.js";
import { PojoCommandFactory } from "./extension/PojoCommandFactory.js";
import { PropertyFactory } from "./core/PropertyFactory.js";
import { PropertyGroupFactory } from "./core/PropertyGroupFactory.js";
import { PublishEventFactory } from "./other/PublishEventFactory.js";
import { RespondFactory } from "./core/RespondFactory.js";
import { RewriteFactory } from "./transformation/RewriteFactory.js";
import { RuleFactory } from "./other/RuleFactory.js";
import { ScatterGatherFactory } from "./eip/ScatterGatherFactory.js";
import { ScriptFactory } from "./extension/ScriptFactory.js";
import { SendFactory } from "./core/SendFactory.js";
import { SequenceMediatorFactory } from "./SequenceMediatorFactory.js";
import { SmooksFactory } from "./transformation/SmooksFactory.js";
import { SpringFactory } from "./extension/SpringFactory.js";
import { StoreFactory } from "./core/StoreFactory.js";
import { SwitchFactory } from "./filter/SwitchFactory.js";
import { ThrottleFactory } from "./filter/ThrottleFactory.js";
import { ThrowErrorFactory } from "./core/ThrowErrorFactory.js";
import { TransactionFactory } from "./advanced/TransactionFactory.js";
import { ValidateFactory } from "./core/ValidateFactory.js";
import { VariableFactory } from "./core/VariableFactory.js";
import { XqueryFactory } from "./transformation/XqueryFactory.js";
import { XsltFactory } from "./transformation/XsltFactory.js";

export class MediatorFactoryFinder {
  static readonly log: Logger = Logger.getLogger("MediatorFactoryFinder");

  static mediatorFactories(): any[] {
    return [
            CacheFactory,
            CloneFactory,
            DataServiceFactory,
            DBLookupFactory,
            DBReportFactory,
            EnqueueFactory,
            EventFactory,
            TransactionFactory,
            CallTemplateFactory,
            CallFactory,
            CallOutFactory,
            DropFactory,
            HeaderFactory,
            LogFactory,
            LoopbackFactory,
            PropertyFactory,
            PropertyGroupFactory,
            RespondFactory,
            SendFactory,
            StoreFactory,
            ValidateFactory,
            AggregateFactory,
            ForeachFactory,
            IterateFactory,
            BeanFactory,
            ClassFactory,
            PojoCommandFactory,
            EjbFactory,
            ScriptFactory,
            SpringFactory,
            ConditionalRouterFactory,
            FilterFactory,
            SwitchFactory,
            ThrottleFactory,
            BamFactory,
            BuilderFactory,
            OauthServiceFactory,
            EntitlementFactory,
            PublishEventFactory,
            RuleFactory,
            DataMapperFactory,
            EnrichFactory,
            FastXSLTFactory,
            FaultFactory,
            JsonTransformFactory,
            PayloadFactoryFactory,
            SmooksFactory,
            XqueryFactory,
            XsltFactory,
            NtlmFactory,
            RewriteFactory,
            SequenceMediatorFactory,
            ConnectorFactory,
            VariableFactory,
            ScatterGatherFactory,
            ThrowErrorFactory,
            AIAgentConnectorFactory,
            AIChatConnectorFactory,
            AIRAGChatConnectorFactory,
            AIGetFromKnowledgeFactory,
            AIAddToKnowledgeFactory
    ];
  }

  static readonly instance: MediatorFactoryFinder = new MediatorFactoryFinder();

  factoryMap: Map<string, AbstractMediatorFactory> = new Map();

  connectorHolder?: ConnectorHolder;

  initialized: boolean = false;

  miVersion?: string;

  projectPath?: string;

  static init(miVersion: string, projectPath: string, connectorHolder: ConnectorHolder): void {
    if (!MediatorFactoryFinder.instance.initialized) {
        MediatorFactoryFinder.instance.setMiVersion(miVersion);
        MediatorFactoryFinder.instance.setProjectPath(projectPath);
        MediatorFactoryFinder.instance.setConnectorHolder(connectorHolder);
        MediatorFactoryFinder.instance.loadMediatorFactories();
    }

  }

  static getInstance(): MediatorFactoryFinder {
    if (!MediatorFactoryFinder.instance.initialized) {
        MediatorFactoryFinder.instance.loadMediatorFactories();
    }
    return MediatorFactoryFinder.instance;

  }

  constructor() {

  }

  loadMediatorFactories(): void {
    for (let c of MediatorFactoryFinder.mediatorFactories()) {
        try {
            let fac = (new c() as AbstractMediatorFactory);
            fac.setMiVersion(this.miVersion);
            fac.setProjectPath(this.projectPath);
            this.factoryMap.set(fac.getTagName().toLowerCase(), fac);
        } catch (e) {
            MediatorFactoryFinder.log.log(Level.SEVERE, "Error instantiating " + c.name, e);
        }
    }
    this.initialized = true;

  }

  getMediator(node: DOMNode): Mediator {
    if (node != null && node instanceof DOMElement && node.getNodeName() != null) {
        let factory = this.getMediatorFactory(node.getNodeName().toLowerCase());
        if (factory != null) {
            let mediator = (factory.create((node as DOMElement)) as Mediator);
            mediator.elementNode((node as DOMElement));
            return mediator;
        } else {
            let invalidMediator = (new InvalidMediatorFactory().create((node as DOMElement)) as Mediator);
            return invalidMediator;
        }
    }
    return null;

  }

  getMediatorFactory(mediatorName: string): AbstractMediatorFactory {
    if (this.factoryMap.has(mediatorName)) {
        return get(this.factoryMap, mediatorName);
    }
    if (contains(mediatorName, Constant.DOT) && this.connectorHolder.isValidConnector(mediatorName)) {
        return get(this.factoryMap, Constant.CONNECTOR);
    }
    return null;

  }

  setConnectorHolder(connectorHolder: ConnectorHolder): void {
    this.connectorHolder = connectorHolder;

  }

  setMiVersion(miVersion: string): void {
    this.miVersion = miVersion;

  }

  setProjectPath(projectPath: string): void {
    this.projectPath = projectPath;

  }
}
