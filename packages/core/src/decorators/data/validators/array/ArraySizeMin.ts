import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link ArraySizeMin} validator. */
function isArraySizeMinValid(array: any[], min: number): boolean {
  Objects.assertType("array", array);
  return (array ?? []).length >= min;
}

/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link DecoratorKeys.ARRAY_SIZE_MIN}
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
export function ArraySizeMin<K, T extends K[]>(min: number, options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_SIZE_MIN),
      valid: isArraySizeMinValid(array, min),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.ARRAY_SIZE_MIN, min, (array ?? []).length)
      ),
    }),
    buildGroupsProp(options)
  );
}
