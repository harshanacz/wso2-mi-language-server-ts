// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/EntitlementServiceMediator.java by the java2ts converter (see tools/java2ts).
import { EntitlementServiceClient } from "../../../syntaxTree/pojo/mediator/other/entitlement/EntitlementServiceClient.js";
import { IllegalArgumentException } from "../../../syntaxTree/javaCompat.js";
import { equals, isEmpty, get, parseBoolean, removeFrom } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { EntitlementService } from "../../../syntaxTree/pojo/mediator/other/entitlement/EntitlementService.js";
import { MediatorUtils } from "../MediatorUtils.js";
import { Range } from "../../lsp.js";
import { TagRanges } from "../../../syntaxTree/stNode.js";

export class EntitlementServiceMediator {
  static readonly __fields: string[] = [];

  static readonly entitlementTagAttributes: string[] = ["callbackClassName", "client", "password", "entitlementServerURL", "username",
                    "thriftHost", "thriftPort", "onAcceptSequenceKey", "onRejectSequenceKey", "obligationsSequenceKey",
                    "adviceSequenceKey", "onAcceptSequenceType", "onRejectSequenceType", "obligationsSequenceType",
                    "adviceSequenceType", "description", "callbackHandler", "entitlementClientType"];

  static readonly onAcceptTagAttributes: string[] = ["onAcceptSequenceType"];

  static readonly onRejectTagAttributes: string[] = ["onRejectSequenceType"];

  static readonly adviceTagAttributes: string[] = ["adviceSequenceType"];

  static readonly obligationTagAttributes: string[] = ["obligationsSequenceType"];

  static processData430(data: Map<string, any>, entitlementService: EntitlementService, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    let client = String(get(data, "entitlementClientType"));
    switch (client) {
        case "SOAP - Basic Auth (WSO2 IS 4.0.0 or later)":
            data.set("client", "basicAuth");
            break;
        case "THRIFT":
            data.set("client", "thrift");
            break;
        case "SOAP - Authentication Admin (WSO2 IS 3.2.3 or earlier)":
            data.set("client", "soap");
            break;
        case "WSXACML":
            data.set("client", "wsXacml");
            break;
    }

    let callbackHandler = String(get(data, "callbackHandler"));
    let callbackClassName: any = get(data, "callbackClassName");
    switch (callbackHandler) {
        case "UT":
            data.set("callbackClassName", "org.wso2.carbon.identity.entitlement.mediator.callback.UTEntitlementCallbackHandler");
            break;
        case "X509":
            data.set("callbackClassName", "org.wso2.carbon.identity.entitlement.mediator.callback.X509EntitlementCallbackHandler");
            break;
        case "SAML":
            data.set("callbackClassName", "org.wso2.carbon.identity.entitlement.mediator.callback.SAMLEntitlementCallbackHandler");
            break;
        case "Kerberos":
            data.set("callbackClassName", "org.wso2.carbon.identity.entitlement.mediator.callback.KerberosEntitlementCallbackHandler");
            break;
        case "Custom":
            data.set("callbackClassName", callbackClassName);
            break;
    }

    if (equals(get(data, "onAcceptSequenceType"), "ANONYMOUS")) {
        removeFrom(data, "onAcceptSequenceKey");
    }
    if (equals(get(data, "onRejectSequenceType"), "ANONYMOUS")) {
        removeFrom(data, "onRejectSequenceKey");
    }
    if (equals(get(data, "obligationsSequenceType"), "ANONYMOUS")) {
        removeFrom(data, "obligationsSequenceKey");
    }
    if (equals(get(data, "adviceSequenceType"), "ANONYMOUS")) {
        removeFrom(data, "adviceSequenceKey");
    }

    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }

