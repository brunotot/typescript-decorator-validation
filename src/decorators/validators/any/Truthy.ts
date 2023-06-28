import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

export default function Truthy<T extends NullableType>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
