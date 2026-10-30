/**
 * Host file system seam. The Java services read and write project files directly (java.io.File, Files).
 * Here every access goes through a HostFileSystem so the same code runs on Node (real disk) and in the browser
 * (in-memory or a host provided virtual file system). All operations are synchronous to keep the ported logic
 * identical to the Java original; browser hosts preload the project files into a MemoryFileSystem.
 */
export interface FileStat {
  isFile: boolean;
  isDirectory: boolean;
  size: number;
  mtimeMs: number;
}

export interface HostFileSystem {
  stat(path: string): FileStat | null;
  /** Names (not paths) of the direct children of a directory. */
  readDir(path: string): string[];
  readBytes(path: string): Uint8Array;
  writeBytes(path: string, data: Uint8Array): void;
  mkdirs(path: string): void;
  /** Deletes a file or a whole directory tree. Returns true when something was removed. */
  remove(path: string): boolean;
}

const utf8Decoder = new TextDecoder("utf-8");
const utf8Encoder = new TextEncoder();

export function decodeUtf8(bytes: Uint8Array): string {
  return utf8Decoder.decode(bytes);
}

export function encodeUtf8(text: string): Uint8Array {
  return utf8Encoder.encode(text);
}

/** Normalises separators and removes `.`/`..` segments and duplicate or trailing slashes. */
export function normalizePath(path: string): string {
  let p = path.replace(/\\/g, "/");
  const driveMatch = /^[A-Za-z]:/.exec(p);
  const drive = driveMatch ? driveMatch[0] : "";
  if (drive) {
    p = p.substring(2);
  }
  const absolute = p.startsWith("/");
  const out: string[] = [];
  for (const seg of p.split("/")) {
    if (seg === "" || seg === ".") {
      continue;
    }
    if (seg === "..") {
      if (out.length > 0 && out[out.length - 1] !== "..") {
        out.pop();
      } else if (!absolute) {
        out.push("..");
      }
      continue;
    }
    out.push(seg);
  }
  const joined = out.join("/");
  if (absolute) {
    return drive + "/" + joined;
  }
  return drive + joined;
}

/** In-memory file system, the default for browsers and tests. */
export class MemoryFileSystem implements HostFileSystem {
  private files = new Map<string, { data: Uint8Array; mtimeMs: number }>();
  private dirs = new Set<string>(["/"]);

  private parentOf(path: string): string {
    const i = path.lastIndexOf("/");
    return i <= 0 ? "/" : path.substring(0, i);
  }

  stat(path: string): FileStat | null {
    const p = normalizePath(path);
    const f = this.files.get(p);
    if (f) {
      return { isFile: true, isDirectory: false, size: f.data.length, mtimeMs: f.mtimeMs };
    }
    if (this.dirs.has(p)) {
      return { isFile: false, isDirectory: true, size: 0, mtimeMs: 0 };
    }
    return null;
  }

  readDir(path: string): string[] {
    const p = normalizePath(path);
    const prefix = p.endsWith("/") ? p : p + "/";
    const names = new Set<string>();
    for (const key of [...this.files.keys(), ...this.dirs]) {
      if (key !== p && key.startsWith(prefix)) {
        const rest = key.substring(prefix.length);
        names.add(rest.split("/")[0]);
      }
    }
    return [...names].sort();
  }

  readBytes(path: string): Uint8Array {
    const f = this.files.get(normalizePath(path));
    if (!f) {
      throw new Error("File not found: " + path);
    }
    return f.data;
  }

  writeBytes(path: string, data: Uint8Array): void {
    const p = normalizePath(path);
    this.mkdirs(this.parentOf(p));
    this.files.set(p, { data, mtimeMs: Date.now() });
  }

  mkdirs(path: string): void {
    let p = normalizePath(path);
    while (p && !this.dirs.has(p)) {
      this.dirs.add(p);
      p = this.parentOf(p);
      if (p === "/") {
        break;
      }
    }
  }

  remove(path: string): boolean {
    const p = normalizePath(path);
    let removed = false;
    if (this.files.delete(p)) {
      removed = true;
    }
    const prefix = p + "/";
    for (const key of [...this.files.keys()]) {
      if (key.startsWith(prefix)) {
        this.files.delete(key);
        removed = true;
      }
    }
    for (const d of [...this.dirs]) {
      if (d === p || d.startsWith(prefix)) {
        this.dirs.delete(d);
        removed = true;
      }
    }
    return removed;
  }

  /** Convenience for tests and hosts that preload content. */
  writeText(path: string, text: string): void {
    this.writeBytes(path, encodeUtf8(text));
  }
}

let current: HostFileSystem = new MemoryFileSystem();

export function setHostFileSystem(fs: HostFileSystem): void {
  current = fs;
}

export function getHostFileSystem(): HostFileSystem {
  return current;
}
