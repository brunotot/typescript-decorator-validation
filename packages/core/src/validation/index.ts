import API from "api";

import * as CacheMapNamespace from "./models/CacheMap";
import * as ValidationEngineNamespace from "./models/ValidationEngine";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

/**
 * A collection of types and functions related to validation.
 */
namespace Validation {
  export import CacheMap = CacheMapNamespace.CacheMap;

  /**
   * Represents a function that evaluates a value and returns a validation result.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Evaluator<T> = ((
    value: T,
    context: any,
    locale: API.Localization.Resolver.LocaleResolver.Locale
  ) => Result) & {};

  /**
   * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
   *
   * @typeParam T - The type of the value being evaluated.
   */
  export type Metadata<T> = {
    groups: string[];
    validate: Evaluator<T>;
  };

  /**
   * Represents the result of a validation, including the key, message, and whether it's valid.
   */
  export type Result = {
    key: string;
    message: string;
    valid: boolean;
  };

  export type AsyncEventResponseProps<TClass> = {
    errors: API.Strategy.Factory.Impl.Errors<TClass>;
    detailedErrors: API.Strategy.Factory.Impl.DetailedErrors<TClass>;
  };

  export type AsyncEventHandlerProps<TClass> = {
    key: keyof TClass;
    value: Validation.Result;
  };

  export type AsyncEventHandler<TClass> = (
    data: AsyncEventHandlerProps<TClass>
  ) => void;

  /**
   * Configuration options for entity processing.
   *
   * @typeParam TClass - The type of the default value.
   */
  export type Config<TClass> = {
    defaultValue?: API.Utilities.Objects.Payload<TClass>;
    groups?: string[];
    locale?: API.Localization.Resolver.LocaleResolver.Locale;
    asyncDelay?: number;
  };

  /**
   * The result of entity validation.
   *
   * @typeParam T - The type of the entity being validated.
   */
  export type Response<T> = {
    valid: boolean;
    detailedErrors: API.Strategy.Factory.Impl.DetailedErrors<T>;
    errors: API.Strategy.Factory.Impl.Errors<T>;
  };

  export import ValidationEngine = ValidationEngineNamespace.ValidationEngine;
}

export default Validation;
