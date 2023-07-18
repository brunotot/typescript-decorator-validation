import { makeValidator } from "../../src/decorators/facade/validator.facade";
import { $ } from "../../src/types/namespace/Utility.ns";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";

const DEFAULT_KEY = "Pattern";

export type PatternType = {
  regex: RegExp;
  key?: string;
};

export default function Pattern<T extends $.Nullable<string>>(
  props: DecoratorPartialProps<RegExp, PatternType>
) {
  const isPropsRegex = props instanceof RegExp;
  const key = isPropsRegex
    ? DEFAULT_KEY
    : !!(props as any).key
    ? (props as any).key
    : DEFAULT_KEY;
  const regexSanitized = isPropsRegex ? props : (props as any).regex;
  const regexString = regexSanitized.toString();
  const errorMessage =
    isPropsRegex || !(props as any).message
      ? ErrorMessage.Pattern(regexString)
      : (props as any).message!;
  return makeValidator<T>({
    isValid: (value) => ({
      key,
      message: errorMessage,
      valid: (value ?? "").length === 0 || regexSanitized.test(value ?? ""),
    }),
  });
}
