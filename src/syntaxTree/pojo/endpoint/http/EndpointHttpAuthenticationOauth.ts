// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthenticationOauth.java by the java2ts converter (see tools/java2ts).
import { EndpointHttpAuthenticationOauthAuthorizationCode } from "./EndpointHttpAuthenticationOauthAuthorizationCode.js";
import { EndpointHttpAuthenticationOauthClientCredentials } from "./EndpointHttpAuthenticationOauthClientCredentials.js";
import { EndpointHttpAuthenticationOauthPasswordCredentials } from "./EndpointHttpAuthenticationOauthPasswordCredentials.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthenticationOauth extends STNode {
  authorizationCode?: EndpointHttpAuthenticationOauthAuthorizationCode;

  clientCredentials?: EndpointHttpAuthenticationOauthClientCredentials;

  passwordCredentials?: EndpointHttpAuthenticationOauthPasswordCredentials;

  getAuthorizationCode(): EndpointHttpAuthenticationOauthAuthorizationCode {
    return this.authorizationCode;

  }

  setAuthorizationCode(authorizationCode: EndpointHttpAuthenticationOauthAuthorizationCode): void {
    this.authorizationCode = authorizationCode;

  }

  getClientCredentials(): EndpointHttpAuthenticationOauthClientCredentials {
    return this.clientCredentials;

  }

  setClientCredentials(clientCredentials: EndpointHttpAuthenticationOauthClientCredentials): void {
    this.clientCredentials = clientCredentials;

  }

  getPasswordCredentials(): EndpointHttpAuthenticationOauthPasswordCredentials {
    return this.passwordCredentials;

  }

  setPasswordCredentials(passwordCredentials: EndpointHttpAuthenticationOauthPasswordCredentials): void {
    this.passwordCredentials = passwordCredentials;

  }
}
