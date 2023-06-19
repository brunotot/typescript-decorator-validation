import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
  hasValue,
} from "../../../model/utility/object.utility";

export default function Required(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<any>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "NotEmpty",
      message: extractMessageFromValidatorProps(props, ErrorMessage.NotEmpty()),
      valid: hasValue(value),
    }),
  });
}
