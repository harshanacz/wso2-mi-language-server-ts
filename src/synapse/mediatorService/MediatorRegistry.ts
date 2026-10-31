// Registry replacing the Java reflection (Class.forName) used by MediatorHandler. Generated from the mediator json files.
import { AggregateMediator } from "./mediators/AggregateMediator.js";
import { BamMediator } from "./mediators/BamMediator.js";
import { BuilderMediator } from "./mediators/BuilderMediator.js";
import { CacheMediator } from "./mediators/CacheMediator.js";
import { CallMediator } from "./mediators/CallMediator.js";
import { CallTemplateMediator } from "./mediators/CallTemplateMediator.js";
import { CalloutMediator } from "./mediators/CalloutMediator.js";
import { ClassMediator } from "./mediators/ClassMediator.js";
import { CloneMediator } from "./mediators/CloneMediator.js";
import { DBLookupMediator } from "./mediators/DBLookupMediator.js";
import { DBReportMediator } from "./mediators/DBReportMediator.js";
import { DataServiceCallMediator } from "./mediators/DataServiceCallMediator.js";
import { DatamapperMediator } from "./mediators/DatamapperMediator.js";
import { DropMediator } from "./mediators/DropMediator.js";
import { EjbMediator } from "./mediators/EjbMediator.js";
import { EnrichMediator } from "./mediators/EnrichMediator.js";
import { EntitlementServiceMediator } from "./mediators/EntitlementServiceMediator.js";
import { FastXSLTMediator } from "./mediators/FastXSLTMediator.js";
import { FaultMediator } from "./mediators/FaultMediator.js";
import { FilterMediator } from "./mediators/FilterMediator.js";
import { ForeachMediator } from "./mediators/ForeachMediator.js";
import { HeaderMediator } from "./mediators/HeaderMediator.js";
import { IterateMediator } from "./mediators/IterateMediator.js";
import { JsontransformMediator } from "./mediators/JsontransformMediator.js";
import { LogMediator } from "./mediators/LogMediator.js";
import { LoopbackMediator } from "./mediators/LoopbackMediator.js";
import { NtlmMediator } from "./mediators/NtlmMediator.js";
import { OauthServiceMediator } from "./mediators/OauthServiceMediator.js";
import { PayloadFactoryMediator } from "./mediators/PayloadFactoryMediator.js";
import { PropertyGroupMediator } from "./mediators/PropertyGroupMediator.js";
import { PropertyMediator } from "./mediators/PropertyMediator.js";
import { RespondMediator } from "./mediators/RespondMediator.js";
import { RewriteMediator } from "./mediators/RewriteMediator.js";
import { RuleMediator } from "./mediators/RuleMediator.js";
import { ScatterGatherMediator } from "./mediators/ScatterGatherMediator.js";
import { ScriptMediator } from "./mediators/ScriptMediator.js";
import { SendMediator } from "./mediators/SendMediator.js";
import { SequenceMediator } from "./mediators/SequenceMediator.js";
import { SmooksMediator } from "./mediators/SmooksMediator.js";
import { StoreMediator } from "./mediators/StoreMediator.js";
import { SwitchMediator } from "./mediators/SwitchMediator.js";
import { ThrottleMediator } from "./mediators/ThrottleMediator.js";
import { ThrowErrorMediator } from "./mediators/ThrowErrorMediator.js";
import { TransactionMediator } from "./mediators/TransactionMediator.js";
import { ValidateMediator } from "./mediators/ValidateMediator.js";
import { VariableMediator } from "./mediators/VariableMediator.js";
import { XqueryMediator } from "./mediators/XqueryMediator.js";
import { XsltMediator } from "./mediators/XsltMediator.js";
import { SequenceMediator as M_pojo_mediator_SequenceMediator } from "../../syntaxTree/pojo/mediator/SequenceMediator.js";
import { Clone as M_pojo_mediator_advanced_Clone_Clone } from "../../syntaxTree/pojo/mediator/advanced/Clone/Clone.js";
import { DataServiceCall as M_pojo_mediator_advanced_DataServiceCall_DataServiceCall } from "../../syntaxTree/pojo/mediator/advanced/DataServiceCall/DataServiceCall.js";
import { DbMediator as M_pojo_mediator_advanced_DbMediator_DbMediator } from "../../syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Transaction as M_pojo_mediator_advanced_Transaction } from "../../syntaxTree/pojo/mediator/advanced/Transaction.js";
import { Cache as M_pojo_mediator_advanced_cache_Cache } from "../../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { CallTemplate as M_pojo_mediator_core_CallTemplate } from "../../syntaxTree/pojo/mediator/core/CallTemplate.js";
import { Drop as M_pojo_mediator_core_Drop } from "../../syntaxTree/pojo/mediator/core/Drop.js";
import { Header as M_pojo_mediator_core_Header } from "../../syntaxTree/pojo/mediator/core/Header.js";
import { Log as M_pojo_mediator_core_Log } from "../../syntaxTree/pojo/mediator/core/Log.js";
import { Loopback as M_pojo_mediator_core_Loopback } from "../../syntaxTree/pojo/mediator/core/Loopback.js";
import { Property as M_pojo_mediator_core_Property } from "../../syntaxTree/pojo/mediator/core/Property.js";
import { PropertyGroup as M_pojo_mediator_core_PropertyGroup } from "../../syntaxTree/pojo/mediator/core/PropertyGroup.js";
import { Respond as M_pojo_mediator_core_Respond } from "../../syntaxTree/pojo/mediator/core/Respond.js";
import { Send as M_pojo_mediator_core_Send } from "../../syntaxTree/pojo/mediator/core/Send.js";
import { Store as M_pojo_mediator_core_Store } from "../../syntaxTree/pojo/mediator/core/Store.js";
import { ThrowError as M_pojo_mediator_core_ThrowError } from "../../syntaxTree/pojo/mediator/core/ThrowError.js";
import { Variable as M_pojo_mediator_core_Variable } from "../../syntaxTree/pojo/mediator/core/Variable.js";
import { Call as M_pojo_mediator_core_call_Call } from "../../syntaxTree/pojo/mediator/core/call/Call.js";
import { Callout as M_pojo_mediator_core_callout_Callout } from "../../syntaxTree/pojo/mediator/core/callout/Callout.js";
import { Validate as M_pojo_mediator_core_validate_Validate } from "../../syntaxTree/pojo/mediator/core/validate/Validate.js";
import { Foreach as M_pojo_mediator_eip_Foreach } from "../../syntaxTree/pojo/mediator/eip/Foreach.js";
import { Iterate as M_pojo_mediator_eip_Iterate } from "../../syntaxTree/pojo/mediator/eip/Iterate.js";
import { ScatterGather as M_pojo_mediator_eip_ScatterGather } from "../../syntaxTree/pojo/mediator/eip/ScatterGather.js";
import { Aggregate as M_pojo_mediator_eip_aggregate_Aggregate } from "../../syntaxTree/pojo/mediator/eip/aggregate/Aggregate.js";
import { Class as M_pojo_mediator_extension_Class } from "../../syntaxTree/pojo/mediator/extension/Class.js";
import { Script as M_pojo_mediator_extension_Script } from "../../syntaxTree/pojo/mediator/extension/Script.js";
import { Ejb as M_pojo_mediator_extension_ejb_Ejb } from "../../syntaxTree/pojo/mediator/extension/ejb/Ejb.js";
import { Filter as M_pojo_mediator_filter_filter_Filter } from "../../syntaxTree/pojo/mediator/filter/filter/Filter.js";
import { Switch as M_pojo_mediator_filter_switchMediator_Switch } from "../../syntaxTree/pojo/mediator/filter/switchMediator/Switch.js";
import { Throttle as M_pojo_mediator_filter_throttle_Throttle } from "../../syntaxTree/pojo/mediator/filter/throttle/Throttle.js";
import { OauthService as M_pojo_mediator_other_OauthService } from "../../syntaxTree/pojo/mediator/other/OauthService.js";
import { Bam as M_pojo_mediator_other_bam_Bam } from "../../syntaxTree/pojo/mediator/other/bam/Bam.js";
import { Builder as M_pojo_mediator_other_builder_Builder } from "../../syntaxTree/pojo/mediator/other/builder/Builder.js";
import { EntitlementService as M_pojo_mediator_other_entitlement_EntitlementService } from "../../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { Ntlm as M_pojo_mediator_other_ntlm_Ntlm } from "../../syntaxTree/pojo/mediator/other/ntlm/Ntlm.js";
import { Rule as M_pojo_mediator_other_rule_Rule } from "../../syntaxTree/pojo/mediator/other/rule/Rule.js";
import { Datamapper as M_pojo_mediator_transformation_Datamapper } from "../../syntaxTree/pojo/mediator/transformation/Datamapper.js";
import { FastXSLT as M_pojo_mediator_transformation_FastXSLT } from "../../syntaxTree/pojo/mediator/transformation/FastXSLT.js";
import { Jsontransform as M_pojo_mediator_transformation_Jsontransform } from "../../syntaxTree/pojo/mediator/transformation/Jsontransform.js";
import { Enrich as M_pojo_mediator_transformation_enrich_Enrich } from "../../syntaxTree/pojo/mediator/transformation/enrich/Enrich.js";
import { Makefault as M_pojo_mediator_transformation_fault_Makefault } from "../../syntaxTree/pojo/mediator/transformation/fault/Makefault.js";
import { PayloadFactory as M_pojo_mediator_transformation_payload_PayloadFactory } from "../../syntaxTree/pojo/mediator/transformation/payload/PayloadFactory.js";
import { Rewrite as M_pojo_mediator_transformation_rewrite_Rewrite } from "../../syntaxTree/pojo/mediator/transformation/rewrite/Rewrite.js";
import { Smooks as M_pojo_mediator_transformation_smooks_Smooks } from "../../syntaxTree/pojo/mediator/transformation/smooks/Smooks.js";
import { Xquery as M_pojo_mediator_transformation_xquery_Xquery } from "../../syntaxTree/pojo/mediator/transformation/xquery/Xquery.js";
import { Xslt as M_pojo_mediator_transformation_xslt_Xslt } from "../../syntaxTree/pojo/mediator/transformation/xslt/Xslt.js";

