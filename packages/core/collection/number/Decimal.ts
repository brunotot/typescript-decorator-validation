import API from "api";

/**
 * Decorator for validating if a value is a decimal number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Product {
 *   //@Decimal()
 *   price: number;
 * }
 * ```
 * This example applies the `Decimal` validator to the `price` property to ensure it is a decimal number.
 */
export function Decimal<T extends API.Utilities.Objects.Optional<number>>(
  message?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: "Decimal",
      valid: value !== undefined && value !== null && !Number.isInteger(value),
      message: API.Decorator.message(message, locale, "Decimal", value!),
    }),
    config
  );
}
