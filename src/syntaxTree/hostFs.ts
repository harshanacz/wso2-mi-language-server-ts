// Hand ported from the Java original (see git history for the generated base).
/**
 * The syntax tree factories occasionally need to read other project files (for example AI agent templates).
 * The host (Node, browser virtual FS, tests) registers a reader here instead of the code touching a filesystem.
 */
type FileReader = (path: string) => string | null | undefined;

let reader: FileReader = () => null;

export function setHostFileReader(fn: FileReader): void {
  reader = fn;
}

export function readHostFile(path: string): string | null {
  return reader(path) ?? null;
}
