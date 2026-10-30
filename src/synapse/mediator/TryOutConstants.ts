// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/mediator/TryOutConstants.java by the java2ts converter (see tools/java2ts).
import { System } from "../../syntaxTree/javaCompat.js";
import { Path } from "../host/nio.js";

export class TryOutConstants {
  static readonly __fields: string[] = [];

  static readonly DEFAULT_DEBUGGER_COMMAND_PORT: number = 9005;

  static readonly DEFAULT_DEBUGGER_EVENT_PORT: number = 9006;

  static readonly DEFAULT_SERVER_PORT: number = 8290;

  static readonly DEFAULT_SERVER_INBOUND_PORT: number = 9201;

  static readonly TEMP_FOLDER_PATH: Path = Path.of(System.getProperty("user.home"), ".wso2-mi", "tryout");

  static readonly CAPP_CACHE_LOCATION: Path = Path.of(System.getProperty("user.home") + "/.wso2-mi/tryout_capp_cache");

  static readonly API_RELATIVE_PATH: Path = Path.of("src", "main", "wso2mi", "artifacts", "apis");

  static readonly SYNAPSE_PROPERTIES: string = "synapse-properties";

  static readonly AXIS2_PROPERTIES: string = "axis2-properties";

  static readonly AXIS2_CLIENT_PROPERTIES: string = "axis2Client-properties";

  static readonly AXIS2_TRANSPORT_PROPERTIES: string = "axis2Transport-properties";

  static readonly AXIS2_OPERATION_PROPERTIES: string = "axis2Operation-properties";

  static readonly ENVELOPE: string = "Envelope";

  static readonly API_KEY: string = "api-key";

  static readonly HTTP_PREFIX: string = "http://";

  static readonly SLASH: string = "/";

  static readonly POST: string = "POST";

  static readonly RESUME_COMMAND: string = "{\"command\":\"resume\"}";

  static readonly EVENT: string = "event";

  static readonly BREAKPOINT: string = "breakpoint";

  static readonly LOCALHOST: string = "localhost";

  static readonly CARBON_XML_J2_PATH: Path = Path.of("repository", "resources", "conf", "templates",
            "conf", "carbon.xml.j2");

  static readonly CARBON_XML_PATH: Path = Path.of("conf", "carbon.xml");

  static readonly MI_REPOSITORY_PATH: Path = Path.of("repository", "deployment", "server",
            "synapse-configs", "default");

  static readonly PROJECT_ARTIFACT_PATH: Path = Path.of("src", "main", "wso2mi", "artifacts");

  static readonly PROJECT_CONNECTOR_PATH: Path = Path.of("src", "main", "wso2mi", "resources", "connectors");

  static readonly MI_CONNECTOR_PATH: Path = Path.of("repository", "deployment", "server", "synapse-libs");

  static readonly PROJECT_REGSTRY_PATH: Path = Path.of("src", "main", "wso2mi", "resources", "registry");

  static readonly DEPLOYMENT_TOML_PATH: Path = Path.of("conf", "deployment.toml");

  static readonly GOV: string = "gov";

  static readonly CONF: string = "conf";

  static readonly MI_GOV_PATH: Path = Path.of("registry", "governance");

  static readonly MI_CONF_PATH: Path = Path.of("registry", "config");

  static readonly CORRELATION_ID: string = "correlation_id";

  static readonly MESSAGE_VARIABLES: string = "message-variables";

  static readonly SERVER_ALREADY_IN_USE_ERROR: string = "The server is already in use or running. Please stop it and try again.";

  static readonly TRYOUT_NOT_ACTIVATED_ERROR: string = "Try-Out feature not activated.";

  static readonly TRYOUT_FAILURE_MESSAGE: string = "An error occurred while handling the tryout. Please try again.";

  static readonly AXIS2: string = "axis2";

  static readonly VARIABLE: string = "variable";

  static readonly DEFAULT: string = "default";

  static readonly AXIS2_CLIENT: string = "axis2-client";

  static readonly AXIS2_TRANSPORT: string = "axis2-transport";

  static readonly AXIS2_OPERATION: string = "axis2-operation";

  static readonly TRANSPORT: string = "transport";

  static readonly COMMAND: string = "command";

  static readonly SET: string = "set";

  static readonly COMMAND_ARGUMENT: string = "command-argument";

  static readonly PROPERTY: string = "property";

  static readonly CONTEXT: string = "context";

  static readonly VARIABLE_NAME: string = "variable-name";

  static readonly PROPERTY_NAME: string = "property-name";

  static readonly VARIABLE_VALUE: string = "variable-value";

  static readonly PROPERTY_VALUE: string = "property-value";

  static readonly LAST_MEDIATOR_LIST: string[] = ["send", "respond", "drop", "loopback"];

  static readonly SUCCESSFUL: string = "successful";

  static readonly ERROR_MESSAGE: string = "ERROR_MESSAGE";

  static readonly CLEAR: string = "clear";

  static readonly GET: string = "get";

  static readonly VARIABLES: string = "variables";

  static readonly PROPERTIES: string = "properties";

  static readonly IMPORTS: string = "imports";

  static readonly MI_DEPLOYMENT_PATH: Path = Path.of("repository", "deployment",
            "server", "carbonapps");

  static readonly INVALID_ARTIFACT_ERROR: string = "Unable to try out the mediator due to an invalid " +
            "configuration in the API. Please review the API and try again.";

  static readonly URI_TEMPLATE: string = "uri-template";

  static readonly BUILD_FAILURE_MESSAGE: string = "Unable to try-out the mediator." +
            " Please build the project manually and resolve any issues before trying again.";

  static readonly URI_PARAM_PREFIX: string = "uri.var.";

  static readonly QUERY_PARAM_PREFIX: string = "query.param.";

  static readonly PAYLOAD_NOT_HIT_ERROR: string = "This mediator cannot be tried out with the current request payload. Please select a different payload.";

  static readonly BREAKPOINT_ALREADY_REGISTERED: string = "already breakpoint enabled at mediator position";

  static readonly PROJECT_RESOURCES_RELATIVE_PATH: Path = Path.of("src", "main", "wso2mi", "resources");

  static readonly POST_CLEANUP: string = "POST_CLEANUP";

  static readonly IS_CONNECTOR_TEST: string = "IS_CONNECTOR_TEST";

  static readonly TRYOUT_HISTORY_LOG_FILE: Path = TryOutConstants.CAPP_CACHE_LOCATION.resolve("tryout_history.lock");

  constructor() {

  }
}
