import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Decorator for validating that a value is an integer.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Order {
 *   //@Integer()
 *   quantity: number;
 * }
 * ```
 * This example applies the `Integer` validator to the `quantity` property to ensure it is an integer.
 */
export default function Integer<T extends $.Objects.Optional<number>>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (num, _, locale) => ({
      key: "Integer",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(locale, "Integer", num!),
        locale
      ),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
