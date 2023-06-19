import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
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

export default function ValueRange(
  props: BasicValidatorProviderType<ValueRangeProps, ValueRangeProps>
) {
  const { min, max } = props;
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueRange",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueRange(min, max, value)
      ),
      valid: value >= min && value <= max,
    }),
  });
}
