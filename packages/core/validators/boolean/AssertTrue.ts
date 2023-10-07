import API from "api";

/**
 * Creates a decorator to validate that a value is truthy.
 *
 * @typeparam T - The type of the decorated property.
 * @param props - Optional properties for configuring the validator.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage
 * class User {
 *   //@AssertTrue()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Using a custom error message
 * class Product {
 *   //@AssertTrue({ message: "Product must be available." })
 *   available: boolean;
 * }
 */
export function AssertTrue<T extends boolean>(
  props?: API.Decorator.Props.ZeroArgsMessageOptional
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "AssertTrue",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "AssertTrue"
        ),
        locale
      ),
      valid: !!value,
    }),
  });
}
