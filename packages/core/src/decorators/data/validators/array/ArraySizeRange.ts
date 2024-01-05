import * as API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator, type FieldDecorator } from "../../../index";

/** `@ArraySizeRange` key. */
export const ARRAY_SIZE_RANGE = "ArraySizeRange";

/** Internal validation function for {@link ArraySizeRange} validator. */
function isArraySizeRangeValid(array: any[], min: number, max: number): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).length >= min && (array ?? []).length <= max;
}

/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link ARRAY_SIZE_RANGE ArraySizeRange}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param max - Max size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, { message: "You must choose at least 3 and at most 5 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeRange(3, 5, {
 *     message: "You must choose at least 3 and at most 5 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeRange<K, T extends K[]>(
  min: number,
  max: number,
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, ARRAY_SIZE_RANGE),
      valid: isArraySizeRangeValid(array, min, max),
      message: API.Decorators.buildMessageProp(
        options,
        locale,
        translate(locale, ARRAY_SIZE_RANGE, min, max, (array ?? []).length)
      ),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
