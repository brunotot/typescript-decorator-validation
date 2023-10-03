import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Positive decorator for validating that a numeric value is positive.
 *
 * @param props - Optional properties to configure the decorator.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Basic usage without args:
 * class Product {
 *   @Positive()
 *   quantity?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   @Positive({
 *     message: "Quantity must be a positive value.",
 *   })
 *   quantity?: number;
 * }
 */
export default function Positive<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "Positive",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Positive", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
