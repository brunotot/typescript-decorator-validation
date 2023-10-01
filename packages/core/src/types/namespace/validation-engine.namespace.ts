import CacheMap from "../../engine/models/cache.map";
import StrategyFactory from "../../engine/strategy/factory";
import Localization from "../../localization";
import Validation from "./validation.namespace";

/**
 * A collection of types and interfaces related to entity processing and validation.
 */
namespace ValidationEngineNs {
  /**
   * Configuration options for entity processing.
   *
   * @typeParam TBody - The type of the default value.
   */
  export type Config<TBody> = {
    defaultValue?: TBody;
    groups?: Validation.Group[];
    locale?: Localization.Locale;
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
   * A type representing various forms of validity errors.
   */
  export type ValidityErrorsType =
    | Result<any>
    | Result<any>[]
    | Validation.Result[]
    | Validation.Result[][];

  /**
   * Cache object for storing entity validation results.
   *
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TBody - The type of the payload.
   */
  export type Cache<TClass, TBody = TClass> = Result<TClass> & {
    state: StrategyFactory.Impl.Payload<TBody>;
  };

  /**
   * The keys that can be used to access the cache.
   *
   * @typeParam T - The type of the cache.
   */
  export type CacheKey<T> = Exclude<keyof Cache<T>, "state">;

  /**
   * A map for storing entity validation results.
   *
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TBody - The type of the payload.
   */
  export type CacheMap<TClass, TBody = TClass> = CacheMap.CacheMap<
    Result<TClass>,
    StrategyFactory.Impl.Payload<TBody>
  >;
}

export default ValidationEngineNs;
