import ValidatorService, { Nullable } from "../../../service/ValidatorService";

import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

export type ValueRangeProps = {
  min: number;
  max: number;
};

export default function ValueRange<T extends Nullable<number>>(
  props: BasicValidatorProviderType<ValueRangeProps, ValueRangeProps>
) {
  const { min, max } = props;
  return ValidatorService.validatorDecoratorFactory<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueRange",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueRange(min, max, value)
      ),
      valid: value == null ? true : value >= min && value <= max,
    }),
  });
}