export const MEDIATOR_PROCESSORS: Map<string, any> = new Map<string, any>([
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.AggregateMediator", AggregateMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.BamMediator", BamMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.BuilderMediator", BuilderMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.CacheMediator", CacheMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.CallMediator", CallMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.CallTemplateMediator", CallTemplateMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.CalloutMediator", CalloutMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ClassMediator", ClassMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.CloneMediator", CloneMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.DBLookupMediator", DBLookupMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.DBReportMediator", DBReportMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.DataServiceCallMediator", DataServiceCallMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.DatamapperMediator", DatamapperMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.DropMediator", DropMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.EjbMediator", EjbMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.EnrichMediator", EnrichMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.EntitlementServiceMediator", EntitlementServiceMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.FastXSLTMediator", FastXSLTMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.FaultMediator", FaultMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.FilterMediator", FilterMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ForeachMediator", ForeachMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.HeaderMediator", HeaderMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.IterateMediator", IterateMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.JsontransformMediator", JsontransformMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.LogMediator", LogMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.LoopbackMediator", LoopbackMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.NtlmMediator", NtlmMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.OauthServiceMediator", OauthServiceMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.PayloadFactoryMediator", PayloadFactoryMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.PropertyGroupMediator", PropertyGroupMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.PropertyMediator", PropertyMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.RespondMediator", RespondMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.RewriteMediator", RewriteMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.RuleMediator", RuleMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ScatterGatherMediator", ScatterGatherMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ScriptMediator", ScriptMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.SendMediator", SendMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.SequenceMediator", SequenceMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.SmooksMediator", SmooksMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.StoreMediator", StoreMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.SwitchMediator", SwitchMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ThrottleMediator", ThrottleMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ThrowErrorMediator", ThrowErrorMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.TransactionMediator", TransactionMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.ValidateMediator", ValidateMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.VariableMediator", VariableMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.XqueryMediator", XqueryMediator],
  ["org.eclipse.lemminx.customservice.synapse.mediatorService.mediators.XsltMediator", XsltMediator],
]);

