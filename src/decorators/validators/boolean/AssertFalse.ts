import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/const/ErrorMessage";
import InferredType from "../../../model/enum/InferredType";

export default function AssertFalse(
  message: string = ErrorMessage.AssertFalse()
) {
  return ValidatorService.buildFieldValidatorDecorator<boolean>({
    expectedType: InferredType.BOOLEAN,
    isValid: (value) => ({
      key: "AssertFalse",
      message,
      valid: !value,
    }),
  });
}
