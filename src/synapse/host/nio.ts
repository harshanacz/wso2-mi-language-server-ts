import { decodeUtf8, encodeUtf8, getHostFileSystem, normalizePath } from "./fs.js";
import { JFile } from "./JFile.js";

/** java.nio.file.Path over forward-slash string paths. */
export class Path {
  private readonly p: string;

  private constructor(p: string) {
    this.p = p;
  }

  static of(first: string, ...more: string[]): Path {
    return Paths.get(first, ...more);
  }

  static fromString(p: string): Path {
    return new Path(p);
  }

  toString(): string { return this.p; }

  getFileName(): Path | null {
    if (this.p === "" || this.p === "/") return null;
    const i = this.p.lastIndexOf("/");
    return new Path(i < 0 ? this.p : this.p.substring(i + 1));
  }

  getParent(): Path | null {
    const i = this.p.lastIndexOf("/");
    if (i < 0) return null;
    return new Path(i === 0 ? "/" : this.p.substring(0, i));
  }

  getRoot(): Path | null { return this.p.startsWith("/") ? new Path("/") : null; }

  resolve(other: string | Path): Path {
    const o = other.toString();
    if (o.startsWith("/")) return new Path(normalizePath(o));
    return new Path(normalizePath(this.p === "" ? o : this.p + "/" + o));
  }

  resolveSibling(other: string | Path): Path {
    const parent = this.getParent();
    return parent ? parent.resolve(other) : new Path(other.toString());
  }

  relativize(other: Path): Path {
    const a = this.p.split("/").filter(Boolean);
    const b = other.p.split("/").filter(Boolean);
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return new Path([...a.slice(i).map(() => ".."), ...b.slice(i)].join("/"));
  }

  startsWith(other: string | Path): boolean {
    const o = other.toString();
    return this.p === o || this.p.startsWith(o.endsWith("/") ? o : o + "/");
  }

  endsWith(other: string | Path): boolean {
    const o = other.toString();
    return this.p === o || this.p.endsWith("/" + o);
  }

  normalize(): Path { return new Path(normalizePath(this.p)); }
  toAbsolutePath(): Path { return this; }
  toRealPath(): Path { return this; }
  isAbsolute(): boolean { return this.p.startsWith("/") || /^[A-Za-z]:/.test(this.p); }
  toFile(): JFile { return new JFile(this.p); }
  toUri(): URI { return new URI("file://" + (this.p.startsWith("/") ? this.p : "/" + this.p)); }
  getNameCount(): number { return this.p.split("/").filter(Boolean).length; }
  getName(i: number): Path { return new Path(this.p.split("/").filter(Boolean)[i]); }
  equals(o: unknown): boolean { return o instanceof Path && o.p === this.p; }
  compareTo(o: Path): number { return this.p < o.p ? -1 : this.p > o.p ? 1 : 0; }
  [Symbol.iterator](): Iterator<Path> {
    return this.p.split("/").filter(Boolean).map((s) => new Path(s))[Symbol.iterator]();
  }
}

export class URI {
  constructor(private readonly s: string) {}
  toString(): string { return this.s; }
}

export const Paths = {
  get(first: string | URI, ...more: string[]): Path {
    let base = first.toString();
    if (first instanceof URI || base.startsWith("file://")) {
      base = decodeURIComponent(base.replace(/^file:\/\/\/?/, "/"));
      if (/^\/[A-Za-z]:/.test(base)) base = base.substring(1);
    }
    return Path.fromString(normalizePath([base, ...more].filter((x) => x !== "").join("/")));
  },
};

function fs() {
  return getHostFileSystem();
}

export class FileTime {
  constructor(private readonly ms: number) {}
  toMillis(): number { return this.ms; }
}

export class IOException extends Error {}
export class NoSuchFileException extends IOException {}

