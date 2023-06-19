import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

type ValueMinType = {
  value: number;
};

export default function ValueMin(
  props: BasicValidatorProviderType<number, ValueMinType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMin",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMin(min, value)
      ),
      valid: value >= min,
    }),
  });
}
