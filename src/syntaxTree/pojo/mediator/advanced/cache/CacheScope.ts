// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/cache/CacheScope.java by the java2ts converter (see tools/java2ts).

export class CacheScope {
  value: string;
  getValue(): string {
    return this.value;

  }

  static readonly PER_HOST = new CacheScope("PER_HOST", 0, "per-host");
  static readonly PER_MEDIATOR = new CacheScope("PER_MEDIATOR", 1, "per-mediator");

  private constructor(private readonly _name: string, private readonly _ordinal: number, value: string) {
    this.value = value;

  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this.getValue(); }
  static values(): CacheScope[] { return [CacheScope.PER_HOST, CacheScope.PER_MEDIATOR]; }
  static valueOf(name: string): CacheScope {
    const v = CacheScope.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
