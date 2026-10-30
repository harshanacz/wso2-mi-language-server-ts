// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/RequestedResource.java by the java2ts converter (see tools/java2ts).

export class RequestedResource {
  static readonly __fields: string[] = ["type", "needRegistry"];

  type?: string;

  needRegistry: boolean = true;

  constructor();
  constructor(type: string, needRegistry: boolean);
  constructor(...args: any[]) {
    switch (args.length) {
      case 0: {

        break;
      }
      case 2: {
        const [type, needRegistry] = args;


                this.type = type;
                this.needRegistry = needRegistry;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getType(): string {
    return this.type;

  }

  setType(type: string): void {
    this.type = type;

  }

  isNeedRegistry(): boolean {
    return this.needRegistry;

  }

  setNeedRegistry(needRegistry: boolean): void {
    this.needRegistry = needRegistry;

  }
}
