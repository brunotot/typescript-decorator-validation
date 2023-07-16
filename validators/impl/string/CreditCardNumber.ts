import ValidatorFactory from "../../common/ValidatorFactory";

import ErrorMessage from "../../../src/messages/impl/ErrorMessage";
import {
  BasicValidatorProviderType,
  Nullable,
} from "../../../src/model/utility/type.utility";
import {
  extractGroupsFromValidatorProps,
  extractMessageFromValidatorProps,
} from "../../../src/model/utility/object.utility";

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

export default function CreditCardNumber<T extends Nullable<string>>(
  props?: BasicValidatorProviderType
) {
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "CreditCardNumber",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.CreditCardNumber()
      ),
      valid: value == null ? true : isValidCreditCardNumber(value),
    }),
  });
}
