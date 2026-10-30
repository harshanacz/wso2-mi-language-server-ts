// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/MediatorSerializerFinder.java by the java2ts converter (see tools/java2ts).
import { get } from "../../javaCompat.js";
import { AbstractMediatorSerializer } from "./AbstractMediatorSerializer.js";
import { AggregateMediatorSerializer } from "./flowControl/AggregateMediatorSerializer.js";
import { CacheMediatorSerializer } from "./qos/CacheMediatorSerializer.js";
import { CallMediatorSerializer } from "./core/CallMediatorSerializer.js";
import { CallTemplateMediatorSerializer } from "./core/CallTemplateMediatorSerializer.js";
import { CloneMediatorSerializer } from "./flowControl/CloneMediatorSerializer.js";
import { CommentMediatorSerializer } from "./CommentMediatorSerializer.js";
import { ConnectorSerializer } from "./ConnectorSerializer.js";
import { DBLookupMediatorSerializer } from "./data/DBLookupMediatorSerializer.js";
import { DBReportMediatorSerializer } from "./data/DBReportMediatorSerializer.js";
import { DataServiceCallMediatorSerializer } from "./data/DataServiceCallMediatorSerializer.js";
import { DatamapperMediatorSerializer } from "./transformation/DatamapperMediatorSerializer.js";
import { DropMediatorSerializer } from "./core/DropMediatorSerializer.js";
import { EnrichMediatorSerializer } from "./transformation/EnrichMediatorSerializer.js";
import { EntitlementMediatorSerializer } from "./qos/EntitlementMediatorSerializer.js";
import { FilterMediatorSerializer } from "./flowControl/FilterMediatorSerializer.js";
import { ForeachMediatorSerializer } from "./flowControl/ForeachMediatorSerializer.js";
import { HeaderMediatorSerializer } from "./transformation/HeaderMediatorSerializer.js";
import { IterateMediatorSerializer } from "./flowControl/IterateMediatorSerializer.js";
import { JsonTransformMediatorSerializer } from "./transformation/JsonTransformMediatorSerializer.js";
import { LogMediatorSerializer } from "./core/LogMediatorSerializer.js";
import { LoopbackMediatorSerializer } from "./other/LoopbackMediatorSerializer.js";
import { Mediator } from "../../pojo/mediator/Mediator.js";
import { NTLMMediatorSerializer } from "./qos/NTLMMediatorSerializer.js";
import { OauthMediatorSerializer } from "./qos/OauthMediatorSerializer.js";
import { PayloadFactoryMediatorSerializer } from "./transformation/PayloadFactoryMediatorSerializer.js";
import { PropertyGroupMediatorSerializer } from "./core/PropertyGroupMediatorSerializer.js";
import { PropertyMediatorSerializer } from "./core/PropertyMediatorSerializer.js";
import { RespondMediatorSerializer } from "./core/RespondMediatorSerializer.js";
import { ScriptMediatorSerializer } from "./extension/ScriptMediatorSerializer.js";
import { SendMediatorSerializer } from "./core/SendMediatorSerializer.js";
import { SequenceMediatorSerializer } from "./core/SequenceMediatorSerializer.js";
import { StoreMediatorSerializer } from "./transformation/StoreMediatorSerializer.js";
import { SwitchMediatorSerializer } from "./flowControl/SwitchMediatorSerializer.js";
import { ThrottleMediatorSerializer } from "./qos/ThrottleMediatorSerializer.js";
import { ValidateMediatorSerializer } from "./flowControl/ValidateMediatorSerializer.js";
import { XsltMediatorSerializer } from "./transformation/XsltMediatorSerializer.js";

export class MediatorSerializerFinder {
  static mediatorSerializers(): any[] {
    return [
            ConnectorSerializer,
            
            CallMediatorSerializer,
            CallTemplateMediatorSerializer,
            DropMediatorSerializer,
            LogMediatorSerializer,
            PropertyMediatorSerializer,
            PropertyGroupMediatorSerializer,
            RespondMediatorSerializer,
            SendMediatorSerializer,
            SequenceMediatorSerializer,
            
            DataServiceCallMediatorSerializer,
            DBLookupMediatorSerializer,
            DBReportMediatorSerializer,
            
            CallMediatorSerializer,
            ScriptMediatorSerializer,
            
            AggregateMediatorSerializer,
            CloneMediatorSerializer,
            FilterMediatorSerializer,
            ForeachMediatorSerializer,
            IterateMediatorSerializer,
            SwitchMediatorSerializer,
            ValidateMediatorSerializer,
            
            CacheMediatorSerializer,
            EntitlementMediatorSerializer,
            NTLMMediatorSerializer,
            OauthMediatorSerializer,
            ThrottleMediatorSerializer,
            
            DatamapperMediatorSerializer,
            EnrichMediatorSerializer,
            HeaderMediatorSerializer,
            JsonTransformMediatorSerializer,
            PayloadFactoryMediatorSerializer,
            StoreMediatorSerializer,
            XsltMediatorSerializer,
            
            LoopbackMediatorSerializer,
            CommentMediatorSerializer,
    ];
  }

  static readonly instance: MediatorSerializerFinder = new MediatorSerializerFinder();

  serializerMap: Map<string, AbstractMediatorSerializer> = new Map();

  static getInstance(): MediatorSerializerFinder {
    return MediatorSerializerFinder.instance;

  }

  getSerializer(mediator: Mediator): AbstractMediatorSerializer {
    return get(this.serializerMap, mediator.constructor.name);

  }

  constructor() {
    for (let c of MediatorSerializerFinder.mediatorSerializers()) {
        try {
            let ser = (new c() as AbstractMediatorSerializer);
            this.serializerMap.set(ser.getMediatorClassName(), ser);
        } catch (e) {

        }
    }

  }

  getSerializerMap(): Map<string, AbstractMediatorSerializer> {
    return this.serializerMap;

  }
}
