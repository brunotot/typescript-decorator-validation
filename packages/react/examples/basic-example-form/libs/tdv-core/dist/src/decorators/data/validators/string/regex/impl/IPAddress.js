import { testRegex } from "../../../../../data/validators/string/regex/Pattern";
import { RegexConst } from "../../../../../data/validators/string/regex/shared/regex.constants";
import { createFieldValidator } from "../../../../../factory/forField";
import { buildGroupsProp, buildKeyProp, buildMessageProp } from "../../../../../helper";
import { translate } from "../../../../../../localization";
import { Objects } from "../../../../../../utilities";
/** `@IPAddress` key. */
export const IP_ADDRESS = "IPAddress";
/** Internal validation function for {@link IPAddress} validator. */
function isIPAddressValid(value) {
    Objects.assertType("string", value);
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
export function IPAddress(options) {
    return createFieldValidator((value, _context, locale) => ({
        key: buildKeyProp(options, IP_ADDRESS),
        valid: isIPAddressValid(value),
        message: buildMessageProp(options, locale, translate(locale, IP_ADDRESS)),
    }), buildGroupsProp(options));
}
