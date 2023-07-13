import ValidatorService, { Nullable } from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
  hasValue,
} from "../../../model/utility/object.utility";

export default function Required<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Required",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Required()),
      valid: hasValue(value),
    }),
  });
}
