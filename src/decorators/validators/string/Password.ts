import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import { extractGroupsFromValidatorProps } from "../../../model/utility/object.utility";

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

export default function Password(
  cfg: BasicValidatorProviderType<string, PasswordProps> = {
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

  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (string) => {
      const str = string ?? "";
      if (str.length < length) {
        return buildConstraintViolation(
          ErrorMessage.PasswordLengthViolation(length)
        );
      }
      if (uppercase && isPasswordChunkInvalid(str, "uppercase"))
        return buildConstraintViolation(
          ErrorMessage.PasswordUppercaseViolation()
        );
      if (lowercase && isPasswordChunkInvalid(str, "lowercase"))
        return buildConstraintViolation(
          ErrorMessage.PasswordLowercaseViolation()
        );
      if (numbers && isPasswordChunkInvalid(str, "numbers"))
        return buildConstraintViolation(
          ErrorMessage.PasswordNumbersViolation()
        );
      if (specials && isPasswordChunkInvalid(str, "specials"))
        return buildConstraintViolation(
          ErrorMessage.PasswordSpecialsViolation()
        );

      return {
        key: "Password",
        valid: true,
        message: "",
      };
    },
  });
}
