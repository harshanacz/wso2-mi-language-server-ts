// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/http/EndpointHttpAuthenticationOauthPasswordCredentials.java by the java2ts converter (see tools/java2ts).
import { EndpointHttpAuthenticationOauthRequestParameters } from "./EndpointHttpAuthenticationOauthRequestParameters.js";
import { STNode } from "../../../stNode.js";

export class EndpointHttpAuthenticationOauthPasswordCredentials extends STNode {
  static readonly __fields: string[] = ["username", "password", "clientId", "clientSecret", "refreshToken", "tokenUrl", "requestParameters", "authMode"];

  username?: STNode;

  password?: STNode;

  clientId?: STNode;

  clientSecret?: STNode;

  refreshToken?: STNode;

  tokenUrl?: STNode;

  requestParameters?: EndpointHttpAuthenticationOauthRequestParameters;

  authMode?: STNode;

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
