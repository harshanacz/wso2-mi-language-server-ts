// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/test/mockservice/Headers.java by the java2ts converter (see tools/java2ts).
import { Header } from "./Header.js";
import { STNode } from "../../../stNode.js";

export class Headers extends STNode {
  headers?: Header[];

  constructor() {
    super();
    this.headers = [];

  }

  getHeaders(): Header[] {
    return this.headers;

  }

  setHeaders(headers: Header[]): void {
    this.headers = headers;

  }

  addHeader(header: Header): void {
    this.headers.push(header);

  }
}
