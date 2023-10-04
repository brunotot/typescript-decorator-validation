import Decorator from "../../src/decorators";
import FieldValidatorDecorator from "../../src/decorators/kind/derived/FieldValidatorDecorator";
import TranslationService from "../../src/localization/service/translation.service";

/**
 * Decorator for validating that an array contains a specific value.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - The value to check for in the array.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayContains<number>({ value: 42, groups: ["group1", "group2"], message: "Invalid value" })
 *   numbers: number[];
 * }
 * ```
 * This example validates that the `numbers` array contains the value 42 and associates it with custom validation groups and a custom error message.
 */
export default function ArrayContains<K, T extends K[]>(
  props: Decorator.Props.MultiArgsMessageOptional<K>
) {
  const value = Decorator.args(props);
  return FieldValidatorDecorator.build<T>({
    groups: Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArrayContains",
      message: Decorator.message(
        props,
        TranslationService.translate(locale, "ArrayContains", value),
        locale
      ),
      valid: ((array ?? []) as any[]).includes(value),
    }),
  });
}
