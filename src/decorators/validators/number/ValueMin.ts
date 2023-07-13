import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

type ValueMinType = {
  value: number;
};

export default function ValueMin<T extends Nullable<number>>(
  props: BasicValidatorProviderType<number, ValueMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMin(min, value)
      ),
      valid: value == null ? true : value >= min,
    }),
  });
}
