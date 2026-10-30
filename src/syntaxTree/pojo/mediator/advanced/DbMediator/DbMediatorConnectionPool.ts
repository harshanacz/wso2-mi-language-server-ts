// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediatorConnectionPool.java by the java2ts converter (see tools/java2ts).
import { DbMediatorConnectionPoolProperty } from "./DbMediatorConnectionPoolProperty.js";
import { KeyAttribute } from "../KeyAttribute.js";
import { STNode } from "../../../../stNode.js";

export class DbMediatorConnectionPool extends STNode {
  static readonly __fields: string[] = ["dsName", "icClass", "driver", "url", "user", "password", "property"];

  dsName?: KeyAttribute;

  icClass?: KeyAttribute;

  driver?: KeyAttribute;

  url?: KeyAttribute;

  user?: KeyAttribute;

  password?: KeyAttribute;

  property?: DbMediatorConnectionPoolProperty[];

  getDsName(): KeyAttribute {
    return this.dsName;

  }

  setDsName(dsName: KeyAttribute): void {
    this.dsName = dsName;

  }

  getIcClass(): KeyAttribute {
    return this.icClass;

  }

  setIcClass(icClass: KeyAttribute): void {
    this.icClass = icClass;

  }

  getDriver(): KeyAttribute {
    return this.driver;

  }

  setDriver(driver: KeyAttribute): void {
    this.driver = driver;

  }

  getUrl(): KeyAttribute {
    return this.url;

  }

  setUrl(url: KeyAttribute): void {
    this.url = url;

  }

  getUser(): KeyAttribute {
    return this.user;

  }

  setUser(user: KeyAttribute): void {
    this.user = user;

  }

  getPassword(): KeyAttribute {
    return this.password;

  }

  setPassword(password: KeyAttribute): void {
    this.password = password;

  }

  getProperty(): DbMediatorConnectionPoolProperty[] {
    return this.property;

  }

  setProperty(property: DbMediatorConnectionPoolProperty[]): void {
    this.property = property;

  }
}
