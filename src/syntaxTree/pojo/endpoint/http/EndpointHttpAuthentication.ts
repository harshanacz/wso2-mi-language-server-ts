// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthentication.java by the java2ts converter (see tools/java2ts).
import { EndpointHttpAuthenticationBasicAuth } from "./EndpointHttpAuthenticationBasicAuth.js";
import { EndpointHttpAuthenticationOauth } from "./EndpointHttpAuthenticationOauth.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthentication extends STNode {
  oauth?: EndpointHttpAuthenticationOauth;

  basicAuth?: EndpointHttpAuthenticationBasicAuth;

  getOauth(): EndpointHttpAuthenticationOauth {
    return this.oauth;

  }

  setOauth(oauth: EndpointHttpAuthenticationOauth): void {
    this.oauth = oauth;

  }

  getBasicAuth(): EndpointHttpAuthenticationBasicAuth {
    return this.basicAuth;

  }

  setBasicAuth(basicAuth: EndpointHttpAuthenticationBasicAuth): void {
    this.basicAuth = basicAuth;

  }
}
