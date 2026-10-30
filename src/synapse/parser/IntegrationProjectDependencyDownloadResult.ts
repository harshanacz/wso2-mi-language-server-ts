// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/IntegrationProjectDependencyDownloadResult.java by the java2ts converter (see tools/java2ts).

export class IntegrationProjectDependencyDownloadResult {
  static readonly __fields: string[] = ["failedDependencies", "noDescriptorDependencies", "versioningTypeMismatchDependencies"];

  failedDependencies?: string[];

  noDescriptorDependencies?: string[];

  versioningTypeMismatchDependencies?: string[];

  constructor(failedDependencies: string[], noDescriptorDependencies: string[], versioningTypeMismatchDependencies: string[]) {
    this.failedDependencies = failedDependencies;
    this.noDescriptorDependencies = noDescriptorDependencies;
    this.versioningTypeMismatchDependencies = versioningTypeMismatchDependencies;

  }

  getFailedDependencies(): string[] {
    return this.failedDependencies;

  }

  getNoDescriptorDependencies(): string[] {
    return this.noDescriptorDependencies;

  }

  getVersioningTypeMismatchDependencies(): string[] {
    return this.versioningTypeMismatchDependencies;

  }
}
