import API from "api";

/**
 * Decorator for validating that an array has a maximum number of elements.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.value - The maximum number of elements the array can have.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySizeMax<number>({ value: 10, groups: ["group1"], message: "Array cannot have more than 10 elements" })
 *   myArray: number[];
 * }
 * ```
 * This example validates that the `myArray` property has a maximum of 10 elements, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArraySizeMin<K, T extends K[]>(
  props: API.Decorator.Props.MultiArgsMessageOptional<number>
) {
  const min = API.Decorator.args(props);
  return API.Decorator.FieldValidatorDecorator.build<T>({
    groups: API.Decorator.groups(props),
    validate: (array, _, locale) => ({
      key: "ArraySizeMin",
      message: API.Decorator.message(
        props,
        API.Localization.Service.TranslationService.translate(
          locale,
          "ArraySizeMin",
          min,
          String((array ?? []).length ?? "0")
        ),
        locale
      ),
      valid: (array ?? []).length >= min,
    }),
  });
}
