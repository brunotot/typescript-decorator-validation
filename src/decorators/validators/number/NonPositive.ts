import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { extractMessageFromValidatorProps } from "../../../model/utility/object.utility";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";

export default function NonPositive(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    isValid: (num) => ({
      key: "NonPositive",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.NonPositive(num)
      ),
      valid: num !== undefined && num !== null && num <= 0,
    }),
  });
}
