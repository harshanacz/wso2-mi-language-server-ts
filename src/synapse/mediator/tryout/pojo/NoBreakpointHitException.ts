// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/NoBreakpointHitException.java by the java2ts converter (see tools/java2ts).

export class NoBreakpointHitException extends Exception {
  static readonly __fields: string[] = [];

  constructor(message: string, cause: Throwable);
  constructor(message: string);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        const [message, cause] = args;


                super(message, cause);

        break;
      }
      case 1: {
        const [message] = args;


                super(message);

        break;
      }
      default: throw new Error('no matching overload');
    }
  }
}
