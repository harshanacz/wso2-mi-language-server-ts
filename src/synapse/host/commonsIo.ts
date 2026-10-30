import { JFile } from "./JFile.js";
import { Path } from "./nio.js";

type F = JFile | Path | string;
const f = (x: F): JFile => (x instanceof JFile ? x : new JFile(x.toString()));

/** org.apache.commons.io.FileUtils subset. */
export const FileUtils = {
  getFile: (dir: F, ...names: string[]): JFile => names.reduce((acc, n) => new JFile(acc, n), f(dir)),
  readFileToString: (file: F): string => f(file).readText(),
  writeStringToFile: (file: F, data: string): void => f(file).writeText(data),
  copyFile: (src: F, dst: F): void => f(dst).writeBytes(f(src).readBytes()),
  copyFileToDirectory: (src: F, dir: F): void => {
    const s = f(src);
    new JFile(f(dir), s.getName()).writeBytes(s.readBytes());
  },
  copyDirectory: (src: F, dst: F): void => {
    const from = f(src);
    const to = f(dst);
    to.mkdirs();
    for (const child of from.listFiles() ?? []) {
      if (child.isDirectory()) FileUtils.copyDirectory(child, new JFile(to, child.getName()));
      else new JFile(to, child.getName()).writeBytes(child.readBytes());
    }
  },
  delete: (file: F): void => { f(file).delete(); },
  deleteDirectory: (dir: F): void => { f(dir).delete(); },
  deleteQuietly: (file: F): boolean => f(file).delete(),
  forceDelete: (file: F): void => { f(file).delete(); },
  forceMkdir: (dir: F): void => { f(dir).mkdirs(); },
  moveFile: (src: F, dst: F): void => {
    FileUtils.copyFile(src, dst);
    f(src).delete();
  },
  listFiles: (dir: F, extensions: string[] | null, recursive: boolean): JFile[] => {
    const out: JFile[] = [];
    const visit = (d: JFile) => {
      for (const c of d.listFiles() ?? []) {
        if (c.isDirectory()) {
          if (recursive) visit(c);
        } else if (!extensions || extensions.some((e) => c.getName().endsWith("." + e))) {
          out.push(c);
        }
      }
    };
    visit(f(dir));
    return out;
  },
  sizeOf: (file: F): number => f(file).length(),
};

/** org.apache.commons.io.FilenameUtils subset. */
export const FilenameUtils = {
  getName: (p: string): string => p.replace(/\\/g, "/").split("/").pop() ?? "",
  getExtension: (p: string): string => {
    const n = FilenameUtils.getName(p);
    const i = n.lastIndexOf(".");
    return i < 0 ? "" : n.substring(i + 1);
  },
  getBaseName: (p: string): string => {
    const n = FilenameUtils.getName(p);
    const i = n.lastIndexOf(".");
    return i < 0 ? n : n.substring(0, i);
  },
  removeExtension: (p: string): string => {
    const i = p.lastIndexOf(".");
    return i <= p.lastIndexOf("/") ? p : p.substring(0, i);
  },
  normalize: (p: string): string => p.replace(/\\/g, "/"),
};

const HTML4_ENTITIES: Record<string, string> = {
  quot: '"', amp: "&", lt: "<", gt: ">", apos: "'", nbsp: " ", copy: "©", reg: "®", laquo: "«", raquo: "»",
  eacute: "é", egrave: "è", agrave: "à", aacute: "á", uuml: "ü", ouml: "ö", auml: "ä",
  szlig: "ß", ntilde: "ñ", ccedil: "ç", euro: "€", pound: "£", yen: "¥", cent: "¢",
  hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  bull: "•", trade: "™", times: "×", divide: "÷", deg: "°", plusmn: "±", micro: "µ",
};

/** org.apache.commons.text.StringEscapeUtils subset. Unknown entities are left untouched like commons-text does. */
export const StringEscapeUtils = {
  unescapeHtml4: (s: string | null): string | null => {
    if (s === null || s === undefined) return null;
    return s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[A-Za-z][A-Za-z0-9]*);/g, (m, e: string) => {
      if (e[0] === "#") {
        const cp = e[1] === "x" || e[1] === "X" ? parseInt(e.substring(2), 16) : parseInt(e.substring(1), 10);
        return Number.isNaN(cp) || cp > 0x10ffff ? m : String.fromCodePoint(cp);
      }
      return HTML4_ENTITIES[e] ?? m;
    });
  },
  unescapeXml: (s: string | null): string | null => {
    if (s === null || s === undefined) return null;
    return s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|quot|apos|amp|lt|gt);/g, (m, e: string) => {
      if (e[0] === "#") {
        const cp = e[1] === "x" || e[1] === "X" ? parseInt(e.substring(2), 16) : parseInt(e.substring(1), 10);
        return Number.isNaN(cp) ? m : String.fromCodePoint(cp);
      }
      return HTML4_ENTITIES[e];
    });
  },
  escapeXml10: (s: string | null): string | null =>
    s === null || s === undefined ? null : s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"),
};
