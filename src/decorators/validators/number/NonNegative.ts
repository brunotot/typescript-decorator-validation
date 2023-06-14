import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";

export default function NonNegative(
  message: string = ErrorMessage.NonNegative()
) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    isValid: (num) => ({
      key: "NonNegative",
      message,
      valid: num !== undefined && num !== null && num >= 0,
    }),
  });
}
