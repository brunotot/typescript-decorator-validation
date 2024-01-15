import { Objects } from "../../../../utilities";
import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@Digits` key. */
export declare const DIGITS = "Digits";
/**
 * Checks if decorated number is a decimal number.
 *
 * @key {@link DecoratorKeys.DIGITS}
 * @typeParam T - The type of the number property.
 * @param intsLimit - The maximum number of allowed integer digits.
 * @param decimalsLimit - The maximum number of allowed decimal digits.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Product {
 *   \@Digits(9, 2)
 *   price: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { message: "Price may have up to 9 integer digits and a precision of up to 2 decimals" })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, { groups: ["UPDATE"] })
 *   price: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Product {
 *   \@Digits(9, 2, {
 *     message: "Price may have up to 9 integer digits and a precision of up to 2 decimals",
 *     groups: ["UPDATE"]
 *   })
 *   price: number;
 * }
 * ```
 */
export declare function Digits<T extends Objects.Optional<number>>(
  intsLimit: number,
  decimalsLimit: number,
  options?: DecoratorOptions
): FieldDecorator<T>;
//# sourceMappingURL=Digits.d.ts.map
