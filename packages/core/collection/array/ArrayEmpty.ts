import API from "api";
import { translate } from "../../src/localization/service/TranslationService";

/** ArrayEmpty identifier. */
export const ARRAY_EMPTY = "ArrayEmpty";

/** Internal validation function for {@link ArrayEmpty} validator. */
export function isArrayEmptyValid(array: any[]): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).length === 0;
}

/**
 * Checks if the decorated array is empty.
 *
 * @key {@link ARRAY_EMPTY ArrayEmpty}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   _@ArrayEmpty()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   _@ArrayEmpty({ message: "Languages data must be empty" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   _@ArrayEmpty({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   _@ArrayEmpty({
 *     message: "Languages data must be empty",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayEmpty<K, T extends Array<K>>(
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (array, _context, locale) => ({
      key: API.Decorator.key(options, ARRAY_EMPTY),
      valid: isArrayEmptyValid(array),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, ARRAY_EMPTY)
      ),
    }),
    API.Decorator.groups(options)
  );
}
