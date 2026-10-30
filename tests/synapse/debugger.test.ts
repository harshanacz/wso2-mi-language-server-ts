import { describe, it, expect, beforeAll } from "vitest";
import { fixture } from "./helpers.js";
import { DebuggerHelper } from "../../src/synapse/debugger/DebuggerHelper.js";
import { Breakpoint } from "../../src/synapse/debugger/entity/Breakpoint.js";
import { SyntaxTreeGenerator } from "../../src/syntaxTree/SyntaxTreeGenerator.js";
import { Utils } from "../../src/syntaxTree/utils.js";
import { ApiDebugInfo } from "../../src/synapse/debugger/entity/debuginfo/ApiDebugInfo.js";
import { ProxyDebugInfo } from "../../src/synapse/debugger/entity/debuginfo/ProxyDebugInfo.js";
import { TemplateDebugInfo } from "../../src/synapse/debugger/entity/debuginfo/TemplateDebugInfo.js";

/** Ports the debugger tests (breakpoint to mediator position, step over breakpoints). */
function load(resource: string) {
  const doc = Utils.getDOMDocumentFromPath(fixture("synapse/" + resource));
  return SyntaxTreeGenerator.buildTree(doc.getDocumentElement());
}
const assertEquals = (e: any, a: any) => expect(a).toEqual(e);
const bp = (l: number, c: number) => new Breakpoint(l, c);

function harness(resource: string) {
  let st: any;
  beforeAll(() => { st = load(resource); });
  const getDebugInfo = (bps: Breakpoint[]) => new DebuggerHelper(st).generateDebugInfo(bps);
  const testDebugInfo = (bps: Breakpoint[], expected: string[]) => {
    const infos = getDebugInfo(bps);
    let i = 0;
    for (const info of infos) expect(info.getMediatorPosition()).toBe(expected[i++]);
  };
  const testStepOverInfo = (b: Breakpoint, expected: Breakpoint[]) => {
    const so = new DebuggerHelper(st).getStepOverBreakpoints(b);
    expect(so.size()).toBe(expected.length);
    expect(so.getStepOverBreakpoints()).toEqual(expected);
  };
  return { getDebugInfo, testDebugInfo, testStepOverInfo };
}

