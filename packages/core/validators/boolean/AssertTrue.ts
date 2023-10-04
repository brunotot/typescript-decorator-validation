import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";

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
export default function AssertTrue<T extends boolean>(
  props?: Decorator.Props.ZeroArgsMessageOptional
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "AssertTrue",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "AssertTrue"),
        locale
      ),
      valid: !!value,
    }),
  });
}
