import Decorator from "../../src/decorators";
import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import TranslationService from "../../src/localization/service/translation.service";

/**
 * Decorator for validating that an array falls within a specified size range.
 *
 * @typeParam K - The type of elements in the array.
 * @param props - The validation properties.
 * @param props.min - The minimum number of elements the array must have.
 * @param props.max - The maximum number of elements the array must have.
 * @param [props.groups] - The validation groups to which this validation belongs.
 * @param [props.message] - The custom error message to display if the validation fails.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```
 * class MyClass {
 *   //@ArraySizeRange<number>({ min: 2, max: 5, groups: ["group1"], message: "Array size must be between 2 and 5" })
 *   myArray: number[];
 * }
 * ```
 * This example validates that the `myArray` property has a size between 2 and 5 elements, associates it with a custom validation group, and provides a custom error message if the validation fails.
 */
export default function ArraySizeRange<K, T extends K[]>(
  props: Decorator.PartialProps<
    {
      min: number;
      max: number;
    },
    {
      min: number;
      max: number;
    }
  >
) {
  const min = typeof props === "number" ? props : props.min;
  const max = typeof props === "number" ? props : props.max;
  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (array, _, locale) => ({
      key: "ArraySizeRange",
      message: ParamsExtractorService.message(
        props,
        TranslationService.translate(
          locale,
          "ArraySizeRange",
          min,
          max,
          (array ?? []).length
        ),
        locale
      ),
      valid: (array ?? []).length >= min && (array ?? []).length <= max,
    }),
  });
}
