import API from "../../../../../index";
import { type FieldDecorator } from "../../../../decorators";
/** ExactLength identifier. */
export declare const EXACT_LENGTH = "ExactLength";
/** Internal validation function for {@link ExactLength} validator. */
export declare function isExactLengthValid(
  value: API.Utilities.Objects.Optional<string>,
  exact: number
): boolean;
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link EXACT_LENGTH ExactLength}
 * @typeParam T - The type of the string property.
 * @param exact - Exact length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Address {
 *   \@ExactLength(2)
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Address {
 *   \@ExactLength(2, { message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"] })
 *   countryCode: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Address {
 *   \@ExactLength(2, { groups: ["UPDATE"], message: "Exactly 2 characters are allowed" })
 *   countryCode: string;
 * }
 * ```
 */
export declare function ExactLength<T extends API.Utilities.Objects.Optional<string>>(
  exact: number,
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=ExactLength.d.ts.map
