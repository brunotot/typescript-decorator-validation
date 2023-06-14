import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";

export default function Positive(message: string = ErrorMessage.Positive()) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    isValid: (num) => ({
      key: "Positive",
      message,
      valid: num !== undefined && num !== null && num > 0,
    }),
  });
}
