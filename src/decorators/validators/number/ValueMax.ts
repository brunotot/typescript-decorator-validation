import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import ErrorMessage from "../../../model/messages/ErrorMessage";

type ValueMaxType = {
  value: number;
};

export default function ValueMax(
  props: BasicValidatorProviderType<number, ValueMaxType>
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ValueMax",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ValueMax(max, value)
      ),
      valid: value <= max,
    }),
  });
}
