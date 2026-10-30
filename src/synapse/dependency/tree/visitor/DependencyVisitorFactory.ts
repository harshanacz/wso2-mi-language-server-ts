// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/visitor/DependencyVisitorFactory.java by the java2ts converter (see tools/java2ts).
import { IllegalStateException } from "../../../../syntaxTree/javaCompat.js";
import { APIVisitor } from "./APIVisitor.js";
import { AbstractDependencyVisitor } from "./AbstractDependencyVisitor.js";
import { Constant } from "../../../../syntaxTree/constant.js";
import { DataServiceVisitor } from "./DataServiceVisitor.js";
import { DataSourceVisitor } from "./DataSourceVisitor.js";
import { DependencyTree } from "../pojo/DependencyTree.js";
import { EndpointVisitor } from "./EndpointVisitor.js";
import { InboundEndpointVisitor } from "./InboundEndpointVisitor.js";
import { LocalEntryVisitor } from "./LocalEntryVisitor.js";
import { MessageProcessorVisitor } from "./MessageProcessorVisitor.js";
import { MessageStoreVisitor } from "./MessageStoreVisitor.js";
import { ProxyServiceVisitor } from "./ProxyServiceVisitor.js";
import { SequenceVisitor } from "./SequenceVisitor.js";
import { TaskVisitor } from "./TaskVisitor.js";
import { TemplateVisitor } from "./TemplateVisitor.js";

export class DependencyVisitorFactory {
  static readonly __fields: string[] = ["projectPath"];

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  createVisitor(tag: string, dependencyTree: DependencyTree): AbstractDependencyVisitor {
    switch (tag) {
        case Constant.API:
            return new APIVisitor(dependencyTree, this.projectPath);
        case Constant.ENDPOINT:
            return new EndpointVisitor(dependencyTree, this.projectPath);
        case Constant.SEQUENCE:
            return new SequenceVisitor(dependencyTree, this.projectPath);
        case Constant.PROXY:
            return new ProxyServiceVisitor(dependencyTree, this.projectPath);
        case Constant.INBOUND_ENDPOINT:
            return new InboundEndpointVisitor(dependencyTree, this.projectPath);
        case Constant.MESSAGE_STORE:
            return new MessageStoreVisitor(dependencyTree, this.projectPath);
        case Constant.MESSAGE_PROCESSOR:
            return new MessageProcessorVisitor(dependencyTree, this.projectPath);
        case Constant.TASK:
            return new TaskVisitor(dependencyTree, this.projectPath);
        case Constant.LOCAL_ENTRY:
            return new LocalEntryVisitor(dependencyTree, this.projectPath);
        case Constant.TEMPLATE:
            return new TemplateVisitor(dependencyTree, this.projectPath);
        case Constant.DATA:
            return new DataServiceVisitor(dependencyTree, this.projectPath);
        case Constant.DATA_SOURCE:
            return new DataSourceVisitor(dependencyTree, this.projectPath);
        default:
            throw new IllegalStateException("Invalid tag: " + tag);
    }

  }
}
