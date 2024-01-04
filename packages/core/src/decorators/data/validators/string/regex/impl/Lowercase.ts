import API from "../../../../../../../index";

import { type FieldDecorator, createFieldValidator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/** Lowercase identifier. */
export const LOWERCASE = "Lowercase";

/** Internal validation function for {@link Lowercase} validator. */
export function isLowercaseValid<T extends API.Utilities.Objects.Optional<string>>(
  value: T
): boolean {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.LOWERCASE, value);
}

/**
 * Checks if decorated string contains only lowercase characters.
 *
 * @key {@link LOWERCASE Lowercase}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Lowercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Lowercase({ message: "Input must contain only lowercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Lowercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Lowercase({
 *     message: "Input must contain only lowercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Lowercase<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorator.Config.Options
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorator.Config.key(options, LOWERCASE),
      valid: testRegex(RegexConst.LOWERCASE, value),
      message: API.Decorator.Config.message(options, locale, translate(locale, LOWERCASE)),
    }),
    API.Decorator.Config.groups(options)
  );
}
