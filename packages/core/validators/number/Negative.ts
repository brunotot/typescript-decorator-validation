import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Decorator for validating that a value is a negative number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * @example
 * ```typescript
 * class FinancialRecord {
 *   //@Negative
 *   debt: number;
 * }
 * ```
 * This example applies the `Negative` validator to the `debt` property to ensure it is a negative number.
 */
export default function Negative<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (num, _, locale) => ({
      key: "Negative",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Negative", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
