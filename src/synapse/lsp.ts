/**
 * lsp4j look-alikes used by the ported services. They keep the lsp4j accessor style (getLine, getRange, ...)
 * while serialising to the same JSON as the Java classes (plain public fields).
 */
export class Position {
  line: number;
  character: number;
  constructor(line = 0, character = 0) {
    this.line = line;
    this.character = character;
  }
  getLine(): number { return this.line; }
  setLine(line: number): void { this.line = line; }
  getCharacter(): number { return this.character; }
  setCharacter(character: number): void { this.character = character; }
  equals(o: unknown): boolean { return o instanceof Position && o.line === this.line && o.character === this.character; }
}

export class Range {
  start: Position;
  end: Position;
  constructor(start?: Position, end?: Position) {
    this.start = start ?? new Position();
    this.end = end ?? new Position();
  }
  getStart(): Position { return this.start; }
  setStart(start: Position): void { this.start = start; }
  getEnd(): Position { return this.end; }
  setEnd(end: Position): void { this.end = end; }
}

export class Location {
  uri: string;
  range: Range;
  constructor(uri: string, range: Range) {
    this.uri = uri;
    this.range = range;
  }
  getUri(): string { return this.uri; }
  getRange(): Range { return this.range; }
}

export class TextEdit {
  range: Range;
  newText: string;
  constructor(range: Range, newText: string) {
    this.range = range;
    this.newText = newText;
  }
  getRange(): Range { return this.range; }
  setRange(range: Range): void { this.range = range; }
  getNewText(): string { return this.newText; }
  setNewText(newText: string): void { this.newText = newText; }
}

export class WorkspaceFolder {
  uri: string;
  name?: string;
  constructor(uri: string, name?: string) {
    this.uri = uri;
    this.name = name;
  }
  getUri(): string { return this.uri; }
  getName(): string | undefined { return this.name; }
}

export class TextDocumentIdentifier {
  uri: string;
  constructor(uri: string) { this.uri = uri; }
  getUri(): string { return this.uri; }
}

/** org.eclipse.lsp4j.jsonrpc.messages.Either. Serialises as the wrapped value (what lsp4j's adapter does). */
export class Either<L, R> {
  private constructor(private readonly left: L | null | undefined, private readonly right: R | null | undefined,
                      private readonly isLeftSide: boolean) {}
  static forLeft<L, R>(left: L): Either<L, R> { return new Either<L, R>(left, null, true); }
  static forRight<L, R>(right: R): Either<L, R> { return new Either<L, R>(null, right, false); }
  isLeft(): boolean { return this.isLeftSide; }
  isRight(): boolean { return !this.isLeftSide; }
  getLeft(): L { return this.left as L; }
  getRight(): R { return this.right as R; }
  get<T = L | R>(): T { return (this.isLeftSide ? this.left : this.right) as unknown as T; }
  toJSON(): unknown { return this.isLeftSide ? this.left : this.right; }
}

/** lsp4j CancelChecker: throws when the request was cancelled. The default never cancels. */
export interface CancelChecker {
  checkCanceled(): void;
}
