// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/endpoint/HTTPEndpointSerializer.java by the java2ts converter (see tools/java2ts).
import { EndpointHttp } from "../../pojo/endpoint/http/EndpointHttp.js";
import { EndpointHttpAuthenticationBasicAuth } from "../../pojo/endpoint/http/EndpointHttpAuthenticationBasicAuth.js";
import { EndpointHttpAuthenticationOauth } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauth.js";
import { EndpointHttpAuthenticationOauthAuthorizationCode } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthAuthorizationCode.js";
import { EndpointHttpAuthenticationOauthClientCredentials } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthClientCredentials.js";
import { EndpointHttpAuthenticationOauthPasswordCredentials } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthPasswordCredentials.js";
import { EndpointHttpAuthenticationOauthRequestParameters } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthRequestParameters.js";
import { EndpointSerializer } from "./EndpointSerializer.js";
import { NamedEndpoint } from "../../pojo/endpoint/NamedEndpoint.js";
import { OMElement } from "../../om/om.js";

export class HTTPEndpointSerializer extends EndpointSerializer {
  serializeSpecificEndpoint(endpoint: NamedEndpoint): OMElement {
    let httpEndpoint = endpoint.getHttp();
    if (httpEndpoint == null) {
        HTTPEndpointSerializer.handleException("Could not find the http endpoint.");
    }

    let httpElement = this.serializeHttpEndpoint(httpEndpoint);

    return httpElement;

  }

  serializeHttpEndpoint(httpEndpoint: EndpointHttp): OMElement {
    let httpElement = EndpointSerializer.fac.createOMElement("http", EndpointSerializer.synNS);
    this.serializeEndpointConfigurations(httpElement, httpEndpoint);
    return httpElement;

  }

  serializeEndpointConfigurations(httpElement: OMElement, httpEndpoint: EndpointHttp): void {
    this.serializeQOSProperties(httpElement, httpEndpoint);
    this.serializeCommonEndpointProperties(httpElement, httpEndpoint);
    this.serializeAuthenticationProperties(httpElement, httpEndpoint);
    this.serializeAttributes(httpElement, httpEndpoint);

  }

  serializeQOSProperties(httpElement: OMElement, httpEndpoint: EndpointHttp): void {
    let configs = httpEndpoint.getEnableSecAndEnableRMAndEnableAddressing();
    if (configs != null) {
        if (configs.getEnableSec() != null && (configs.getEnableSec() != null)) {
            let enableSecElt = this.serializeEnableSec(configs.getEnableSec());
            httpElement.addChild(enableSecElt);
        }
        if (configs.getEnableRM() != null && (configs.getEnableRM() != null)) {
            let enableRMElt = this.serializeEnableRM(configs.getEnableRM());
            httpElement.addChild(enableRMElt);
        }
        if (configs.getEnableAddressing() != null && (configs.getEnableAddressing() != null)) {
            let enableAddressingElt = this.serializeEnableAddressing(configs.getEnableAddressing());
            httpElement.addChild(enableAddressingElt);
        }
    }

  }

  serializeCommonEndpointProperties(httpElement: OMElement, httpEndpoint: EndpointHttp): void {
    let configs = httpEndpoint.getEnableSecAndEnableRMAndEnableAddressing();
    if (configs != null) {
        if (configs.getTimeout() != null && (configs.getTimeout() != null)) {
            let timeoutElt = this.serializeTimeout(configs.getTimeout());
            httpElement.addChild(timeoutElt);
        }
        if (configs.getSuspendOnFailure() != null && (configs.getSuspendOnFailure() != null)) {
            let suspendOnFailureElt = this.serializeSuspendOnFailure(configs.getSuspendOnFailure());
            httpElement.addChild(suspendOnFailureElt);
        }
        if (configs.getMarkForSuspension() != null && (configs.getMarkForSuspension() != null)) {
            let markForSuspensionElt = this.serializeMarkForSuspension(configs.getMarkForSuspension());
            httpElement.addChild(markForSuspensionElt);
        }
        if (configs.getRetryConfig() != null && (configs.getRetryConfig() != null)) {
            let retryConfigElt = this.serializeRetryConfig(configs.getRetryConfig());
            httpElement.addChild(retryConfigElt);
        }
    }

  }

