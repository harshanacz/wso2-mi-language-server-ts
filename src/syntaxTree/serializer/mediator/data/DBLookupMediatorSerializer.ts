// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/data/DBLookupMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { DBMediatorSerializer } from "./DBMediatorSerializer.js";
import { DbMediator } from "../../../pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class DBLookupMediatorSerializer extends DBMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let dbLookup = (m as DbMediator);
    let dbLookupElt = this.serializeDBMediator(dbLookup);
    dbLookupElt.setLocalName("dblookup");

    return dbLookupElt;

  }

  getMediatorClassName(): string {
    return "DBLookup";

  }
}
