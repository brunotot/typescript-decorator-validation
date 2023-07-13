import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export default function Decimal<T extends Nullable<number>>(
  props?: BasicValidatorProviderType<number>
) {
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Decimal",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Decimal(value)
      ),
      valid: value !== undefined && value !== null && !Number.isInteger(value),
    }),
  });
}
