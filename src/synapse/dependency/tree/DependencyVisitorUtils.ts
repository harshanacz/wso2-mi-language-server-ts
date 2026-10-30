// @ts-nocheck
// Generated from org/eclipse/lemminx/customservice/synapse/dependency/tree/DependencyVisitorUtils.java by the java2ts converter (see tools/java2ts).
import { equalsIgnoreCase, Logger, Level } from "../../../syntaxTree/javaCompat.js";
import { AbstractMediatorVisitor } from "../../AbstractMediatorVisitor.js";
import { ArtifactType } from "./ArtifactType.js";
import { ConfigFinder } from "../../utils/ConfigFinder.js";
import { Constant } from "../../../syntaxTree/constant.js";
import { Dependency } from "./pojo/Dependency.js";
import { DependencyLookUp } from "./DependencyLookUp.js";
import { EndpointVisitor } from "./visitor/EndpointVisitor.js";
import { Mediator } from "../../../syntaxTree/pojo/mediator/Mediator.js";
import { MediatorDependencyVisitor } from "./visitor/MediatorDependencyVisitor.js";
import { MessageStoreVisitor } from "./visitor/MessageStoreVisitor.js";
import { NamedEndpoint } from "../../../syntaxTree/pojo/endpoint/NamedEndpoint.js";
import { Sequence } from "../../../syntaxTree/pojo/misc/common/Sequence.js";
import { SequenceVisitor } from "./visitor/SequenceVisitor.js";
import { TemplateVisitor } from "./visitor/TemplateVisitor.js";
import { Utils } from "../../../syntaxTree/utils.js";

export class DependencyVisitorUtils {
  static readonly __fields: string[] = [];

  static readonly LOGGER: Logger = Logger.getLogger("DependencyVisitorUtils");

  static visitSequence(projectPath: string, sequenceName: string, dependencyLookUp: DependencyLookUp): Dependency {
    let inSequencePath = DependencyVisitorUtils.getDependencyPath(sequenceName, "sequences", projectPath);
    if (dependencyLookUp.isVisited(inSequencePath)) {
       return null;
    }
    dependencyLookUp.addToVisitedPaths(inSequencePath);
    if (inSequencePath != null) {
        let dependency = dependencyLookUp.getDependency(inSequencePath);
        if (dependency != null) {
            return dependency;
        }
        let sequenceVisitor = new SequenceVisitor(projectPath, dependencyLookUp);
        sequenceVisitor.visit(inSequencePath);
        return new Dependency(sequenceName, ArtifactType.SEQUENCE, inSequencePath,
                sequenceVisitor.getDependencyTree().getDependencyList());
    }
    return null;

  }

  static visitAnonymousSequence(sequence: Sequence, projectPath: string, dependencyLookUp: DependencyLookUp): Dependency[] {
    if (sequence != null) {
        return DependencyVisitorUtils.visitMediators(sequence.getMediatorList(), projectPath, dependencyLookUp);
    }
    return [];

  }

  static visitMediators(mediators: Mediator[], projectPath: string, dependencyLookUp: DependencyLookUp): Dependency[] {
    let visitor = new MediatorDependencyVisitor(projectPath, dependencyLookUp);
    for (let mediator of mediators) {
        DependencyVisitorUtils.visitMediator(mediator, visitor);
    }
    return visitor.getDependencies();

  }

  static visitMediator(node: Mediator, visitor: MediatorDependencyVisitor): void {
    let tag = Utils.sanitizeTag(node.getTag());
    if (equalsIgnoreCase(Constant.INVALID, tag)) {
        return;
    }
    let visitFn = "visit" + tag.substring(0, 1).toUpperCase() + tag.substring(1);
    try {
        let method = AbstractMediatorVisitor.getDeclaredMethod(visitFn, node.constructor);
        method.setAccessible(true);
        method.invoke(visitor, node);
    } catch (e) {
        DependencyVisitorUtils.LOGGER.log(Level.SEVERE, "No visit method found for mediator: " + tag, e);
    }

  }

