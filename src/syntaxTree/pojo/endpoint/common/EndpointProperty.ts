// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/pojo/endpoint/common/EndpointProperty.java by the java2ts converter (see tools/java2ts).
import { EndpointPropertyScope } from "./EndpointPropertyScope.js";
import { MediatorProperty } from "../../mediator/core/MediatorProperty.js";

export class EndpointProperty extends MediatorProperty {
  scope?: EndpointPropertyScope;

  constructor(mediatorProperty: MediatorProperty) {
    super();
    this.setName(mediatorProperty.getName());
    this.setValue(mediatorProperty.getValue());
    this.setExpression(mediatorProperty.getExpression());
    this.setOtherAttributes(mediatorProperty.getOtherAttributes());
    this.setContent(mediatorProperty.getContent());

  }

  getScope(): EndpointPropertyScope {
    return this.scope;

  }

  setScope(scope: EndpointPropertyScope): void {
    this.scope = scope;

  }
}
