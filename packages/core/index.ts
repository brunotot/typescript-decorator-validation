import Collection from "./collection";
import { create } from "./collection/any/create";
import Decorator from "./src/decorators";
import TdvCoreApi from "./src/index";
import Localization from "./src/localization";
import Reflection from "./src/reflection";
import Strategy from "./src/strategy";
import Utilities from "./src/utilities";
import Validation from "./src/validation";

/**
 * A namespace which holds all interfaces which are extendable - meaning the developer can feed the library with custom types
 */
export namespace Overrides {
  /**
   * An overridable object type with 'value' key and array of types as its value
   */
  export interface PrimitiveSet {}
}

export type {};

export {
  Collection,
  Decorator,
  Localization,
  Reflection,
  Strategy,
  Utilities,
  Validation,
  create,
};

export default TdvCoreApi;
