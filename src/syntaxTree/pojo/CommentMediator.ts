// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/CommentMediator.java by the java2ts converter (see tools/java2ts).
import { Mediator } from "./mediator/Mediator.js";

export class CommentMediator extends Mediator {
  commentText?: string;

  getCommentText(): string {
    return this.commentText;

  }

  setCommentText(commentText: string): void {
    this.commentText = commentText;

  }
}
