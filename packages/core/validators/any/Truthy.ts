import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

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
 *   //@Truthy()
 *   isActive: boolean;
 * }
 *
 * @example
 * // Example 2: Using a custom error message
 * class Product {
 *   //@Truthy({ message: "Product must be available." })
 *   available: boolean;
 * }
 */
export default function Truthy<T extends $.Objects.Optional>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Truthy",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Truthy"),
        locale
      ),
      valid: !!value,
    }),
  });
}
