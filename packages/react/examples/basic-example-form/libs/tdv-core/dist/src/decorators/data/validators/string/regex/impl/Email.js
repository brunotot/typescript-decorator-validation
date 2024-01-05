import API from "../../../../../../../index";
import { createFieldValidator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";
/** Email identifier. */
export const EMAIL = "Email";
/** Internal validation function for {@link Email} validator. */
export function isEmailValid(value) {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.EMAIL, value);
}
/**
 * Checks if decorated string is a valid email.
 *
 * @key {@link EMAIL Email}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Email()
 *   email: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Email({ message: "Input is not a valid email" })
 *   email: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Email({ groups: ["UPDATE"] })
 *   email: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Email({
 *     message: "Input is not a valid email",
 *     groups: ["UPDATE"]
 *   })
 *   email: string;
 * }
 * ```
 */
export function Email(options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: API.Decorators.key(options, EMAIL),
      valid: testRegex(RegexConst.EMAIL, value),
      message: API.Decorators.message(options, locale, translate(locale, EMAIL)),
    }),
    API.Decorators.groups(options)
  );
}
