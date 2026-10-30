// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/JndiConfigType.java by the java2ts converter (see tools/java2ts).
import { JndiEnvType } from "./JndiEnvType.js";
import { STNode } from "../../stNode.js";

export class JndiConfigType extends STNode {
  name?: STNode;

  environment?: JndiEnvType;

  useDataSourceFactory: boolean = false;

  getName(): STNode {
    return this.name;

  }

  setName(name: STNode): void {
    this.name = name;

  }

  getEnvironment(): JndiEnvType {
    return this.environment;

  }

  setEnvironment(environment: JndiEnvType): void {
    this.environment = environment;

  }

  isUseDataSourceFactory(): boolean {
    return this.useDataSourceFactory;

  }

  setUseDataSourceFactory(useDataSourceFactory: boolean): void {
    this.useDataSourceFactory = useDataSourceFactory;

  }
}
