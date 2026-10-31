// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/CacheMediator.java by the java2ts converter (see tools/java2ts).
import { mapReplaceAll } from "../../../syntaxTree/javaCompat.js";
import { equals, isEmpty, get, parseBoolean, replaceAll } from "../../../syntaxTree/javaCompat.js";
import { Cache } from "../../../syntaxTree/pojo/mediator/advanced/cache/Cache.js";
import { Either } from "../../lsp.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";

export class CacheMediator {
  static readonly __fields: string[] = [];

  static readonly cacheTagAttributes: string[] = ["cacheMediatorImplementation", "cacheType", "cacheTimeout",
            "maxMessageSize", "scope", "hashGeneratorAttribute", "description", "id"];

  static readonly protocolTagAttributes: string[] = ["cacheMediatorImplementation", "cacheProtocolType",
            "cacheProtocolMethods", "headersToIncludeInHash", "headersToExcludeInHash", "responseCodes",
            "enableCacheControl", "includeAgeHeader", "hashGenerator"];

  static readonly onCacheHitTagAttributes: string[] = ["sequenceType", "sequenceKey"];

  static readonly implementationTagAttributes: string[] = ["maxEntryCount", "implementationType", "cacheType"];

  static processData430(data: Map<string, any>, cache: Cache, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    mapReplaceAll(data, (key, value) => {
        if ((typeof value === "number")) {
            return String(Math.trunc(value as number));
        }
        return value;
    });
    let scope: any = get(data, "scope");
    if ((typeof scope === "string")) {
        data.set("scope", ((scope as string)).toLowerCase());
    }

    if (equals("COLLECTOR", get(data, "cacheType"))) {
        data.set("isCollector", true);
    }
    if (equals("611 Compatible", get(data, "cacheMediatorImplementation"))) {
        data.set("is611Compatible", true);
    }

    if (equals("ANONYMOUS", get(data, "sequenceType"))) {
        data.set("isAnonymousSequence", true);
    }

    let headersToExcludeInHash: any = get(data, "headersToExcludeInHash");
    if ((typeof headersToExcludeInHash === "string")) {
        data.set("hasHeadersToExcludeInHash", true);
    }

    let headersToIncludeInHash: any = get(data, "headersToIncludeInHash");
    if ((typeof headersToIncludeInHash === "string")){
        data.set("hasHeadersToIncludeInHash", true);
    }

    let collectorToFinder = cache != null && cache.isCollector() && equals("FINDER", get(data, "cacheType"));

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (cache == null || collectorToFinder) {
        data.set("isNewMediator", true);
        return Either.forLeft(data);
    }

    return Either.forRight(CacheMediator.getEdits(data, cache, dirtyFields));

  }

  static getEdits(data: Map<string, any>, cache: Cache, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();

    if (MediatorUtils.anyMatch(dirtyFields, CacheMediator.cacheTagAttributes)) {
        let cacheData = new Map(data);
        cacheData.set("isEditCache", true);

        let range = cache.getRange();
        let editRange: Range | undefined;
        if (equals(true, get(cacheData, "isCollector"))) {
            editRange = new Range(range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end);
        } else {
            editRange = new Range(range.startTagRange.start, range.startTagRange.end);
        }

        edits.set(editRange, cacheData);
        if (equals(true, get(cacheData, "isCollector"))) {
            return edits;
        }
    }

    if (MediatorUtils.anyMatch(dirtyFields, CacheMediator.protocolTagAttributes) && !equals(true, get(data, "isCollector"))) {
        let protocolData = new Map(data);
        protocolData.set("isEditProtocol", true);

        let range = cache.getProtocol() != null ? cache.getProtocol().getRange() : null;
        let editRange: Range | undefined;
        if (range != null) {
            editRange = new Range(range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end);
        } else {
            editRange = new Range(cache.getRange().endTagRange.start,
                    cache.getRange().endTagRange.start);
        }

        edits.set(editRange, protocolData);
    }

    if (MediatorUtils.anyMatch(dirtyFields, CacheMediator.onCacheHitTagAttributes) && !equals(true, get(data, "isCollector"))) {
        let onCacheHitData = new Map(data);
        onCacheHitData.set("isEditOnCacheHit", true);

        let range = cache.getOnCacheHit() != null ? cache.getOnCacheHit().getRange() : null;
        let editRange: Range | undefined;
        if (range != null) {
            editRange = new Range(range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end);
        } else {
            editRange = new Range(cache.getRange().endTagRange.start,
                    cache.getRange().endTagRange.start);
        }

        edits.set(editRange, onCacheHitData);
    }

    if (MediatorUtils.anyMatch(dirtyFields, CacheMediator.implementationTagAttributes) && !equals(true, get(data, "isCollector"))) {
        let range = cache.getImplementation() != null ? cache.getImplementation().getRange() : null;
        if (range != null) {
            let implementationData = new Map(data);
            implementationData.set("isEditImplementation", true);

            let editRange = new Range(range.startTagRange.start,
                    range.endTagRange != null && range.endTagRange.end != null ?
                            range.endTagRange.end : range.startTagRange.end);

            edits.set(editRange, implementationData);
        }
    }

    return edits;

  }

