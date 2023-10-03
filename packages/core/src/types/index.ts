/**
 * The `Core` namespace provides access to various core modules and namespaces.
 * These modules and namespaces are essential for the functionality of the application.
 */
import DecoratorNs from "./../decorators";
import StrategyFactoryNs from "./../engine/strategy/factory";
import ReflectionDescriptorNs from "./../reflection/models/reflection.descriptor";
import ConditionNamespace from "./namespace/condition.namespace";
import FactoryNamespace from "./namespace/factory.namespace";
import HelperNamespace from "./namespace/helper.namespace";
import ObjectsNamespace from "./namespace/objects.namespace";
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
   * The `Validation` namespace provides utilities for data validation and validation-related types.
   */
  export import Validation = ValidationNamespace;

  /**
   * The `ValidationEngine` namespace provides functionality for processing entities.
   */
  export import ValidationEngine = ValidationEngineNamespace;

  export import Decorator = DecoratorNs;

  export import StrategyFactory = StrategyFactoryNs;

  export import ReflectionDescriptor = ReflectionDescriptorNs;
}

export default Core;
