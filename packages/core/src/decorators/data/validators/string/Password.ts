/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DecoratorKeys } from "@decorators/data/validators/DecoratorKeys";
import { RegexConst } from "@decorators/data/validators/string/regex/shared/regex.constants";
import { createFieldValidator, type FieldDecorator } from "@decorators/factory/forField";
import { buildDecoratorMeta, buildMessageProp, type DecoratorOptions } from "@decorators/helper";
import { type Locale } from "@localization";
import { translate } from "@localization/service/TranslationService";
import { type Objects } from "@utilities";

/** Configurable options for `@Password` decorator. */
export type PasswordRules = {
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  specials?: boolean;
  length?: number;
};

/** Internal validation function for {@link Password} validator. */
function isPasswordValid(
  input: Objects.Optional<string>,
  rules: PasswordRules | undefined,
  definedMessage?: string,
  locale?: Locale
) {
  const PASSWORD_REGEXES = {
    uppercase: RegexConst.UPPERCASE_ANYWHERE,
    lowercase: RegexConst.LOWERCASE_ANYWHERE,
    numbers: RegexConst.NUMERIC_ANYWHERE,
    specials: RegexConst.SPECIALS_ANYWHERE,
  };
  function isInvalid(text: string, rule: keyof typeof PASSWORD_REGEXES) {
    const matchers = text.match(PASSWORD_REGEXES[rule]);
    return matchers === null || matchers.length === 0;
  }

  function buildConstraintViolation(message: string, valid: boolean) {
    return {
      key: DecoratorKeys.PASSWORD,
      message,
      valid,
    };
  }
  const lowercase = rules?.lowercase ?? true;
  const uppercase = rules?.uppercase ?? false;
  const numbers = rules?.numbers ?? false;
  const specials = rules?.specials ?? false;
  const length = rules?.length ?? 8;
  const str = input ?? "";
  if (str.length < length) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordLength", length),
      false
    );
  }

  if (uppercase && isInvalid(str, "uppercase")) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordUppercase"),
      false
    );
  }

  if (lowercase && isInvalid(str, "lowercase")) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordLowercase"),
      false
    );
  }

  if (numbers && isInvalid(str, "numbers")) {
    return buildConstraintViolation(definedMessage ?? translate(locale, "PasswordNumbers"), false);
  }

  if (specials && isInvalid(str, "specials")) {
    return buildConstraintViolation(definedMessage ?? translate(locale, "PasswordSpecials"), false);
  }

  return { key: DecoratorKeys.PASSWORD, message: "", valid: true };
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link DecoratorKeys.PASSWORD}
 * @typeParam T - The type of the string property.
 * @param rules - Customizable rules for specific password validations.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Password()
 *   password: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Password(undefined, { message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"] })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"], message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 5: Supplying custom validation logic while having the error message automatically translated
 * ```ts
 * class Form {
 *   \@Password({ uppercase: true, lowercase: true, })
 *   password: string;
 * }
 * ```
 */
export function Password<This, Value extends Objects.Optional<string>>(
  rules?: PasswordRules,
  options?: DecoratorOptions<This>
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (value, _context, locale) =>
      isPasswordValid(value, rules, buildMessageProp(options, locale), locale),
    buildDecoratorMeta(options)
  );
}