describe("APITest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/api.xml");
  it("test_URLResource", () => {

        const breakpoint = bp(22, 12);
        const debugInfo = getDebugInfo([breakpoint])[0] as ApiDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("/postUrl", debugInfo.getUrlMapping());
        assertEquals("POST", debugInfo.getMethod());
        assertEquals("api_inseq", debugInfo.getSequenceType());
  });
  it("test_URIResource", () => {

        const breakpoint = bp(48, 12);
        const debugInfo = getDebugInfo([breakpoint])[0] as ApiDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("/postUri/{path1}?query1={query1}", debugInfo.getUriTemplate());
        assertEquals("POST", debugInfo.getMethod());
        assertEquals("api_inseq", debugInfo.getSequenceType());
  });
  it("testMultipleBreakpoint_APIInSequence", () => {

        const breakpoint1 = bp(22, 12);
        const breakpoint2 = bp(25, 12);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
  it("test_APIOutSequence", () => {

        const breakpoint = bp(30, 12);

        const debugInfo = getDebugInfo([breakpoint])[0] as ApiDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("api_outseq", debugInfo.getSequenceType());
        assertEquals("POST", debugInfo.getMethod());
        assertEquals("/postUrl", debugInfo.getUrlMapping());
        assertEquals("api_outseq", debugInfo.getSequenceType());

        testStepOverInfo(breakpoint, [bp(33, 12)]);
  });
  it("testMultipleBreakpoint_APIOutSequence", () => {

        const breakpoint1 = bp(30, 12);
        const breakpoint2 = bp(33, 12);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
  it("test_APIFaultSequence", () => {

        const breakpoint = bp(38, 12);
        const debugInfo = getDebugInfo([breakpoint])[0] as ApiDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("api_faultseq", debugInfo.getSequenceType());
        assertEquals("POST", debugInfo.getMethod());
        assertEquals("/postUrl", debugInfo.getUrlMapping());
        assertEquals("api_faultseq", debugInfo.getSequenceType());

        testStepOverInfo(breakpoint, [bp(41, 12)]);
  });
  it("testMultipleBreakpoint_APIFaultSequence", () => {

        const breakpoint1 = bp(38, 12);
        const breakpoint2 = bp(41, 12);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
});

describe("ProxyTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/proxy.xml");
  it("test_ProxyInSequence", () => {

        const breakpoint = bp(21, 12);
        const debugInfo = getDebugInfo([breakpoint])[0] as ProxyDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("debugger", debugInfo.getProxyKey());
        assertEquals("proxy_inseq", debugInfo.getSequenceType());

        testStepOverInfo(breakpoint, [bp(24, 12)]);
  });
  it("testMultipleBreakpoint_ProxyInSequence", () => {

        const breakpoint1 = bp(21, 12);
        const breakpoint2 = bp(24, 12);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
  it("test_ProxyFaultSequence", () => {

        const breakpoint = bp(29, 12);
        const debugInfo = getDebugInfo([breakpoint])[0] as ProxyDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("debugger", debugInfo.getProxyKey());
        assertEquals("proxy_faultseq", debugInfo.getSequenceType());

        testStepOverInfo(breakpoint, [bp(32, 12)]);
  });
  it("testMultipleBreakpoint_ProxyOutSequence", () => {

        const breakpoint1 = bp(29, 12);
        const breakpoint2 = bp(32, 12);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
});

describe("TemplateTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/template.xml");
  it("test_SingleBreakpoint", () => {

        const breakpoint = bp(23, 8);
        const debugInfo = getDebugInfo([breakpoint])[0] as TemplateDebugInfo;
        assertEquals("0", debugInfo.getMediatorPosition());
        assertEquals("debugger", debugInfo.getTemplateKey());

        testStepOverInfo(breakpoint, [bp(26, 8)]);
  });
  it("testMultipleBreakpoint", () => {

        const breakpoint1 = bp(23, 8);
        const breakpoint2 = bp(26, 8);
        testDebugInfo([breakpoint1, breakpoint2], ["0", "1"]);
  });
});

describe("AggregateMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/aggregateMediator.xml");
  it("testAggregateMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(28, 12), bp(33, 4)]);
  });
  it("testMediatorInOnCompleteSequence", () => {

        const breakpoint = bp(28, 12);
        testDebugInfo([breakpoint], ["1 0"]);
        testStepOverInfo(breakpoint, [bp(33, 4)]);
  });
  it("testAfterAggregateMediator", () => {

        const breakpoint = bp(33, 4);
        testDebugInfo([breakpoint], ["2"]);
        testStepOverInfo(breakpoint, []);
  });
});

describe("CacheMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/cacheMediator.xml");
  it("testCacheMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(25, 12), bp(46, 4)]);
  });
  it("testMediatorInOnCacheHitSequence", () => {

        const breakpoint = bp(25, 12);
        testDebugInfo([breakpoint], ["1 0"]);
        testStepOverInfo(breakpoint, [bp(26, 12)]);
  });
  it("testComplexMediatorInOnCacheHitSequence", () => {

        testDebugInfo([bp(28, 20)], ["1 1 1 0"]);
  });
});

describe("CloneMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/cloneMediator.xml");
  it("testCloneMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(26, 16), bp(33, 16)]);
  });
  it("testMediatorInFirstTargetSequence", () => {

        const breakpoint = bp(26, 16);
        testDebugInfo([breakpoint], ["1 0 0"]);
        testStepOverInfo(breakpoint, [bp(39, 4)]);
  });
  it("testMediatorInSecondTargetSequence", () => {

        const breakpoint = bp(33, 16);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(39, 4)]);
  });
  it("testAllAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(26, 16));
        expected.push("1 0 0");

        breakpoints.push(bp(33, 16));
        expected.push("1 1 0");

        breakpoints.push(bp(39, 4));
        expected.push("2");

        testDebugInfo(breakpoints, expected);
  });
});

