// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/serializer/TaskSerializer.java by the java2ts converter (see tools/java2ts).
import { equals } from "../javaCompat.js";
import { Constant } from "../constant.js";
import { OMAbstractFactory } from "../om/om.js";
import { OMElement } from "../om/om.js";
import { OMFactory } from "../om/om.js";
import { SerializerUtils } from "./SerializerUtils.js";
import { Task } from "../pojo/task/Task.js";
import { TaskTrigger } from "../pojo/task/TaskTrigger.js";

export class TaskSerializer {
  static readonly fac: OMFactory = OMAbstractFactory.getOMFactory();

  static serializeTask(task: Task): string {
    let taskElt = TaskSerializer.fac.createOMElement("task", Constant.SYNAPSE_OMNAMESPACE);

    TaskSerializer.serializeAttributes(task, taskElt);
    TaskSerializer.serializeChildren(task, taskElt);

    return String(taskElt);

  }

  static serializeAttributes(task: Task, taskElt: OMElement): void {
    if (task.getClazz() != null) {
        taskElt.addAttribute("class", task.getClazz(), null);
    }
    if (task.getName() != null) {
        taskElt.addAttribute("name", task.getName(), null);
    }
    if (task.getGroup() != null) {
        taskElt.addAttribute("group", task.getGroup(), null);
    }
    if (task.getPinnedServers() != null) {
        taskElt.addAttribute("pinnedServers", task.getPinnedServers(), null);
    }

  }

  static serializeChildren(task: Task, taskElt: OMElement): void {
    if (task.getTrigger() != null) {
        TaskSerializer.serializeTrigger(task.getTrigger(), taskElt);
    }
    if (task.getProperty() != null) {
        SerializerUtils.serializeMediatorProperties(taskElt, task.getProperty());
    }

  }

  static serializeTrigger(trigger: TaskTrigger, taskElt: OMElement): void {
    let triggerElt = TaskSerializer.fac.createOMElement("trigger", Constant.SYNAPSE_OMNAMESPACE);

    if (trigger.getCron() != null) {
        triggerElt.addAttribute("cron", trigger.getCron(), null);
    } else {
        if (trigger.getOnce() || (equals("1", trigger.getInterval()) && equals("1", trigger.getCount()))) {
            triggerElt.addAttribute("once", "true", null);
        } else {
            if (trigger.getInterval() != null) {
                triggerElt.addAttribute("interval", trigger.getInterval(), null);
            }
            if (trigger.getCount() != null) {
                triggerElt.addAttribute("count", trigger.getCount(), null);
            }
        }
    }
    taskElt.addChild(triggerElt);

  }
}
