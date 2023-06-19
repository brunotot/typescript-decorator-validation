import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

const DEFAULTS: BasicValidatorProviderType = {
  groups: [],
  message: ErrorMessage.Falsy(),
};

export default function Falsy(props: BasicValidatorProviderType = DEFAULTS) {
  return ValidatorService.buildFieldValidatorDecorator<any>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
