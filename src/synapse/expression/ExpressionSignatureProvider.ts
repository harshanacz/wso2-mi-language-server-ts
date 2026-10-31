// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/expression/ExpressionSignatureProvider.java by the java2ts converter (see tools/java2ts).
import type { ICompletionRequest, ICompletionResponse } from "../lemminxCompat.js";
import { SignatureInformation, SignatureHelp } from "../lsp.js";
import { isEmpty, size, get, Logger, entrySet } from "../../syntaxTree/javaCompat.js";
import { ExpressionCompletionUtils } from "./ExpressionCompletionUtils.js";
import { ExpressionParam } from "./pojo/ExpressionParam.js";
import { FunctionCompletionItem } from "./pojo/FunctionCompletionItem.js";
import { FunctionInfo } from "./pojo/FunctionInfo.js";

export class ExpressionSignatureProvider {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("ExpressionSignatureProvider");

  static functionSignatures: Map<string, SignatureInformation[]> = new Map();

  static {
    ExpressionSignatureProvider.loadFunctionSignatures();

  }

  constructor() {

  }

  static loadFunctionSignatures(): void {
    let functionCompletionItems = ExpressionCompletionUtils.getFunctions();
    for (let entry of entrySet(functionCompletionItems)) {
        for (let completionItem of entry.getValue().getItems()) {
            let signatureInformation = ((completionItem as FunctionCompletionItem)).getSignature();
            let label = completionItem.getLabel().substring(0, completionItem.getLabel().indexOf('('));
            if (ExpressionSignatureProvider.functionSignatures.has(label)) {
                get(ExpressionSignatureProvider.functionSignatures, label).push(signatureInformation);
            } else {
                let signatures = [];
                signatures.push(signatureInformation);
                ExpressionSignatureProvider.functionSignatures.set(label, signatures);
            }
        }
    }

  }

  static getFunctionSignatures(params: ExpressionParam): SignatureHelp;
  static getFunctionSignatures(expression: string, expressionOffset: number): SignatureHelp;
  static getFunctionSignatures(...args: any[]): any {
    switch (args.length) {
      case 1: {
        const [params] = args;


                return ExpressionSignatureProvider.getFunctionSignatures(params.getExpression(), params.getOffset());


        break;
      }
      case 2: {
        const [expression, expressionOffset] = args;


                let currentFunctionInfo = ExpressionSignatureProvider.findCurrentFunction(expression, expressionOffset);
                if (currentFunctionInfo != null) {
                    let signatureInformation = get(ExpressionSignatureProvider.functionSignatures, currentFunctionInfo.getName());
                    if (signatureInformation != null) {
                        let activeSignature =
                                ExpressionSignatureProvider.findActiveSignature(signatureInformation, currentFunctionInfo.getCurrentParameterIndex());
                        return new SignatureHelp(signatureInformation, activeSignature,
                                currentFunctionInfo.getCurrentParameterIndex());
                    }
                }
                return null;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static findActiveSignature(signatureInformation: SignatureInformation[], currentParameterIndex: number): number {
    let activeSignature = 0;
    for (let i = 0; i < size(signatureInformation); i++) {
        if (size(get(signatureInformation, i).getParameters()) > currentParameterIndex) {
            activeSignature = i;
            break;
        }
    }
    return activeSignature;

  }

  static findCurrentFunction(input: string, cursorPosition: number): FunctionInfo {
    let functionDeque = [];

    for (let i = 0; i < cursorPosition; i++) {
        let c = input.charAt(i);

        if (c == '(') {

            let start = i - 1;
            while (start >= 0 && (/[\p{L}\p{N}]/u.test(input.charAt(start)) || input.charAt(start) == '_')) {
                start--;
            }
            start++;

            let functionName = input.substring(start, i).trim();
            functionDeque.push(new FunctionInfo(functionName, 0));
        } else if (c == ')') {
            if (!isEmpty(functionDeque)) {
                functionDeque.pop();
            }
        } else if (c == ',' && !isEmpty(functionDeque)) {

            functionDeque[functionDeque.length - 1].incrementParameterIndex();
        }
    }


    if (!isEmpty(functionDeque)) {
        let currentContext = functionDeque[functionDeque.length - 1];
        return new FunctionInfo(currentContext.getName(), currentContext.getCurrentParameterIndex());
    }

    return null;

  }
}
