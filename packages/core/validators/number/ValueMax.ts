import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

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
export default function ValueMax<T extends $.Objects.Optional<number>>(
  props: Decorator.PartialProps<
    number,
    {
      value: number;
    }
  >
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (value, _, locale) => ({
      key: "ValueMax",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "ValueMax", max, value!),
        locale
      ),
      valid: value == null ? true : value <= max,
    }),
  });
}
