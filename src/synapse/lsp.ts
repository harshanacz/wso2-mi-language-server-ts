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

export const CompletionItemKind = {
  Text: 1, Method: 2, Function: 3, Constructor: 4, Field: 5, Variable: 6, Class: 7, Interface: 8, Module: 9,
  Property: 10, Unit: 11, Value: 12, Enum: 13, Keyword: 14, Snippet: 15, Color: 16, File: 17, Reference: 18,
  Folder: 19, EnumMember: 20, Constant: 21, Struct: 22, Event: 23, Operator: 24, TypeParameter: 25,
} as const;
export type CompletionItemKind = (typeof CompletionItemKind)[keyof typeof CompletionItemKind];

export const InsertTextFormat = { PlainText: 1, Snippet: 2 } as const;
export type InsertTextFormat = (typeof InsertTextFormat)[keyof typeof InsertTextFormat];

export class MarkupContent {
  kind?: string;
  value?: string;
  constructor(kind?: string, value?: string) { this.kind = kind; this.value = value; }
  getKind(): string | undefined { return this.kind; }
  getValue(): string | undefined { return this.value; }
}

export class CompletionItem {
  label?: string;
  kind?: CompletionItemKind;
  detail?: string;
  documentation?: Either<string, MarkupContent>;
  sortText?: string;
  filterText?: string;
  insertText?: string;
  insertTextFormat?: InsertTextFormat;
  textEdit?: Either<TextEdit, any>;
  additionalTextEdits?: TextEdit[];
  commitCharacters?: string[];
  data?: any;
  getLabel(): string | undefined { return this.label; }
  setLabel(label: string | undefined): void { this.label = label; }
  getKind(): CompletionItemKind | undefined { return this.kind; }
  setKind(kind: CompletionItemKind | undefined): void { this.kind = kind; }
  getDetail(): string | undefined { return this.detail; }
  setDetail(detail: string | undefined): void { this.detail = detail; }
  getDocumentation(): Either<string, MarkupContent> | undefined { return this.documentation; }
  setDocumentation(documentation: Either<string, MarkupContent> | undefined): void { this.documentation = documentation; }
  getSortText(): string | undefined { return this.sortText; }
  setSortText(sortText: string | undefined): void { this.sortText = sortText; }
  getFilterText(): string | undefined { return this.filterText; }
  setFilterText(filterText: string | undefined): void { this.filterText = filterText; }
  getInsertText(): string | undefined { return this.insertText; }
  setInsertText(insertText: string | undefined): void { this.insertText = insertText; }
  getInsertTextFormat(): InsertTextFormat | undefined { return this.insertTextFormat; }
  setInsertTextFormat(insertTextFormat: InsertTextFormat | undefined): void { this.insertTextFormat = insertTextFormat; }
  getTextEdit(): Either<TextEdit, any> | undefined { return this.textEdit; }
  setTextEdit(textEdit: Either<TextEdit, any> | undefined): void { this.textEdit = textEdit; }
  getAdditionalTextEdits(): TextEdit[] | undefined { return this.additionalTextEdits; }
  setAdditionalTextEdits(additionalTextEdits: TextEdit[] | undefined): void { this.additionalTextEdits = additionalTextEdits; }
  getCommitCharacters(): string[] | undefined { return this.commitCharacters; }
  setCommitCharacters(commitCharacters: string[] | undefined): void { this.commitCharacters = commitCharacters; }
  getData(): any | undefined { return this.data; }
  setData(data: any | undefined): void { this.data = data; }
}
export class CompletionList {
  isIncomplete: boolean = false;
  items: CompletionItem[] = [];
  constructor(items?: CompletionItem[] | boolean, isIncomplete?: boolean) {
    if (Array.isArray(items)) { this.items = items; this.isIncomplete = isIncomplete ?? false; }
    else if (typeof items === "boolean") { this.isIncomplete = items; }
  }
  getItems(): CompletionItem[] { return this.items; }
  setItems(items: CompletionItem[]): void { this.items = items; }
  isIncompleteList(): boolean { return this.isIncomplete; }
  setIsIncomplete(isIncomplete: boolean): void { this.isIncomplete = isIncomplete; }
}

export class ParameterInformation {
  label?: Either<string, any>;
  documentation?: Either<string, MarkupContent>;
  getLabel(): Either<string, any> | undefined { return this.label; }
  setLabel(label: Either<string, any> | undefined): void { this.label = label; }
  getDocumentation(): Either<string, MarkupContent> | undefined { return this.documentation; }
  setDocumentation(documentation: Either<string, MarkupContent> | undefined): void { this.documentation = documentation; }
}
export class SignatureInformation {
  label?: string;
  documentation?: Either<string, MarkupContent>;
  parameters?: ParameterInformation[];
  activeParameter?: number;
  getLabel(): string | undefined { return this.label; }
  setLabel(label: string | undefined): void { this.label = label; }
  getDocumentation(): Either<string, MarkupContent> | undefined { return this.documentation; }
  setDocumentation(documentation: Either<string, MarkupContent> | undefined): void { this.documentation = documentation; }
  getParameters(): ParameterInformation[] | undefined { return this.parameters; }
  setParameters(parameters: ParameterInformation[] | undefined): void { this.parameters = parameters; }
  getActiveParameter(): number | undefined { return this.activeParameter; }
  setActiveParameter(activeParameter: number | undefined): void { this.activeParameter = activeParameter; }
}
export class SignatureHelp {
  signatures: SignatureInformation[];
  activeSignature?: number;
  activeParameter?: number;
  constructor(signatures?: SignatureInformation[], activeSignature?: number, activeParameter?: number) {
    this.signatures = signatures ?? [];
    this.activeSignature = activeSignature;
    this.activeParameter = activeParameter;
  }
  getSignatures(): SignatureInformation[] { return this.signatures; }
  setSignatures(s: SignatureInformation[]): void { this.signatures = s; }
  getActiveSignature(): number | undefined { return this.activeSignature; }
  setActiveSignature(n: number | undefined): void { this.activeSignature = n; }
  getActiveParameter(): number | undefined { return this.activeParameter; }
  setActiveParameter(n: number | undefined): void { this.activeParameter = n; }
}
