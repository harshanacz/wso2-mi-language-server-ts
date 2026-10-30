// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/other/BuilderFactory.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, isEmpty } from "../../../javaCompat.js";
import { AbstractMediatorFactory } from "../AbstractMediatorFactory.js";
import { Builder } from "../../../pojo/mediator/other/builder/Builder.js";
import { BuilderMessageBuilder } from "../../../pojo/mediator/other/builder/BuilderMessageBuilder.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { DOMNode } from "../../../dom/dom.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { STNode } from "../../../stNode.js";

export class BuilderFactory extends AbstractMediatorFactory {
  static readonly BUILDER: string = "syn:builder";

  createSpecificMediator(element: DOMElement): Mediator {
    let builder = new Builder();
    builder.elementNode(element);
    this.populateAttributes(builder, element);
    let children = element.getChildren();
    if (children != null && !isEmpty(children)) {
        let builders = [];
        for (let child of children) {
            if (equalsIgnoreCase(child.getNodeName(), Constant.MESSAGE_BUILDER)) {
                let messageBuilder = this.createBuilderMessageBuilder(child);
                builders.push(messageBuilder);
            }
        }
        builder.setMessageBuilders(builders.slice());
    }
    return builder;

  }

  populateAttributes(node: STNode, element: DOMElement): void {
    let description = element.getAttribute(Constant.DESCRIPTION);
    if (description != null) {
        ((node as Builder)).setDescription(description);
    }
    let traceFilter = element.getAttribute(Constant.TRACE_FILTER);
    if (traceFilter != null) {
        ((node as Builder)).setTraceFilter(traceFilter);
    }

  }

  createBuilderMessageBuilder(node: DOMNode): BuilderMessageBuilder {
    let builderMessageBuilder = new BuilderMessageBuilder();
    builderMessageBuilder.elementNode((node as DOMElement));
    let contentType = node.getAttribute(Constant.CONTENT_TYPE);
    if (contentType != null) {
        builderMessageBuilder.setContentType(contentType);
    }
    let clazz = node.getAttribute(Constant.CLASS);
    if (clazz != null) {
        builderMessageBuilder.setClazz(clazz);
    }
    let formatterClass = node.getAttribute(Constant.FORMATTER_CLASS);
    if (formatterClass != null) {
        builderMessageBuilder.setFormatterClass(formatterClass);
    }
    return builderMessageBuilder;

  }

  getTagName(): string {
    return BuilderFactory.BUILDER;

  }
}
