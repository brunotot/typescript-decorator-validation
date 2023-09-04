import { makeValidator } from "../../src/decorators/facade/validator.facade";

import ErrorMessage from "../../src/messages/impl/ErrorMessage";
import { DecoratorPartialProps } from "../../src/decorators/types/DecoratorProps.type";
import { extractGroups, extractMessage } from "../../src/utils/decorator.utils";
import { $ } from "../../src/types/namespace/Utility.ns";

export type DigitsType = {
  maxInteger?: number;
  maxFraction?: number;
};

function validateDigits(
  number: number,
  maxInteger: number,
  maxFraction: number
): boolean {
  if (number == null) {
    return true;
  }
  if (
    (maxInteger !== Infinity && maxInteger % 1 !== 0) ||
    (maxFraction !== Infinity && maxFraction % 1 !== 0)
  ) {
    throw new Error(ErrorMessage.InvalidDigits(maxInteger, maxFraction));
  }

  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "";

  return integerPart.length <= maxInteger && fractionPart.length <= maxFraction;
}

export default function Digits<T extends $.Nullable<number>>(
  props: DecoratorPartialProps<DigitsType, DigitsType>
) {
  const { maxInteger = Infinity, maxFraction = Infinity } = props;
  return makeValidator<T>({
    groups: extractGroups(props),
    isValid: (value) => ({
      key: "Digits",
      message: extractMessage(
        props,
        ErrorMessage.Digits(maxInteger, maxFraction)
      ),
      valid: validateDigits(value!, maxInteger, maxFraction),
    }),
  });
}