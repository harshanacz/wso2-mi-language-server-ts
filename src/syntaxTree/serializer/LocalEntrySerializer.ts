// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/LocalEntrySerializer.java by the java2ts converter (see tools/java2ts).
import { Logger, Level } from "../javaCompat.js";
import { Constant } from "../constant.js";
import { InvalidConfigurationException } from "../om/errors.js";
import { LocalEntry } from "../pojo/LocalEntry.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { SerializerUtils } from "./SerializerUtils.js";

export class LocalEntrySerializer {
  static log: Logger = Logger.getLogger("LocalEntrySerializer");

  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeLocalEntry(localEntry: LocalEntry): string {
    let localEntryElt = LocalEntrySerializer.fac.createOMElement("localEntry", Constant.SYNAPSE_OMNAMESPACE);

    if (localEntry.getKey() != null) {
        localEntryElt.addAttribute("key", localEntry.getKey(), null);
    } else {
        LocalEntrySerializer.handleException("Local Entry key is required");
    }
    if (localEntry.getSrc() != null) {
        localEntryElt.addAttribute("src", localEntry.getSrc(), null);
    } else if (localEntry.getContent() != null) {
        let contentElt = SerializerUtils.stringToOM(String(localEntry.getContent()));
        localEntryElt.addChild(contentElt);
    }
    return String(localEntryElt);

  }

  static handleException(s: string): void {
    LocalEntrySerializer.log.log(Level.SEVERE, s);
    throw new InvalidConfigurationException(s);

  }
}
