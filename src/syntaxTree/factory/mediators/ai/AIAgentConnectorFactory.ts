// @ts-nocheck
import { readHostFile } from "../../../hostFs.js";
import { ConfigFinder } from "../../../connectorDeps.js";
// Generated from org/eclipse/lemminx/customservice/synapse/syntaxTree/factory/mediators/ai/AIAgentConnectorFactory.java by the java2ts converter (see tools/java2ts).
import { equals, size, get, isBlank, Logger, Level } from "../../../javaCompat.js";
import { AIAgent } from "../../../pojo/connector/ai/AIAgent.js";
import { AIConnectorFactory } from "./AIConnectorFactory.js";
import { AgentTool } from "../../../pojo/connector/ai/AgentTool.js";
import { AgentTools } from "../../../pojo/connector/ai/AgentTools.js";
import { Constant } from "../../../constant.js";
import { DOMElement } from "../../../dom/dom.js";
import { MCPConnections } from "../../../pojo/connector/ai/MCPConnections.js";
import { Mediator } from "../../../pojo/mediator/Mediator.js";
import { SyntaxTreeGenerator } from "../../../SyntaxTreeGenerator.js";
import { Template } from "../../../pojo/template/Template.js";
import { Utils } from "../../../utils.js";

export class AIAgentConnectorFactory extends AIConnectorFactory {
  static readonly LOGGER: Logger = Logger.getLogger("AIAgentConnectorFactory");

  static readonly ALLOWED_CONNECTION_TAGS: string[] = ["llmConfigKey", "memoryConfigKey"];

  createSpecificMediator(element: DOMElement): Mediator {
    let aiAgent = new AIAgent();
    this.populateConnectorConfigs(aiAgent, element);
    this.populateConnections(aiAgent, element, AIAgentConnectorFactory.ALLOWED_CONNECTION_TAGS);

    let agentIDNode = Utils.getChildNodeByName(element, Constant.AGENT_ID);
    if (agentIDNode != null) {
        ((aiAgent as AIAgent)).setAgentID(Utils.getInlineString(agentIDNode.getFirstChild()));
    }

    this.populateMCPConnections((aiAgent as AIAgent), element);
    this.populateTools((aiAgent as AIAgent), element);
    return aiAgent;

  }

  populateMCPConnections(aiAgent: AIAgent, element: DOMElement): void {
    let mcpConnectionsElement = Utils.getChildNodeByName(element, Constant.MCP_CONNECTIONS);
    if (mcpConnectionsElement != null) {
        AIAgentConnectorFactory.LOGGER.log(Level.INFO, "Processing MCP connections for AI agent");
        let mcpConnectionsObj = new MCPConnections();
        let mcpChildren = mcpConnectionsElement.getChildren();
        let mcpConnectionList = [];
        for (let child of mcpChildren) {
            if (child instanceof DOMElement && equals(Constant.MCP_CONFIG_KEY, child.getNodeName())) {
                let value = Utils.getInlineString(child.getFirstChild());
                if (value != null && !isBlank(value)) {
                    mcpConnectionList.push(value);
                }
            }
        }
        mcpConnectionsObj.setMcpConnections(mcpConnectionList);
        aiAgent.setMcpConnections(mcpConnectionsObj);
        AIAgentConnectorFactory.LOGGER.log(Level.INFO, "MCP connections configured for AI agent with {} connections", size(mcpConnectionList));
    }

  }

  populateTools(aiAgent: AIAgent, element: DOMElement): void {
    let toolsElement = Utils.getChildNodeByName(element, Constant.TOOLS);
    if (toolsElement != null) {
        let agentTools = new AgentTools();
        agentTools.elementNode((toolsElement as DOMElement));
        let toolElements = toolsElement.getChildren();
        for (let toolElement of toolElements) {
            if (toolElement instanceof DOMElement && equals(Constant.TOOL, toolElement.getNodeName())) {
                if (toolElement.hasAttribute(Constant.TYPE) &&
                        equals(Constant.MCP, toolElement.getAttribute(Constant.TYPE))) {
                    let agentTool = new AgentTool();
                    agentTool.elementNode((toolElement as DOMElement));
                    agentTool.setName(toolElement.getAttribute(Constant.NAME));
                    agentTool.setDescription(toolElement.getAttribute(Constant.DESCRIPTION));
                    agentTool.setMcpConnection(toolElement.getAttribute(Constant.MCP_CONNECTION));
                    agentTool.setMcpTool(true);
                    agentTools.addTool(agentTool);
                } else {
                    let templateName = toolElement.getAttribute(Constant.TEMPLATE);
                    try {
                        let templatePath = ConfigFinder.getTemplatePath(templateName, this.getProjectPath());
                        let mediator = this.getMediatorFromTemplate(templatePath);
                        let agentTool = new AgentTool();
                        agentTool.elementNode((toolElement as DOMElement));
                        agentTool.setName(toolElement.getAttribute(Constant.NAME));
                        agentTool.setTemplate(templateName);
                        agentTool.setTemplatePath(templatePath);
                        agentTool.setDescription(toolElement.getAttribute(Constant.DESCRIPTION));
                        agentTool.setResultExpression(toolElement.getAttribute(Constant.RESULT_EXPRESSION));
                        agentTool.setMediator(mediator);
                        agentTools.addTool(agentTool);
                    } catch (e) {
                        AIAgentConnectorFactory.LOGGER.log(Level.SEVERE, "Error while reading the template file", e);
                    }
                }
            }
        }
        aiAgent.setTools(agentTools);
    }

  }

  getMediatorFromTemplate(templatePath: string): Mediator {
    let mediator = null;
    if (templatePath != null) {
        let templateDoc = Utils.getDOMDocument(readHostFile(templatePath) ?? "");
        let node = SyntaxTreeGenerator.buildTree(templateDoc.getDocumentElement());
        if (node instanceof Template && ((node as Template)).getSequence() != null &&size(((node as Template)).getSequence().getMediatorList()) > 0) {
            mediator =get(((node as Template)).getSequence().getMediatorList(), 0);
        }
    }
    return mediator;

  }

  getTagName(): string {
    return Constant.AI_AGENT_TAG;

  }
}
