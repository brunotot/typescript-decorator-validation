import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ValidatorService, {
  NullableType,
} from "../../../service/ValidatorService";

export default function Falsy<T extends NullableType>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.buildFieldValidatorDecorator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
