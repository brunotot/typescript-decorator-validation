import * as API from "../../../../../index";
import { translate } from "../../../../localization/service/TranslationService";
import { createFieldValidator, type FieldDecorator } from "../../../index";

/** `@ArraySizeExact` key. */
export const ARRAY_SIZE_EXACT = "ArraySizeExact";

/** Internal validation function for {@link ArraySizeExact} validator. */
function isArraySizeExactValid(array: any[]): boolean {
  API.Utilities.Objects.assertType("array", array);
  return (array ?? []).length === 0;
}

/**
 * Checks if the decorated array contains an exact number of elements.
 *
 * @key {@link ARRAY_SIZE_EXACT ArraySizeExact}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param exact - Exact size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { message: "You must choose exactly 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, {
 *     message: "You must choose exactly 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeExact<K, T extends K[]>(
  exact: number,
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, ARRAY_SIZE_EXACT),
      valid: (array ?? []).length === exact,
      message: API.Decorators.buildMessageProp(
        options,
        locale,
        translate(locale, ARRAY_SIZE_EXACT, exact, (array ?? []).length)
      ),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}