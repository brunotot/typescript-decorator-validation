import * as API from "../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";

/** `@ExactLength` key. */
export const EXACT_LENGTH = "ExactLength";

/** Internal validation function for {@link ExactLength} validator. */
function isExactLengthValid(value: API.Utilities.Objects.Optional<string>, exact: number): boolean {
  API.Utilities.Objects.assertType("string", value);
  return (value ?? "").length === exact;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link EXACT_LENGTH ExactLength}
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
export function ExactLength<T extends API.Utilities.Objects.Optional<string>>(
  exact: number,
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, EXACT_LENGTH),
      valid: isExactLengthValid(value, exact),
      message: API.Decorators.buildMessageProp(
        options,
        locale,
        translate(locale, EXACT_LENGTH, exact)
      ),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
