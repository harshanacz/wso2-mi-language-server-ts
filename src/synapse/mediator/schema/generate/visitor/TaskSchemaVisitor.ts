// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/TaskSchemaVisitor.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, format, Logger, Level, StringUtils } from "../../../../../syntaxTree/javaCompat.js";
import { Constant } from "../../../../../syntaxTree/constant.js";
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Task } from "../../../../../syntaxTree/pojo/task/Task.js";
import { Utils } from "./Utils.js";

export class TaskSchemaVisitor {
  static readonly __fields: string[] = ["projectPath"];

  static readonly LOGGER: Logger = Logger.getLogger("TaskSchemaVisitor");

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    let sequence = this.getTaskSequence((node as Task));
    if (StringUtils.isEmpty(sequence)) {
        return;
    }
    try {
        Utils.visitSequenceByKey(sequence, this.projectPath, info, request);
    } catch (e) {
        TaskSchemaVisitor.LOGGER.log(Level.SEVERE, format("Error occurred while visiting the sequence: %s", sequence), e);
    }

  }

  getTaskSequence(node: Task): string {
    let properties = node.getProperty();
    if (properties != null) {
        for (let property of properties) {
            if (equals(Constant.SEQUENCE_NAME, property.getName())) {
                return property.getValue();
            }
        }
    }
    return null;

  }
}
