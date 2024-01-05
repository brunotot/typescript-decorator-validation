import API from "../../../../../../../index";
import { type FieldDecorator } from "../../../../../../decorators";
/** Lowercase identifier. */
export declare const LOWERCASE = "Lowercase";
/** Internal validation function for {@link Lowercase} validator. */
export declare function isLowercaseValid<T extends API.Utilities.Objects.Optional<string>>(
  value: T
): boolean;
/**
 * Checks if decorated string contains only lowercase characters.
 *
 * @key {@link LOWERCASE Lowercase}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Lowercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Lowercase({ message: "Input must contain only lowercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Lowercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Lowercase({
 *     message: "Input must contain only lowercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export declare function Lowercase<T extends API.Utilities.Objects.Optional<string>>(
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=Lowercase.d.ts.map
