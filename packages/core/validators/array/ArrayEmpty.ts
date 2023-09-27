import Decorator from "../../src/decorators";
import {
  extractGroups,
  extractMessage,
} from "../../src/decorators/decorator.utils";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";

/**
 * Decorator for validating that an array is empty.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties (optional).
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArrayEmpty<number>({ groups: ["group1"], message: "Array must be empty" })
 *   emptyArray: number[];
 * }
 * ```
 * This example validates that the `emptyArray` is an empty array and associates it with a custom validation group and a custom error message.
 */
export default function ArrayEmpty<K, T extends K[]>(
  props?: Decorator.PartialProps
) {
  return ValidatorService.create<T>({
    groups: extractGroups(props),
    isValid: (array, _, locale) => ({
      key: "ArrayEmpty",
      message: extractMessage(
        props,
        TranslationService.translate(locale, "ArrayEmpty"),
        locale
      ),
      valid: (array ?? []).length === 0,
    }),
  });
}
