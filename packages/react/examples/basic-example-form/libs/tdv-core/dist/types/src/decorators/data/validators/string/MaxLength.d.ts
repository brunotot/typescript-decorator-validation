import API from "../../../../../index";
import { type FieldDecorator } from "../../../../decorators";
/** MaxLength identifier. */
export declare const MAX_LENGTH = "MaxLength";
/** Internal validation function for {@link MaxLength} validator. */
export declare function isMaxLengthValid(
  value: API.Utilities.Objects.Optional<string>,
  max: number
): boolean;
/**
 * Checks if decorated string contains a specific number of characters.
 *
 * @key {@link MAX_LENGTH MaxLength}
 * @typeParam T - The type of the string property.
 * @param max - Maximum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MaxLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MaxLength(5, { message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MaxLength(5, { groups: ["UPDATE"], message: "Input must contain at-most 5 characters" })
 *   input: string;
 * }
 * ```
 */
export declare function MaxLength<T extends API.Utilities.Objects.Optional<string>>(
  max: number,
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=MaxLength.d.ts.map
