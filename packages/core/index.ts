import Decorator from "./src/decorators";
import Localization from "./src/localization";
import ValidationEngine from "./src/processor";
import CacheMapLocal from "./src/processor/models/cache.map";
import Reflection from "./src/reflection";
import ValidationConfigurer from "./src/reflection/service/impl/reflection.service.validation";
import TdvCore from "./src/types";
import decorate from "./validators";
import validate from "./validators/any/Rule";

export namespace Overrides {
  export interface PrimitiveSet {}
}

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
