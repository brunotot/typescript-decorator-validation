import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link Negative} validator. */
function isNegativeValid(num: Objects.Optional<number>): boolean {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && num < 0;
}

/**
 * Checks if decorated number is a negative number (number less than 0).
 *
 * @key {@link DecoratorKeys.NEGATIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Negative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Negative({ message: "Number value must be less than 0" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Negative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Negative({
 *     message: "Number value must be less than 0",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function Negative<T extends Objects.Optional<number>>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.NEGATIVE),
      valid: isNegativeValid(num),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.NEGATIVE, num)),
    }),
    buildGroupsProp(options)
  );
}
