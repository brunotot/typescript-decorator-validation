import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

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
export function ArraySizeMax<K, T extends K[]>(
  max: number,
  options?: API.Decorator.Options
) {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _, locale) => ({
      key: API.Decorator.key(options, "ArraySizeMax"),
      valid: (array ?? []).length <= max,
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, "ArraySizeMax", max, (array ?? []).length)
      ),
    }),
    API.Decorator.groups(options)
  );
}