describe("FilterMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/filterMediator.xml");
  it("testFilterMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(25, 12), bp(42, 12)]);
  });
  it("testMediatorInThenSequence", () => {

        const breakpoint = bp(25, 12);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(28, 12)]);
  });
  it("testFilterMediatorInThenSequence", () => {

        const breakpoint = bp(28, 12);
        testDebugInfo([breakpoint], ["1 1 1"]);
        testStepOverInfo(breakpoint, [bp(30, 20), bp(35, 20)]);
  });
  it("testThenSequenceOfFilterMediatorInThenSequence", () => {

        const breakpoint = bp(30, 20);
        testDebugInfo([breakpoint], ["1 1 1 1 0"]);
        testStepOverInfo(breakpoint, [bp(59, 4)]);
  });
  it("testElseSequenceOfFilterMediatorInThenSequence", () => {

        const breakpoint = bp(35, 20);
        testDebugInfo([breakpoint], ["1 1 1 0 0"]);
        testStepOverInfo(breakpoint, [bp(59, 4)]);
  });
  it("testMediatorInElseSequence", () => {

        const breakpoint = bp(42, 12);
        testDebugInfo([breakpoint], ["1 0 0"]);
        testStepOverInfo(breakpoint, [bp(45, 12)]);
  });
  it("testFilterMediatorInElseSequence", () => {

        const breakpoint = bp(45, 12);
        testDebugInfo([breakpoint], ["1 0 1"]);
        testStepOverInfo(breakpoint, [bp(47, 20), bp(52, 20)]);
  });
  it("testThenSequenceOfFilterMediatorInElseSequence", () => {

        const breakpoint = bp(47, 20);
        testDebugInfo([breakpoint], ["1 0 1 1 0"]);
        testStepOverInfo(breakpoint, [bp(59, 4)]);
  });
  it("testElseSequenceOfFilterMediatorInElseSequence", () => {

        const breakpoint = bp(52, 20);
        testDebugInfo([breakpoint], ["1 0 1 0 0"]);
        testStepOverInfo(breakpoint, [bp(59, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(25, 12));
        expected.push("1 1 0");

        breakpoints.push(bp(28, 12));
        expected.push("1 1 1");

        breakpoints.push(bp(30, 20));
        expected.push("1 1 1 1 0");

        breakpoints.push(bp(35, 20));
        expected.push("1 1 1 0 0");

        breakpoints.push(bp(42, 16));
        expected.push("1 0 0");

        breakpoints.push(bp(45, 12));
        expected.push("1 0 1");

        breakpoints.push(bp(47, 20));
        expected.push("1 0 1 1 0");

        breakpoints.push(bp(52, 20));
        expected.push("1 0 1 0 0");

        testDebugInfo(breakpoints, expected);
  });
});

describe("ForeachMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/foreachMediator.xml");
  it("testForeachMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(26, 12)]);
  });
  it("testMediatorInForeachSequence", () => {

        const breakpoint = bp(26, 12);
        testDebugInfo([breakpoint], ["1 0"]);
        testStepOverInfo(breakpoint, [bp(29, 12)]);
  });
  it("testNestedForeachInForeachSequence", () => {

        const breakpoint = bp(29, 12);
        testDebugInfo([breakpoint], ["1 1"]);
        testStepOverInfo(breakpoint, [bp(32, 20)]);
  });
  it("testForeachSequenceOfNestedForeach", () => {

        const breakpoint = bp(32, 20);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(39, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(26, 12));
        expected.push("1 0");

        breakpoints.push(bp(29, 12));
        expected.push("1 1");

        breakpoints.push(bp(32, 20));
        expected.push("1 1 0");

        testDebugInfo(breakpoints, expected);
  });
});

