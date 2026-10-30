// @ts-nocheck
import { Utils } from "../../syntaxTree/utils.js";
// Generated from org/eclipse/lemminx/customservice/synapse/connectors/SchemaGenerate.java by the java2ts converter (see tools/java2ts).
import { Logger, Level, StringBuilder } from "../../syntaxTree/javaCompat.js";
import { ConnectorHolder } from "./ConnectorHolder.js";

export class SchemaGenerate {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("SchemaGenerate");

  static generate(holder: ConnectorHolder, schemaPath: string): void {
    let sb = new StringBuilder();
    sb.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n" +
            "<!--\n" +
            "  ~  Licensed to the Apache Software Foundation (ASF) under one\n" +
            "  ~  or more contributor license agreements.  See the NOTICE file\n" +
            "  ~  distributed with this work for additional information\n" +
            "  ~  regarding copyright ownership.  The ASF licenses this file\n" +
            "  ~  to you under the Apache License, Version 2.0 (the\n" +
            "  ~  \"License\"); you may not use this file except in compliance\n" +
            "  ~  with the License.  You may obtain a copy of the License at\n" +
            "  ~\n" +
            "  ~   http://www.apache.org/licenses/LICENSE-2.0\n" +
            "  ~\n" +
            "  ~  Unless required by applicable law or agreed to in writing,\n" +
            "  ~  software distributed under the License is distributed on an\n" +
            "  ~   * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n" +
            "  ~  KIND, either express or implied.  See the License for the\n" +
            "  ~  specific language governing permissions and limitations\n" +
            "  ~  under the License.\n" +
            "  -->\n" +
            "\n" +
            "<xs:schema \n" +
            "        xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" \n" +
            "        elementFormDefault=\"qualified\"\n" +
            "        targetNamespace=\"http://ws.apache.org/ns/synapse\"\n" +
            "        xmlns=\"http://ws.apache.org/ns/synapse\">\n" +
            "\n" +
            "    <xs:group name=\"connectors\">\n" +
            "        <xs:annotation>\n" +
            "            <xs:documentation source=\"description\">\n" +
            "                This group denotes all the connectors elements that are added to the integration " +
            "studio\n" +
            "            </xs:documentation>\n" +
            "        </xs:annotation>\n" +
            "        <xs:choice>\n");

    sb.append(SchemaGenerate.getConnectorSchema(holder));

    sb.append("        </xs:choice>\n" +
            "    </xs:group>\n" +
            "</xs:schema>");

    SchemaGenerate.writeToFile(String(sb), schemaPath);

  }

  static writeToFile(string: string, schemaPath: string): void {
           try {
    Utils.writeToFile(schemaPath, string);
           } catch (e) {
               SchemaGenerate.LOGGER.log(Level.SEVERE, "Could not update connector schemas. Connectors will not be validated.", e);
           }

  }

  static getConnectorSchema(holder: ConnectorHolder): string {
    let connectors = holder.getConnectors();
    let sb = new StringBuilder();
    for (let conn of connectors) {
        let actions = conn.getActions();
        for (let action of actions) {
            if (action.getTag().startsWith("ai.")) {

                continue;
            }
            if (!action.getHidden()) {
                sb.append("            <xs:element name=\"" + action.getTag() + "\">\n");
                sb.append("                <xs:complexType>\n" +
                        "                    <xs:all>\n");
                for (let parameter of action.getParameters()) {
                    let minOccurs = parameter.isRequired() ? "1" : "0";
                    let xsdType = parameter.getXsdType() != null ? parameter.getXsdType() : "xs:string";
                    sb.append("                        <xs:element name=\"" + parameter.getName() +
                            "\" type=\"" + xsdType + "\" minOccurs=\"" + minOccurs +
                            "\" maxOccurs=\"1\" />\n");
                }
                sb.append("                    </xs:all>\n");
                sb.append("                    <xs:attribute name=\"configKey\" type=\"xs:string\"/>\n");
                sb.append("                </xs:complexType>\n" +
                        "            </xs:element>\n");
            }
        }
    }
    return String(sb);

  }
}
