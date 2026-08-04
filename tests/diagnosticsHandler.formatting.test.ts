import { describe, expect, it } from "vitest";
import { formatDiagnosticMessage } from "../src/utils/diagnosticsFilter.js";

describe("formatDiagnosticMessage", () => {
  it("formats maxOccurs violation (duplicate element present in model)", () => {
    const raw = "element 'endpoint' is not allowed for content model 'All(inSequence?,outSequence?,faultSequence?,endpoint?)'";
    const formatted = formatDiagnosticMessage(raw);
    expect(formatted).toBe("Duplicate element 'endpoint' is not allowed (exceeds maxOccurs limit).");
  });

  it("formats invalid child element (not present in model)", () => {
    const raw = "element 'invalidChild' is not allowed for content model 'All(inSequence?,outSequence?,faultSequence?,endpoint?)'";
    const formatted = formatDiagnosticMessage(raw);
    expect(formatted).toBe("Element 'invalidChild' is not allowed here. Allowed elements: inSequence, outSequence, faultSequence, endpoint.");
  });

  it("handles Sequence / Choice model structures", () => {
    const raw = "element 'trigger' is not allowed for content model 'Sequence(trigger,property*)'";
    const formatted = formatDiagnosticMessage(raw);
    expect(formatted).toBe("Duplicate element 'trigger' is not allowed (exceeds maxOccurs limit).");
  });

  it("leaves unrelated error messages unchanged", () => {
    const raw = "element 'foo' is not declared";
    expect(formatDiagnosticMessage(raw)).toBe(raw);
  });
});
