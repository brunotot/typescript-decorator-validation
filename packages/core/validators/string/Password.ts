import makeValidator from "../../src/decorators/decorator.facade";
import { extractGroups } from "../../src/decorators/decorator.utils";
import ErrorMessage from "../../src/messages/models/errors";
import RegexConst from "../../src/models/regex.constants";
import $ from "../../src/types";
import Decorator from "../../src/types/namespace/decorator.namespace";

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

export default function Password<T extends $.Objects.Optional<string>>(
  cfg?: Decorator.PartialProps<
    string,
    Partial<{
      uppercase: boolean;
      lowercase: boolean;
      numbers: boolean;
      specials: boolean;
      length: number;
    }>
  >
) {
  const props =
    typeof cfg === "string"
      ? {
          uppercase: false,
          lowercase: true,
          numbers: false,
          specials: false,
          length: 8,
          message: cfg,
        }
      : cfg;
  const uppercase = props?.uppercase ?? false;
  const lowercase = props?.lowercase ?? true;
  const numbers = props?.numbers ?? false;
  const specials = props?.specials ?? false;
  const length = props?.length ?? 8;
  const definedMessage: string | undefined = props?.message;

  function buildConstraintViolation(message: string, valid: boolean = false) {
    return {
      key: "Password",
      message: !!definedMessage ? definedMessage : message,
      valid,
    };
  }

  function isValid(str: string) {
    if (str.length < length)
      return buildConstraintViolation(ErrorMessage.PasswordLength(length));

    if (uppercase && isInvalid(str, "uppercase"))
      return buildConstraintViolation(ErrorMessage.PasswordUppercase());

    if (lowercase && isInvalid(str, "lowercase"))
      return buildConstraintViolation(ErrorMessage.PasswordLowercase());

    if (numbers && isInvalid(str, "numbers"))
      return buildConstraintViolation(ErrorMessage.PasswordNumbers());

    if (specials && isInvalid(str, "specials"))
      return buildConstraintViolation(ErrorMessage.PasswordSpecials());

    return buildConstraintViolation("", true);
  }

  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (str) => isValid(str ?? ""),
  });
}
