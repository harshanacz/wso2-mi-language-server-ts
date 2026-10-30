// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/parser/VersioningTypeMismatchException.java by the java2ts converter (see tools/java2ts).

export class VersioningTypeMismatchException extends Exception {
  static readonly __fields: string[] = [];

  constructor(message: string);
  constructor(message: string, cause: Throwable);
  constructor(...args: any[]) {
    switch (args.length) {
      case 1: {
        const [message] = args;


                super(message);

        break;
      }
      case 2: {
        const [message, cause] = args;


                super(message, cause);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }
}
