// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dataService/QueryGenRequestParams.java by the java2ts converter (see tools/java2ts).

export class QueryGenRequestParams {
  static readonly __fields: string[] = ["className", "username", "password", "url", "tableData", "datasourceName", "driverPath"];

  className?: string;

  username?: string;

  password?: string;

  url?: string;

  tableData?: string;

  datasourceName?: string;

  driverPath?: string;

  setClassName(className: string): void {
    this.className = className;

  }

  setUsername(username: string): void {
    this.username = username;

  }

  setPassword(password: string): void {
    this.password = password;

  }

  setUrl(url: string): void {
    this.url = url;

  }

  setTableData(tableData: string): void {
    this.tableData = tableData;

  }

  setDatasourceName(datasourceName: string): void {
    this.datasourceName = datasourceName;

  }

  getClassName(): string {
    return this.className;

  }

  getUsername(): string {
    return this.username;

  }

  getPassword(): string {
    return this.password;

  }

  getUrl(): string {
    return this.url;

  }

  getDriverPath(): string {
    return this.driverPath;

  }
}
