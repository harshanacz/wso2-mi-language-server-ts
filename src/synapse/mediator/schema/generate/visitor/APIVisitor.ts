// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/schema/generate/visitor/APIVisitor.java by the java2ts converter (see tools/java2ts).
import { isEmpty, contains, get, jsplit } from "../../../../../syntaxTree/javaCompat.js";
import { API } from "../../../../../syntaxTree/pojo/api/API.js";
import { APIResource } from "../../../../../syntaxTree/pojo/api/APIResource.js";
import { MediatorTryoutInfo } from "../../../tryout/pojo/MediatorTryoutInfo.js";
import { MediatorTryoutRequest } from "../../../tryout/pojo/MediatorTryoutRequest.js";
import { Params } from "../../../tryout/pojo/Params.js";
import { Position } from "../../../../lsp.js";
import { Property } from "../../../tryout/pojo/Property.js";
import { STNode } from "../../../../../syntaxTree/stNode.js";
import { Sequence } from "../../../../../syntaxTree/pojo/misc/common/Sequence.js";
import { Utils } from "./Utils.js";

export class APIVisitor {
  static readonly __fields: string[] = ["projectPath"];

  projectPath?: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;

  }

  visit(node: STNode, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
    if (node instanceof API) {
      this.visitApi(node, info, request);
    }
  }

  visitApi(api: API, info: MediatorTryoutInfo, request: MediatorTryoutRequest): void {
          let line = request.getLine();
          let column = request.getColumn();
          let position = new Position(line, column);
          if (Utils.checkNodeInRange(api, position)) {
              let resources = api.getResource();
              if (resources != null) {
                  for (let resource of resources) {
                      if (Utils.checkNodeInRange(resource, position)) {
                          this.visitResource(resource, info, position);
                      }
                  }
              }
          }
  }

  visitResource(resource: APIResource, info: MediatorTryoutInfo, position: Position): void {
    this.updateResourceParams(resource, info);
    if (APIVisitor.needToVisit(resource.getInSequence(), position) || APIVisitor.needToVisit(resource.getOutSequence(), position)) {
        Utils.visitSequence(this.projectPath, resource.getInSequence(), info, position);
        Utils.visitSequence(this.projectPath, resource.getOutSequence(), info, position);
    } else if (APIVisitor.needToVisit(resource.getFaultSequence(), position)) {
        Utils.visitSequence(this.projectPath, resource.getFaultSequence(), info, position);
    }

  }

  static needToVisit(sequence: Sequence, position: Position): boolean {
    if (!Utils.checkNodeInRange(sequence, position)) {
        return false;
    }
    let mediatorList = sequence.getMediatorList();
    if (isEmpty(mediatorList)) {
        return false;
    }
    let firstMediator = get(mediatorList, 0);
    let mediatorStartLine = firstMediator.getRange().startTagRange.start.getLine();
    let mediatorStartColumn = firstMediator.getRange().startTagRange.start.getCharacter();
    return position.getLine() > mediatorStartLine ||
            (position.getLine() == mediatorStartLine && position.getCharacter() >= mediatorStartColumn);

  }

  updateResourceParams(resource: APIResource, info: MediatorTryoutInfo): void {
    let uri = resource.getUriTemplate();
    if (uri != null) {
        let params = new Params();
        params.setPathParams(this.getPathParams(uri).map(p => new Property(p, "")));
        params.setQueryParams(
                this.getQueryParams(uri).map(p => new Property(p, "")));
        info.setInputParams(params);
        info.setOutputParams(params.deepCopy());
    }

  }

  getPathParams(uri: string): string[] {
    let pathParams = [];
    for (let part of jsplit(jsplit(uri, "\\?")[0], "/")) {
        if (part.startsWith("{") && part.endsWith("}")) {
            pathParams.push(part.substring(1, part.length - 1));
        }
    }
    return pathParams;

  }

  getQueryParams(uri: string): string[] {
    let queryParams = [];
    if (contains(uri, "?")) {
        let queryParamPart = jsplit(uri, "\\?")[1];
        for (let part of jsplit(queryParamPart, "&")) {
            queryParams.push(jsplit(part, "=")[0]);
        }
    }
    return queryParams;

  }
}
