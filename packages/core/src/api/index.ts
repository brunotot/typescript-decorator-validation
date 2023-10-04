/**
 * The `Core` namespace provides access to various core modules and namespaces.
 * These modules and namespaces are essential for the functionality of the application.
 */
import DecoratorNamespace from "../decorators";
import ValidationNamespace from "../engine";
import ReflectionNamespace from "../reflection";
import DescriptorNamespace from "../reflection/models/reflection.descriptor";
import StrategyNamespace from "../strategy";
import UtilitiesNamespace from "../utilities";
import * as PrettifyNamespace from "./prettify";

/**
 * An entry-point namespace which serves as a gateway to all data this library exports
 */
namespace TdvCoreApi {
  export import Validation = ValidationNamespace;

  export import Decorator = DecoratorNamespace;

  export import Strategy = StrategyNamespace;

  export import Utilities = UtilitiesNamespace;

  export import Reflection = ReflectionNamespace;

  export import Descriptor = DescriptorNamespace;

  export import Prettify = PrettifyNamespace;
}

export default TdvCoreApi;
