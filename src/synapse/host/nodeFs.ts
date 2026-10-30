import * as nodeFs from "node:fs";
import type { FileStat, HostFileSystem } from "./fs.js";

/** Real disk implementation, only imported by Node entry points (never by the browser bundle). */
export class NodeFileSystem implements HostFileSystem {
  stat(path: string): FileStat | null {
    try {
      const s = nodeFs.statSync(path);
      return { isFile: s.isFile(), isDirectory: s.isDirectory(), size: s.size, mtimeMs: s.mtimeMs };
    } catch {
      return null;
    }
  }

  readDir(path: string): string[] {
    try {
      return nodeFs.readdirSync(path);
    } catch {
      return [];
    }
  }

  readBytes(path: string): Uint8Array {
    return nodeFs.readFileSync(path);
  }

  writeBytes(path: string, data: Uint8Array): void {
    const i = path.lastIndexOf("/");
    if (i > 0) {
      nodeFs.mkdirSync(path.substring(0, i), { recursive: true });
    }
    nodeFs.writeFileSync(path, data);
  }

  mkdirs(path: string): void {
    nodeFs.mkdirSync(path, { recursive: true });
  }

  remove(path: string): boolean {
    if (!nodeFs.existsSync(path)) {
      return false;
    }
    nodeFs.rmSync(path, { recursive: true, force: true });
    return true;
  }
}
