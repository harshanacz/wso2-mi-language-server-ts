import { Path } from "./nio.js";
import { decodeUtf8, encodeUtf8, getHostFileSystem, normalizePath } from "./fs.js";

/**
 * A small java.io.File look-alike over the host file system. Paths are kept with forward slashes.
 */
export class JFile {
  static readonly separator = "/";
  private readonly path: string;

  constructor(first: string | JFile, second?: string) {
    const a = first instanceof JFile ? first.path : first;
    if (second === undefined) {
      this.path = JFile.clean(a);
    } else {
      this.path = JFile.clean(a === "" ? second : a + "/" + second);
    }
  }

  private static clean(p: string): string {
    const n = p.replace(/\\/g, "/");
    // normalizePath collapses `..`, which Java's File does not, but every caller resolves paths anyway.
    return n === "" ? "" : normalizePath(n) || (n.startsWith("/") ? "/" : "");
  }

  getPath(): string {
    return this.path;
  }

  getAbsolutePath(): string {
    return this.path;
  }

  getName(): string {
    const i = this.path.lastIndexOf("/");
    return i < 0 ? this.path : this.path.substring(i + 1);
  }

  getAbsoluteFile(): JFile {
    return this;
  }

  getCanonicalPath(): string {
    return this.path;
  }

  getParent(): string | null {
    const i = this.path.lastIndexOf("/");
    if (i < 0) {
      return null;
    }
    if (i === 0) {
      return this.path.length > 1 ? "/" : null;
    }
    return this.path.substring(0, i);
  }

  getParentFile(): JFile | null {
    const p = this.getParent();
    return p === null ? null : new JFile(p);
  }

  exists(): boolean {
    return getHostFileSystem().stat(this.path) !== null;
  }

  isDirectory(): boolean {
    return getHostFileSystem().stat(this.path)?.isDirectory ?? false;
  }

  isFile(): boolean {
    return getHostFileSystem().stat(this.path)?.isFile ?? false;
  }

  length(): number {
    return getHostFileSystem().stat(this.path)?.size ?? 0;
  }

  lastModified(): number {
    return getHostFileSystem().stat(this.path)?.mtimeMs ?? 0;
  }

  /** Children as files, or null when this is not a directory (same contract as File.listFiles). */
  listFiles(filter?: (f: JFile) => boolean): JFile[] | null {
    if (!this.isDirectory()) {
      return null;
    }
    const files = getHostFileSystem().readDir(this.path).map((n) => new JFile(this, n));
    return filter ? files.filter(filter) : files;
  }

  list(): string[] | null {
    return this.isDirectory() ? getHostFileSystem().readDir(this.path) : null;
  }

  mkdirs(): boolean {
    if (this.exists()) {
      return false;
    }
    getHostFileSystem().mkdirs(this.path);
    return true;
  }

  mkdir(): boolean {
    return this.mkdirs();
  }

  delete(): boolean {
    return getHostFileSystem().remove(this.path);
  }

  readText(): string {
    return decodeUtf8(getHostFileSystem().readBytes(this.path));
  }

  writeText(text: string): void {
    getHostFileSystem().writeBytes(this.path, encodeUtf8(text));
  }

  readBytes(): Uint8Array {
    return getHostFileSystem().readBytes(this.path);
  }

  writeBytes(data: Uint8Array): void {
    getHostFileSystem().writeBytes(this.path, data);
  }

  isHidden(): boolean { return this.getName().startsWith("."); }

  toPath(): Path { return Path.fromString(this.path); }

  toURI(): string { return "file://" + (this.path.startsWith("/") ? this.path : "/" + this.path); }

  resolve(child: string): JFile {
    return new JFile(this, child);
  }

  toString(): string {
    return this.path;
  }

  equals(other: unknown): boolean {
    return other instanceof JFile && other.path === this.path;
  }
}

/** Java `Paths.get(first, more...)`/`Path.of(...)` as a joined string path. */
export function joinPath(...parts: string[]): string {
  const nonEmpty = parts.filter((p) => p !== "");
  return normalizePath(nonEmpty.join("/"));
}

/** Recursively lists every regular file below a directory (Files.walk filtered to regular files). */
export function walkFiles(root: string): string[] {
  const out: string[] = [];
  const visit = (dir: JFile) => {
    for (const child of dir.listFiles() ?? []) {
      if (child.isDirectory()) {
        visit(child);
      } else {
        out.push(child.getPath());
      }
    }
  };
  visit(new JFile(root));
  return out;
}
