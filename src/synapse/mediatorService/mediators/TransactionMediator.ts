// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediatorService/mediators/TransactionMediator.java by the java2ts converter (see tools/java2ts).
import { TransactionAction } from "../../../syntaxTree/pojo/mediator/advanced/TransactionAction.js";
import { equals, get, parseBoolean } from "../../../syntaxTree/javaCompat.js";
import { Either } from "../../lsp.js";
import { Range } from "../../lsp.js";
import { Transaction } from "../../../syntaxTree/pojo/mediator/advanced/Transaction.js";

export class TransactionMediator {
  static readonly __fields: string[] = [];

  static processData430(data: Map<string, any>, transaction: Transaction, dirtyFields: string[]): Either<Map<string, any>, Map<Range, Map<string, any>>> {
    if (data.has("action") && (typeof get(data, "action") === "string")) {
        let action = (get(data, "action") as string);
        switch (action) {
            case "Commit transaction":
                data.set("action", "commit");
                break;
            case "Fault if no transaction":
                data.set("action", "fault-if-no-tx");
                break;
            case "Initiate new transaction":
                data.set("action", "new");
                break;
            case "Resume transaction":
                data.set("action", "resume");
                break;
            case "Suspend transaction":
                data.set("action", "suspend");
                break;
            case "Rollback transaction":
                data.set("action", "rollback");
                break;
            case "Use existing or initiate transaction":
                data.set("action", "use-existing-or-new");
                break;
            default:
                data.set("action", "");
                break;
        }
    }
    if (data.has("traceFilter") && parseBoolean(String(get(data, "traceFilter")))) {
        data.set("traceFilter", true);
    } else {
        data.set("traceFilter", false);
    }
    return Either.forLeft(data);


  }

  static getDataFromST430(node: Transaction): Map<string, any> {
    let data = new Map();
    data.set("description", node.getDescription());
    if (node.getAction() != null) {
        switch (node.getAction()) {
            case TransactionAction.COMMIT:
                data.set("action", "Commit transaction");
                break;
            case TransactionAction.FAULT_IF_NO_TX:
                data.set("action", "Fault if no transaction");
                break;
            case TransactionAction.NEW:
                data.set("action", "Initiate new transaction");
                break;
            case TransactionAction.RESUME:
                data.set("action", "Resume transaction");
                break;
            case TransactionAction.SUSPEND:
                data.set("action", "Suspend transaction");
                break;
            case TransactionAction.ROLLBACK:
                data.set("action", "Rollback transaction");
                break;
            case TransactionAction.USE_EXISTING_OR_NEW:
                data.set("action", "Use existing or initiate transaction");
                break;
            default:
                data.set("action", "");
                break;
        }
    }
    data.set("traceFilter", equals("enable", node.getTraceFilter()));
    return data;

  }
}
