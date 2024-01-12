import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
import { Objects } from "../../../../utilities";
/** `@NonNegative` key. */
export declare const NON_NEGATIVE = "NonNegative";
/**
 * Checks if decorated number is not a negative number (can be 0).
 *
 * @key {@link NON_NEGATIVE NonNegative}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonNegative()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonNegative({ message: "Number value must not be a negative number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonNegative({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonNegative({
 *     message: "Number value must not be a negative number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export declare function NonNegative<T extends Objects.Optional<number>>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=NonNegative.d.ts.map