describe("IterateMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/iterateMediator.xml");
  it("testIterateMediator", () => {

        testDebugInfo([bp(23, 4)], ["1"]);
  });
  it("testMediatorInIterateSequence", () => {

        const breakpoint = bp(26, 16);
        testDebugInfo([bp(26, 16)], ["1 0"]);
        testStepOverInfo(breakpoint, [bp(29, 16)]);
  });
  it("testNestedIterateInIterateSequence", () => {

        const breakpoint = bp(29, 16);
        testDebugInfo([breakpoint], ["1 1"]);
        testStepOverInfo(breakpoint, [bp(32, 28)]);
  });
  it("testIterateSequenceOfNestedIterate", () => {

        const breakpoint = bp(32, 28);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(41, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(26, 16));
        expected.push("1 0");

        breakpoints.push(bp(29, 16));
        expected.push("1 1");

        breakpoints.push(bp(32, 28));
        expected.push("1 1 0");

        testDebugInfo(breakpoints, expected);
  });
});

describe("ScatterGatherMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/scatterGatherMediator.xml");
  it("testScatterGatherMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(26, 12), bp(44, 12)]);
  });
  it("testMediatorInSequence", () => {

        const breakpoint = bp(26, 12);
        testDebugInfo([breakpoint], ["1 0 0"]);
        testStepOverInfo(breakpoint, [bp(29, 12)]);
  });
  it("testNestedScatterGatherInFirstSequence", () => {

        const breakpoint = bp(29, 12);
        testDebugInfo([breakpoint], ["1 0 1"]);
        testStepOverInfo(breakpoint, [bp(32, 20), bp(37, 20)]);
  });
  it("tesSequenceOfNestedScatterGatherInFirstSequence", () => {

        const breakpoint = bp(32, 20);
        testDebugInfo([breakpoint], ["1 0 1 0 0"]);
  });
  it("testNestedScatterGatherInSecondSequence", () => {

        const breakpoint = bp(47, 12);
        testDebugInfo([breakpoint], ["1 1 1"]);
        testStepOverInfo(breakpoint, [bp(50, 20), bp(55, 20)]);
  });
  it("testSequenceOfNestedScatterGatherInSecondSequence", () => {

        const breakpoint = bp(50, 20);
        testDebugInfo([breakpoint], ["1 1 1 0 0"]);
        testStepOverInfo(breakpoint, [bp(62, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(26, 12));
        expected.push("1 0 0");

        breakpoints.push(bp(29, 12));
        expected.push("1 0 1");

        breakpoints.push(bp(32, 20));
        expected.push("1 0 1 0 0");

        breakpoints.push(bp(47, 12));
        expected.push("1 1 1");

        breakpoints.push(bp(50, 20));
        expected.push("1 1 1 0 0");

        testDebugInfo(breakpoints, expected);
  });
});

describe("SimpleMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/simpleMediator.xml");
  it("testSimpleMediator1", () => {

        const breakpoint = bp(20, 4);
        testDebugInfo([breakpoint], ["0"]);
        testStepOverInfo(breakpoint, [bp(21, 4)]);
  });
  it("testSimpleMediator2", () => {

        const breakpoint = bp(21, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, []);
  });
  it("testMultipleBreakpoints", () => {

        const breakpoints = [bp(20, 4), bp(21, 4)];
        const expectedMediatorPositions = ["0", "1"];
        testDebugInfo(breakpoints, expectedMediatorPositions);
  });
  it("testInvalidBreakpoint", () => {

        const invalidBreakpoint = bp(100, 4);
        const expectedMediatorPositions = [];
        expectedMediatorPositions.push(null);
        testDebugInfo([invalidBreakpoint], expectedMediatorPositions);
  });
  it("testMultipleInvalidBreakpoints", () => {

        const breakpoints = [];
        breakpoints.push(bp(19, 0));
        breakpoints.push(bp(22, 8));
        breakpoints.push(bp(23, 4));
        breakpoints.push(bp(24, 0));
        breakpoints.push(bp(25, 0));

        const expectedMediatorPositions = [];
        expectedMediatorPositions.push(null);
        expectedMediatorPositions.push(null);
        expectedMediatorPositions.push(null);
        expectedMediatorPositions.push(null);
        expectedMediatorPositions.push(null);

        testDebugInfo(breakpoints, expectedMediatorPositions);
  });
  it("testValidAndInvalidBreakpoints", () => {

        const breakpoints = [];
        breakpoints.push(bp(19, 0));
        breakpoints.push(bp(20, 4));
        breakpoints.push(bp(21, 4));
        breakpoints.push(bp(100, 4));

        const expectedMediatorPositions = [];
        expectedMediatorPositions.push(null);
        expectedMediatorPositions.push("0");
        expectedMediatorPositions.push("1");
        expectedMediatorPositions.push(null);

        testDebugInfo(breakpoints, expectedMediatorPositions);
  });
});

