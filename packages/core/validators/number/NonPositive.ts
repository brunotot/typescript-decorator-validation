import makeValidator from "../../src/decorators/decorator.facade";
import { extractMessage } from "../../src/decorators/decorator.utils";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * NonPositive decorator for validating that a numeric value is non-positive.
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
 *   //@NonPositive()
 *   discount?: number;
 * }
 *
 * @example
 * // Usage with custom error message:
 * class Product {
 *   //@NonPositive({
 *   //  message: "Discount must be a non-positive value.",
 *   //})
 *   discount?: number;
 * }
 */
export default function NonPositive<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return makeValidator<T>({
    isValid: (num, _, locale) => ({
      key: "NonPositive",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "NonPositive", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
