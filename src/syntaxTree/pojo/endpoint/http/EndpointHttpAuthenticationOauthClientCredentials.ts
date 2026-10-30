// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthenticationOauthClientCredentials.java by the java2ts converter (see tools/java2ts).
import { EndpointHttpAuthenticationOauthRequestParameters } from "./EndpointHttpAuthenticationOauthRequestParameters.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthenticationOauthClientCredentials extends STNode {
  clientId?: STNode;

  clientSecret?: STNode;

  refreshToken?: STNode;

  tokenUrl?: STNode;

  requestParameters?: EndpointHttpAuthenticationOauthRequestParameters;

  authMode?: STNode;

  getClientId(): STNode {
    return this.clientId;

  }

  setClientId(clientId: STNode): void {
    this.clientId = clientId;

  }

  getClientSecret(): STNode {
    return this.clientSecret;

  }

  setClientSecret(clientSecret: STNode): void {
    this.clientSecret = clientSecret;

  }

  getRefreshToken(): STNode {
    return this.refreshToken;

  }

  setRefreshToken(refreshToken: STNode): void {
    this.refreshToken = refreshToken;

  }

  getTokenUrl(): STNode {
    return this.tokenUrl;

  }

  setTokenUrl(tokenUrl: STNode): void {
    this.tokenUrl = tokenUrl;

  }

  getRequestParameters(): EndpointHttpAuthenticationOauthRequestParameters {
    return this.requestParameters;

  }

  setRequestParameters(requestParameters: EndpointHttpAuthenticationOauthRequestParameters): void {
    this.requestParameters = requestParameters;

  }

  getAuthMode(): STNode {
    return this.authMode;

  }

  setAuthMode(authMode: STNode): void {
    this.authMode = authMode;

  }
}
