import API from "../../../../../index";
import { type FieldDecorator } from "../../../index";
/** Required identifier. */
export declare const REQUIRED = "Required";
/**
 * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
 *
 * @typeParam T - The type of the value.
 */
export declare function isRequiredValid<T>(
  value: T | undefined
): value is NonNullable<typeof value>;
/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @key {@link REQUIRED Required}
 * @typeParam T - The type of the decorated property (any class field).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   \@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   \@Required({
 *     message: "Product name is mandatory",
 *     groups: ["CREATE"]
 *   })
 *   name: string;
 * }
 * ```
 */
export declare function Required<T extends API.Utilities.Objects.Optional>(
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=Required.d.ts.map
