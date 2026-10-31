// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/tryout/pojo/MediatorTryoutRequest.java by the java2ts converter (see tools/java2ts).
import { Edit } from "./Edit.js";
import { MediatorInfo } from "./MediatorInfo.js";
import { Property } from "./Property.js";

export class MediatorTryoutRequest {
  static readonly __fields: string[] = ["file", "tryoutId", "line", "column", "contentType", "inputPayload", "queryParams", "pathParams", "edits", "mediatorInfo", "_isIsolatedTryout"];

  file?: string;

  tryoutId?: string;

  line: number = 0;

  column: number = 0;

  contentType?: string;

  inputPayload?: string;

  queryParams?: Property[];

  pathParams?: Property[];

  edits?: Edit[];

  mediatorInfo?: MediatorInfo;

  _isIsolatedTryout: boolean = false;

  constructor(file: string, line: number, column: number, inputPayload: string, edits: Edit[]);
  constructor(file: string, line: number, column: number, contentType: string, inputPayload: string, edits: Edit[]);
  constructor(...args: any[]) {
    dispatch: for (;;) {
    switch (args.length) {
      case 5: {
        const [file, line, column, inputPayload, edits] = args;


                args = [file, line, column, "application/json", inputPayload, edits];


                continue dispatch;
        break dispatch;
      }
      case 6: {
        const [file, line, column, contentType, inputPayload, edits] = args;


                this.file = file;
                this.line = line;
                this.column = column;
                this.contentType = contentType;
                this.inputPayload = inputPayload;
                this.edits = edits;
                this.queryParams = [];
                this.pathParams = [];

        break dispatch;
      }
      default: throw new Error('no matching overload');
    }
    }
  }

  getFile(): string {
    return this.file;

  }

  getLine(): number {
    return this.line;

  }

  getColumn(): number {
    return this.column;

  }

  getContentType(): string {
    return this.contentType;

  }

  getInputPayload(): string {
    return this.inputPayload;

  }

  getEdits(): Edit[] {
    if (this.edits == null) {
        return null;
    }
    return this.edits == null ? this.edits : [...this.edits];

  }

  getMediatorInfo(): MediatorInfo {
    return this.mediatorInfo;

  }

  setMediatorInfo(mediatorInfo: MediatorInfo): void {
    this.mediatorInfo = mediatorInfo;

  }

  getTryoutId(): string {
    return this.tryoutId;

  }

  setTryoutId(tryoutId: string): void {
    this.tryoutId = tryoutId;

  }

  isIsolatedTryout(): boolean {
    return this._isIsolatedTryout;

  }

  getQueryParams(): Property[] {
    return this.queryParams;

  }

  getPathParams(): Property[] {
    return this.pathParams;

  }

  toString(): string {
    return "MediatorTryoutRequest{" +
            "file='" + this.file + '\'' +
            ", tryoutId='" + this.tryoutId + '\'' +
            ", line=" + this.line +
            ", column=" + this.column +
            ", inputPayload='" + this.inputPayload + '\'' +
            ", edits=" + String(this.edits) +
            ", mediatorInfo=" + this.mediatorInfo +
            ", isIsolatedTryout=" + this._isIsolatedTryout +
            '}';

  }
}
