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
    throw new Error(ErrorMessage.InvalidDigitsParams(maxInteger, maxFraction));
  }

  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "";

  return integerPart.length <= maxInteger && fractionPart.length <= maxFraction;
}

export default function Digits<T extends Nullable<number>>(
  props: BasicValidatorProviderType<DigitsType, DigitsType>
) {
  const { maxInteger = Infinity, maxFraction = Infinity } = props;
  return ValidatorFactory.make<T>({
    groups: extractGroupsFromValidatorProps(props),
    isValid: (value) => ({
      key: "Digits",
      message: extractMessageFromValidatorProps(
        props,
        ErrorMessage.Digits(maxInteger, maxFraction)
      ),
      valid: validateDigits(value!, maxInteger, maxFraction),
    }),
  });
}
