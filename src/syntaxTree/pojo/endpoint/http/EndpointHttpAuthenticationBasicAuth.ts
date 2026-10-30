// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthenticationBasicAuth.java by the java2ts converter (see tools/java2ts).
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthenticationBasicAuth extends STNode {
  username?: STNode;

  password?: STNode;

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
}