  static getDataFromST430(node: Cache): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    data.set("scope", node.getScope() != null ? (equals("per-mediator", node.getScope()) ?
            "Per-Mediator" : "Per-Host") : null);
    data.set("id", node.getId());
    data.set("hashGeneratorAttribute", node.getHashGenerator());
    data.set("hashGenerator", node.getProtocol() != null && node.getProtocol().getHashGenerator() != null ?
            node.getProtocol().getHashGenerator().getTextNode() : null);
    data.set("maxMessageSize", node.getMaxMessageSize());
    data.set("maxSize", node.getImplementation() != null ? node.getImplementation().getMaxSize() : null);
    data.set("cacheTimeout", node.getTimeout());
    data.set("sequenceKey", node.getOnCacheHit() != null ? node.getOnCacheHit().getSequence() : null);
    data.set("cacheProtocolType", node.getProtocol() != null ? node.getProtocol().getType() : null);
    data.set("cacheProtocolMethods", node.getProtocol() != null && node.getProtocol().getMethods() != null ?
            node.getProtocol().getMethods().getTextNode() : null);
    data.set("headersToIncludeInHash", node.getProtocol() != null &&
            node.getProtocol().getHeadersToIncludeInHash() != null ?
            node.getProtocol().getHeadersToIncludeInHash().getTextNode() : null);
    data.set("headersToExcludeInHash", node.getProtocol() != null &&
            node.getProtocol().getHeadersToExcludeInHash() != null ?
            node.getProtocol().getHeadersToExcludeInHash().getTextNode() : null);
    data.set("responseCodes", node.getProtocol() != null && node.getProtocol().getResponseCodes() != null ?
            node.getProtocol().getResponseCodes().getTextNode() : null);
    data.set("enableCacheControl", node.getProtocol() != null && node.getProtocol().getEnableCacheControl() != null
            && equals("true", node.getProtocol().getEnableCacheControl().getTextNode()));
    data.set("includeAgeHeader", node.getProtocol() != null && node.getProtocol().getIncludeAgeHeader() != null
            && equals("true", node.getProtocol().getIncludeAgeHeader().getTextNode()));
    data.set("maxEntryCount", node.getImplementation() != null ? node.getImplementation().getMaxSize() : null);
    data.set("cacheType", node.isCollector() ? "COLLECTOR" : "FINDER");
    data.set("cacheMediatorImplementation", node.isCollector() ?
            (node.getScope() != null ?
                    "611 Compatible" : "Default") : (node.getProtocol() != null ? "Default" : "611 Compatible"));
    data.set("sequenceType", node.getOnCacheHit() != null && node.getOnCacheHit().getSequence() != null ?
            "REGISTRY_REFERENCE" : "ANONYMOUS");
    let ranges = new Map();
    ranges.set("cache", node.getRange());
    ranges.set("onCacheHit", node.getOnCacheHit() != null ? node.getOnCacheHit().getRange() : null);
    ranges.set("implementation", node.getImplementation() != null ? node.getImplementation().getRange() : null);
    ranges.set("protocol", node.getProtocol() != null ? node.getProtocol().getRange() : null);
    data.set("ranges", ranges);
    data.set("isAnonymousSequence", node.getOnCacheHit() != null &&
            node.getOnCacheHit().getMediatorList() != null && !isEmpty(node.getOnCacheHit().getMediatorList()));
    data.set("implementationType", node.getImplementation() != null ? node.getImplementation().getType() : null);
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
