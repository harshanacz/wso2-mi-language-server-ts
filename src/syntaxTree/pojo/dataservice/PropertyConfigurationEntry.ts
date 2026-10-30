// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/dataservice/PropertyConfigurationEntry.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../stNode.js";

export class PropertyConfigurationEntry extends STNode {
  static readonly __fields: string[] = ["username", "password", "request"];

  username?: STNode;

  password?: STNode;

  request?: string;

  getUsername(): STNode {
    return this.username;

  }

  setUsername(username: STNode): void {
    this.username = username;

  }

  getPassword(): STNode {
    return this.password;

  }

  setPassword(password: STNode): void {
    this.password = password;

  }

  getRequest(): string {
    return this.request;

  }

  setRequest(request: string): void {
    this.request = request;

  }
}
