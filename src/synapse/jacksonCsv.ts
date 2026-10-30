/**
 * The slice of jackson-dataformat-csv the CSV schema generator uses: a header row, a column separator,
 * RFC 4180 quoting (doubled quotes) and rows read into Maps. Rows with more values than the header fail
 * like Jackson's "Too many entries"; shorter rows just leave the trailing columns out.
 */
import { IOException } from "./host/nio.js";

export class CsvSchema {
  constructor(readonly header = false, readonly separator = ",") {}
  static emptySchema(): CsvSchema { return new CsvSchema(); }
  withHeader(): CsvSchema { return new CsvSchema(true, this.separator); }
  withColumnSeparator(c: string): CsvSchema { return new CsvSchema(this.header, c); }
}

class MappingIterator<T> {
  constructor(private readonly rows: T[]) {}
  readAll(): T[] { return [...this.rows]; }
}

class CsvReader {
  private schema = CsvSchema.emptySchema();
  with(schema: CsvSchema): CsvReader {
    this.schema = schema;
    return this;
  }
  readValues(content: string): MappingIterator<Map<string, string>> {
    const records = parseCsv(content, this.schema.separator);
    if (records === null) throw new IOException("No content to map due to end-of-input");
    if (!this.schema.header) {
      throw new IOException("Schema without header is not supported");
    }
    const header = records.shift() ?? [];
    const rows: Map<string, string>[] = [];
    for (const rec of records) {
      if (rec.length > header.length) {
        throw new IOException("Too many entries: expected at most " + header.length + " (value #" + header.length + ")");
      }
      const m = new Map<string, string>();
      rec.forEach((v, i) => m.set(header[i], v));
      rows.push(m);
    }
    return new MappingIterator(rows);
  }
}

export class CsvMapper {
  readerFor(_type: unknown): CsvReader { return new CsvReader(); }
}

/** Returns null for empty input; each record is a list of raw string values. */
function parseCsv(text: string, sep: string): string[][] | null {
  if (text.length === 0) return null;
  const records: string[][] = [];
  let i = 0;
  const n = text.length;
  let rec: string[] = [];
  let atRecordStart = true;
  while (i < n) {
    atRecordStart = false;
    // one value
    let value = "";
    if (text[i] === '"') {
      i++;
      for (;;) {
        if (i >= n) throw new IOException("Missing closing quote for value");
        const ch = text[i];
        if (ch === '"') {
          if (text[i + 1] === '"') {
            value += '"';
            i += 2;
            continue;
          }
          i++;
          break;
        }
        value += ch;
        i++;
      }
      // anything up to the separator / line end after the closing quote is appended (lenient like Jackson)
      while (i < n && text[i] !== sep && text[i] !== "\n" && text[i] !== "\r") value += text[i++];
    } else {
      while (i < n && text[i] !== sep && text[i] !== "\n" && text[i] !== "\r") value += text[i++];
    }
    rec.push(value);
    if (i >= n) break;
    const ch = text[i];
    if (ch === sep) {
      i++;
      if (i >= n) {
        rec.push("");
        break;
      }
      continue;
    }
    // line end
    if (ch === "\r" && text[i + 1] === "\n") i += 2;
    else i++;
    records.push(rec);
    rec = [];
    atRecordStart = true;
  }
  if (!atRecordStart || rec.length > 0) records.push(rec);
  return records;
}
