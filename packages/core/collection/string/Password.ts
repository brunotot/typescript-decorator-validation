import API from "api";

import RegexConst from "./regex/shared/regex.constants";

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

/**
 * Creates a validator decorator for password validation.
 *
 * @typeparam T - The type of the decorated property (optional string).
 * @param cfg - (Optional) An object with properties for customizing password validation.
 * @param cfg.uppercase - (Optional) Indicates whether uppercase letters are required. Defaults to `false`.
 * @param cfg.lowercase - (Optional) Indicates whether lowercase letters are required. Defaults to `true`.
 * @param cfg.numbers - (Optional) Indicates whether numbers are required. Defaults to `false`.
 * @param cfg.specials - (Optional) Indicates whether special characters are required. Defaults to `false`.
 * @param cfg.length - (Optional) The minimum length of the password. Defaults to `8`.
 * @param cfg.message - (Optional) A custom error message to display when validation fails. If not provided, default error messages are used.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 1: Basic usage with default options
 * class User {
 *   //@Password()
 *   password: string;
 * }
 *
 * @example
 * // Example 2: Customizing password requirements
 * class SecureUser {
 *   //@Password({
 *   //   uppercase: true,
 *   //   numbers: true,
 *   //   specials: true,
 *   //   length: 12,
 *   // })
 *   password: string;
 * }
 */
export function Password<T extends API.Utilities.Objects.Optional<string>>(
  rules?: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    specials?: boolean;
    length?: number;
  },
  config?: API.Decorator.Props.Base
) {
  const lowercase = rules?.lowercase ?? true;
  const uppercase = rules?.uppercase ?? false;
  const numbers = rules?.numbers ?? false;
  const specials = rules?.specials ?? false;
  const length = rules?.length ?? 8;

  function buildConstraintViolation(message: string, valid: boolean) {
    return {
      key: "Password",
      message,
      valid,
    };
  }

  function isValid(
    str: string,
    locale: API.Localization.Resolver.LocaleResolver.Locale
  ) {
    if (str.length < length)
      return buildConstraintViolation(
        API.Localization.Service.TranslationService.translate(
          locale,
          "PasswordLength",
          length
        ),
        false
      );

    if (uppercase && isInvalid(str, "uppercase"))
      return buildConstraintViolation(
        API.Localization.Service.TranslationService.translate(
          locale,
          "PasswordUppercase"
        ),
        false
      );

    if (lowercase && isInvalid(str, "lowercase"))
      return buildConstraintViolation(
        API.Localization.Service.TranslationService.translate(
          locale,
          "PasswordLowercase"
        ),
        false
      );

    if (numbers && isInvalid(str, "numbers"))
      return buildConstraintViolation(
        API.Localization.Service.TranslationService.translate(
          locale,
          "PasswordNumbers"
        ),
        false
      );

    if (specials && isInvalid(str, "specials"))
      return buildConstraintViolation(
        API.Localization.Service.TranslationService.translate(
          locale,
          "PasswordSpecials"
        ),
        false
      );

    return buildConstraintViolation("", true);
  }

  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (str, _, locale) => isValid(str ?? "", locale),
    config
  );
}
