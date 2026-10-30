// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/data/DBReportMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { DBMediatorSerializer } from "./DBMediatorSerializer.js";
import { DbMediator } from "../../../pojo/mediator/advanced/DbMediator/DbMediator.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class DBReportMediatorSerializer extends DBMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let dbReport = (m as DbMediator);
    let dbReportElt = this.serializeDBMediator(dbReport);
    dbReportElt.setLocalName("dbreport");

    return dbReportElt;

  }

  getMediatorClassName(): string {
    return "DBReport";

  }
}
