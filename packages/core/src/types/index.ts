/**
 * The `Core` namespace provides access to various core modules and namespaces.
 * These modules and namespaces are essential for the functionality of the application.
 */
import DecoratorNs from "./../decorators";
import ReflectionDescriptorNs from "./../reflection/models/reflection.descriptor";
import ConditionNamespace from "./namespace/condition.namespace";
import EvaluatedStrategyFactoryNs from "./namespace/evaluated-strategy-factory.namespace";
import FactoryNamespace from "./namespace/factory.namespace";
import HelperNamespace from "./namespace/helper.namespace";
import ObjectsNamespace from "./namespace/objects.namespace";
import ParamsNamespace from "./namespace/params.namespace";
import StrategyNamespace from "./namespace/strategy.namespace";
import TypesNamespace from "./namespace/types.namespace";
import ValidationEngineNamespace from "./namespace/validation-engine.namespace";
import ValidationNamespace from "./namespace/validation.namespace";

/**
 * An entry-point namespace which serves as a gateway to all data this library exports
 */
namespace Core {
  /**
   * The `Factory` namespace provides utilities for working with factories and factory functions.
   */
  export import Factory = FactoryNamespace;

  /**
   * The `Condition` namespace provides condition-related utilities and types.
   */
  export import Condition = ConditionNamespace;

  /**
   * The `Strategy` namespace provides strategies for handling different data types.
   */
  export import Strategy = StrategyNamespace;

  /**
   * The `Objects` namespace provides utilities and types for working with objects.
   */
  export import Objects = ObjectsNamespace;

  /**
   * The `Helper` namespace provides various helper functions and types.
   */
  export import Helper = HelperNamespace;

  /**
   * The `Types` namespace defines common data types used throughout the application.
   */
  export import Types = TypesNamespace;

  /**
   * The `Params` namespace provides types related to function parameters.
   */
  export import Params = ParamsNamespace;

  /**
   * The `Validation` namespace provides utilities for data validation and validation-related types.
   */
  export import Validation = ValidationNamespace;

  /**
   * The `ValidationEngine` namespace provides functionality for processing entities.
   */
  export import ValidationEngine = ValidationEngineNamespace;

  export import Decorator = DecoratorNs;

  export import EvaluatedStrategyFactory = EvaluatedStrategyFactoryNs;

  export import ReflectionDescriptor = ReflectionDescriptorNs;
}

export default Core;
