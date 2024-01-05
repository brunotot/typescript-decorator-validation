import type API from "../index";
export * from "./models";
/**
 * Represents a function that evaluates a value and returns a validation result.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type ValidationEvaluator<T> = ((value: T, context: any, locale: API.Localization.Locale, args: API.Decorator.DecoratorArgs) => ValidationResult | Promise<ValidationResult>) & {};
/**
 * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type ValidationMetadataEntry<T> = {
    groups: string[];
    validate: ValidationEvaluator<T>;
};
/**
 * Represents the result of a validation, including the key, message, and whether it's valid.
 */
export type ValidationResult = {
    key: string;
    message: string;
    valid: boolean;
};
/**
 * Defines the properties for an async event response.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventResponseProps<TClass> = {
    errors: API.Strategy.Impl.Errors<TClass>;
    detailedErrors: API.Strategy.Impl.DetailedErrors<TClass>;
    globalErrors: API.Validation.ValidationResult[];
};
/**
 * Defines the properties for an async event handler.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventHandlerProps<TClass> = {
    key: keyof TClass;
    value: ValidationResult;
};
/**
 * Type for the async event handler function.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventHandler<TClass> = ((data: AsyncEventHandlerProps<TClass>) => void) & {};
/**
 * Configuration options for entity processing.
 *
 * @typeParam TClass - The type of the default value.
 */
export type FormConfig<TClass> = {
    defaultValue?: API.Utilities.Objects.Payload<TClass>;
    groups?: string[];
    locale?: API.Localization.Locale;
    asyncDelay?: number;
};
/**
 * The result of entity validation.
 *
 * @typeParam T - The type of the entity being validated.
 */
export type FormValidateResponse<T> = {
    valid: boolean;
    detailedErrors: API.Strategy.Impl.DetailedErrors<T>;
    errors: API.Strategy.Impl.Errors<T>;
    globalErrors: API.Validation.ValidationResult[];
};
//# sourceMappingURL=index.d.ts.map