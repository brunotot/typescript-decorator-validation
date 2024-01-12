import { testRegex } from "@decorators/data/validators/string/regex/Pattern";
import { RegexConst } from "@decorators/data/validators/string/regex/shared/regex.constants";
import { FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization";
import { Objects } from "@utilities";

/** `@Email` key. */
export const EMAIL = "Email";

/** Internal validation function for {@link Email} validator. */
function isEmailValid<T extends Objects.Optional<string>>(value: T): boolean {
  Objects.assertType("string", value);
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
export function Email<T extends Objects.Optional<string>>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, EMAIL),
      valid: isEmailValid(value),
      message: buildMessageProp(options, locale, translate(locale, EMAIL)),
    }),
    buildGroupsProp(options)
  );
}
