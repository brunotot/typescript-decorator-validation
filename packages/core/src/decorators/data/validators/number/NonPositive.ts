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

/** Internal validation function for {@link NonPositive} validator. */
function isNonPositiveValid(num: Objects.Optional<number>): boolean {
  Objects.assertType("number", num);
  return num !== undefined && num !== null && num <= 0;
}

/**
 * Checks if decorated number is not a positive number (can be 0).
 *
 * @key {@link DecoratorKeys.NON_POSITIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonPositive()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonPositive({ message: "Number value must not be a positive number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonPositive({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonPositive({
 *     message: "Number value must not be a positive number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function NonPositive<This, Value extends Objects.Optional<number>>(
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (num, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.NON_POSITIVE),
      valid: isNonPositiveValid(num),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.NON_POSITIVE, num)
      ),
    }),
    buildDecoratorMeta(options)
  );
}
