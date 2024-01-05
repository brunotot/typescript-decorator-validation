import * as API from "../../../../../../../index";
import { createFieldValidator, type FieldDecorator } from "../../../../../../decorators";
import { translate } from "../../../../../../localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/** `@IPAddress` key. */
export const IP_ADDRESS = "IPAddress";

/** Internal validation function for {@link IPAddress} validator. */
function isIPAddressValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean {
  API.Utilities.Objects.assertType("string", value);
  return testRegex(RegexConst.IP_ADDRESS, value);
}

/**
 * Checks if decorated string is a valid IP address.
 *
 * @key {@link IP_ADDRESS IPAddress}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@IPAddress()
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@IPAddress({ message: "Input is not a valid IP address" })
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@IPAddress({ groups: ["UPDATE"] })
 *   ipAddress: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@IPAddress({
 *     message: "Input is not a valid IP address",
 *     groups: ["UPDATE"]
 *   })
 *   ipAddress: string;
 * }
 * ```
 */
export function IPAddress<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorators.DecoratorOptions
): FieldDecorator<T> {
  return createFieldValidator<T>(
    (value, _context, locale) => ({
      key: API.Decorators.buildKeyProp(options, IP_ADDRESS),
      valid: testRegex(RegexConst.IP_ADDRESS, value),
      message: API.Decorators.buildMessageProp(options, locale, translate(locale, IP_ADDRESS)),
    }),
    API.Decorators.buildGroupsProp(options)
  );
}
