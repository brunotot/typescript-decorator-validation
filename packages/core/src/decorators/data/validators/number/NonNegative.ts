import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { type FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { type DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization/service/TranslationService";
import { Objects } from "@utilities";

/** Internal validation function for {@link NonNegative} validator. */
function isNonNegativeValid(num: Objects.Optional<number>): boolean {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && num >= 0;
}

/**
 * Checks if decorated number is not a negative number (can be 0).
 *
 * @key {@link DecoratorKeys.NON_NEGATIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonNegative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonNegative({ message: "Number value must not be a negative number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonNegative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonNegative({
 *     message: "Number value must not be a negative number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function NonNegative<T extends Objects.Optional<number>>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.NON_NEGATIVE),
      valid: isNonNegativeValid(num),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.NON_NEGATIVE, num)),
    }),
    buildGroupsProp(options)
  );
}
