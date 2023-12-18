import API from "../../../../index";

import { translate } from "../../../../src/localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/** Alpha identifier. */
export const ALPHA = "Alpha";

/** Internal validation function for {@link Alpha} validator. */
export function isAlphaValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.ALPHA, value);
}

/**
 * Checks if decorated string contains only alphabetical characters.
 *
 * @key {@link ALPHA Alpha}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alpha()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alpha({ message: "Input must contain only alphabetical characters (no numbers or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alpha({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alpha({
 *     message: "Input must contain only alphabetical characters (no numbers or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alpha<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, ALPHA),
      valid: testRegex(RegexConst.ALPHA, value),
      message: API.Decorator.message(options, locale, translate(locale, ALPHA)),
    }),
    API.Decorator.groups(options)
  );
}
