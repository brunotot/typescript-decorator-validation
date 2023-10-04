import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import $ from "../../src/types";

/**
 * Decorator for validating if a value is a decimal number.
 *
 * @typeParam T - The type of the value property.
 * @param props - Optional properties for the decorator.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class Product {
 *   //@Decimal()
 *   price: number;
 * }
 * ```
 * This example applies the `Decimal` validator to the `price` property to ensure it is a decimal number.
 */
export default function Decimal<T extends $.Objects.Optional<number>>(
  props?: Decorator.Props.ZeroArgsMessageOptional
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (value, _, locale) => ({
      key: "Decimal",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Decimal", value!),
        locale
      ),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
