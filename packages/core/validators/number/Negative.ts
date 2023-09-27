import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
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
    groups: extractGroups(props),
    isValid: (num, _, locale) => ({
      key: "Negative",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "Negative", num!),
        locale
      ),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
