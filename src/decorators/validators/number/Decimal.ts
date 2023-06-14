import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";

export default function Decimal(message: string = ErrorMessage.Integer()) {
  return ValidatorService.buildFieldValidatorDecorator<number>({
    expectedType: InferredType.NUMBER,
    isValid: (num) => ({
      key: "Decimal",
      message,
      valid: num !== undefined && num !== null && !Number.isInteger(num),
    }),
  });
}
