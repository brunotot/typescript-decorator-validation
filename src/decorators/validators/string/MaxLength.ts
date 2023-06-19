import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type MaxLengthType = {
  value: number;
};

export default function MaxLength<T>(
  props: BasicValidatorProviderType<number, MaxLengthType>
) {
  const max = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "MaxLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.MaxLength(max)
      ),
      valid: (value ?? "").length <= max,
    }),
  });
}
