import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { DBLookup } from "../../../src/syntaxTree/pojo/mediator/advanced/DbMediator/DBLookup.js";
import { DBLookupFactory } from "../../../src/syntaxTree/factory/mediators/advanced/DBLookupFactory.js";
import { DBLookupMediatorSerializer } from "../../../src/syntaxTree/serializer/mediator/data/DBLookupMediatorSerializer.js";
import { DbMediatorConnection } from "../../../src/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnection.js";
import { DbMediatorConnectionPool } from "../../../src/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnectionPool.js";
import { KeyAttribute } from "../../../src/syntaxTree/pojo/mediator/advanced/KeyAttribute.js";

describe("DBLookupMediatorSerializerTest", () => {
  const factory = new DBLookupFactory();
  const serializer = new DBLookupMediatorSerializer();
  it("testDBLookupMediator", () => {
        const xml = "<dblookup xmlns=\"http://ws.apache.org/ns/synapse\"><connection><pool><driver>org.apache.derby" +
                ".jdbc.ClientDriver</driver><url>jdbc:derby://localhost:1527/esbdb;" +
                "create=false</url><user>esb</user><password>esb</password></pool></connection><statement><sql" +
                "><![CDATA[select * from company where name =?]]></sql><parameter type=\"VARCHAR\" " +
                "expression=\"//m0:getQuote/m0:request/m0:symbol\" xmlns:m0=\"http://services.samples/xsd\"/><result " +
                "column=\"id\" name=\"company_id\"/></statement></dblookup>";
        checkMediator(factory, serializer, xml, true);
  });

  it("test", () => {        let dbLookup = new DBLookup();
        dbLookup.setDescription("DBLookup Mediator");
        let connection = new DbMediatorConnection();
        let pool = new DbMediatorConnectionPool();
        let driver = new KeyAttribute();
        driver.setValue("org.apache.derby.jdbc.ClientDriver");
        pool.setDriver(driver);
        let url = new KeyAttribute();
        url.setValue("jdbc:derby://localhost:1527/esbdb;create=false");
        pool.setUrl(url);
        let user = new KeyAttribute();
        user.setValue("esb");
        pool.setUser(user);
        connection.setPool(pool);
        dbLookup.setConnection(connection);
        let omElement = serializer.serializeMediator(null, dbLookup);
  });
});
