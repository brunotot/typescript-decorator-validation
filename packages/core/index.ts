import TdvCoreApi from "./src/api";
import Decorator from "./src/decorators";
import Validation from "./src/engine";
import Localization from "./src/localization";
import Reflection from "./src/reflection";
import Descriptor from "./src/reflection/models/reflection.descriptor";
import decorate from "./validators";
import validate from "./validators/any/validate";

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
  Descriptor,
  Localization,
  Reflection,
  Validation,
  decorate,
  validate,
};

export default TdvCoreApi;
