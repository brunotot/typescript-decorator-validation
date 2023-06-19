import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

type ExactLengthType = {
  value: number;
};

export default function ExactLength<T>(
  props: BasicValidatorProviderType<number, ExactLengthType>
) {
  const exact = typeof props === "number" ? props : props.value;
  return ValidatorService.buildFieldValidatorDecorator<T[]>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "ExactLength",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.ExactLength(exact)
      ),
      valid: (value ?? "").length === exact,
    }),
  });
}
