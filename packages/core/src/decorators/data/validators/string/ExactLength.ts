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

/** Internal validation function for {@link ExactLength} validator. */
function isExactLengthValid(value: Objects.Optional<string>, exact: number): boolean {
  Objects.assertType("string", value);
  return (value ?? "").length === exact;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.EXACT_LENGTH}
 * @typeParam T - The type of the string property.
 * @param exact - Exact length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Address {
 *   \@ExactLength(2)
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Address {
 *   \@ExactLength(2, { message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"] })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"], message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 */
export function ExactLength<This, Value extends Objects.Optional<string>>(
  exact: number,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.EXACT_LENGTH),
      valid: isExactLengthValid(value, exact),
      message: buildMessageProp(
        options,
        locale,
        translate(locale, DecoratorKeys.EXACT_LENGTH, exact)
      ),
    }),
    buildDecoratorMeta(options)
  );
}
