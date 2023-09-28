import Localization from "../../localization";
import CacheMap from "../../processor/models/cache.map";
import EvaluatedStrategyFactory from "./evaluated-strategy-factory.namespace";
import Validation from "./validation.namespace";

/**
 * @namespace EntityProcessorNs
 *
 * @description
 * A collection of types and interfaces related to entity processing and validation.
 */
namespace EntityProcessorNs {
  /**
   * @typeParam TBody - The type of the default value.
   *
   * @description
   * Configuration options for entity processing.
   */
  export type Config<TBody> = {
    defaultValue?: TBody;
    groups?: Validation.Group[];
    locale?: Localization.Locale;
  };

  /**
   * @typeParam T - The type of the entity being validated.
   *
   * @description
   * The result of entity validation.
   */
  export type Result<T> = {
    valid: boolean;
    detailedErrors: EvaluatedStrategyFactory.DetailedErrors<T>;
    errors: EvaluatedStrategyFactory.Errors<T>;
  };

  /**
   * @description
   * A type representing various forms of validity errors.
   */
  export type ValidityErrorsType =
    | Result<any>
    | Result<any>[]
    | Validation.Result[]
    | Validation.Result[][];

  /**
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TBody - The type of the payload.
   *
   * @description
   * Cache object for storing entity validation results.
   */
  export type Cache<TClass, TBody = TClass> = Result<TClass> & {
    state: EvaluatedStrategyFactory.Payload<TBody>;
  };

  /**
   * @typeParam T - The type of the cache.
   *
   * @description
   * The keys that can be used to access the cache.
   */
  export type CacheKey<T> = Exclude<keyof Cache<T>, "state">;

  /**
   * @typeParam TClass - The type of the class being cached.
   * @typeParam TBody - The type of the payload.
   *
   * @description
   * A map for storing entity validation results.
   */
  export type CacheMap<TClass, TBody = TClass> = CacheMap.CacheMap<
    Result<TClass>,
    EvaluatedStrategyFactory.Payload<TBody>
  >;
}

/**
 * @description
 * The default export for the `EntityProcessorNs` namespace.
 */
export default EntityProcessorNs;
