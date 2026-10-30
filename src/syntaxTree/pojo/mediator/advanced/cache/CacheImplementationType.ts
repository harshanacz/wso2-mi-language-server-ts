// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/mediator/advanced/cache/CacheImplementationType.java by the java2ts converter (see tools/java2ts).

export class CacheImplementationType {


  static readonly memory = new CacheImplementationType("memory", 0);
  static readonly disk = new CacheImplementationType("disk", 1);

  private constructor(private readonly _name: string, private readonly _ordinal: number) {
  }
  name(): string { return this._name; }
  ordinal(): number { return this._ordinal; }
  toString(): string { return this._name; }
  toJSON(): string { return this._name; }
  static values(): CacheImplementationType[] { return [CacheImplementationType.memory, CacheImplementationType.disk]; }
  static valueOf(name: string): CacheImplementationType {
    const v = CacheImplementationType.values().find((e) => e._name === name);
    if (!v) throw new Error('No enum constant ' + name);
    return v;
  }
}
