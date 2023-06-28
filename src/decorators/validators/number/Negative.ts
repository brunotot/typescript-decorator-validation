import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function Negative<T extends NullableType<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "Negative",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Negative(num)
      ),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
