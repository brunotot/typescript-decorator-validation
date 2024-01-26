import { type FieldDecorator } from "../../../factory/forField";
import { type DecoratorOptions } from "../../../helper";
import { Objects } from "../../../../utilities";
/**
 * Checks if decorated number is not a positive number (can be 0).
 *
 * @key {@link DecoratorKeys.NON_POSITIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonPositive()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonPositive({ message: "Number value must not be a positive number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonPositive({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonPositive({
 *     message: "Number value must not be a positive number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export declare function NonPositive<This, Value extends Objects.Optional<number>>(options?: DecoratorOptions<This>): FieldDecorator<This, Value>;
//# sourceMappingURL=NonPositive.d.ts.map