  static visitEndpoint(endpoint: NamedEndpoint, projectPath: string, dependencyLookUp: DependencyLookUp): Dependency;
  static visitEndpoint(endpoint: string, projectPath: string, dependencyLookUp: DependencyLookUp): Dependency;
  static visitEndpoint(...args: any[]): any {
    switch (args.length) {
      case 3: {
        if (args[0] instanceof NamedEndpoint) {
          const [endpoint, projectPath, dependencyLookUp] = args;


                  let endpointKey = endpoint.getKey();
                  let endpointVisitor = new EndpointVisitor(projectPath, dependencyLookUp);
                  if (endpointKey != null) {
                      let endpointPath = DependencyVisitorUtils.getDependencyPath(endpointKey, "endpoints", projectPath);
                      if (endpointPath != null) {
                          let dependency = dependencyLookUp.getDependency(endpointPath);
                          if (dependency != null) {
                              return dependency;
                          }
                          endpointVisitor.visit(endpointPath);
                          return new Dependency(endpointKey, ArtifactType.ENDPOINT, endpointPath,
                                  endpointVisitor.getDependencyTree().getDependencyList());
                      }
                  } else {
                      let uuid = UUID.randomUUID();
                      let anonymousEPName = "AnonymousEndpoint_" + uuid;
                      endpointVisitor.visit(endpoint);
                      return new Dependency(anonymousEPName, ArtifactType.ENDPOINT, null,
                              endpointVisitor.getDependencyTree().getDependencyList());
                  }
                  return null;

        } else if (typeof args[0] === 'string') {
          const [endpoint, projectPath, dependencyLookUp] = args;


                  let endpointPath = DependencyVisitorUtils.getDependencyPath(endpoint, "endpoints", projectPath);
                  if (endpointPath != null) {
                      let dependency = dependencyLookUp.getDependency(endpointPath);
                      if (dependency != null) {
                          return dependency;
                      }
                      let endpointVisitor = new EndpointVisitor(projectPath, dependencyLookUp);
                      endpointVisitor.visit(endpointPath);
                      return new Dependency(endpoint, ArtifactType.ENDPOINT, endpointPath,
                              endpointVisitor.getDependencyTree().getDependencyList());
                  }
                  return null;

        }
        break;
      }
      default: throw new Error('no matching overload');
    }
  }

  static visitTemplate(template: string, projectPath: string, dependencyLookUp: DependencyLookUp): Dependency {
    let templatePath = DependencyVisitorUtils.getDependencyPath(template, "templates", projectPath);
    if (templatePath != null) {
        let dependency = dependencyLookUp.getDependency(templatePath);
        if (dependency != null) {
            return dependency;
        }
        let templateVisitor = new TemplateVisitor(projectPath, dependencyLookUp);
        templateVisitor.visit(templatePath);
        return new Dependency(template, ArtifactType.TEMPLATE, templatePath,
                templateVisitor.getDependencyTree().getDependencyList());
    }
    return null;

  }

  static getDependencyPath(key: string, type: string, projectPath: string): string {
    try {
        return ConfigFinder.findEsbComponentPath(key, type, projectPath);
    } catch (e) {
        DependencyVisitorUtils.LOGGER.log(Level.SEVERE, "Error occurred while finding the path for the artifact: " + key, e);
    }
    return null;

  }

  static visitMessageStore(messageStore: string, projectPath: string, dependencyLookUp: DependencyLookUp): Dependency {
    let path = DependencyVisitorUtils.getDependencyPath(messageStore, "message-stores", projectPath);
    if (path != null) {
        let dependency = dependencyLookUp.getDependency(path);
        if (dependency != null) {
            return dependency;
        }
        let messageStoreVisitor = new MessageStoreVisitor(projectPath, dependencyLookUp);
        messageStoreVisitor.visit(path);
        return new Dependency(messageStore, ArtifactType.MESSAGE_STORE, path,
                messageStoreVisitor.getDependencyTree().getDependencyList());
    }
    return null;

  }
}
