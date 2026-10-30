import type { ConnectorStatusNotification } from "./ConnectorStatusNotification.js";

/** Notifications the Synapse services send to the client (`synapse/*` segment of the Java client API). */
export interface SynapseLanguageClientAPI {
  addConnectorStatus(message: ConnectorStatusNotification): void;
  removeConnectorStatus(message: ConnectorStatusNotification): void;
  tryoutLog(message: string): void;
}
