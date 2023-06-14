import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";
import { ValidationResult } from "../../../model/type/validation-result.type";

function isValidXML(value: string, message: string): ValidationResult {
  let valid = true;
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(value, "text/xml");
    valid = xmlDoc.getElementsByTagName("parsererror").length === 0;
  } catch (ignored) {
    valid = false;
  }
  return {
    key: "XML",
    message,
    valid,
  };
}

export default function XML(message?: string) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    isValid: (value) => isValidXML(value, message ?? ErrorMessage.XML()),
  });
}
