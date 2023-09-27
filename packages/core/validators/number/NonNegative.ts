import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * NonNegative decorator for validating that a numeric value is non-negative.
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
 *   //@NonNegative()
 *   price?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@NonNegative({
 *   //  message: "Price must be a non-negative value.",
 *   //})
 *   price?: number;
 * }
 */
export default function NonNegative<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (num, _, locale) => ({
      key: "NonNegative",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "NonNegative", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num >= 0,
    }),
  });
}
