import API from "api";

/** Required identifier. */
export const REQUIRED = "Required";

/**
 * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
 *
 * @typeParam T - The type of the value.
 */
export function isRequiredValid<T>(
  value: T | undefined
): value is NonNullable<typeof value> {
  return !(
    value === undefined ||
    value === null ||
    value === false ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (value instanceof Date && value.toString() === "Invalid Date")
  );
}

/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @key {@link REQUIRED Required}
 * @typeParam T - The type of the decorated property (any class field).
 * @param props - (Optional) An object with optional decorator-related props.
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   _@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   _@Required("Product name is mandatory")
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   _@Required("Product name is mandatory", { groups: ["CREATE"] })
 *   name: string;
 * }
 * ```
 */
export function Required<T extends API.Utilities.Objects.Optional>(
  message?: string,
  config?: API.Decorator.Props.Base
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: REQUIRED,
      valid: isRequiredValid(value),
      message: API.Decorator.message(message, locale, REQUIRED),
    }),
    config
  );
}
