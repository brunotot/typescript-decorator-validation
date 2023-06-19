import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

function isValidJSON(value: string): boolean {
  let valid = true;
  try {
    window.JSON.parse(value);
  } catch (ignored) {
    valid = false;
  }
  return valid;
}

export default function JSON(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "JSON",
      message: extractMessageFromValidatorProps(props, ErrorMessage.JSON()),
      valid: isValidJSON(value),
    }),
  });
}
