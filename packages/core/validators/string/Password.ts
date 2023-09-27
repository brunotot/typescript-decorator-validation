import ParamsExtractorService from "../../src/decorators/service/params-extractor.service";
import ValidatorService from "../../src/decorators/service/validator.service";
import Localization from "../../src/localization";
import TranslationService from "../../src/localization/service/translation.service";
import RegexConst from "../../src/models/regex.constants";
import $ from "../../src/types";
import Validation from "../../src/types/namespace/validation.namespace";

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
export default function Password<T extends $.Objects.Optional<string>>(props?: {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specials: boolean;
  length: number;
  groups?: Validation.GroupsParam;
}) {
  const lowercase = props?.lowercase ?? true;
  const uppercase = props?.uppercase ?? false;
  const numbers = props?.numbers ?? false;
  const specials = props?.specials ?? false;
  const length = props?.length ?? 8;

  function buildConstraintViolation(message: string, valid: boolean) {
    return {
      key: "Password",
      message,
      valid,
    };
  }

  function isValid(str: string, locale: Localization.Locale) {
    if (str.length < length)
      return buildConstraintViolation(
        TranslationService.translate(locale, "PasswordLength", length),
        false
      );

    if (uppercase && isInvalid(str, "uppercase"))
      return buildConstraintViolation(
        TranslationService.translate(locale, "PasswordUppercase"),
        false
      );

    if (lowercase && isInvalid(str, "lowercase"))
      return buildConstraintViolation(
        TranslationService.translate(locale, "PasswordLowercase"),
        false
      );

    if (numbers && isInvalid(str, "numbers"))
      return buildConstraintViolation(
        TranslationService.translate(locale, "PasswordNumbers"),
        false
      );

    if (specials && isInvalid(str, "specials"))
      return buildConstraintViolation(
        TranslationService.translate(locale, "PasswordSpecials"),
        false
      );

    return buildConstraintViolation("", true);
  }

  return ValidatorService.create<T>({
    groups: ParamsExtractorService.groups(props),
    isValid: (str, _, locale) => isValid(str ?? "", locale),
  });
}
