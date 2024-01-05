import * as API from "../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../decorators";
import { translate } from "../../../../localization/service/TranslationService";

/** `@NonNegative` key. */
export const NON_NEGATIVE = "NonNegative";

/** Internal validation function for {@link NonNegative} validator. */
function isNonNegativeValid(num: API.Utilities.Objects.Optional<number>): boolean {
  API.Utilities.Objects.assertType("number", num);
  return num !== undefined && num !== null && num >= 0;
}

/**
 * Checks if decorated number is not a negative number (can be 0).
 *
 * @key {@link NON_NEGATIVE NonNegative}
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
export function NonNegative<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (num, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, NON_NEGATIVE),
      valid: isNonNegativeValid(num),
      message: API.Decorators.buildMessageProp(
        options,
        locale,
        translate(locale, NON_NEGATIVE, num)
      ),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
