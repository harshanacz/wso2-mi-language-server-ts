// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/entity/TestConnectionResponse.java by the java2ts converter (see tools/java2ts).

export class TestConnectionResponse {
  static readonly __fields: string[] = ["isConnectionTested", "isConnectionValid", "errorMessage"];

  isConnectionTested: boolean = false;

  isConnectionValid?: boolean;

  errorMessage?: string;

  constructor(isConnectionValid: boolean);
  constructor(errorMessage: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        if (typeof args[0] === 'boolean') {
          const [isConnectionValid] = args;


                  this.isConnectionTested = true;
                  this.isConnectionValid = isConnectionValid;

        } else if (typeof args[0] === 'string') {
          const [errorMessage] = args;


                  this.isConnectionTested = false;
                  this.errorMessage = errorMessage;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  toString(): string {
    return "TestConnectionResponse{" +
            "isConnectionTested=" + this.isConnectionTested +
            ", isConnectionValid=" + this.isConnectionValid +
            ", errorMessage='" + this.errorMessage + '\'' +
            '}';

  }
}
