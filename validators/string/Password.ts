import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

type PasswordProps = {
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  specials?: boolean;
  length?: number;
  message?: string;
};

export type PasswordRequiredProps = {
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

type PasswordRegexesType = {
  uppercase: RegExp;
  lowercase: RegExp;
  numbers: RegExp;
  specials: RegExp;
};

const PASSWORD_REGEXES: PasswordRegexesType = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  numbers: /\d/,
  specials: /[^a-zA-Z0-9]/,
};

function isPasswordChunkInvalid(
  str: string,
  passwordRegexName: keyof PasswordRegexesType
): boolean {
  const matchers = str.match(PASSWORD_REGEXES[passwordRegexName]);
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

  function buildConstraintViolation(message: string) {
    return {
      key: "Password",
      message: !!definedMessage ? definedMessage : message,
      valid: false,
    };
  }

  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (string) => {
      const str = string ?? "";
      if (str.length < length) {
        return buildConstraintViolation(ErrorMessage.PasswordLength(length));
      }
      if (uppercase && isPasswordChunkInvalid(str, "uppercase"))
        return buildConstraintViolation(ErrorMessage.PasswordUppercase());
      if (lowercase && isPasswordChunkInvalid(str, "lowercase"))
        return buildConstraintViolation(ErrorMessage.PasswordLowercase());
      if (numbers && isPasswordChunkInvalid(str, "numbers"))
        return buildConstraintViolation(ErrorMessage.PasswordNumbers());
      if (specials && isPasswordChunkInvalid(str, "specials"))
        return buildConstraintViolation(ErrorMessage.PasswordSpecials());

      return {
        key: "Password",
        valid: true,
        message: "",
      };
    },
  });
}
