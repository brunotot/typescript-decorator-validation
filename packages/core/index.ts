import TdvCoreApi from "./src";
import Decorator from "./src/decorators";
import Localization from "./src/localization";
import Reflection from "./src/reflection";
import Strategy from "./src/strategy";
import Utilities from "./src/utilities";
import Validation from "./src/validation";
import validators from "./validators";
import { validate } from "./validators/any/validate";

/**
 * A namespace which holds all interfaces which are extendable - meaning the developer can feed the library with custom types
 */
export namespace Overrides {
  /**
   * An overridable object type with 'value' key and array of types as its value
   */
  export interface PrimitiveSet {}
}

export {
  Decorator,
  Localization,
  Reflection,
  Strategy,
  Utilities,
  Validation,
  validate,
  validators,
};

export default TdvCoreApi;
