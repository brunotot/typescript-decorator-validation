import { translate } from "../../../../localization";
import { createFieldValidator } from "../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../helper";
/** Internal validation function for {@link Digits} validator. */
function isDigitsValid(number, ints, decs) {
  const assertValidInputs = () => {
    const isMaxIntegersValid = ints !== Infinity && ints % 1 === 0 && ints >= 0;
    const isMaxDecimalsValid = decs !== Infinity && decs % 1 === 0 && decs >= 0;
    const isInputInvalid = !isMaxIntegersValid || !isMaxDecimalsValid;
    if (isInputInvalid) throw new Error(translate(null, "InvalidDigits", ints, decs));
  };
  assertValidInputs();
  if (number == null) return true;
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const fractionPart = parts[1] || "";
  return integerPart.length <= ints && fractionPart.length <= decs;
}
/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DecoratorKeys.DIGITS}
 * @typeParam T - The type of the number property.
 * @param intsLimit - The maximum number of allowed integer digits.
 * @param decimalsLimit - The maximum number of allowed decimal digits.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Product {
 *   \@Digits(9, 2)
 *   price: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { message: "Price may have up to 9 integer digits and a precision of up to 2 decimals" })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { groups: ["UPDATE"] })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, {
 *     message: "Price may have up to 9 integer digits and a precision of up to 2 decimals",
 *     groups: ["UPDATE"]
 *   })
 *   price: number;
 * }
 * ```
 */
export function Digits(intsLimit, decimalsLimit, options) {
  return createFieldValidator(
    (value, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.DIGITS),
      valid: isDigitsValid(value, intsLimit, decimalsLimit),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.DIGITS, intsLimit, decimalsLimit)),
    }),
    buildGroupsProp(options)
  );
}
