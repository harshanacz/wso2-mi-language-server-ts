import { describe, it, expect } from "vitest";
import { checkMediator, checkRoundTrip } from "../helpers.js";
import { TaskFactory } from "../../../src/syntaxTree/factory/TaskFactory.js";
import { TaskSerializer } from "../../../src/syntaxTree/serializer/TaskSerializer.js";

describe("TaskSerializerTest", () => {
  const check = (xml: string) => checkRoundTrip((e) => new TaskFactory().create(e), (n) => TaskSerializer.serializeTask(n), xml);
  it("testTask", () => {
        const xml = "<task xmlns=\"http://ws.apache.org/ns/synapse\" class=\"org.apache.synapse.startup.tasks" +
                ".MessageInjector\" name=\"jhkig\" group=\"synapse.simple.quartz\"><trigger once=\"true\"/></task>";
        check(xml);
  });

  it("testTaskWithCountAndInterval", () => {
        const xml = "<task xmlns=\"http://ws.apache.org/ns/synapse\" class=\"org.apache.synapse.startup.tasks" +
                ".MessageInjector\" name=\"task\" group=\"synapse.simple.quartz\"><trigger interval=\"1\" " +
                "count=\"13\"/></task>";
        check(xml);
  });

  it("testTaskWithCron", () => {
        const xml = "<task xmlns=\"http://ws.apache.org/ns/synapse\" class=\"org.apache.synapse.startup.tasks" +
                ".MessageInjector\" name=\"task\" group=\"synapse.simple.quartz\"><trigger cron=\"0 0 0 * * " +
                "?\"/></task>";
        check(xml);
  });
});
