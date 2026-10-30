// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/SessionType.java by the java2ts converter (see tools/java2ts).

export class SessionType {


  static readonly simpleClientSession = new SessionType("simpleClientSession", 0);
  static readonly http = new SessionType("http", 1);
  static readonly soap = new SessionType("soap", 2);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): SessionType[] { return [SessionType.simpleClientSession, SessionType.http, SessionType.soap]; }
  static valueOf(name: string): SessionType {
    const v = SessionType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
