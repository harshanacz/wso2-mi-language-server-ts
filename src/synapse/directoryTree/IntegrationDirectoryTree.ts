// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/directoryTree/IntegrationDirectoryTree.java by the java2ts converter (see tools/java2ts).
import { Comparator } from "../../syntaxTree/javaCompat.js";
import { APINode } from "./node/APINode.js";
import { FolderNode } from "./node/FolderNode.js";
import { Node } from "./node/Node.js";
import { Resource } from "./node/Resource.js";
import { TestFolder } from "./node/TestFolder.js";

export class IntegrationDirectoryTree {
  static readonly __fields: string[] = ["projectPath", "projectType", "apis", "endpoints", "inboundEndpoints", "localEntries", "messageProcessors", "messageStores", "proxyServices", "sequences", "tasks", "templates", "dataServices", "dataSources", "connections", "resources", "java", "ballerina", "tests"];

  projectPath?: string;

  projectType?: string;

  apis?: APINode[];

  endpoints?: Node[];

  inboundEndpoints?: Node[];

  localEntries?: Node[];

  messageProcessors?: Node[];

  messageStores?: Node[];

  proxyServices?: Node[];

  sequences?: Node[];

  tasks?: Node[];

  templates?: Node[];

  dataServices?: Node[];

  dataSources?: Node[];

  connections?: Node[];

  resources?: Resource;

  java?: FolderNode;

  ballerina?: FolderNode;

  tests?: TestFolder;

  constructor(projectPath: string, projectType: string) {
    this.apis = [];
    this.endpoints = [];
    this.inboundEndpoints = [];
    this.localEntries = [];
    this.messageProcessors = [];
    this.messageStores = [];
    this.proxyServices = [];
    this.sequences = [];
    this.tasks = [];
    this.templates = [];
    this.dataServices = [];
    this.dataSources = [];
    this.connections = [];
    this.resources = new Resource();

    this.projectPath = projectPath;
    this.projectType = projectType;

  }

  addApi(api: Node): void {
    this.apis.push((api as APINode));

  }

  addEndpoint(endpoint: Node): void {
    this.endpoints.push(endpoint);

  }

  addInboundEndpoint(inboundEndpoint: Node): void {
    this.inboundEndpoints.push(inboundEndpoint);

  }

  addLocalEntry(localEntry: Node): void {
    this.localEntries.push(localEntry);

  }

  addMessageProcessor(messageProcessor: Node): void {
    this.messageProcessors.push(messageProcessor);

  }

  addMessageStore(messageStore: Node): void {
    this.messageStores.push(messageStore);

  }

  addProxyService(proxyService: Node): void {
    this.proxyServices.push(proxyService);

  }

  addSequence(sequence: Node): void {
    this.sequences.push(sequence);

  }

  addTask(task: Node): void {
    this.tasks.push(task);

  }

  addTemplate(template: Node): void {
    this.templates.push(template);

  }

  addDataService(dataService: Node): void {
    this.dataServices.push(dataService);

  }

  addDataSource(dataSource: Node): void {
    this.dataSources.push(dataSource);

  }

  addConnection(connection: Node): void {
    this.connections.push(connection);

  }

  setResources(resources: Resource): void {
    this.resources = resources;

  }

  getResources(): Resource {
    return this.resources;

  }

  setJava(java: FolderNode): void {
    this.java = java;

  }

  setBallerina(ballerina: FolderNode): void {
    this.ballerina = ballerina;

  }

  setTests(tests: TestFolder): void {
    this.tests = tests;

  }

  sort(): void {
    this.apis.sort(Comparator.comparing((x) => x.getName()));
    this.endpoints.sort(Comparator.comparing((x) => x.getName()));
    this.inboundEndpoints.sort(Comparator.comparing((x) => x.getName()));
    this.localEntries.sort(Comparator.comparing((x) => x.getName()));
    this.messageProcessors.sort(Comparator.comparing((x) => x.getName()));
    this.messageStores.sort(Comparator.comparing((x) => x.getName()));
    this.proxyServices.sort(Comparator.comparing((x) => x.getName()));
    this.sequences.sort(Comparator.comparing((x) => x.getName()));
    this.tasks.sort(Comparator.comparing((x) => x.getName()));
    this.templates.sort(Comparator.comparing((x) => x.getName()));
    this.dataServices.sort(Comparator.comparing((x) => x.getName()));
    this.dataSources.sort(Comparator.comparing((x) => x.getName()));
    this.connections.sort(Comparator.comparing((x) => x.getName()));

  }
}
