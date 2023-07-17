import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../src/model/utility/object.utility";

export type ValueRangeProps = {
  min: number;
  max: number;
};

export default function ValueRange<T extends Nullable<number>>(
  props: BasicValidatorProviderType<ValueRangeProps, ValueRangeProps>
) {
  const { min, max } = props;
  return makeValidator<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueRange",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueRange(min, max, value!)
      ),
      valid: value == null ? true : value >= min && value <= max,
    }),
  });
}
