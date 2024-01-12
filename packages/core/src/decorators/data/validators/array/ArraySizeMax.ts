import { FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization";
import { Objects } from "@utilities";

/** `@ArraySizeMax` key. */
export const ARRAY_SIZE_MAX = "ArraySizeMax";

/** Internal validation function for {@link ArraySizeMax} validator. */
function isArraySizeMaxValid(array: any[], max: number): boolean {
  Objects.assertType("array", array);
  return (array ?? []).length <= max;
}

/**
 * Checks if the decorated array contains up to `max` number of elements.
 *
 * @key {@link ARRAY_SIZE_MAX ArraySizeMax}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param max - Max size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, { message: "You must choose no more than 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMax(3, {
 *     message: "You must choose no more than 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeMax<K, T extends K[]>(max: number, options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (array, _, locale) => ({
      key: buildKeyProp(options, ARRAY_SIZE_MAX),
      valid: isArraySizeMaxValid(array, max),
      message: buildMessageProp(options, locale, translate(locale, ARRAY_SIZE_MAX, max, (array ?? []).length)),
    }),
    buildGroupsProp(options)
  );
}
