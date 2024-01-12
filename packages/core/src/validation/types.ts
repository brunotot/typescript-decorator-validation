import { Locale } from "@localization";
import type { DetailedErrorsResponse, SimpleErrorsResponse } from "@strategy";
import { Objects } from "@utilities";

/**
 * Represents a function that evaluates a value and returns a validation result.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type ValidationEvaluator<T> = ((
  value: T,
  context: any,
  locale: Locale,
  args: Record<string, any>
) => ValidationResult | Promise<ValidationResult>) & {};

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
  errors: SimpleErrorsResponse<TClass>;
  detailedErrors: DetailedErrorsResponse<TClass>;
  globalErrors: ValidationResult[];
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
  defaultValue?: Objects.Payload<TClass>;
  groups?: string[];
  locale?: Locale;
  asyncDelay?: number;
};

/**
 * The result of entity validation.
 *
 * @typeParam T - The type of the entity being validated.
 */
export type FormValidateResponse<T> = {
  valid: boolean;
  detailedErrors: DetailedErrorsResponse<T>;
  errors: SimpleErrorsResponse<T>;
  globalErrors: ValidationResult[];
};
