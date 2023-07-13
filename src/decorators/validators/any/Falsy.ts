import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ValidatorService, { Nullable } from "../../../service/ValidatorService";

export default function Falsy<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Falsy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Falsy()),
      valid: !value,
    }),
  });
}
