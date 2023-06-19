import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/messages/ErrorMessage";
import { BasicValidatorProviderType } from "../../../model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../model/utility/object.utility";

function isValidCreditCardNumber(str: string): boolean {
  if (/[^0-9]/.test(str) || str.length < 16) {
    return false;
  }

  let sum = 0;
  let double = false;
  for (let i = str.length - 1; i >= 0; i--) {
    const digit = parseInt(str[i]);
    if (double) {
      sum += (digit * 2) % 9 || 9;
    } else {
      sum += digit;
    }
    double = !double;
  }
  return sum % 10 === 0;
}

export default function CreditCardNumber(props?: BasicValidatorProviderType) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "CreditCardNumber",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.CreditCardNumber()
      ),
      valid: isValidCreditCardNumber(value),
    }),
  });
}
