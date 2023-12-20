import API from "../../index";
/** ValueMin identifier. */
export declare const VALUE_MIN = "ValueMin";
/**
 * Checks if decorated number is not lesser than given `min` parameter.
 *
 * @key {@link VALUE_MIN ValueMin}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMin(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMin(5, { message: "Minimum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, {
 *     message: "Minimum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export declare function ValueMin<T extends API.Utilities.Objects.Optional<number>>(min: number, options?: API.Decorator.Config.Options): API.Decorator.ForField.Basic.Instance<T>;
//# sourceMappingURL=ValueMin.d.ts.map