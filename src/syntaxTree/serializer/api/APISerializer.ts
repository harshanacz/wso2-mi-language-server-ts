// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/api/APISerializer.java by the java2ts converter (see tools/java2ts).
import { equals } from "../../javaCompat.js";
import { API } from "../../pojo/api/API.js";
import { APIHandlersHandler } from "../../pojo/api/APIHandlersHandler.js";
import { Constant } from "../../constant.js";
import { OMAbstractFactory } from "../../om/om.js";
import { OMElement } from "../../om/om.js";
import { OMFactory } from "../../om/om.js";
import { ResourceSerializer } from "./ResourceSerializer.js";

export class APISerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeAPI(api: API): string {

    let apiElt = APISerializer.fac.createOMElement("api", Constant.SYNAPSE_OMNAMESPACE);
    APISerializer.addAttributes(api, apiElt);

    APISerializer.serializeResources(api, apiElt);
    APISerializer.serializeHandlers(api, apiElt);
    return String(apiElt);

  }

  static addAttributes(api: API, apiElt: OMElement): void {
    apiElt.addAttribute("name", api.getName(), null);
    apiElt.addAttribute("context", api.getContext(), null);
    APISerializer.serializeVersioningStrategy(api, apiElt);

    if (api.getHostname() != null) {
        apiElt.addAttribute("hostname", api.getHostname(), null);
    }
    if (api.getPort() != null && api.getPort() != "-1") {
        apiElt.addAttribute("port", String(api.getPort()), null);
    }
    if (api.getPublishSwagger() != null) {
        apiElt.addAttribute("publishSwagger", api.getPublishSwagger(), null);
    }
    if (api.getStatistics() != null) {
        apiElt.addAttribute("statistics", api.getStatistics().name(), null);
    }
    if (api.getTrace() != null) {
        apiElt.addAttribute("trace", api.getTrace().name(), null);
    }

  }

  static serializeVersioningStrategy(api: API, apiElement: OMElement): OMElement {
    if (api.getVersion() != null && !equals("", api.getVersion())) {
        apiElement.addAttribute("version", api.getVersion(), null);
    }
    if (api.getVersionType() != null) {
        apiElement.addAttribute("version-type", api.getVersionType().name(), null);
    }
    return apiElement;

  }

  static serializeResources(api: API, apiElt: OMElement): void {
    let resources = api.getResource();
    if (resources != null) {
        for (let r of resources) {
            let resourceElt = ResourceSerializer.serializeResource(r);
            if (resourceElt != null) {
                apiElt.addChild(resourceElt);
            }
        }
    }

  }

  static serializeHandlers(api: API, apiElt: OMElement): void {
    let handlers = api.getHandlers();
    if (handlers != null) {
        let handlersElt = APISerializer.fac.createOMElement("handlers", Constant.SYNAPSE_OMNAMESPACE);
        let handlerArray = handlers.getHandler();
        if (handlerArray != null) {
            for (let handler of handlerArray) {
                APISerializer.serializeHandler(handler, handlersElt);
            }
        }
    }

  }

  static serializeHandler(handler: APIHandlersHandler, handlersElt: OMElement): void {
    let handlerElt = APISerializer.fac.createOMElement("handler", Constant.SYNAPSE_OMNAMESPACE);
    handlerElt.addAttribute("class", handler.getClazz(), null);
    let properties = handler.getProperty();
    if (properties != null) {
        for (let property of properties) {
            let propertyElt = APISerializer.fac.createOMElement("property", Constant.SYNAPSE_OMNAMESPACE);
            propertyElt.addAttribute("name", property.getName(), null);
            propertyElt.addAttribute("value", property.getValue(), null);
            handlerElt.addChild(propertyElt);
        }
    }
    handlersElt.addChild(handlerElt);

  }
}