  serializeAuthenticationProperties(httpElement: OMElement, httpEndpoint: EndpointHttp): void {
    let configs = httpEndpoint.getEnableSecAndEnableRMAndEnableAddressing();
    if (configs != null && configs.getAuthentication() != null && (configs.getAuthentication() != null)) {
        let authenticationElt = EndpointSerializer.fac.createOMElement("authentication", EndpointSerializer.synNS);
        let authentication = configs.getAuthentication();
        if (authentication.getBasicAuth() != null) {
            this.serializeBasicAuth(authenticationElt, authentication.getBasicAuth());
        } else if (authentication.getOauth() != null) {
            this.serializeOAuth(authenticationElt, authentication.getOauth());
        }
        httpElement.addChild(authenticationElt);
    }

  }

  serializeBasicAuth(httpElement: OMElement, basicAuth: EndpointHttpAuthenticationBasicAuth): void {
    let basicAuthElt = EndpointSerializer.fac.createOMElement("basicAuth", EndpointSerializer.synNS);
    if (basicAuth.getUsername() != null) {
        let usernameElt = EndpointSerializer.fac.createOMElement("username", EndpointSerializer.synNS);
        usernameElt.setText(basicAuth.getUsername().getTextNode());
        basicAuthElt.addChild(usernameElt);
    }
    if (basicAuth.getPassword() != null) {
        let passwordElt = EndpointSerializer.fac.createOMElement("password", EndpointSerializer.synNS);
        passwordElt.setText(basicAuth.getPassword().getTextNode());
        basicAuthElt.addChild(passwordElt);
    }
    httpElement.addChild(basicAuthElt);

  }

  serializeOAuth(httpElement: OMElement, oauth: EndpointHttpAuthenticationOauth): void {
    let oauthElt = EndpointSerializer.fac.createOMElement("oauth", EndpointSerializer.synNS);
    if (oauth.getAuthorizationCode() != null) {
        let authCodeElt = EndpointSerializer.fac.createOMElement("authorizationCode", EndpointSerializer.synNS);
        let authCode = oauth.getAuthorizationCode();
        this.serializeOauthParams(authCodeElt, authCode);
        oauthElt.addChild(authCodeElt);
    } else if (oauth.getClientCredentials() != null) {
        let clientCredentialsElt = EndpointSerializer.fac.createOMElement("clientCredentials", EndpointSerializer.synNS);
        let clientCredentials = oauth.getClientCredentials();
        this.serializeOauthParams(clientCredentialsElt, clientCredentials);
        oauthElt.addChild(clientCredentialsElt);
    } else if (oauth.getPasswordCredentials() != null) {
        let passwordCredentialsElt = this.serializePasswordCredentials(oauth.getPasswordCredentials());
        oauthElt.addChild(passwordCredentialsElt);
    }
    httpElement.addChild(oauthElt);

  }

  serializePasswordCredentials(passwordCredentials: EndpointHttpAuthenticationOauthPasswordCredentials): OMElement {
    let passwordCredentialsElt = EndpointSerializer.fac.createOMElement("passwordCredentials", EndpointSerializer.synNS);
    if (passwordCredentials.getUsername() != null) {
        let usernameElt = EndpointSerializer.fac.createOMElement("username", EndpointSerializer.synNS);
        usernameElt.setText(passwordCredentials.getUsername().getTextNode());
        passwordCredentialsElt.addChild(usernameElt);
    }
    if (passwordCredentials.getPassword() != null) {
        let passwordElt = EndpointSerializer.fac.createOMElement("password", EndpointSerializer.synNS);
        passwordElt.setText(passwordCredentials.getPassword().getTextNode());
        passwordCredentialsElt.addChild(passwordElt);
    }
    this.serializeOauthParams(passwordCredentialsElt, passwordCredentials);
    return passwordCredentialsElt;

  }

