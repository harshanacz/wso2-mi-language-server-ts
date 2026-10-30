// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/ntlm/Ntlm.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";

export class Ntlm extends Mediator {
  static readonly __fields: string[] = ["domain", "host", "username", "password", "ntlmVersion", "description", "traceFilter"];

  domain?: string;

  host?: string;

  username?: string;

  password?: string;

  ntlmVersion?: string;

  description?: string;

  traceFilter?: string;

  constructor() {
    super();
    this.setDisplayName("NTLM");

  }

  getDomain(): string {
    return this.domain;

  }

  setDomain(domain: string): void {
    this.domain = domain;

  }

  getHost(): string {
    return this.host;

  }

  setHost(host: string): void {
    this.host = host;

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

  getNtlmVersion(): string {
    return this.ntlmVersion;

  }

  setNtlmVersion(ntlmVersion: string): void {
    this.ntlmVersion = ntlmVersion;

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
