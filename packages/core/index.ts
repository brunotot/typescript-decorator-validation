import Decorator from "./src/decorators";
import Localization from "./src/localization";
import ValidationEngine from "./src/processor";
import CacheMapLocal from "./src/processor/models/cache.map";
import Reflection from "./src/reflection";
import ValidationConfigurer from "./src/reflection/service/impl/reflection.service.validation";
import TdvCore from "./src/types";
import decorate from "./validators";
import validate from "./validators/any/Rule";

/**
 * A namespace which holds all interfaces which are extendable - meaning the developer can feed the library with custom types
 */
export namespace Overrides {
  /**
   * An overridable object type with 'value' key and array of types as its value
   */
  export interface PrimitiveSet {}
}

/**
 * A namespace which wraps all miscellaneous reusable models of the library into a single group
 */
export namespace Models {
  export import CacheMap = CacheMapLocal.CacheMap;
}

export {
  Decorator,
  Localization,
  Reflection,
  TdvCore,
  ValidationConfigurer,
  ValidationEngine,
  decorate,
  validate,
};
