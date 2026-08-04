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

  it("handles Sequence / Choice model structures as invalid content-model errors", () => {
    const raw = "element 'trigger' is not allowed for content model 'Sequence(trigger,property*)'";
    const formatted = formatDiagnosticMessage(raw);
    expect(formatted).toBe("Element 'trigger' is not allowed here. Allowed elements: trigger, property.");
  });

  it("leaves unrelated error messages unchanged", () => {
    const raw = "element 'foo' is not declared";
    expect(formatDiagnosticMessage(raw)).toBe(raw);
  });
});

describe("filterDiagnostics", () => {
  it("deduplicates identical diagnostics even when unknownElements set is empty", async () => {
    const { filterDiagnostics } = await import("../src/utils/diagnosticsFilter.js");
    const diag = {
      message: "Some validation error",
      range: { start: { line: 2, character: 4 }, end: { line: 2, character: 10 } },
      severity: 1,
    };
    const input = [diag, { ...diag }];
    const result = filterDiagnostics(input as any);
    expect(result).toHaveLength(1);
  });
});
