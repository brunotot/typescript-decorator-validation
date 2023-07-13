import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ValidatorService, { Nullable } from "../../../service/ValidatorService";

export default function Truthy<T extends Nullable>(
  props?: BasicValidatorProviderType
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Truthy",
      message: extractMessageFromValidatorProps(props, ErrorMessage.Truthy()),
      valid: !!value,
    }),
  });
}
