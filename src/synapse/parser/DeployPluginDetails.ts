// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/DeployPluginDetails.java by the java2ts converter (see tools/java2ts).
import { TextEdit } from "../lsp.js";

export class DeployPluginDetails {
  static readonly __fields: string[] = ["truststorePath", "truststorePassword", "truststoreType", "serverUrl", "username", "password", "serverType", "textEdit"];

  truststorePath?: string;

  truststorePassword?: string;

  truststoreType?: string;

  serverUrl?: string;

  username?: string;

  password?: string;

  serverType?: string;

  textEdit?: TextEdit;

  constructor(textEdit: TextEdit);
  constructor(truststorePath: string, truststorePassword: string, truststoreType: string, serverUrl: string, username: string, password: string, serverType: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        const [textEdit] = args;

                this.textEdit = textEdit;

        break;
      }
      case 7: {
        const [truststorePath, truststorePassword, truststoreType, serverUrl, username, password, serverType] = args;

                this.truststorePath = truststorePath;
                this.truststorePassword = truststorePassword;
                this.truststoreType = truststoreType;
                this.serverUrl = serverUrl;
                this.username = username;
                this.password = password;
                this.serverType = serverType;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getTruststorePath(): string {
    return this.truststorePath;

  }

  getTruststorePassword(): string {
    return this.truststorePassword;

  }

  getTruststoreType(): string {
    return this.truststoreType;

  }

  getServerUrl(): string {
    return this.serverUrl;

  }

  getUsername(): string {
    return this.username;

  }

  getPassword(): string {
    return this.password;

  }

  getServerType(): string {
    return this.serverType;

  }
}
