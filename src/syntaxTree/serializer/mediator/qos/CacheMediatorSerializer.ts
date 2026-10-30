// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/mediator/qos/CacheMediatorSerializer.java by the java2ts converter (see tools/java2ts).
import { AbstractMediatorSerializer } from "../AbstractMediatorSerializer.js";
import { AnonymousSequenceSerializer } from "../../AnonymousSequenceSerializer.js";
import { Cache } from "../../../pojo/mediator/advanced/cache/Cache.js";
import { CacheImplementation } from "../../../pojo/mediator/advanced/cache/CacheImplementation.js";
import { CacheOnCacheHit } from "../../../pojo/mediator/advanced/cache/CacheOnCacheHit.js";
import { CacheProtocol } from "../../../pojo/mediator/advanced/cache/CacheProtocol.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { OMElement } from "../../../om/om.js";

export class CacheMediatorSerializer extends AbstractMediatorSerializer {
  serializeSpecificMediator(m: Mediator): OMElement {
    let cacheMediator = (m as Cache);
    let cacheElt = AbstractMediatorSerializer.fac.createOMElement("cache", AbstractMediatorSerializer.synNS);

    if (cacheMediator.isCollector()) {
        cacheElt.addAttribute("collector", "true", null);
    } else {
        cacheElt.addAttribute("collector", "false", null);
        if (cacheMediator.getId() != null) {
            cacheElt.addAttribute("id", cacheMediator.getId(), null);
        }
        if (cacheMediator.getScope() != null) {
            cacheElt.addAttribute("scope", cacheMediator.getScope().getValue(), null);
        }
        if (cacheMediator.getHashGenerator() != null) {
            cacheElt.addAttribute("hashGenerator", cacheMediator.getHashGenerator(), null);
        }
        if (cacheMediator.getTimeout() >= 0) {
            cacheElt.addAttribute("timeout", String(cacheMediator.getTimeout()), null);
        }
        if (cacheMediator.getMaxMessageSize() >= 0) {
            cacheElt.addAttribute("maxMessageSize", String(cacheMediator.getMaxMessageSize()), null);
        }
        this.serializeOnCacheHit(cacheElt, cacheMediator.getOnCacheHit());
        this.serializeProtocol(cacheElt, cacheMediator.getProtocol());
        this.serializeImplementation(cacheElt, cacheMediator.getImplementation());
    }

    if (cacheMediator.getDescription() != null) {
        cacheElt.addAttribute("description", cacheMediator.getDescription(), null);
    }
    return cacheElt;

  }

  serializeOnCacheHit(cacheElt: OMElement, onCacheHit: CacheOnCacheHit): void {
    if (onCacheHit != null) {
        let onCacheHitElt = AbstractMediatorSerializer.fac.createOMElement("onCacheHit", AbstractMediatorSerializer.synNS);
        if (onCacheHit.getSequence() != null) {
            onCacheHitElt.addAttribute("sequence", onCacheHit.getSequence(), null);
        } else if (onCacheHit.getMediatorList() != null) {
            onCacheHitElt = AnonymousSequenceSerializer.serializeAnonymousSequence(onCacheHit.getMediatorList());
            onCacheHitElt.setLocalName("onCacheHit");
        }
        cacheElt.addChild(onCacheHitElt);
    }

  }

  serializeProtocol(cacheElt: OMElement, protocol: CacheProtocol): void {
    if (protocol != null) {
        let protocolElt = AbstractMediatorSerializer.fac.createOMElement("protocol", AbstractMediatorSerializer.synNS);
        if (protocol.getType() != null) {
            protocolElt.addAttribute("type", protocol.getType(), null);
        }
        if (protocol.getMethods() != null) {
            let methodsElt = AbstractMediatorSerializer.fac.createOMElement("methods", AbstractMediatorSerializer.synNS);
            methodsElt.setText(protocol.getMethods().getTextNode());
            protocolElt.addChild(methodsElt);
        }
        if (protocol.getHeadersToExcludeInHash() != null) {
            let headersElt = AbstractMediatorSerializer.fac.createOMElement("headersToExcludeInHash", AbstractMediatorSerializer.synNS);
            headersElt.setText(protocol.getHeadersToExcludeInHash().getTextNode());
            protocolElt.addChild(headersElt);
        }
        if (protocol.getHeadersToIncludeInHash() != null) {
            let headersElt = AbstractMediatorSerializer.fac.createOMElement("headersToIncludeInHash", AbstractMediatorSerializer.synNS);
            headersElt.setText(protocol.getHeadersToIncludeInHash().getTextNode());
            protocolElt.addChild(headersElt);
        }
        if (protocol.getResponseCodes() != null) {
            let responseCodesElt = AbstractMediatorSerializer.fac.createOMElement("responseCodes", AbstractMediatorSerializer.synNS);
            responseCodesElt.setText(protocol.getResponseCodes().getTextNode());
            protocolElt.addChild(responseCodesElt);
        }
        if (protocol.getEnableCacheControl() != null) {
            let enableCacheControlElt = AbstractMediatorSerializer.fac.createOMElement("enableCacheControl", AbstractMediatorSerializer.synNS);
            enableCacheControlElt.setText(protocol.getEnableCacheControl().getTextNode());
            protocolElt.addChild(enableCacheControlElt);
        }
        if (protocol.getIncludeAgeHeader() != null) {
            let includeAgeHeaderElt = AbstractMediatorSerializer.fac.createOMElement("includeAgeHeader", AbstractMediatorSerializer.synNS);
            includeAgeHeaderElt.setText(protocol.getIncludeAgeHeader().getTextNode());
            protocolElt.addChild(includeAgeHeaderElt);
        }
        if (protocol.getHashGenerator() != null) {
            let hashGeneratorElt = AbstractMediatorSerializer.fac.createOMElement("hashGenerator", AbstractMediatorSerializer.synNS);
            hashGeneratorElt.setText(protocol.getHashGenerator().getTextNode());
            protocolElt.addChild(hashGeneratorElt);
        }
        cacheElt.addChild(protocolElt);
    }

  }

  serializeImplementation(cacheElt: OMElement, implementation: CacheImplementation): void {
    if (implementation != null) {
        let implElt = AbstractMediatorSerializer.fac.createOMElement("implementation", AbstractMediatorSerializer.synNS);
        if (implementation.getMaxSize() >= 0) {
            implElt.addAttribute("maxSize", String(implementation.getMaxSize()), null);
        }
        if (implementation.getType() != null) {
            implElt.addAttribute("type", implementation.getType().name(), null);
        }
        cacheElt.addChild(implElt);
    }

  }

  getMediatorClassName(): string {
    return "Cache";

  }
}
