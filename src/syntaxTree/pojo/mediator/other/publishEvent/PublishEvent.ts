// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/other/publishEvent/PublishEvent.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "../../Mediator.js";
import { PublishEventAttributes } from "./PublishEventAttributes.js";

export class PublishEvent extends Mediator {
  eventSink?: any;

  streamName?: any;

  streamVersion?: any;

  async: boolean = false;

  timeout?: string;

  attributes?: PublishEventAttributes;

  description?: string;

  getEventSink(): any {
    return this.eventSink;

  }

  setEventSink(eventSink: any): void {
    this.eventSink = eventSink;

  }

  getStreamName(): any {
    return this.streamName;

  }

  setStreamName(streamName: any): void {
    this.streamName = streamName;

  }

  getStreamVersion(): any {
    return this.streamVersion;

  }

  setStreamVersion(streamVersion: any): void {
    this.streamVersion = streamVersion;

  }

  getAttributes(): PublishEventAttributes {
    return this.attributes;

  }

  setAttributes(attributes: PublishEventAttributes): void {
    this.attributes = attributes;

  }

  isAsync(): boolean {
    return this.async;

  }

  setAsync(async: boolean): void {
    this.async = async;

  }

  getTimeout(): string {
    return this.timeout;

  }

  setTimeout(timeout: string): void {
    this.timeout = timeout;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }
}
