// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/connector/Connector.java by the java2ts converter (see tools/java2ts).
import { equals, removeFrom } from "../../javaCompat.js";
import { ConnectorParameter } from "./ConnectorParameter.js";
import { Mediator } from "../mediator/Mediator.js";

export class Connector extends Mediator {
  static readonly __fields: string[] = ["connectorName", "method", "configKey", "parameters"];

  connectorName?: string;

  method?: string;

  configKey?: string;

  parameters?: ConnectorParameter[];

  constructor() {
    super();
    this.parameters = [];

  }

  getConnectorName(): string {
    return this.connectorName;

  }

  setConnectorName(connectorName: string): void {
    this.connectorName = connectorName;

  }

  getMethod(): string {
    return this.method;

  }

  setMethod(method: string): void {
    this.method = method;

  }

  getParameters(): ConnectorParameter[] {
    return this.parameters;

  }

  setParameters(parameters: ConnectorParameter[]): void {
    this.parameters = parameters;

  }

  addParameter(parameter: ConnectorParameter): void {
    this.parameters.push(parameter);

  }

  getParameter(parameterName: string): ConnectorParameter {
    for (let parameter of this.parameters) {
        if (equals(parameter.getName(), parameterName)) {
            return parameter;
        }
    }
    return null;

  }

  getConfigKey(): string {
    return this.configKey;

  }

  setConfigKey(configKey: string): void {
    this.configKey = configKey;

  }

  removeParameter(name: string): void {
    for (let parameter of this.parameters) {
        if (equals(parameter.getName(), name)) {
            removeFrom(this.parameters, parameter);
            break;
        }
    }

  }
}
