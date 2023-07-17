import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";

import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";

const DEFAULT_KEY = "Pattern";

export type PatternType = {
  regex: RegExp;
  key?: string;
};

export default function Pattern<T extends Nullable<string>>(
  props: BasicValidatorProviderType<RegExp, PatternType>
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
