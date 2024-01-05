import { translate } from "../../../../localization/service/TranslationService";
import { assertType } from "../../../../utilities/impl/Objects";
import {
  buildGroupsProp,
  buildKeyProp,
  buildMessageProp,
  createFieldValidator,
  DecoratorOptions,
  FieldDecorator,
} from "../../../index";

/** `@ArrayContains` key. */
export const ARRAY_CONTAINS = "ArrayContains";

/** Internal validation function for {@link ArrayContains} validator. */
function isArrayContainsValid<K, T extends K[]>(value: T, contains: K): boolean {
  assertType("array", value);
  return (value ?? []).includes(contains);
}

/**
 * Checks if the decorated array contains a specific value.
 *
 * @key {@link ARRAY_CONTAINS ArrayContains}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param contains - The value to check.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayContains("en")
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", {
 *     message: "English language must be selected",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayContains<K, T extends K[]>(
  contains: K,
  options?: DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, ARRAY_CONTAINS),
      valid: isArrayContainsValid(array, contains),
      message: buildMessageProp(options, locale, translate(locale, ARRAY_CONTAINS, contains)),
    }),
    buildGroupsProp(options)
  );
}
