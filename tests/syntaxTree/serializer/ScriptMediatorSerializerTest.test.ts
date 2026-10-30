import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { ScriptFactory } from "../../../src/syntaxTree/factory/mediators/extension/ScriptFactory.js";
import { ScriptMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/extension/ScriptMediatorSerializer.js";

describe("ScriptMediatorSerializerTest", () => {
  const factory = new ScriptFactory();
  const serializer = new ScriptMediatorSerializer();
  it("testScriptWithRegistryKey", () => {
        const xml = "<script xmlns=\"http://ws.apache.org/ns/synapse\" language=\"js\" " +
                "key=\"conf:/repository/EI/transform.js\" function=\"transform\"/>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testScriptWithCDATAJS", () => {        let xml1 = "<script xmlns=\"http://ws.apache.org/ns/synapse\" language=\"js\"><![CDATA[mc.getPayloadXML()." +
                ".symbol != \"IBM\";]]></script>";
        checkMediator(factory, serializer, xml1, true);
        let xml2 = "<script xmlns=\"http://ws.apache.org/ns/synapse\" language=\"js\"><![CDATA[\n" +
                "var wsse = new Namespace('http://docs.oasis-open" +
                ".org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'); \n" +
                "var envelope = mc.getEnvelopeXML(); \n" +
                "var username = envelope..wsse::String(Username); \n" +
                "var password = envelope..wsse::String(Password);   \n" +
                "mc.addHeader(false, <urn:AuthenticationInfo><urn:userName>{username}</urn:userName><urn:password" +
                ">{password}</urn:password></urn:AuthenticationInfo>); \n" +
                "]]></script>";
        checkMediator(factory, serializer, xml2, true);
  });

  it("testScriptWithIncludes", () => {
        const xml = "<script xmlns=\"http://ws.apache.org/ns/synapse\" language=\"js\" key=\"stockquoteScript\" " +
                "function=\"transformRequest\"><include key=\"sampleScript\"/></script>";
        checkMediator(factory, serializer, xml, true);
  });
});
