export class JSONException extends Error {
  static readonly serialVersionUID = 0;
  readonly cause?: unknown;
  constructor(messageOrCause: string | Error) {
    super(typeof messageOrCause === "string" ? messageOrCause : messageOrCause.message);
    if (typeof messageOrCause !== "string") this.cause = messageOrCause;
    this.name = "JSONException";
  }
  getMessage(): string { return this.message; }
}
