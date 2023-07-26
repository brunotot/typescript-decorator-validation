import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";
import RegexConst from "../../src/model/constants/regex.constants";

type PasswordProps = $.Optional<PasswordRequiredProps>;

type PasswordRequiredProps = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specials: boolean;
  length: number;
};

const DEFAULT_PROPS: PasswordRequiredProps = {
  uppercase: false,
  lowercase: true,
  numbers: false,
  specials: false,
  length: 8,
};

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

export default function Password<T extends $.Nullable<string>>(
  cfg: DecoratorPartialProps<string, PasswordProps> = {
    ...DEFAULT_PROPS,
    message: undefined,
  }
) {
  const props =
    typeof cfg === "string" ? { ...DEFAULT_PROPS, message: cfg } : cfg;
  const uppercase = props.uppercase ?? DEFAULT_PROPS.uppercase;
  const lowercase = props.lowercase ?? DEFAULT_PROPS.lowercase;
  const numbers = props.numbers ?? DEFAULT_PROPS.numbers;
  const specials = props.specials ?? DEFAULT_PROPS.specials;
  const length = props.length ?? DEFAULT_PROPS.length;
  const definedMessage: string | undefined = props.message;

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
