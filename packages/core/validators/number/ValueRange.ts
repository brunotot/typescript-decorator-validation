import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * ValueRange decorator for validating that a numeric value falls within a specified range.
 *
 * @param props - Properties to configure the decorator, including the minimum and maximum values.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific value range:
 * class Product {
 *   //@ValueRange({ min: 10, max: 100 })
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueRange({
 *   //  min: 5,
 *   //  max: 50,
 *   //  message: "Price must be between $5 and $50.",
 *   //})
 *   price?: number;
 * }
 */
export default function ValueRange<T extends $.Objects.Optional<number>>(
  props: Decorator.PartialProps<
    {
      min: number;
      max: number;
    },
    {
      min: number;
      max: number;
    }
  >
) {
  const { min, max } = props;
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ValueRange",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "ValueRange", min, max, value!),
        locale
      ),
      valid: value == null ? true : value >= min && value <= max,
    }),
  });
}
