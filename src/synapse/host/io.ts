/** Minimal java.io.Reader family over strings (enough for org.json's tokener). */
export abstract class Reader {
  abstract read(): number;
  markSupported(): boolean { return false; }
  mark(_limit: number): void { throw new Error("mark() not supported"); }
  reset(): void { throw new Error("reset() not supported"); }
  close(): void {}
}

export class StringReader extends Reader {
  private pos = 0;
  private markPos = 0;
  constructor(private readonly s: string) { super(); }
  read(): number { return this.pos < this.s.length ? this.s.charCodeAt(this.pos++) : -1; }
  markSupported(): boolean { return true; }
  mark(_limit: number): void { this.markPos = this.pos; }
  reset(): void { this.pos = this.markPos; }
}

export class BufferedReader extends Reader {
  constructor(private readonly inner: Reader) { super(); }
  read(): number { return this.inner.read(); }
  markSupported(): boolean { return true; }
  mark(limit: number): void { this.inner.mark(limit); }
  reset(): void { this.inner.reset(); }
}
