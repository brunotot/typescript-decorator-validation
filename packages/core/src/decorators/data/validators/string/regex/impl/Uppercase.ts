import { testRegex } from "@decorators/data/validators/string/regex/Pattern";
import { RegexConst } from "@decorators/data/validators/string/regex/shared/regex.constants";
import { FieldDecorator, createFieldValidator } from "@decorators/factory/forField";
import { DecoratorOptions, buildGroupsProp, buildKeyProp, buildMessageProp } from "@decorators/helper";
import { translate } from "@localization";
import { Objects } from "@utilities";

/** `@Uppercase` key. */
export const UPPERCASE = "Uppercase";

/** Internal validation function for {@link Uppercase} validator. */
function isUppercaseValid<T extends Objects.Optional<string>>(value: T): boolean {
  Objects.assertType("string", value);
  return testRegex(RegexConst.UPPERCASE, value);
}

/**
 * Checks if decorated string contains only uppercase characters.
 *
 * @key {@link UPPERCASE Uppercase}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Uppercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Uppercase({ message: "Input must contain only uppercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Uppercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Uppercase({
 *     message: "Input must contain only uppercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Uppercase<T extends Objects.Optional<string>>(options?: DecoratorOptions): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: buildKeyProp(options, UPPERCASE),
      valid: isUppercaseValid(value),
      message: buildMessageProp(options, locale, translate(locale, UPPERCASE)),
    }),
    buildGroupsProp(options)
  );
}
