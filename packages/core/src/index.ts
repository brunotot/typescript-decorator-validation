/**
 * The `Core` namespace provides access to various core modules and namespaces.
 * These modules and namespaces are essential for the functionality of the application.
 */
import validators from "./../validators";
import DecoratorNamespace from "./decorators";
import LocalizationNamespace from "./localization";
import ReflectionNamespace from "./reflection";
import StrategyNamespace from "./strategy";
import UtilitiesNamespace from "./utilities";
import ValidationNamespace from "./validation";

/**
 * An entry-point namespace which serves as a gateway to all data this library exports
 */
namespace API {
  export import Localization = LocalizationNamespace;

  export import Validation = ValidationNamespace;

  export import Decorator = DecoratorNamespace;

  export import Strategy = StrategyNamespace;

  export import Utilities = UtilitiesNamespace;

  export import Reflection = ReflectionNamespace;

  export import Collection = validators;
}

export default API;
