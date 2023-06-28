import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { extractMessageFromValidatorProps } from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function NonPositive<T extends NullableType<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    isValid: (num) => ({
      key: "NonPositive",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.NonPositive(num)
      ),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
