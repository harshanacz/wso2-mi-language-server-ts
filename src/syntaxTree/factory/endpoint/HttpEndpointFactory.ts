// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/endpoint/HttpEndpointFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty, getEnumFromValue } from "../../javaCompat.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { Constant } from "../../constant.js";
import { DOMElement } from "../../dom/dom.js";
import { DOMNode } from "../../dom/dom.js";
import { EnableSecAndEnableRMAndEnableAddressing } from "../../pojo/endpoint/http/EnableSecAndEnableRMAndEnableAddressing.js";
import { EndpointHttp } from "../../pojo/endpoint/http/EndpointHttp.js";
import { EndpointHttpAuthentication } from "../../pojo/endpoint/http/EndpointHttpAuthentication.js";
import { EndpointHttpAuthenticationBasicAuth } from "../../pojo/endpoint/http/EndpointHttpAuthenticationBasicAuth.js";
import { EndpointHttpAuthenticationOauth } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauth.js";
import { EndpointHttpAuthenticationOauthAuthorizationCode } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthAuthorizationCode.js";
import { EndpointHttpAuthenticationOauthClientCredentials } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthClientCredentials.js";
import { EndpointHttpAuthenticationOauthPasswordCredentials } from "../../pojo/endpoint/http/EndpointHttpAuthenticationOauthPasswordCredentials.js";
import { EndpointUtils } from "./EndpointUtils.js";
import { HttpMethod } from "../../pojo/endpoint/http/HttpMethod.js";
import { STNode } from "../../stNode.js";

