import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function Positive<T extends Nullable<number>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "Positive",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Positive(num)
      ),
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
