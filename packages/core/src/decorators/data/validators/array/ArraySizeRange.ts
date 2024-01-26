import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import { buildDecoratorMeta, buildKeyProp, buildMessageProp, type DecoratorOptions } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link ArraySizeRange} validator. */
function isArraySizeRangeValid(array: any[], min: number, max: number): boolean {
  Objects.assertType("array", array);
  return (array ?? []).length >= min && (array ?? []).length <= max;
}

/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link DecoratorKeys.ARRAY_SIZE_RANGE}
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
export function ArraySizeRange<This, Item, Value extends Item[]>(
  min: number,
  max: number,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_SIZE_RANGE),
      valid: isArraySizeRangeValid(array, min, max),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.ARRAY_SIZE_RANGE, min, max, (array ?? []).length)
      ),
    }),
    buildDecoratorMeta(options)
  );
}
