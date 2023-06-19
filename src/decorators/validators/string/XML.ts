import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

function isValidXML(value: string): boolean {
  let valid = true;
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(value, "text/xml");
    valid = xmlDoc.getElementsByTagName("parsererror").length === 0;
  } catch (ignored) {
    valid = false;
  }
  return valid;
}

export default function XML(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "XML",
      message: extractMessageFromValidatorProps(props, ErrorMessage.XML()),
      valid: isValidXML(value),
    }),
  });
}
