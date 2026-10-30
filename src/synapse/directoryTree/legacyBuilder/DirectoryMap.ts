// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/legacyBuilder/DirectoryMap.java by the java2ts converter (see tools/java2ts).
import { ESBNode } from "../node/ESBNode.js";
import { Node } from "../node/Node.js";

export class DirectoryMap {
  static readonly __fields: string[] = ["esbConfigs", "dataServiceConfigs", "dataSourceConfigs", "mediatorProjects", "registryResources", "javaLibraryProjects", "compositeExporters", "connectorExporters", "dockerExporters", "kubernetesExporters"];

  esbConfigs?: ESBNode[];

  dataServiceConfigs?: Node[];

  dataSourceConfigs?: Node[];

  mediatorProjects?: Node[];

  registryResources?: Node[];

  javaLibraryProjects?: Node[];

  compositeExporters?: Node[];

  connectorExporters?: Node[];

  dockerExporters?: Node[];

  kubernetesExporters?: Node[];

  constructor() {
    this.esbConfigs = [];
    this.dataServiceConfigs = [];
    this.dataSourceConfigs = [];
    this.mediatorProjects = [];
    this.registryResources = [];
    this.javaLibraryProjects = [];
    this.compositeExporters = [];
    this.connectorExporters = [];
    this.dockerExporters = [];
    this.kubernetesExporters = [];

  }

  addEsbComponent(esbNode: ESBNode): void {
    this.esbConfigs.push(esbNode);

  }

  addDataServiceConfig(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.dataServiceConfigs.push(component);

  }

  addDataSourceConfig(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.dataSourceConfigs.push(component);

  }

  addMediatorProject(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.mediatorProjects.push(component);

  }

  addRegistryResource(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.registryResources.push(component);

  }

  addJavaLibraryProject(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.javaLibraryProjects.push(component);

  }

  addCompositeExporter(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.compositeExporters.push(component);

  }

  addConnectorExporter(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.connectorExporters.push(component);

  }

  addDockerExporter(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.dockerExporters.push(component);

  }

  addKubernetesExporter(type: string, name: string, path: string): void {
    let component = new Node(type, name, path);
    this.kubernetesExporters.push(component);

  }

  getEsbConfigs(): ESBNode[] {
    return this.esbConfigs;

  }

  getDataServiceConfigs(): Node[] {
    return this.dataServiceConfigs;

  }

  getDataSourceConfigs(): Node[] {
    return this.dataSourceConfigs;

  }

  getMediatorProjects(): Node[] {
    return this.mediatorProjects;

  }

  getRegistryResources(): Node[] {
    return this.registryResources;

  }

  getJavaLibraryProjects(): Node[] {
    return this.javaLibraryProjects;

  }

  getCompositeExporters(): Node[] {
    return this.compositeExporters;

  }

  getConnectorExporters(): Node[] {
    return this.connectorExporters;

  }

  getDockerExporters(): Node[] {
    return this.dockerExporters;

  }

  getKubernetesExporters(): Node[] {
    return this.kubernetesExporters;

  }
}
