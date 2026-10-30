/** Java number types org.json distinguishes: Long keeps 64 bit precision, Double prints like Double.toString. */
export class JLong {
  constructor(readonly value: bigint) {}
  toString(): string { return this.value.toString(); }
}

export class JDouble {
  constructor(readonly value: number) {}
  /** java.lang.Double.toString */
  toString(): string { return javaDoubleToString(this.value); }
}

export function javaDoubleToString(d: number): string {
  if (Number.isNaN(d)) return "NaN";
  if (d === Infinity) return "Infinity";
  if (d === -Infinity) return "-Infinity";
  if (d === 0) return Object.is(d, -0) ? "-0.0" : "0.0";
  const abs = Math.abs(d);
  if (abs >= 1e-3 && abs < 1e7) {
    const s = String(d);
    return s.includes(".") ? s : s + ".0";
  }
  // scientific: d.dddE[-]n
  const exp = d.toExponential(); // e.g. 1.5e+21
  const m = /^(-?)(\d)(?:\.(\d+))?e([+-])(\d+)$/.exec(exp)!;
  const mant = m[2] + "." + (m[3] ?? "0");
  return m[1] + mant + "E" + (m[4] === "-" ? "-" : "") + m[5];
}

export function isJavaNumber(v: unknown): v is JLong | JDouble {
  return v instanceof JLong || v instanceof JDouble;
}
