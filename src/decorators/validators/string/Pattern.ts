import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";

import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

const DEFAULT_KEY = "Pattern";

export type PatternType = {
  regex: RegExp;
  key?: string;
};

export default function Pattern<T extends NullableType<string>>(
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
  return ValidatorService.buildFieldValidatorDecorator<T>({
    isValid: (value) => ({
      key,
      message: errorMessage,
      valid: (value ?? "").length === 0 || regexSanitized.test(value ?? ""),
    }),
  });
}
