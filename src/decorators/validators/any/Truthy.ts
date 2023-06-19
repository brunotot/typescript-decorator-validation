import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

const DEFAULTS: BasicValidatorProviderType = {
  groups: [],
  message: ErrorMessage.Truthy(),
};

export default function Truthy(props: BasicValidatorProviderType = DEFAULTS) {
  return ValidatorService.buildFieldValidatorDecorator<any>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
