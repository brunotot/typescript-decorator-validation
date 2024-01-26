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

/** Internal validation function for {@link Decimal} validator. */
function isDecimalValid<T extends Objects.Optional<number>>(value: T): boolean {
  Objects.assertType("number", value);
  return value !== undefined && value !== null && !Number.isInteger(value);
}

/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DecoratorKeys.DECIMAL}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Decimal()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Decimal({ message: "Number must be a decimal" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Decimal({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Decimal({
 *     message: "Number must be a decimal",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Decimal<This, Value extends Objects.Optional<number>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.DECIMAL),
      valid: isDecimalValid(value),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.DECIMAL, value)),
    }),
    buildDecoratorMeta(options)
  );
}