    if (entitlementService == null) {
        data.set("newMediator", true);
        return Either.forLeft(data);
    }
    return Either.forRight(EntitlementServiceMediator.getEdits(data, entitlementService, dirtyFields));


  }

  static getEdits(data: Map<string, any>, entitlementService: EntitlementService, dirtyFields: string[]): Map<Range, Map<string, any>> {
    let edits = new Map();

    if (MediatorUtils.anyMatch(dirtyFields, EntitlementServiceMediator.entitlementTagAttributes)) {
        EntitlementServiceMediator.getEdit("edit", "entitlement", data, entitlementService, true, edits);
    }

    if (MediatorUtils.anyMatch(dirtyFields, EntitlementServiceMediator.onAcceptTagAttributes)) {
        let onAcceptData = new Map(data);
        EntitlementServiceMediator.setEditSeqData(onAcceptData, entitlementService, "onAccept");
        if (onAcceptData.has("needEdit") && (get(onAcceptData, "needEdit") as boolean)) {
            EntitlementServiceMediator.getEdit("add", "onAccept", onAcceptData, entitlementService, false, edits);
        }
    }

    if (MediatorUtils.anyMatch(dirtyFields, EntitlementServiceMediator.onRejectTagAttributes)) {
        let onRejectData = new Map(data);
        EntitlementServiceMediator.setEditSeqData(onRejectData, entitlementService, "onReject");
        if (onRejectData.has("needEdit") && (get(onRejectData, "needEdit") as boolean)) {
            EntitlementServiceMediator.getEdit("add", "onReject", onRejectData, entitlementService, false, edits);
        }
    }

    if (MediatorUtils.anyMatch(dirtyFields, EntitlementServiceMediator.adviceTagAttributes)) {
        let adviceData = new Map(data);
        EntitlementServiceMediator.setEditSeqData(adviceData, entitlementService, "advice");
        if (adviceData.has("needEdit") && (get(adviceData, "needEdit") as boolean)) {
            EntitlementServiceMediator.getEdit("add", "advice", adviceData, entitlementService, false, edits);
        }
    }

    if (MediatorUtils.anyMatch(dirtyFields, EntitlementServiceMediator.obligationTagAttributes)) {
        let obligationData = new Map(data);
        EntitlementServiceMediator.setEditSeqData(obligationData, entitlementService, "obligations");
        if (obligationData.has("needEdit") && (get(obligationData, "needEdit") as boolean)) {
            EntitlementServiceMediator.getEdit("add", "obligation", obligationData, entitlementService, false, edits);
        }
    }

    return edits;

  }

  static setEditSeqData(data: Map<string, any>, entitlementService: EntitlementService, key: string): void {
    let attribute = EntitlementServiceMediator.getAttribute(entitlementService, key);
    let sequenceType: any = get(data, key + "SequenceType");

    if (equals("REGISTRY_REFERENCE", attribute) && equals("ANONYMOUS", sequenceType)) {
        if (EntitlementServiceMediator.isAttributeValueEmpty(entitlementService, key)) {
            data.set("needEdit", true);
            data.set("addKey" + EntitlementServiceMediator.capitalizeFirstLetter(key), true);
        }
    } else if (equals("ANONYMOUS", attribute) && equals("REGISTRY_REFERENCE", sequenceType)) {
        data.set("needEdit", true);
        data.set("removeSequence", true);
    }

  }

  static getAttribute(entitlementService: EntitlementService, attributeType: string): string {
    switch (attributeType) {
        case "onAccept":
            return entitlementService.getOnAcceptAttribute();
        case "onReject":
            return entitlementService.getOnRejectAttribute();
        case "advice":
            return entitlementService.getAdviceAttribute();
        case "obligations":
            return entitlementService.getObligationsAttribute();
        default:
            throw new IllegalArgumentException("Unknown attribute type: " + attributeType);
    }

  }

  static isAttributeValueEmpty(entitlementService: EntitlementService, attributeType: string): boolean {
    switch (attributeType) {
        case "onAccept":
            return entitlementService.getOnAccept() == null || entitlementService.getOnAccept().getRange() == null;
        case "onReject":
            return entitlementService.getOnReject() == null || entitlementService.getOnReject().getRange() == null;
        case "advice":
            return entitlementService.getAdvice() == null || entitlementService.getAdvice().getRange() == null;
        case "obligations":
            return entitlementService.getObligations() == null || entitlementService.getObligations().getRange() == null;
        default:
            throw new IllegalArgumentException("Unknown attribute type: " + attributeType);
    }

  }

  static getEdit(prefix: string, key: string, data: Map<string, any>, entitlementService: EntitlementService, editStartTagOnly: boolean, edits: Map<Range, Map<string, any>>): void {
    let dataCopy = new Map(data);
    if (!equals(true, get(data, "removeSequence"))) {
        let editKey = prefix + EntitlementServiceMediator.capitalizeFirstLetter(key);
        dataCopy.set(editKey, true);
    }
    let ranges = EntitlementServiceMediator.getRanges(entitlementService, key);
    let editRange = null;
    if (ranges != null) {
        editRange = new Range(
                ranges.startTagRange.start,
                editStartTagOnly ? ranges.startTagRange.end :
                        (ranges.endTagRange != null && ranges.endTagRange.end != null ?
                                ranges.endTagRange.end : ranges.startTagRange.end)
        );
    } else {
        let entitlementRange = entitlementService.getRange();
        if (entitlementRange != null) {
            editRange = new Range(
                    entitlementRange.endTagRange.start,
                    entitlementRange.endTagRange.start
            );
        }
    }
    edits.set(editRange, dataCopy);

  }

  static getRanges(entitlementService: EntitlementService, key: string): TagRanges {
    switch (key) {
        case "entitlement":
            return entitlementService.getRange();
        case "onAccept":
            return entitlementService.getOnAccept().getRange();
        case "onReject":
            return entitlementService.getOnReject().getRange();
        case "advice":
            return entitlementService.getAdvice().getRange();
        case "obligations":
            return entitlementService.getObligations().getRange();
        default:
            throw new IllegalArgumentException("Unknown attribute type: " + key);
    }

  }

  static capitalizeFirstLetter(input: string): string {
    if (input == null || isEmpty(input)) {
        return input;
    }
    return input.substring(0, 1).toUpperCase() + input.substring(1);

  }

  static getDataFromST430(node: EntitlementService): Map<string, any> {
    let data = new Map();

    let client = node.getClient();
    switch (client) {
        case EntitlementServiceClient.basicAuth:
            data.set("entitlementClientType", "SOAP - Basic Auth (WSO2 IS 4.0.0 or later)");
            break;
        case EntitlementServiceClient.thrift:
            data.set("entitlementClientType", "THRIFT");
            break;
        case EntitlementServiceClient.soap:
            data.set("entitlementClientType", "SOAP - Authentication Admin (WSO2 IS 3.2.3 or earlier)");
            break;
        case EntitlementServiceClient.wsXacml:
            data.set("entitlementClientType", "WSXACML");
            break;
    }

    let callbackClassName = node.getCallbackClass();
    if (equals("org.wso2.carbon.identity.entitlement.mediator.callback.UTEntitlementCallbackHandler", callbackClassName)) {
        data.set("callbackHandler", "UT");
    } else if (equals("org.wso2.carbon.identity.entitlement.mediator.callback.X509EntitlementCallbackHandler", callbackClassName)) {
        data.set("callbackHandler", "X509");
    } else if (equals("org.wso2.carbon.identity.entitlement.mediator.callback.SAMLEntitlementCallbackHandler", callbackClassName)) {
        data.set("callbackHandler", "SAML");
    } else if (equals("org.wso2.carbon.identity.entitlement.mediator.callback.KerberosEntitlementCallbackHandler", callbackClassName)) {
        data.set("callbackHandler", "Kerberos");
    } else {
        data.set("callbackHandler", "Custom");
        data.set("callbackClassName", callbackClassName);
    }

    data.set("description", node.getDescription());
    data.set("client", node.getClient());
    data.set("password", node.getRemoteServicePassword());
    data.set("entitlementServerURL", node.getRemoteServiceUrl());
    data.set("username", node.getRemoteServiceUserName());
    data.set("thriftHost", node.getThriftHost());
    data.set("thriftPort", node.getThriftPort());
    data.set("onAcceptSequenceKey", node.getOnAcceptAttribute());
    data.set("onRejectSequenceKey", node.getOnRejectAttribute());
    data.set("obligationsSequenceKey", node.getObligationsAttribute());
    data.set("adviceSequenceKey", node.getAdviceAttribute());

    data.set("onAcceptSequenceType", node.getOnAcceptAttribute() != null ? "REGISTRY_REFERENCE" : "ANONYMOUS");
    data.set("onRejectSequenceType", node.getOnRejectAttribute() != null ? "REGISTRY_REFERENCE" : "ANONYMOUS");
    data.set("obligationsSequenceType", node.getObligationsAttribute() != null ? "REGISTRY_REFERENCE" : "ANONYMOUS");
    data.set("adviceSequenceType", node.getAdviceAttribute() != null ? "REGISTRY_REFERENCE" : "ANONYMOUS");
    data.set("traceFilter", equals("enable", node.getTraceFilter()));

    return data;

  }
}
