import { unzipSync } from "fflate";
import { decodeUtf8 } from "./fs.js";
import { JFile } from "./JFile.js";

/** java.util.zip.ZipFile replacement: reads the whole archive once and exposes entries by name. */
export class ZipArchive {
  private entries: Record<string, Uint8Array>;

  constructor(source: string | JFile | Uint8Array) {
    const bytes = source instanceof Uint8Array ? source : new JFile(source as string | JFile).readBytes();
    this.entries = unzipSync(bytes);
  }

  getEntry(name: string): string | null {
    return name in this.entries ? name : null;
  }

  has(name: string): boolean {
    return name in this.entries;
  }

  readBytes(name: string): Uint8Array {
    const data = this.entries[name];
    if (!data) {
      throw new Error("Zip entry not found: " + name);
    }
    return data;
  }

  readText(name: string): string {
    return decodeUtf8(this.readBytes(name));
  }

  /** java.util.zip.ZipFile.getInputStream(entry) reduced to what the ported code uses. */
  getInputStream(entry: string): { readAllBytes(): Uint8Array; close(): void } {
    const data = this.readBytes(entry);
    return { readAllBytes: () => data, close: () => undefined };
  }

  names(): string[] {
    return Object.keys(this.entries);
  }

  close(): void {
    // nothing to release
  }
}

export { ZipArchive as ZipFile };
