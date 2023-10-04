import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Objects from "../../src/utilities/impl/Objects";

/**
 * ValueMax decorator for validating that a numeric value is less than or equal to a specified maximum value.
 *
 * @param props - Properties to configure the decorator, including the maximum value.
 *
 * @typeParam T - The type of the value to be validated, which should be optional and a number.
 *
 * @returns A decorator function that can be applied to class properties.
 *
 * @example
 * // Usage with a specific maximum value:
 * class Product {
 *   //@ValueMax({ value: 100 })
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@ValueMax({
 *   //  value: 50,
 *   //  message: "Price must not exceed $50.",
 *   //})
 *   price?: number;
 * }
 */
export default function ValueMax<T extends Objects.Optional<number>>(
  props: Decorator.Props.MultiArgsMessageOptional<number>
) {
  const max = Decorator.args(props);
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "ValueMax",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "ValueMax", max, value!),
        locale
      ),
      valid: value == null ? true : value <= max,
    }),
  });
}
