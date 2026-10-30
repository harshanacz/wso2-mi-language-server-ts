// Hand ported from the Java original (see git history for the generated base).
/**
 * Minimal contracts for the connector services the syntax tree needs. The real implementations arrive with the
 * connector port; until then these are the seams the factories call through.
 */
export interface ConnectorHolder {
  isValidConnector(name: string): boolean;
}

export class Connection {
  constructor(public connectorName?: string, public name?: string, public connectionType?: string,
              public a?: unknown, public b?: unknown) {}
  getName(): string | undefined { return this.name; }
  getConnectionType(): string | undefined { return this.connectionType; }
}

export class Connections {
  connections: Connection[] = [];
  getConnections(): Connection[] { return this.connections; }
}

export const ConnectionFinder = {
  /** Returns the connections of the given kind defined in the project (none until the connector port lands). */
  findConnections(_projectPath: string | undefined, _type: string, _holder: ConnectorHolder | undefined,
                  _includeAll: boolean): { getLeft(): Connections } {
    return { getLeft: () => new Connections() };
  },
};

export const ConfigFinder = {
  getTemplatePath(_templateName: string, _projectPath: string | undefined): string | null {
    return null;
  },
};