export const MEDIATOR_CLASSES: Map<string, any> = new Map<string, any>([
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.SequenceMediator", M_pojo_mediator_SequenceMediator],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.advanced.Clone.Clone", M_pojo_mediator_advanced_Clone_Clone],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.advanced.DataServiceCall.DataServiceCall", M_pojo_mediator_advanced_DataServiceCall_DataServiceCall],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.advanced.DbMediator.DbMediator", M_pojo_mediator_advanced_DbMediator_DbMediator],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.advanced.Transaction", M_pojo_mediator_advanced_Transaction],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.advanced.cache.Cache", M_pojo_mediator_advanced_cache_Cache],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.CallTemplate", M_pojo_mediator_core_CallTemplate],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Drop", M_pojo_mediator_core_Drop],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Header", M_pojo_mediator_core_Header],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Log", M_pojo_mediator_core_Log],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Loopback", M_pojo_mediator_core_Loopback],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Property", M_pojo_mediator_core_Property],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.PropertyGroup", M_pojo_mediator_core_PropertyGroup],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Respond", M_pojo_mediator_core_Respond],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Send", M_pojo_mediator_core_Send],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Store", M_pojo_mediator_core_Store],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.ThrowError", M_pojo_mediator_core_ThrowError],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.Variable", M_pojo_mediator_core_Variable],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.call.Call", M_pojo_mediator_core_call_Call],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.callout.Callout", M_pojo_mediator_core_callout_Callout],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.core.validate.Validate", M_pojo_mediator_core_validate_Validate],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.eip.Foreach", M_pojo_mediator_eip_Foreach],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.eip.Iterate", M_pojo_mediator_eip_Iterate],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.eip.ScatterGather", M_pojo_mediator_eip_ScatterGather],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.eip.aggregate.Aggregate", M_pojo_mediator_eip_aggregate_Aggregate],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.extension.Class", M_pojo_mediator_extension_Class],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.extension.Script", M_pojo_mediator_extension_Script],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.extension.ejb.Ejb", M_pojo_mediator_extension_ejb_Ejb],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.filter.filter.Filter", M_pojo_mediator_filter_filter_Filter],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.filter.switchMediator.Switch", M_pojo_mediator_filter_switchMediator_Switch],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.filter.throttle.Throttle", M_pojo_mediator_filter_throttle_Throttle],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.OauthService", M_pojo_mediator_other_OauthService],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.bam.Bam", M_pojo_mediator_other_bam_Bam],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.builder.Builder", M_pojo_mediator_other_builder_Builder],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.entitlement.EntitlementService", M_pojo_mediator_other_entitlement_EntitlementService],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.ntlm.Ntlm", M_pojo_mediator_other_ntlm_Ntlm],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.other.rule.Rule", M_pojo_mediator_other_rule_Rule],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.Datamapper", M_pojo_mediator_transformation_Datamapper],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.FastXSLT", M_pojo_mediator_transformation_FastXSLT],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.Jsontransform", M_pojo_mediator_transformation_Jsontransform],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.enrich.Enrich", M_pojo_mediator_transformation_enrich_Enrich],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.fault.Makefault", M_pojo_mediator_transformation_fault_Makefault],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.payload.PayloadFactory", M_pojo_mediator_transformation_payload_PayloadFactory],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.rewrite.Rewrite", M_pojo_mediator_transformation_rewrite_Rewrite],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.smooks.Smooks", M_pojo_mediator_transformation_smooks_Smooks],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.xquery.Xquery", M_pojo_mediator_transformation_xquery_Xquery],
  ["org.eclipse.lemminx.customservice.synapse.syntaxTree.pojo.mediator.transformation.xslt.Xslt", M_pojo_mediator_transformation_xslt_Xslt],
]);
