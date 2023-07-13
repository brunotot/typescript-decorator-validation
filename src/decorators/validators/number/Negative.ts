import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function Negative<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
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
