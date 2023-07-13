import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

type ValueMaxType = {
  value: number;
};

export default function ValueMax<T extends Nullable<number>>(
  props: BasicValidatorProviderType<number, ValueMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMax",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMax(max, value)
      ),
      valid: value == null ? true : value <= max,
    }),
  });
}
