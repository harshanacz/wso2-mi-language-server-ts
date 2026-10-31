// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/CheckDBDriverResponseParams.java by the java2ts converter (see tools/java2ts).

export class CheckDBDriverResponseParams {
  static readonly __fields: string[] = ["_isDriverAvailable", "driverVersion", "driverPath"];

  _isDriverAvailable: boolean = false;

  driverVersion?: string;

  driverPath?: string;

  constructor(isDriverAvailable: boolean, driverVersion: string, driverPath: string) {
    this._isDriverAvailable = isDriverAvailable;
    this.driverVersion = driverVersion;
    this.driverPath = driverPath;

  }

  isDriverAvailable(): boolean {
    return this._isDriverAvailable;

  }

  getDriverVersion(): string {
    return this.driverVersion;

  }
}
