import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { DBReportFactory } from "../../../src/syntaxTree/factory/mediators/advanced/DBReportFactory.js";
import { DBReportMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/data/DBReportMediatorSerializer.js";

describe("DBReportMediatorSerializerTest", () => {
  const factory = new DBReportFactory();
  const serializer = new DBReportMediatorSerializer();
  it("testDBReportMediator", () => {
        const xml = "<dbreport xmlns=\"http://ws.apache.org/ns/synapse\"><connection><pool><driver>org.apache.derby" +
                ".jdbc.ClientDriver</driver><url>jdbc:derby://localhost:1527/esbdb;" +
                "create=false</url><user>esb</user><password>esb</password></pool></connection><statement><sql" +
                "><![CDATA[update company set price=? where name =?]]></sql><parameter type=\"DOUBLE\" " +
                "expression=\"//m0:return/m1:last/child::text()\" xmlns:m1=\"http://services.samples/xsd\" " +
                "xmlns:m0=\"http://services.samples\"/><parameter type=\"VARCHAR\" " +
                "expression=\"//m0:return/m1:symbol/child::text()\" xmlns:m1=\"http://services.samples/xsd\" " +
                "xmlns:m0=\"http://services.samples\"/></statement></dbreport>";
        checkMediator(factory, serializer, xml, true);
  });
});
