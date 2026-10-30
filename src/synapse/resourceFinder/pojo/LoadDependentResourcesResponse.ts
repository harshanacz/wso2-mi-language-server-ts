// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/resourceFinder/pojo/LoadDependentResourcesResponse.java by the java2ts converter (see tools/java2ts).
import { ConflictingDependency } from "./ConflictingDependency.js";

export class LoadDependentResourcesResponse {
  static readonly __fields: string[] = ["status", "message", "conflictingDependencies"];

  static readonly STATUS_SUCCESS: string = "SUCCESS";

  static readonly STATUS_NO_DEPS_FOUND: string = "NO_DEPS_FOUND";

  static readonly STATUS_ERROR: string = "ERROR";

  static readonly STATUS_CONFLICT: string = "CONFLICT";

  status?: string;

  message?: string;

  conflictingDependencies?: ConflictingDependency[];

  constructor(status: string, message: string);
  constructor(status: string, message: string, conflictingDependencies: ConflictingDependency[]);
  constructor(...args: any[]) {
    switch (args.length) {
      case 2: {
        const [status, message] = args;


                this.status = status;
                this.message = message;

        break;
      }
      case 3: {
        const [status, message, conflictingDependencies] = args;


                this.status = status;
                this.message = message;
                this.conflictingDependencies = conflictingDependencies;

        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  getStatus(): string {
    return this.status;

  }

  getMessage(): string {
    return this.message;

  }

  getConflictingDependencies(): ConflictingDependency[] {
    return this.conflictingDependencies;

  }
}
