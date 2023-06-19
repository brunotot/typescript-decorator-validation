import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function Negative(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (num) => ({
      key: "Negative",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Negative(num)
      ),
      valid: num !== undefined && num !== null && num < 0,
    }),
  });
}
