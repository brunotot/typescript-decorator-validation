import API from "../../../../index";
/** Numeric identifier. */
export declare const NUMERIC = "Numeric";
/** Internal validation function for {@link Numeric} validator. */
export declare function isNumericValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean;
/**
 * Checks if decorated string contains only numeric characters.
 *
 * @key {@link NUMERIC Numeric}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Numeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Numeric({ message: "Input must contain only numeric characters (no alphabeticals or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Numeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Numeric({
 *     message: "Input must contain only numeric characters (no alphabeticals or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export declare function Numeric<T extends API.Utilities.Objects.Optional<string>>(options?: API.Decorator.Config.Options): API.Decorator.ForField.Basic.Instance<T>;
//# sourceMappingURL=Numeric.d.ts.map