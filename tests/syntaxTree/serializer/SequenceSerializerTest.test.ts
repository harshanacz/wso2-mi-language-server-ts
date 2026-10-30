import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { Connector } from "../../../src/syntaxTree/pojo/connector/Connector.js";
import { ConnectorParameter } from "../../../src/syntaxTree/pojo/connector/ConnectorParameter.js";
import { EnableDisable } from "../../../src/syntaxTree/pojo/api/EnableDisable.js";
import { NamedSequence } from "../../../src/syntaxTree/pojo/NamedSequence.js";
import { Property } from "../../../src/syntaxTree/pojo/mediator/core/Property.js";
import { PropertyMediatorType } from "../../../src/syntaxTree/pojo/mediator/core/PropertyMediatorType.js";
import { PropertyScope } from "../../../src/syntaxTree/pojo/mediator/core/PropertyScope.js";
import { SequenceFactory } from "../../../src/syntaxTree/factory/misc/SequenceFactory.js";
import { SequenceSerializer } from "../../../src/syntaxTree/serializer/SequenceSerializer.js";

describe("SequenceSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new SequenceFactory().create(e), (n) => SequenceSerializer.serializeSequence(n), xml);
  it("testSerializeSequence", () => {        let sequence = new NamedSequence();
        sequence.setName("salesforce_servicenow_seq");
        sequence.setTrace(EnableDisable.disable);
        let mediatorList = [];
        let connector1 = new Connector();
        connector1.setConnectorName("salesforce");
        connector1.setMethod("query");
        connector1.setConfigKey("SALESFORCESOAP_CONNECTION_1");
        let connector1Param1 = new ConnectorParameter();
        connector1Param1.setName("batchSize");
        connector1Param1.setValue("1");
        connector1.addParameter(connector1Param1);
        let connector1Param2 = new ConnectorParameter();
        connector1Param2.setName("queryString");
        connector1Param2.setValue("SELECT\n" +
                "Id, Name, type ,IsDeleted ,CleanStatus ,OwnerId\n" +
                "FROM Account where Id = '0015g00000JBuFbAAL'");
        connector1.addParameter(connector1Param2);
        mediatorList.push(connector1);
        let property1 = new Property();
        property1.setName("messageType");
        property1.setScope(PropertyScope.AXIS2);
        property1.setType(PropertyMediatorType.DOUBLE);
        property1.setValue("application/json");
        mediatorList.push(property1);
        let property2 = new Property();
        property2.setExpression("json-eval($.queryResponse.result.records.Id[0])");
        property2.setName("Incident");
        property2.setScope(PropertyScope.DEFAULT);
        property2.setType(PropertyMediatorType.STRING);
        mediatorList.push(property2);
        let property3 = new Property();
        property3.setExpression("concat('WSO2 incident Creation',' ', $ctx:Incident)");
        property3.setName("shortDescription");
        property3.setScope(PropertyScope.DEFAULT);
        property3.setType(PropertyMediatorType.STRING);
        mediatorList.push(property3);
        let connector2 = new Connector();
        connector2.setConnectorName("servicenow");
        connector2.setMethod("init");
        let connector2Param1 = new ConnectorParameter();
        connector2Param1.setName("serviceNowInstanceURL");
        connector2Param1.setValue("https://dev248446.service-now.com");
        connector2.addParameter(connector2Param1);
        let connector2Param2 = new ConnectorParameter();
        connector2Param2.setName("username");
        connector2Param2.setValue("admin");
        connector2.addParameter(connector2Param2);
        let connector2Param3 = new ConnectorParameter();
        connector2Param3.setName("password");
        connector2Param3.setValue("J=TQuc!Y4ho3");
        connector2.addParameter(connector2Param3);
        mediatorList.push(connector2);
        sequence.setMediatorList(mediatorList);
        let xml = SequenceSerializer.serializeSequence(sequence);
        let expected = "<sequence xmlns=\"http://ws.apache.org/ns/synapse\" name=\"salesforce_servicenow_seq\" trace=\"disable\">" +
                "<salesforce.query configKey=\"SALESFORCESOAP_CONNECTION_1\">" +
                "<batchSize>1</batchSize>" +
                "<queryString>SELECT\n" +
                "Id, Name, type ,IsDeleted ,CleanStatus ,OwnerId\n" +
                "FROM Account where Id = '0015g00000JBuFbAAL'</queryString>" +
                "</salesforce.query>" +
                "<property name=\"messageType\" value=\"application/json\" scope=\"axis2\" type=\"DOUBLE\"/>" +
                "<property name=\"Incident\" expression=\"json-eval($.queryResponse.result.records.Id[0])\" scope=\"default\" type=\"STRING\"/>" +
                "<property name=\"shortDescription\" expression=\"concat('WSO2 incident Creation',' ', $ctx:Incident)\" scope=\"default\" type=\"STRING\"/>" +
                "<servicenow.init>" +
                "<serviceNowInstanceURL>https://dev248446.service-now.com</serviceNowInstanceURL>" +
                "<username>admin</username>" +
                "<password>J=TQuc!Y4ho3</password>" +
                "</servicenow.init>" +
                "</sequence>";
        expect(xml).toBe(expected);
  });
});
