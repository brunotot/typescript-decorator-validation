import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import { buildDecoratorMeta, buildKeyProp, buildMessageProp, type DecoratorOptions } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link ArrayOne} validator. */
function isArrayOneValid<K, T extends K[]>(array: T, predicate: Objects.ArrayPredicate<K>): boolean {
  Objects.assertType("array", array);
  return (array ?? []).filter(predicate).length === 1;
}

/**
 * Checks if exactly one element of decorated array satisfies the given predicate criteria.
 *
 * @key {@link DecoratorKeys.ARRAY_ONE}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.filter()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num >= 0)
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { message: "Exactly one positive number is allowed" })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { groups: ["UPDATE"] })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, {
 *     message: "Exactly one positive number is allowed",
 *     groups: ["UPDATE"]
 *   })
 *   onlyOnePositive: string[];
 * }
 * ```
 **/
export function ArrayOne<This, Item, Value extends Item[]>(
  predicate: Objects.ArrayPredicate<Item>,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_ONE),
      valid: isArrayOneValid(array, predicate),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.ARRAY_ONE)),
    }),
    buildDecoratorMeta(options)
  );
}
