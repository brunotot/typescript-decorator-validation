import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link ArraySizeExact} validator. */
function isArraySizeExactValid(array: any[]): boolean {
  Objects.assertType("array", array);
  return (array ?? []).length === 0;
}

/**
 * Checks if the decorated array contains an exact number of elements.
 *
 * @key {@link DecoratorKeys.ARRAY_SIZE_EXACT}
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
export function ArraySizeExact<K, T extends K[]>(exact: number, options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_SIZE_EXACT),
      valid: isArraySizeExactValid(array),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.ARRAY_SIZE_EXACT, exact, (array ?? []).length)
      ),
    }),
    buildGroupsProp(options)
  );
}
