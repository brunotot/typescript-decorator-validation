/**
 * The `Core` namespace provides access to various core modules and namespaces.
 * These modules and namespaces are essential for the functionality of the application.
 * @namespace
 */
import DecoratorNs from "./../decorators";
import ReflectionDescriptorNs from "./../reflection/models/reflection.descriptor";
import ConditionNamespace from "./namespace/condition.namespace";
import EntityProcessorNamespace from "./namespace/entity-processor.namespace";
import EvaluatedStrategyFactoryNs from "./namespace/evaluated-strategy-factory.namespace";
import FactoryNamespace from "./namespace/factory.namespace";
import HelperNamespace from "./namespace/helper.namespace";
import ObjectsNamespace from "./namespace/objects.namespace";
import ParamsNamespace from "./namespace/params.namespace";
import StrategyNamespace from "./namespace/strategy.namespace";
import TypesNamespace from "./namespace/types.namespace";
import ValidationNamespace from "./namespace/validation.namespace";

namespace Core {
  /**
   * The `Factory` namespace provides utilities for working with factories and factory functions.
   * @namespace
   */
  export import Factory = FactoryNamespace;

  /**
   * The `Condition` namespace provides condition-related utilities and types.
   * @namespace
   */
  export import Condition = ConditionNamespace;

  /**
   * The `Strategy` namespace provides strategies for handling different data types.
   * @namespace
   */
  export import Strategy = StrategyNamespace;

  /**
   * The `Objects` namespace provides utilities and types for working with objects.
   * @namespace
   */
  export import Objects = ObjectsNamespace;

  /**
   * The `Helper` namespace provides various helper functions and types.
   * @namespace
   */
  export import Helper = HelperNamespace;

  /**
   * The `Types` namespace defines common data types used throughout the application.
   * @namespace
   */
  export import Types = TypesNamespace;

  /**
   * The `Params` namespace provides types related to function parameters.
   * @namespace
   */
  export import Params = ParamsNamespace;

  /**
   * The `Validation` namespace provides utilities for data validation and validation-related types.
   * @namespace
   */
  export import Validation = ValidationNamespace;

  /**
   * The `EntityProcessor` namespace provides functionality for processing entities.
   * @namespace
   */
  export import EntityProcessor = EntityProcessorNamespace;

  export import Decorator = DecoratorNs;

  export import EvaluatedStrategyFactory = EvaluatedStrategyFactoryNs;

  export import ReflectionDescriptor = ReflectionDescriptorNs;
}

export default Core;
