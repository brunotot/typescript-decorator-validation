import type API from "../../index";
import * as CacheMapNamespace from "./models/CacheMap";
import * as ValidationEngineNamespace from "./models/ValidationEngine";
/**
 * A collection of types and functions related to validation.
 */
declare namespace Validation {
    export import CacheMap = CacheMapNamespace.CacheMap;
    /**
     * Represents a function that evaluates a value and returns a validation result.
     *
     * @typeParam T - The type of the value being evaluated.
     */
    type Evaluator<T> = ((value: T, context: any, locale: API.Localization.Resolver.LocaleResolver.Locale) => Result) & {};
    /**
     * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
     *
     * @typeParam T - The type of the value being evaluated.
     */
    type Metadata<T> = {
        groups: string[];
        validate: Evaluator<T>;
    };
    /**
     * Represents the result of a validation, including the key, message, and whether it's valid.
     */
    type Result = {
        key: string;
        message: string;
        valid: boolean;
    };
    /**
     * Defines the properties for an async event response.
     * @typeParam TClass - The type of the class being validated.
     */
    type AsyncEventResponseProps<TClass> = {
        errors: API.Strategy.Factory.Impl.Errors<TClass>;
        detailedErrors: API.Strategy.Factory.Impl.DetailedErrors<TClass>;
    };
    /**
     * Defines the properties for an async event handler.
     * @typeParam TClass - The type of the class being validated.
     */
    type AsyncEventHandlerProps<TClass> = {
        key: keyof TClass;
        value: Validation.Result;
    };
    /**
     * Type for the async event handler function.
     * @typeParam TClass - The type of the class being validated.
     */
    type AsyncEventHandler<TClass> = ((data: AsyncEventHandlerProps<TClass>) => void) & {};
    /**
     * Configuration options for entity processing.
     *
     * @typeParam TClass - The type of the default value.
     */
    type Config<TClass> = {
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
    type Response<T> = {
        valid: boolean;
        detailedErrors: API.Strategy.Factory.Impl.DetailedErrors<T>;
        errors: API.Strategy.Factory.Impl.Errors<T>;
    };
    export import ValidationEngine = ValidationEngineNamespace.ValidationEngine;
}
export default Validation;
//# sourceMappingURL=index.d.ts.map