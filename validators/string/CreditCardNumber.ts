import { makeValidator } from "../../src/decorators/facade/validator.facade";
import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { $ } from "../../src/types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "../../src/utils/object.utils";

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

export default function CreditCardNumber<T extends $.Nullable<string>>(
  props?: DecoratorPartialProps
) {
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "CreditCardNumber",
      message: extractMessage(props, ErrorMessage.CreditCardNumber()),
      valid: value == null ? true : isValidCreditCardNumber(value),
    }),
  });
}
