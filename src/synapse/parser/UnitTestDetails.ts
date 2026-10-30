// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/UnitTestDetails.java by the java2ts converter (see tools/java2ts).
import { Node } from "./Node.js";

export class UnitTestDetails {
  static readonly __fields: string[] = ["serverDownloadLink", "serverVersion", "serverPath", "serverPort", "serverHost", "serverType", "skipTest"];

  serverDownloadLink?: Node;

  serverVersion?: Node;

  serverPath?: Node;

  serverPort?: Node;

  serverHost?: Node;

  serverType?: Node;

  skipTest?: Node;

  constructor() {

  }

  setSkipTest(skipTest: Node): void {
    this.skipTest = skipTest;

  }

  setServerType(serverType: Node): void {
    this.serverType = serverType;

  }

  setServerHost(serverHost: Node): void {
    this.serverHost = serverHost;

  }

  setServerPort(serverPort: Node): void {
    this.serverPort = serverPort;

  }

  setServerPath(serverPath: Node): void {
    this.serverPath = serverPath;

  }

  setServerVersion(serverVersion: Node): void {
    this.serverVersion = serverVersion;

  }

  setServerVersionDisplayValue(displayValue: string): void {
    this.serverVersion.setDisplayValue(displayValue);

  }

  getServerVersion(): Node {
    return this.serverVersion;

  }

  setServerDownloadLink(serverDownloadLink: Node): void {
    this.serverDownloadLink = serverDownloadLink;

  }

  getServerDownloadLink(): Node {
    return this.serverDownloadLink;

  }

  getServerPath(): Node {
    return this.serverPath;

  }

  getServerPort(): Node {
    return this.serverPort;

  }

  getServerHost(): Node {
    return this.serverHost;

  }

  getServerType(): Node {
    return this.serverType;

  }

  getSkipTest(): Node {
    return this.skipTest;

  }
}
