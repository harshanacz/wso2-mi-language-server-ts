// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/TaskFactory.java by the java2ts converter (see tools/java2ts).
import { equals, isEmpty, parseBoolean } from "../javaCompat.js";
import { AbstractFactory } from "./AbstractFactory.js";
import { Constant } from "../constant.js";
import { DOMElement } from "../dom/dom.js";
import { DOMNode } from "../dom/dom.js";
import { STNode } from "../stNode.js";
import { SyntaxTreeUtils } from "../utils/SyntaxTreeUtils.js";
import { Task } from "../pojo/task/Task.js";
import { TaskTrigger } from "../pojo/task/TaskTrigger.js";

export class TaskFactory extends AbstractFactory {
  create(element: DOMElement): STNode {
    let task = new Task();
    task.elementNode(element);
    this.populateAttributes(task, element);
    let children = element.getChildren();
    let mediatorPropertyList = [];
    if (children != null && !isEmpty(children)) {
        for (let node of children) {
            let name = node.getNodeName();
            if (equals(name, Constant.TRIGGER)) {
                let taskTrigger = this.createTaskTrigger(node);
                task.setTrigger(taskTrigger);
            } else if (equals(name, Constant.PROPERTY)) {
                let mediatorProperty = SyntaxTreeUtils.createMediatorProperty(node);
                mediatorPropertyList.push(mediatorProperty);
            }
        }
        task.setProperty(mediatorPropertyList.slice());
    }
    return task;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let name = element.getAttribute(Constant.NAME);
    if (name != null) {
        ((node as Task)).setName(name);
    }
    let clazz = element.getAttribute(Constant.CLASS);
    if (clazz != null) {
        ((node as Task)).setClazz(clazz);
    }
    let group = element.getAttribute(Constant.GROUP);
    if (group != null) {
        ((node as Task)).setGroup(group);
    }
    let pinnedServers = element.getAttribute(Constant.PINNED_SERVERS);
    if (pinnedServers != null) {
        ((node as Task)).setPinnedServers(pinnedServers);
    }

  }

  createTaskTrigger(node: DOMNode): TaskTrigger {
    let taskTrigger = new TaskTrigger();
    taskTrigger.elementNode((node as DOMElement));
    let cron = node.getAttribute(Constant.CRON);
    if (cron != null) {
        taskTrigger.setCron(cron);
    }
    let interval = node.getAttribute(Constant.INTERVAL);
    if (interval != null) {
        taskTrigger.setInterval(interval);
    }
    let count = node.getAttribute(Constant.COUNT);
    if (count != null) {
        taskTrigger.setCount(count);
    }
    let once = node.getAttribute(Constant.ONCE);
    if (once != null) {
        taskTrigger.setOnce(parseBoolean(once));
    }
    return taskTrigger;

  }
}
