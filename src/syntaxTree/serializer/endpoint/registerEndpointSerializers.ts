// Hand ported from the Java original (see git history for the generated base).
import { EndpointSerializer } from "./EndpointSerializer.js";
import { ReferenceEndpointSerializer } from "./ReferenceEndpointSerializer.js";
import { HTTPEndpointSerializer } from "./HTTPEndpointSerializer.js";
import { AddressEndpointSerializer } from "./AddressEndpointSerializer.js";
import { WSDLEndpointSerializer } from "./WSDLEndpointSerializer.js";
import { DefaultEndpointSerializer } from "./DefaultEndpointSerializer.js";
import { RecipientListEndpointSerializer } from "./RecipientListEndpointSerializer.js";
import { LoadBalanceEndpointSerializer } from "./LoadBalanceEndpointSerializer.js";
import { FailoverEndpointSerializer } from "./FailoverEndpointSerializer.js";
import { TemplateEndpointSerializer } from "./TemplateEndpointSerializer.js";

EndpointSerializer.registry.set("ReferenceEndpointSerializer", () => new ReferenceEndpointSerializer());
EndpointSerializer.registry.set("HTTPEndpointSerializer", () => new HTTPEndpointSerializer());
EndpointSerializer.registry.set("AddressEndpointSerializer", () => new AddressEndpointSerializer());
EndpointSerializer.registry.set("WSDLEndpointSerializer", () => new WSDLEndpointSerializer());
EndpointSerializer.registry.set("DefaultEndpointSerializer", () => new DefaultEndpointSerializer());
EndpointSerializer.registry.set("RecipientListEndpointSerializer", () => new RecipientListEndpointSerializer());
EndpointSerializer.registry.set("LoadBalanceEndpointSerializer", () => new LoadBalanceEndpointSerializer());
EndpointSerializer.registry.set("FailoverEndpointSerializer", () => new FailoverEndpointSerializer());
EndpointSerializer.registry.set("TemplateEndpointSerializer", () => new TemplateEndpointSerializer());
EndpointSerializer.standalone.add(ReferenceEndpointSerializer);
EndpointSerializer.standalone.add(TemplateEndpointSerializer);
