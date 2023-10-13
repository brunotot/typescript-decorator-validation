import API from "api";

/**
 * Decorator for validating that a value is an integer.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Order {
 *   //@Integer()
 *   quantity: number;
 * }
 * ```
 * This example applies the `Integer` validator to the `quantity` property to ensure it is an integer.
 */
export function Integer<T extends API.Utilities.Objects.Optional<number>>(
  message?: string,
  config?: API.Decorator.Props.Base
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (num, _context, locale) => ({
      key: "Integer",
      valid: num !== undefined && num !== null && Number.isInteger(num),
      message: API.Decorator.message(message, locale, "Integer", num),
    }),
    config
  );
}
