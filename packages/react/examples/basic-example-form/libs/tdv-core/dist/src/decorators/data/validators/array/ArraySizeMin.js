import API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator } from "../../../index";
/** ArraySizeMin identifier. */
export const ARRAY_SIZE_MIN = "ArraySizeMin";
/** Internal validation function for {@link ArraySizeMin} validator. */
export function isArraySizeMinValid(array, min) {
  API.Utilities.Objects.assertType("array", array);
  return (array !== null && array !== void 0 ? array : []).length >= min;
}
/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link ARRAY_SIZE_MIN ArraySizeMin}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { message: "You must choose at least 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, {
 *     message: "You must choose at least 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeMin(min, options) {
  return createFieldValidator(
    (array, _context, locale) => ({
      key: API.Decorators.key(options, ARRAY_SIZE_MIN),
      valid: isArraySizeMinValid(array, min),
      message: API.Decorators.message(
        options,
        locale,
        translate(
          locale,
          ARRAY_SIZE_MIN,
          min,
          (array !== null && array !== void 0 ? array : []).length
        )
      ),
    }),
    API.Decorators.groups(options)
  );
}
