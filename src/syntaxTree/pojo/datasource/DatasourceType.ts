// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/datasource/DatasourceType.java by the java2ts converter (see tools/java2ts).
import { DefinitionType } from "./DefinitionType.js";
import { JndiConfigType } from "./JndiConfigType.js";
import { STNode } from "../../stNode.js";

export class DatasourceType extends STNode {
  static readonly __fields: string[] = ["name", "description", "jndiConfig", "definition"];

  name?: STNode;

  description?: STNode;

  jndiConfig?: JndiConfigType;

  definition?: DefinitionType;

  getName(): STNode {
    return this.name;

  }

  setName(name: STNode): void {
    this.name = name;

  }

  getDescription(): STNode {
    return this.description;

  }

  setDescription(description: STNode): void {
    this.description = description;

  }

  getJndiConfig(): JndiConfigType {
    return this.jndiConfig;

  }

  setJndiConfig(jndiConfig: JndiConfigType): void {
    this.jndiConfig = jndiConfig;

  }

  getDefinition(): DefinitionType {
    return this.definition;

  }

  setDefinition(definition: DefinitionType): void {
    this.definition = definition;

  }
}
