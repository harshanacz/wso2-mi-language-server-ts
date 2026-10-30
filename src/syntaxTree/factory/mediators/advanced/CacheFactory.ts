// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/advanced/CacheFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, parseBoolean, getEnumFromValue } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Cache } from "../../../pojo/mediator/advanced/cache/Cache.js";
import { CacheImplementation } from "../../../pojo/mediator/advanced/cache/CacheImplementation.js";
import { CacheImplementationType } from "../../../pojo/mediator/advanced/cache/CacheImplementationType.js";
import { CacheOnCacheHit } from "../../../pojo/mediator/advanced/cache/CacheOnCacheHit.js";
import { CacheProtocol } from "../../../pojo/mediator/advanced/cache/CacheProtocol.js";
import { CacheScope } from "../../../pojo/mediator/advanced/cache/CacheScope.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";
import { SyntaxTreeUtils } from "../../../utils/SyntaxTreeUtils.js";
import { Utils } from "../../../utils.js";

export class CacheFactory extends AbstractMediatorFactory {
  static readonly CACHE_MEDIATOR: string = "cache";

  createSpecificMediator(element: DOMElement): Mediator {
    let cacheMediator = new Cache();
    cacheMediator.elementNode(element);
    this.populateAttributes(cacheMediator, element);
    let children = element.getChildren();
    for (let node of children) {
        if (equalsIgnoreCase(node.getNodeName(), Constant.ON_CACHE_HIT)) {
            let cacheOnCacheHit = this.createCacheOnCacheHit(node);
            cacheMediator.setOnCacheHit(cacheOnCacheHit);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.PROTOCOL)) {
            let cacheProtocol = this.createCacheProtocol(node);
            cacheMediator.setProtocol(cacheProtocol);
        } else if (equalsIgnoreCase(node.getNodeName(), Constant.IMPLEMENTATION)) {
            let cacheImplementation = this.createCacheImplementation(node);
            cacheMediator.setImplementation(cacheImplementation);
        }
    }
    return cacheMediator;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let cacheMediator = (node as Cache);
    let id = element.getAttribute(Constant.ID);
    if (id != null) {
        cacheMediator.setId(id);
    }
    let timeout = element.getAttribute(Constant.TIMEOUT);
    if (timeout != null) {
        cacheMediator.setTimeout(Utils.parseInt(timeout));
    }
    let collector = element.getAttribute(Constant.COLLECTOR);
    if (collector != null) {
        cacheMediator.setCollector(parseBoolean(collector));
    }
    let maxMessageSize = element.getAttribute(Constant.MAX_MESSAGE_SIZE);
    if (maxMessageSize != null) {
        cacheMediator.setMaxMessageSize(Utils.parseInt(maxMessageSize));
    }
    let scope = element.getAttribute(Constant.SCOPE);
    let cacheScope = getEnumFromValue(scope, CacheScope);
    if (cacheScope != null) {
        cacheMediator.setScope(cacheScope);
    }
    let hashGenerator = element.getAttribute(Constant.HASH_GENERATOR);
    if (hashGenerator != null) {
        cacheMediator.setHashGenerator(hashGenerator);
    }
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        cacheMediator.setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        cacheMediator.setTraceFilter(traceFilter);
    }

  }

  createCacheOnCacheHit(element: DOMNode): CacheOnCacheHit {
    let cacheOnCacheHit = new CacheOnCacheHit();
    cacheOnCacheHit.elementNode((element as DOMElement));
    let sequence = element.getAttribute(Constant.SEQUENCE);
    if (sequence != null) {
        cacheOnCacheHit.setSequence(sequence);
    }
    let children = element.getChildren();
    let mediators = SyntaxTreeUtils.createMediators(children);
    cacheOnCacheHit.setMediatorList(mediators);
    return cacheOnCacheHit;

  }

  createCacheProtocol(element: DOMNode): CacheProtocol {
    let cacheProtocol = new CacheProtocol();
    cacheProtocol.elementNode((element as DOMElement));
    this.populateCacheProtocolAttributes(cacheProtocol, element);
    let children = element.getChildren();
    for (let node of children) {
        if (!(node instanceof DOMElement)) {
            continue;
        }
        let name = node.getNodeName();
        let stElement = new STNode();
        stElement.elementNode((node as DOMElement));
        if (equalsIgnoreCase(name, Constant.METHODS)) {
            cacheProtocol.setMethods(stElement);
        } else if (equalsIgnoreCase(name, Constant.HEADERS_TO_EXCLUDE_IN_HASH)) {
            cacheProtocol.setHeadersToExcludeInHash(stElement);
        } else if (equalsIgnoreCase(name, Constant.HEADERS_TO_INCLUDE_IN_HASH)) {
            cacheProtocol.setHeadersToIncludeInHash(stElement);
        } else if (equalsIgnoreCase(name, Constant.RESPONSE_CODES)) {
            cacheProtocol.setResponseCodes(stElement);
        } else if (equalsIgnoreCase(name, Constant.ENABLE_CACHE_CONTROL)) {
            cacheProtocol.setEnableCacheControl(stElement);
        } else if (equalsIgnoreCase(name, Constant.INCLUDE_AGE_HEADER)) {
            cacheProtocol.setIncludeAgeHeader(stElement);
        } else if (equalsIgnoreCase(name, Constant.HASH_GENERATOR)) {
            cacheProtocol.setHashGenerator(stElement);
        }
    }
    return cacheProtocol;

  }

  populateCacheProtocolAttributes(cacheProtocol: CacheProtocol, element: DOMNode): void {
    let type = element.getAttribute(Constant.TYPE);
    if (type != null) {
        cacheProtocol.setType(type);
    }

  }

  createCacheImplementation(element: DOMNode): CacheImplementation {
    let cacheImplementation = new CacheImplementation();
    cacheImplementation.elementNode((element as DOMElement));
    let type = element.getAttribute(Constant.TYPE);
    let cacheImplementationType = getEnumFromValue(type, CacheImplementationType);
    if (cacheImplementationType != null) {
        cacheImplementation.setType(cacheImplementationType);
    }
    let maxSize = element.getAttribute(Constant.MAX_SIZE);
    if (maxSize != null) {
        cacheImplementation.setMaxSize(Utils.parseInt(maxSize));
    }
    return cacheImplementation;

  }

  getTagName(): string {
    return CacheFactory.CACHE_MEDIATOR;

  }
}