describe("SwitchMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/switchMediator.xml");
  it("testSwitchMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(69, 12), bp(25, 12), bp(47, 12)]);
  });
  it("testMediatorInFirstCase", () => {

        const breakpoint = bp(25, 12);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(28, 12)]);
  });
  it("testFirstCaseInTheNestedSwitchInFirstCase", () => {

        const breakpoint = bp(30, 20);
        testDebugInfo([breakpoint], ["1 1 1 1 0"]);
        testStepOverInfo(breakpoint, [bp(91, 4)]);
  });
  it("testMediatorInSecondCase", () => {

        const breakpoint = bp(47, 12);
        testDebugInfo([breakpoint], ["1 2 0"]);
        testStepOverInfo(breakpoint, [bp(50, 12)]);
  });
  it("testSecondCaseInTheNestedSwitchOfSecondCase", () => {

        const breakpoint = bp(52, 20);
        testDebugInfo([breakpoint], ["1 2 1 1 0"]);
        testStepOverInfo(breakpoint, [bp(91, 4)]);
  });
  it("testMediatorInDefaultCase", () => {

        const breakpoint = bp(69, 12);
        testDebugInfo([breakpoint], ["1 0 0"]);
        testStepOverInfo(breakpoint, [bp(72, 12)]);
  });
  it("testDefaultCaseInTheNestedSwitchOfDefaultCase", () => {

        const breakpoint = bp(84, 20);
        testDebugInfo([breakpoint], ["1 0 1 0 0"]);
        testStepOverInfo(breakpoint, [bp(91, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(25, 12));
        expected.push("1 1 0");

        breakpoints.push(bp(30, 20));
        expected.push("1 1 1 1 0");

        breakpoints.push(bp(47, 12));
        expected.push("1 2 0");

        breakpoints.push(bp(52, 20));
        expected.push("1 2 1 1 0");

        breakpoints.push(bp(69, 12));
        expected.push("1 0 0");

        breakpoints.push(bp(84, 20));
        expected.push("1 0 1 0 0");

        testDebugInfo(breakpoints, expected);
  });
});

describe("ValidateMediatorTest", () => {
  const { getDebugInfo, testDebugInfo, testStepOverInfo } = harness("debugger/mediators/validateMediator.xml");
  it("testValidateMediator", () => {

        const breakpoint = bp(23, 4);
        testDebugInfo([breakpoint], ["1"]);
        testStepOverInfo(breakpoint, [bp(28, 12), bp(43, 4)]);
  });
  it("testMediatorInOnFailSequence", () => {

        const breakpoint = bp(28, 12);
        testDebugInfo([breakpoint], ["1 0"]);
        testStepOverInfo(breakpoint, [bp(31, 12)]);
  });
  it("testValidateMediatorInOnFailSequence", () => {

        const breakpoint = bp(31, 12);
        testDebugInfo([breakpoint], ["1 1"]);
        testStepOverInfo(breakpoint, [bp(36, 20), bp(43, 4)]);
  });
  it("testOnFailSequenceOfNestedValidateMediator", () => {

        const breakpoint = bp(36, 20);
        testDebugInfo([breakpoint], ["1 1 0"]);
        testStepOverInfo(breakpoint, [bp(43, 4)]);
  });
  it("testAllBreakpointAtOnce", () => {

        const breakpoints = [];
        const expected = [];

        breakpoints.push(bp(23, 4));
        expected.push("1");

        breakpoints.push(bp(28, 12));
        expected.push("1 0");

        breakpoints.push(bp(31, 12));
        expected.push("1 1");

        breakpoints.push(bp(36, 20));
        expected.push("1 1 0");

        testDebugInfo(breakpoints, expected);
  });
});

