// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/ServerLessTryoutHandler.java by the java2ts converter (see tools/java2ts).
import { System } from "../../../../syntaxTree/javaCompat.js";
import { JsonPrimitive } from "../../../gson.js";
import { MediatorInfo } from "../../tryout/pojo/MediatorInfo.js";
import { MediatorTryoutInfo } from "../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../tryout/pojo/MediatorTryoutRequest.js";
import { Path, IOException } from "../../../host/nio.js";
import { STNode } from "../../../../syntaxTree/stNode.js";
import { SchemaVisitorFactory } from "./visitor/SchemaVisitorFactory.js";
import { SyntaxTreeGenerator } from "../../../../syntaxTree/SyntaxTreeGenerator.js";
import { TryOutUtils } from "../../TryOutEdits.js";
import { Utils } from "../../../../syntaxTree/utils.js";
import { JFile } from "../../../host/JFile.js";

export class ServerLessTryoutHandler {
  static readonly __fields: string[] = ["TEMP_FOLDER", "projectUri"];

  TEMP_FOLDER: Path = Path.of(System.getProperty("user.home"), ".wso2-mi", "expression-temp");

  static readonly TEMP_FILE_NAME: string = "temp.xml";

  projectUri?: string;

  constructor(projectUri: string) {
    this.projectUri = projectUri;

  }

  handle(request: MediatorTryoutRequest): MediatorTryoutInfo {
    try {
        let filePath = request.getFile();
        if (request.getEdits() != null) {
            let documentUri = request.getFile();
            Utils.copyFile(documentUri, String(this.TEMP_FOLDER), ServerLessTryoutHandler.TEMP_FILE_NAME);
            filePath = String(this.TEMP_FOLDER.resolve(ServerLessTryoutHandler.TEMP_FILE_NAME));
            TryOutUtils.doEdits(request.getEdits(), Path.of(filePath));
            request = new MediatorTryoutRequest(filePath, request.getLine(), request.getColumn() + 1,
                    request.getInputPayload(), null);
        }
        let domDocument = Utils.getDOMDocument(new JFile(filePath));
        let node = SyntaxTreeGenerator.buildTree(domDocument.getDocumentElement());
        let mediatorTryoutInfo = this.createInitialMediatorTryoutInfo(request);
        if (node != null) {
            this.visitNode(node, request, mediatorTryoutInfo);
        }
        return mediatorTryoutInfo;
    } catch (e) {
        if (!(e instanceof IOException)) throw e;
        return new MediatorTryoutInfo(e.message);
    }

  }

  createInitialMediatorTryoutInfo(request: MediatorTryoutRequest): MediatorTryoutInfo {
    let mediatorInfo = new MediatorInfo();
    let payload = null;
    if (request.getInputPayload() != null) {
        payload = new JsonPrimitive(request.getInputPayload());
    }
    mediatorInfo.setPayload(payload);
    return new MediatorTryoutInfo(mediatorInfo, mediatorInfo.deepCopy());

  }

  visitNode(node: STNode, request: MediatorTryoutRequest, mediatorTryoutInfo: MediatorTryoutInfo): void {
    let visitor = SchemaVisitorFactory.getSchemaVisitor(node, this.projectUri);
    if (visitor != null) {
        visitor.visit(node, mediatorTryoutInfo, request);
    }

  }
}
