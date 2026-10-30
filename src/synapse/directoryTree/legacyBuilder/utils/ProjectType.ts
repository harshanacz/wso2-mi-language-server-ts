// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/legacyBuilder/utils/ProjectType.java by the java2ts converter (see tools/java2ts).

export class ProjectType {
  static readonly __fields: string[] = ["value"];

  value: string;

  static readonly ROOT_PROJECT = new ProjectType("ROOT_PROJECT", 0, "org.wso2.developerstudio.eclipse.mavenmultimodule.project.nature");
  static readonly DATA_SERVICE_CONFIGS = new ProjectType("DATA_SERVICE_CONFIGS", 1, "org.wso2.developerstudio.eclipse.ds.project.nature");
  static readonly ESB_CONFIGS = new ProjectType("ESB_CONFIGS", 2, "org.wso2.developerstudio.eclipse.esb.project.nature");
  static readonly COMPOSITE_EXPORTER = new ProjectType("COMPOSITE_EXPORTER", 3, "org.wso2.developerstudio.eclipse.distribution.project.nature");
  static readonly CONNECTOR_EXPORTER = new ProjectType("CONNECTOR_EXPORTER", 4, "org.wso2.developerstudio.eclipse.artifact.connector.project.nature");
  static readonly DATA_SOURCE_CONFIGS = new ProjectType("DATA_SOURCE_CONFIGS", 5, "org.wso2.developerstudio.eclipse.datasource.project.nature");
  static readonly MEDIATOR_PROJECT = new ProjectType("MEDIATOR_PROJECT", 6, "org.wso2.developerstudio.eclipse.artifact.mediator.project.nature");
  static readonly REGISTRY_RESOURCE = new ProjectType("REGISTRY_RESOURCE", 7, "org.wso2.developerstudio.eclipse.general.project.nature");
  static readonly DOCKER_EXPORTER = new ProjectType("DOCKER_EXPORTER", 8, "org.wso2.developerstudio.eclipse.docker.distribution.project.nature");
  static readonly KUBERNETES_EXPORTER = new ProjectType("KUBERNETES_EXPORTER", 9, "org.wso2.developerstudio.eclipse.kubernetes.distribution.project.nature");
  static readonly JAVA_LIBRARY_PROJECT = new ProjectType("JAVA_LIBRARY_PROJECT", 10, "org.wso2.developerstudio.eclipse.java.library.project.nature");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): ProjectType[] { return [ProjectType.ROOT_PROJECT, ProjectType.DATA_SERVICE_CONFIGS, ProjectType.ESB_CONFIGS, ProjectType.COMPOSITE_EXPORTER, ProjectType.CONNECTOR_EXPORTER, ProjectType.DATA_SOURCE_CONFIGS, ProjectType.MEDIATOR_PROJECT, ProjectType.REGISTRY_RESOURCE, ProjectType.DOCKER_EXPORTER, ProjectType.KUBERNETES_EXPORTER, ProjectType.JAVA_LIBRARY_PROJECT]; }
  static valueOf(name: string): ProjectType {
    const v = ProjectType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
