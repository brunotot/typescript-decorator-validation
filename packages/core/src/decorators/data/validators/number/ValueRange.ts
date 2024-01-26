import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import {
  buildDecoratorMeta,
  buildKeyProp,
  buildMessageProp,
  type DecoratorOptions,
} from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link ValueRange} validator. */
function isValueRangeValid(num: Objects.Optional<number>, min: number, max: number): boolean {
  Objects.assertType("number", num);
  return num == null ? true : num >= min && num <= max;
}

/**
 * Checks if decorated number is within a given range of `min` and `max` parameters.
 *
 * @key {@link DecoratorKeys.VALUE_RANGE}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, { message: "Number must be greater than 4 and less than 11" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueRange(5, 10, {
 *     message: "Number must be greater than 4 and less than 11",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueRange<This, Value extends Objects.Optional<number>>(
  min: number,
  max: number,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.VALUE_RANGE),
      valid: isValueRangeValid(num, min, max),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.VALUE_RANGE, min, max, num)
      ),
    }),
    buildDecoratorMeta(options)
  );
}
