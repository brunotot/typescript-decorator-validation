import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type MinLengthType = {
  value: number;
};

export default function MinLength<T>(
  props: BasicValidatorProviderType<number, MinLengthType>
) {
  const min = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "MinLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.MinLength(min)
      ),
      valid: (value ?? "").length >= min,
    }),
  });
}
