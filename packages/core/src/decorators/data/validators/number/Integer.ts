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

/** Internal validation function for {@link Integer} validator. */
function isIntegerValid(num: Objects.Optional<number>): boolean {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && Number.isInteger(num);
}

/**
 * Checks if decorated number is an integer number.
 *
 * @key {@link DecoratorKeys.INTEGER}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Integer()
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Integer({ message: "Age number input must be an integer" })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Integer({ groups: ["UPDATE"] })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Integer({
 *     message: "Age number input must be an integer",
 *     groups: ["UPDATE"]
 *   })
 *   age: number;
 * }
 * ```
 */
export function Integer<This, Value extends Objects.Optional<number>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.INTEGER),
      valid: isIntegerValid(num),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.INTEGER, num)),
    }),
    buildDecoratorMeta(options)
  );
}
