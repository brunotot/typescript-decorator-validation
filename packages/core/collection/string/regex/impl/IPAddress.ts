import API from "api";

import { translate } from "../../../../src/localization/service/TranslationService";
import { testRegex } from "../Pattern";
import RegexConst from "../shared/regex.constants";

/** IPAddress identifier. */
export const IP_ADDRESS = "IPAddress";

/** Internal validation function for {@link IPAddress} validator. */
export function isIPAddressValid<
  T extends API.Utilities.Objects.Optional<string>
>(value: T): boolean {
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
  options?: API.Decorator.Options
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorValidatorService.build<T>(
    (value, _context, locale) => ({
      key: API.Decorator.key(options, IP_ADDRESS),
      valid: testRegex(RegexConst.IP_ADDRESS, value),
      message: API.Decorator.message(
        options,
        locale,
        translate(locale, IP_ADDRESS)
      ),
    }),
    API.Decorator.groups(options)
  );
}
