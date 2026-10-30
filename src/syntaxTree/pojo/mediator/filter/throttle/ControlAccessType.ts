// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/filter/throttle/ControlAccessType.java by the java2ts converter (see tools/java2ts).

export class ControlAccessType {
  maximumCount: number = 0;

  unitTime: number = 0;

  prohibitTimePeriod: number = 0;

  getMaximumCount(): number {
    return this.maximumCount;

  }

  setMaximumCount(maximumCount: number): void {
    this.maximumCount = maximumCount;

  }

  getUnitTime(): number {
    return this.unitTime;

  }

  setUnitTime(unitTime: number): void {
    this.unitTime = unitTime;

  }

  getProhibitTimePeriod(): number {
    return this.prohibitTimePeriod;

  }

  setProhibitTimePeriod(prohibitTimePeriod: number): void {
    this.prohibitTimePeriod = prohibitTimePeriod;

  }
}