  serializeOauthParams(authorizationCodeElt: OMElement, authorizationCode: EndpointHttpAuthenticationOauthAuthorizationCode): void;
  serializeOauthParams(clientCredentialsElt: OMElement, clientCredentials: EndpointHttpAuthenticationOauthClientCredentials): void;
  serializeOauthParams(passwordCredentialsElt: OMElement, passwordCredentials: EndpointHttpAuthenticationOauthPasswordCredentials): void;
  serializeOauthParams(...args: any[]): any {
    switch (args.length) {
      case 2: {
        if (args[1] instanceof EndpointHttpAuthenticationOauthAuthorizationCode) {
          const [authorizationCodeElt, authorizationCode] = args;


                  if (authorizationCode.getClientId() != null) {
                      let clientIdElt = EndpointSerializer.fac.createOMElement("clientId", EndpointSerializer.synNS);
                      clientIdElt.setText(authorizationCode.getClientId().getTextNode());
                      authorizationCodeElt.addChild(clientIdElt);
                  }
                  if (authorizationCode.getClientSecret() != null) {
                      let clientSecretElt = EndpointSerializer.fac.createOMElement("clientSecret", EndpointSerializer.synNS);
                      clientSecretElt.setText(authorizationCode.getClientSecret().getTextNode());
                      authorizationCodeElt.addChild(clientSecretElt);
                  }
                  if (authorizationCode.getRefreshToken() != null) {
                      let refreshTokenElt = EndpointSerializer.fac.createOMElement("refreshToken", EndpointSerializer.synNS);
                      refreshTokenElt.setText(authorizationCode.getRefreshToken().getTextNode());
                      authorizationCodeElt.addChild(refreshTokenElt);
                  }
                  if (authorizationCode.getTokenUrl() != null) {
                      let tokenUrlElt = EndpointSerializer.fac.createOMElement("tokenUrl", EndpointSerializer.synNS);
                      tokenUrlElt.setText(authorizationCode.getTokenUrl().getTextNode());
                      authorizationCodeElt.addChild(tokenUrlElt);
                  }
                  if (authorizationCode.getRequestParameters() != null) {
                      let requestParametersElt = this.serializeRequestParameters(authorizationCode.getRequestParameters());
                      authorizationCodeElt.addChild(requestParametersElt);
                  }
                  if (authorizationCode.getAuthMode() != null) {
                      let authModeElt = EndpointSerializer.fac.createOMElement("authMode", EndpointSerializer.synNS);
                      authModeElt.setText(authorizationCode.getAuthMode().getTextNode());
                      authorizationCodeElt.addChild(authModeElt);
                  }

        } else if (args[1] instanceof EndpointHttpAuthenticationOauthClientCredentials) {
          const [clientCredentialsElt, clientCredentials] = args;


                  if (clientCredentials.getClientId() != null) {
                      let clientIdElt = EndpointSerializer.fac.createOMElement("clientId", EndpointSerializer.synNS);
                      clientIdElt.setText(clientCredentials.getClientId().getTextNode());
                      clientCredentialsElt.addChild(clientIdElt);
                  }
                  if (clientCredentials.getClientSecret() != null) {
                      let clientSecretElt = EndpointSerializer.fac.createOMElement("clientSecret", EndpointSerializer.synNS);
                      clientSecretElt.setText(clientCredentials.getClientSecret().getTextNode());
                      clientCredentialsElt.addChild(clientSecretElt);
                  }
                  if (clientCredentials.getRefreshToken() != null) {
                      let refreshTokenElt = EndpointSerializer.fac.createOMElement("refreshToken", EndpointSerializer.synNS);
                      refreshTokenElt.setText(clientCredentials.getRefreshToken().getTextNode());
                      clientCredentialsElt.addChild(refreshTokenElt);
                  }
                  if (clientCredentials.getTokenUrl() != null) {
                      let tokenUrlElt = EndpointSerializer.fac.createOMElement("tokenUrl", EndpointSerializer.synNS);
                      tokenUrlElt.setText(clientCredentials.getTokenUrl().getTextNode());
                      clientCredentialsElt.addChild(tokenUrlElt);
                  }
                  if (clientCredentials.getRequestParameters() != null) {
                      let requestParametersElt = this.serializeRequestParameters(clientCredentials.getRequestParameters());
                      clientCredentialsElt.addChild(requestParametersElt);
                  }
                  if (clientCredentials.getAuthMode() != null) {
                      let authModeElt = EndpointSerializer.fac.createOMElement("authMode", EndpointSerializer.synNS);
                      authModeElt.setText(clientCredentials.getAuthMode().getTextNode());
                      clientCredentialsElt.addChild(authModeElt);
                  }

        } else if (args[1] instanceof EndpointHttpAuthenticationOauthPasswordCredentials) {
          const [passwordCredentialsElt, passwordCredentials] = args;


                  if (passwordCredentials.getClientId() != null) {
                      let clientIdElt = EndpointSerializer.fac.createOMElement("clientId", EndpointSerializer.synNS);
                      clientIdElt.setText(passwordCredentials.getClientId().getTextNode());
                      passwordCredentialsElt.addChild(clientIdElt);
                  }
                  if (passwordCredentials.getClientSecret() != null) {
                      let clientSecretElt = EndpointSerializer.fac.createOMElement("clientSecret", EndpointSerializer.synNS);
                      clientSecretElt.setText(passwordCredentials.getClientSecret().getTextNode());
                      passwordCredentialsElt.addChild(clientSecretElt);
                  }
                  if (passwordCredentials.getRefreshToken() != null) {
                      let refreshTokenElt = EndpointSerializer.fac.createOMElement("refreshToken", EndpointSerializer.synNS);
                      refreshTokenElt.setText(passwordCredentials.getRefreshToken().getTextNode());
                      passwordCredentialsElt.addChild(refreshTokenElt);
                  }
                  if (passwordCredentials.getTokenUrl() != null) {
                      let tokenUrlElt = EndpointSerializer.fac.createOMElement("tokenUrl", EndpointSerializer.synNS);
                      tokenUrlElt.setText(passwordCredentials.getTokenUrl().getTextNode());
                      passwordCredentialsElt.addChild(tokenUrlElt);
                  }
                  if (passwordCredentials.getRequestParameters() != null) {
                      let requestParametersElt = this.serializeRequestParameters(passwordCredentials.getRequestParameters());
                      passwordCredentialsElt.addChild(requestParametersElt);
                  }
                  if (passwordCredentials.getAuthMode() != null) {
                      let authModeElt = EndpointSerializer.fac.createOMElement("authMode", EndpointSerializer.synNS);
                      authModeElt.setText(passwordCredentials.getAuthMode().getTextNode());
                      passwordCredentialsElt.addChild(authModeElt);
                  }

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  serializeRequestParameters(requestParameters: EndpointHttpAuthenticationOauthRequestParameters): OMElement {
    let requestParametersElt = EndpointSerializer.fac.createOMElement("requestParameters", EndpointSerializer.synNS);
    let parameters = requestParameters.getParameter();
    if (parameters != null) {
        for (let parameter of parameters) {
            let parameterElt = EndpointSerializer.fac.createOMElement("parameter", EndpointSerializer.synNS);
            if (parameter.getName() != null) {
                parameterElt.addAttribute("name", parameter.getName(), EndpointSerializer.nullNS);
            }
            if (parameter.getTextNode() != null) {
                parameterElt.setText(parameter.getTextNode());
            }
            requestParametersElt.addChild(parameterElt);
        }
    }
    return requestParametersElt;

  }

  serializeAttributes(endpointElement: OMElement, httpEndpoint: EndpointHttp): void {
    if (httpEndpoint.getUriTemplate() != null) {
        endpointElement.addAttribute("uri-template", httpEndpoint.getUriTemplate(), EndpointSerializer.nullNS);
    }
    if (httpEndpoint.getMethod() != null) {
        endpointElement.addAttribute("method", httpEndpoint.getMethod().name(), EndpointSerializer.nullNS);
    }
    if (httpEndpoint.getStatistics() != null) {
        endpointElement.addAttribute("statistics", httpEndpoint.getStatistics(), EndpointSerializer.nullNS);
    }
    if (httpEndpoint.getTrace() != null) {
        endpointElement.addAttribute("trace", httpEndpoint.getTrace(), EndpointSerializer.nullNS);
    }

  }
}
