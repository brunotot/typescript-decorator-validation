import API from "api";

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
export function ArrayContains<K, T extends K[]>(
  props: API.Decorator.Props.MultiArgsMessageOptional<K>
) {
  const value = API.Decorator.args(props);
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArrayContains",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "ArrayContains",
          value
        ),
        locale
      ),
      valid: ((array ?? []) as any[]).includes(value),
    }),
  });
}
