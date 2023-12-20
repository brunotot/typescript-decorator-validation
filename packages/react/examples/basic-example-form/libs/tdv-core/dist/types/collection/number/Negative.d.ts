import API from "../../index";
/** Negative identifier. */
export declare const NEGATIVE = "Negative";
/**
 * Checks if decorated number is a negative number (number less than 0).
 *
 * @key {@link NEGATIVE Negative}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Negative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Negative({ message: "Number value must be less than 0" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Negative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Negative({
 *     message: "Number value must be less than 0",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export declare function Negative<T extends API.Utilities.Objects.Optional<number>>(options?: API.Decorator.Config.Options): API.Decorator.ForField.Basic.Instance<T>;
//# sourceMappingURL=Negative.d.ts.map