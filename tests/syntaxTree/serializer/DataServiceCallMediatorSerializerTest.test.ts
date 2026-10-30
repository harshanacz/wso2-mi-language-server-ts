import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { DataServiceCallMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/data/DataServiceCallMediatorSerializer.js";
import { DataServiceFactory } from "../../../src/syntaxTree/factory/mediators/advanced/DataServiceFactory.js";

describe("DataServiceCallMediatorSerializerTest", () => {
  const factory = new DataServiceFactory();
  const serializer = new DataServiceCallMediatorSerializer();
  it("testSimpleDataServiceCall", () => {
        const xml = "<dataServiceCall xmlns=\"http://ws.apache.org/ns/synapse\" " +
                "serviceName=\"DSSCallMediatorTest\"><source type=\"body\"/><target type=\"body\"/></dataServiceCall>";
        checkMediator(factory, serializer, xml, true);
  });

  it("testDataServiceCall", () => {
        const xml = "<dataServiceCall xmlns=\"http://ws.apache.org/ns/synapse\" " +
                "serviceName=\"DSSCallMediatorTest\"><source type=\"inline\"/><operations " +
                "type=\"request-box\"><operation name=\"addEmployee\"><param name=\"employeeNumber\" " +
                "value=\"444\"/><param name=\"firstname\" value=\"Ellie\"/><param name=\"lastName\" " +
                "value=\"Dina\"/><param name=\"email\" value=\"dina@wso2.com\"/><param name=\"salary\" " +
                "value=\"4000\"/></operation><operation name=\"getEmployeeByNumber\"><param name=\"employeeNumber\" " +
                "value=\"444\"/></operation></operations><target type=\"body\"/></dataServiceCall>";
        checkMediator(factory, serializer, xml, true);
  });
});
