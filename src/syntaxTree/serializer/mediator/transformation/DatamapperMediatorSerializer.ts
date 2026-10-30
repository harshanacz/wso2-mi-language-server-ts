// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/transformation/DatamapperMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { Datamapper } from "../../../pojo/mediator/transformation/Datamapper.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class DatamapperMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let datamapper = (m as Datamapper);
    let datamapperElt = AbstractMediatorSerializer.fac.createOMElement("datamapper", AbstractMediatorSerializer.synNS);

    if (datamapper.getInputType() != null) {
        datamapperElt.addAttribute("inputType", datamapper.getInputType().name(), null);
    }
    if (datamapper.getInputSchema() != null) {
        datamapperElt.addAttribute("inputSchema", datamapper.getInputSchema(), null);
    }
    if (datamapper.getOutputType() != null) {
        datamapperElt.addAttribute("outputType", datamapper.getOutputType().name(), null);
    }
    if (datamapper.getOutputSchema() != null) {
        datamapperElt.addAttribute("outputSchema", datamapper.getOutputSchema(), null);
    }
    if (datamapper.getConfig() != null) {
        datamapperElt.addAttribute("config", datamapper.getConfig(), null);
    }
    if (datamapper.getXsltStyleSheet() != null) {
        datamapperElt.addAttribute("xsltStyleSheet", datamapper.getXsltStyleSheet(), null);
    }
    if (datamapper.getDescription() != null) {
        datamapperElt.addAttribute("description", datamapper.getDescription(), null);
    }
    return datamapperElt;

  }

  getMediatorClassName(): string {
    return "Datamapper";

  }
}
