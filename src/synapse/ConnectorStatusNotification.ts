// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/ConnectorStatusNotification.java by the java2ts converter (see tools/java2ts).

export class ConnectorStatusNotification {
  static readonly __fields: string[] = ["connector", "isSuccess", "message"];

  connector?: string;

  isSuccess: boolean = false;

  message?: string;

  constructor(connector: string, isSuccess: boolean, message: string) {
    this.connector = connector;
    this.isSuccess = isSuccess;
    this.message = message;

  }
}
