import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";
import { ValidationResult } from "../../../model/type/validation-result.type";

function isValidJSON(value: string, message: string): ValidationResult {
  let valid = true;
  try {
    window.JSON.parse(value);
  } catch (ignored) {
    valid = false;
  }
  return {
    key: "XML",
    message,
    valid,
  };
}

export default function JSON(message?: string) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    isValid: (value) => isValidJSON(value, message ?? ErrorMessage.JSON()),
  });
}
