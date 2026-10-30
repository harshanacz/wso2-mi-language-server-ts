import "./serializer/endpoint/registerEndpointSerializers.js";
import { parseDOM } from "./dom/dom.js";
import { SyntaxTreeGenerator } from "./SyntaxTreeGenerator.js";

export { SyntaxTreeGenerator } from "./SyntaxTreeGenerator.js";
export { ArtifactTypeResponse } from "./pojo/ArtifactTypeResponse.js";
export { setHostFileReader } from "./hostFs.js";
export { toJsonTree } from "./toJsonTree.js";

export interface SyntaxTreeResult {
  syntaxTree: unknown;
  defFilePath: string;
}

/** `synapse/syntaxTree`: same response shape as the Java server (SyntaxTreeResponse). */
export function syntaxTreeForDocument(text: string, uri: string, projectPath?: string): SyntaxTreeResult {
  const generator = new SyntaxTreeGenerator();
  generator.setProjectPath(projectPath as string);
  const response = generator.getSyntaxTree(parseDOM(text, uri));
  return { syntaxTree: response.getSyntaxTree() ?? null, defFilePath: response.getDefFilePath() } as SyntaxTreeResult;
}

/** `synapse/getArtifactType`. `content` is null when the file cannot be read. */
export function artifactTypeForDocument(path: string, content: string | null) {
  return SyntaxTreeGenerator.getArtifactType(path, content);
}