export const StandardCopyOption = { REPLACE_EXISTING: "REPLACE_EXISTING", COPY_ATTRIBUTES: "COPY_ATTRIBUTES" };
export const StandardCharsets = { UTF_8: "utf-8" };

/** java.nio.file.Files subset, backed by the host file system. */
export const Files = {
  exists: (p: Path | string): boolean => fs().stat(p.toString()) !== null,
  notExists: (p: Path | string): boolean => fs().stat(p.toString()) === null,
  isDirectory: (p: Path | string): boolean => fs().stat(p.toString())?.isDirectory ?? false,
  isRegularFile: (p: Path | string): boolean => fs().stat(p.toString())?.isFile ?? false,
  isReadable: (p: Path | string): boolean => fs().stat(p.toString()) !== null,
  size: (p: Path | string): number => {
    const s = fs().stat(p.toString());
    if (!s) throw new NoSuchFileException(p.toString());
    return s.size;
  },
  getLastModifiedTime: (p: Path | string): FileTime => {
    const s = fs().stat(p.toString());
    if (!s) throw new NoSuchFileException(p.toString());
    return new FileTime(s.mtimeMs);
  },
  readString: (p: Path | string): string => {
    if (!fs().stat(p.toString())) throw new NoSuchFileException(p.toString());
    return decodeUtf8(fs().readBytes(p.toString()));
  },
  readAllBytes: (p: Path | string): Uint8Array => {
    if (!fs().stat(p.toString())) throw new NoSuchFileException(p.toString());
    return fs().readBytes(p.toString());
  },
  readAllLines: (p: Path | string): string[] => {
    const text = Files.readString(p);
    if (text === "") return [];
    const lines = text.split(/\r\n|\r|\n/);
    if (lines[lines.length - 1] === "") lines.pop();
    return lines;
  },
  writeString: (p: Path | string, content: string): Path => {
    fs().writeBytes(p.toString(), encodeUtf8(content));
    return p instanceof Path ? p : Path.fromString(p);
  },
  write: (p: Path | string, content: string | Uint8Array | string[]): Path => {
    const data = typeof content === "string" ? encodeUtf8(content) : Array.isArray(content) ? encodeUtf8(content.join("\n") + "\n") : content;
    fs().writeBytes(p.toString(), data);
    return p instanceof Path ? p : Path.fromString(p);
  },
  createDirectories: (p: Path | string): Path => {
    fs().mkdirs(p.toString());
    return p instanceof Path ? p : Path.fromString(p);
  },
  createDirectory: (p: Path | string): Path => Files.createDirectories(p),
  createFile: (p: Path | string): Path => Files.write(p, ""),
  delete: (p: Path | string): void => {
    if (!fs().remove(p.toString())) throw new NoSuchFileException(p.toString());
  },
  deleteIfExists: (p: Path | string): boolean => fs().remove(p.toString()),
  copy: (src: Path | string, dst: Path | string): Path => {
    fs().writeBytes(dst.toString(), fs().readBytes(src.toString()));
    return dst instanceof Path ? dst : Path.fromString(dst);
  },
  move: (src: Path | string, dst: Path | string): Path => {
    Files.copy(src, dst);
    fs().remove(src.toString());
    return dst instanceof Path ? dst : Path.fromString(dst);
  },
  list: (p: Path | string): Path[] => fs().readDir(p.toString()).map((n) => Path.fromString(p.toString()).resolve(n)),
  /** Files.walk: the root followed by every descendant, depth first. */
  walk: (p: Path | string, maxDepth = Number.MAX_SAFE_INTEGER): Path[] => {
    const out: Path[] = [];
    const visit = (cur: string, depth: number) => {
      out.push(Path.fromString(cur));
      if (depth >= maxDepth || !fs().stat(cur)?.isDirectory) return;
      for (const n of fs().readDir(cur)) visit(cur + "/" + n, depth + 1);
    };
    visit(p.toString(), 0);
    return out;
  },
};
