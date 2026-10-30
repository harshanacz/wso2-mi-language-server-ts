// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/OauthService.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../Mediator.js";

export class OauthService extends Mediator {
  remoteServiceUrl?: string;

  username?: string;

  password?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("OAuth");

  }

  getRemoteServiceUrl(): string {
    return this.remoteServiceUrl;

  }

  setRemoteServiceUrl(remoteServiceUrl: string): void {
    this.remoteServiceUrl = remoteServiceUrl;

  }

  getUsername(): string {
    return this.username;

  }

  setUsername(username: string): void {
    this.username = username;

  }

  getPassword(): string {
    return this.password;

  }

  setPassword(password: string): void {
    this.password = password;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
