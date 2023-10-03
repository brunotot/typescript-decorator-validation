import CacheMap from "../../engine/models/cache.map";
import StrategyFactory from "../../engine/strategy/factory";
import Localization from "../../localization";
import Helper from "./helper.namespace";

/**
 * A collection of types and interfaces related to entity processing and validation.
 */
namespace ValidationEngineNs {
  /**
   * Configuration options for entity processing.
   *
   * @typeParam TClass - The type of the default value.
   */
  export type Config<TClass> = {
    defaultValue?: Helper.Payload<TClass>;
    groups?: string[];
    locale?: Localization.Locale;
    asyncDelay?: number;
  };

  /**
   * The result of entity validation.
   *
   * @typeParam T - The type of the entity being validated.
   */
  export type Result<T> = {
    valid: boolean;
    detailedErrors: StrategyFactory.Impl.DetailedErrors<T>;
    errors: StrategyFactory.Impl.Errors<T>;
  };

  /**
   * Cache object for storing entity validation results.
   *
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TClass - The type of the payload.
   */
  export type Cache<TClass> = Result<TClass> & {
    state: Helper.Payload<TClass>;
  };

  /**
   * A map for storing entity validation results.
   *
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TClass - The type of the payload.
   */
  export type CacheMap<TClass> = CacheMap.CacheMap<
    Result<TClass>,
    Helper.Payload<TClass>
  >;
}

export default ValidationEngineNs;