export class HttpEndpointFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let httpEndpoint = new EndpointHttp();
    httpEndpoint.elementNode(element);
    this.populateAttributes(httpEndpoint, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let configs = new EnableSecAndEnableRMAndEnableAddressing();
        for (let node of children) {
            let name = node.getNodeName();
            if (equalsIgnoreCase(name, Constant.ENABLE_SEC)) {
                let enableSec = EndpointUtils.createEnableSec(node);
                configs.setEnableSec((enableSec));
            } else if (equalsIgnoreCase(name, Constant.ENABLE_RM)) {
                let enableRM = EndpointUtils.createEnableRM(node);
                configs.setEnableRM((enableRM));
            } else if (equalsIgnoreCase(name, Constant.ENABLE_ADDRESSING)) {
                let enableAddressing = EndpointUtils.createEnableAddressing(node);
                configs.setEnableAddressing((enableAddressing));
            } else if (equalsIgnoreCase(name, Constant.TIMEOUT)) {
                let timeout = EndpointUtils.createTimeout(node);
                configs.setTimeout((timeout));
            } else if (equalsIgnoreCase(name, Constant.SUSPEND_ON_FAILURE)) {
                let suspendOnFailure = EndpointUtils.createSuspendOnFailure(node);
                configs.setSuspendOnFailure((suspendOnFailure));
            } else if (equalsIgnoreCase(name, Constant.MARK_FOR_SUSPENSION)) {
                let markForSuspension = EndpointUtils.createMarkForSuspension(node);
                configs.setMarkForSuspension((markForSuspension));
            } else if (equalsIgnoreCase(name, Constant.AUTHENTICATION)) {
                let authentication = this.createAuthentication(node);
                configs.setAuthentication((authentication));
            } else if (equalsIgnoreCase(Constant.RETRY_CONFIG, name)) {
                let retryConfig = EndpointUtils.createRetryConfig(node);
                configs.setRetryConfig((retryConfig));
            }
        }
        httpEndpoint.setEnableSecAndEnableRMAndEnableAddressing(configs);
    }
    return httpEndpoint;

  }

  createAuthentication(node: DOMNode): EndpointHttpAuthentication {
    let authentication = new EndpointHttpAuthentication();
    authentication.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.OAUTH)) {
                let oauth = this.createOauth(child);
                authentication.setOauth(oauth);
            } else if (equalsIgnoreCase(name, Constant.BASIC_AUTH)) {
                let basicAuth = this.createBasicAuth(child);
                authentication.setBasicAuth(basicAuth);
            }
        }
    }
    return authentication;

  }

  createBasicAuth(element: DOMNode): EndpointHttpAuthenticationBasicAuth {
    let basicAuth = new EndpointHttpAuthenticationBasicAuth();
    basicAuth.elementNode((element as DOMElement));
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.USERNAME)) {
                let username = new STNode();
                username.elementNode((child as DOMElement));
                basicAuth.setUsername(username);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.PASSWORD)) {
                let password = new STNode();
                password.elementNode((child as DOMElement));
                basicAuth.setPassword(password);
            }
        }
    }
    return basicAuth;

  }

  createOauth(element: DOMNode): EndpointHttpAuthenticationOauth {
    let oauth = new EndpointHttpAuthenticationOauth();
    oauth.elementNode((element as DOMElement));
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.AUTHORIZATION_CODE)) {
                let authorizationCode = this.createAuthorizationCode(child);
                oauth.setAuthorizationCode(authorizationCode);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.CLIENT_CREDENTIALS)) {
                let clientCredentials = this.createClientCredentials(child);
                oauth.setClientCredentials(clientCredentials);
            } else if (equalsIgnoreCase(child.getNodeName(), Constant.PASSWORD_CREDENTIALS)) {
                let passwordCredentials =
                        this.createPasswordCredentials(child);
                oauth.setPasswordCredentials(passwordCredentials);
            }
        }
    }
    return oauth;

  }

  createAuthorizationCode(node: DOMNode): EndpointHttpAuthenticationOauthAuthorizationCode {
    let authorizationCode =
            new EndpointHttpAuthenticationOauthAuthorizationCode();
    authorizationCode.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.CLIENT_ID)) {
                let clientId = new STNode();
                clientId.elementNode((child as DOMElement));
                authorizationCode.setClientId(clientId);
            } else if (equalsIgnoreCase(name, Constant.CLIENT_SECRET)) {
                let clientSecret = new STNode();
                clientSecret.elementNode((child as DOMElement));
                authorizationCode.setClientSecret(clientSecret);
            } else if (equalsIgnoreCase(name, Constant.REFRESH_TOKEN)) {
                let refreshToken = new STNode();
                refreshToken.elementNode((child as DOMElement));
                authorizationCode.setRefreshToken(refreshToken);
            } else if (equalsIgnoreCase(name, Constant.TOKEN_URL)) {
                let tokenUrl = new STNode();
                tokenUrl.elementNode((child as DOMElement));
                authorizationCode.setTokenUrl(tokenUrl);
            } else if (equalsIgnoreCase(name, Constant.REQUEST_PARAMETERS)) {
                let requestParameters =
                        EndpointUtils.createOauthRequestParameters(child);
                requestParameters.elementNode((child as DOMElement));
                authorizationCode.setRequestParameters(requestParameters);
            } else if (equalsIgnoreCase(name, Constant.AUTH_MODE)) {
                let authMode = new STNode();
                authMode.elementNode((child as DOMElement));
                authorizationCode.setAuthMode(authMode);
            }
        }
    }
    return authorizationCode;

  }

  createClientCredentials(node: DOMNode): EndpointHttpAuthenticationOauthClientCredentials {
    let clientCredentials =
            new EndpointHttpAuthenticationOauthClientCredentials();
    clientCredentials.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.CLIENT_ID)) {
                let clientId = new STNode();
                clientId.elementNode((child as DOMElement));
                clientCredentials.setClientId(clientId);
            } else if (equalsIgnoreCase(name, Constant.CLIENT_SECRET)) {
                let clientSecret = new STNode();
                clientSecret.elementNode((child as DOMElement));
                clientCredentials.setClientSecret(clientSecret);
            } else if (equalsIgnoreCase(name, Constant.REFRESH_TOKEN)) {
                let refreshToken = new STNode();
                refreshToken.elementNode((child as DOMElement));
                clientCredentials.setRefreshToken(refreshToken);
            } else if (equalsIgnoreCase(name, Constant.TOKEN_URL)) {
                let tokenUrl = new STNode();
                tokenUrl.elementNode((child as DOMElement));
                clientCredentials.setTokenUrl(tokenUrl);
            } else if (equalsIgnoreCase(name, Constant.REQUEST_PARAMETERS)) {
                let requestParameters =
                        EndpointUtils.createOauthRequestParameters(child);
                requestParameters.elementNode((child as DOMElement));
                clientCredentials.setRequestParameters(requestParameters);
            } else if (equalsIgnoreCase(name, Constant.AUTH_MODE)) {
                let authMode = new STNode();
                authMode.elementNode((child as DOMElement));
                clientCredentials.setAuthMode(authMode);
            }
        }
    }
    return clientCredentials;

  }

  createPasswordCredentials(node: DOMNode): EndpointHttpAuthenticationOauthPasswordCredentials {
    let passwordCredentials =
            new EndpointHttpAuthenticationOauthPasswordCredentials();
    passwordCredentials.elementNode((node as DOMElement));
    let children = node.getChildren();
    if (children != null && !isEmpty(children)) {
        for (let child of children) {
            let name = child.getNodeName();
            if (equalsIgnoreCase(name, Constant.USERNAME)) {
                let username = new STNode();
                username.elementNode((child as DOMElement));
                passwordCredentials.setUsername(username);
            } else if (equalsIgnoreCase(name, Constant.PASSWORD)) {
                let password = new STNode();
                password.elementNode((child as DOMElement));
                passwordCredentials.setPassword(password);
            } else if (equalsIgnoreCase(name, Constant.CLIENT_ID)) {
                let clientId = new STNode();
                clientId.elementNode((child as DOMElement));
                passwordCredentials.setClientId(clientId);
            } else if (equalsIgnoreCase(name, Constant.CLIENT_SECRET)) {
                let clientSecret = new STNode();
                clientSecret.elementNode((child as DOMElement));
                passwordCredentials.setClientSecret(clientSecret);
            } else if (equalsIgnoreCase(name, Constant.REFRESH_TOKEN)) {
                let refreshToken = new STNode();
                refreshToken.elementNode((child as DOMElement));
                passwordCredentials.setRefreshToken(refreshToken);
            } else if (equalsIgnoreCase(name, Constant.TOKEN_URL)) {
                let tokenUrl = new STNode();
                tokenUrl.elementNode((child as DOMElement));
                passwordCredentials.setTokenUrl(tokenUrl);
            } else if (equalsIgnoreCase(name, Constant.REQUEST_PARAMETERS)) {
                let requestParameters =
                        EndpointUtils.createOauthRequestParameters(child);
                passwordCredentials.setRequestParameters(requestParameters);
            } else if (equalsIgnoreCase(name, Constant.AUTH_MODE)) {
                let authMode = new STNode();
                authMode.elementNode((child as DOMElement));
                passwordCredentials.setAuthMode(authMode);
            }
        }
    }
    return passwordCredentials;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let uriTemplate = element.getAttribute(Constant.URI_TEMPLATE);
    if (uriTemplate != null && !isEmpty(uriTemplate)) {
        ((node as EndpointHttp)).setUriTemplate(uriTemplate);
    }
    let method = element.getAttribute(Constant.METHOD);
    let methodEnum = getEnumFromValue(method, HttpMethod);
    if (methodEnum != null) {
        ((node as EndpointHttp)).setMethod(methodEnum);
    }
    let statistics = element.getAttribute(Constant.STATISTICS);
    if (statistics != null && !isEmpty(statistics)) {
        ((node as EndpointHttp)).setStatistics(statistics);
    }
    let trace = element.getAttribute(Constant.TRACE);
    if (trace != null && !isEmpty(trace)) {
        ((node as EndpointHttp)).setTrace(trace);
    }

  }
}
