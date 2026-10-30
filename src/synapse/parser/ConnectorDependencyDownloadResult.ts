// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/ConnectorDependencyDownloadResult.java by the java2ts converter (see tools/java2ts).

export class ConnectorDependencyDownloadResult {
  static readonly __fields: string[] = ["failedDependencies", "fromIntegrationProjectDependencies"];

  failedDependencies?: string[];

  fromIntegrationProjectDependencies?: string[];

  constructor(failedDependencies: string[], fromIntegrationProjectDependencies: string[]) {
    this.failedDependencies = failedDependencies;
    this.fromIntegrationProjectDependencies = fromIntegrationProjectDependencies;

  }

  getFailedDependencies(): string[] {
    return this.failedDependencies;

  }

  getFromIntegrationProjectDependencies(): string[] {
    return this.fromIntegrationProjectDependencies;

  }
}
