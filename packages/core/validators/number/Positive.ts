import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
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
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (num, _, locale) => ({
      key: "Positive",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Positive", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
