import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";
import Objects from "../../src/utilities/impl/Objects";

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
export default function Integer<T extends Objects.Optional<number>>(
  props?: Decorator.Props.ZeroArgsMessageOptional
) {
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (num, _, locale) => ({
      key: "Integer",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "Integer", num!),
        locale
      ),
      valid: num !== undefined && num !== null && Number.isInteger(num),
    }),
  });
}
