import API from "../../../../../index";
import { type FieldDecorator } from "../../../../decorators";
/** Integer identifier. */
export declare const INTEGER = "Integer";
/**
 * Checks if decorated number is an integer number.
 *
 * @key {@link INTEGER Integer}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Integer()
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Integer({ message: "Age number input must be an integer" })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Integer({ groups: ["UPDATE"] })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Integer({
 *     message: "Age number input must be an integer",
 *     groups: ["UPDATE"]
 *   })
 *   age: number;
 * }
 * ```
 */
export declare function Integer<T extends API.Utilities.Objects.Optional<number>>(
  options?: API.Decorators.Options
): FieldDecorator<T>;
//# sourceMappingURL=Integer.d.ts.map