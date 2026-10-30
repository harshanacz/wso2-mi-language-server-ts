// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/DbMediator/DbMediator.java by the java2ts converter (see tools/java2ts).
import { DbMediatorConnection } from "./DbMediatorConnection.js";
import { DbMediatorStatement } from "./DbMediatorStatement.js";
import { Mediator } from "../../Mediator.js";

export class DbMediator extends Mediator {
  connection?: DbMediatorConnection;

  statement?: DbMediatorStatement[];

  useTransaction: boolean = false;

  description?: string;

  traceFilter?: string;

  getConnection(): DbMediatorConnection {
    return this.connection;

  }

  setConnection(connection: DbMediatorConnection): void {
    this.connection = connection;

  }

  getStatement(): DbMediatorStatement[] {
    return this.statement;

  }

  setStatement(statement: DbMediatorStatement[]): void {
    this.statement = statement;

  }

  isUseTransaction(): boolean {
    return this.useTransaction;

  }

  setUseTransaction(useTransaction: boolean): void {
    this.useTransaction = useTransaction;

  }

  getDescription(): string {
    return this.description;

  }

  setDescription(description: string): void {
    this.description = description;

  }

  getTraceFilter(): string {
    return this.traceFilter;

  }

  setTraceFilter(traceFilter: string): void {
    this.traceFilter = traceFilter;

  }
}
