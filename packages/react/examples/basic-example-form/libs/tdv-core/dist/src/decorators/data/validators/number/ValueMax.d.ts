import { Objects } from "../../../../utilities";
import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@ValueMax` key. */
export declare const VALUE_MAX = "ValueMax";
/**
 * Checks if decorated number is not greater than given `max` parameter.
 *
 * @key {@link DecoratorKeys.VALUE_MAX}
 * @typeParam T - The type of the number property.
 * @param max - Maximum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMax(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMax(5, { message: "Maximum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMax(5, {
 *     message: "Maximum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export declare function ValueMax<T extends Objects.Optional<number>>(
  max: number,
  options?: DecoratorOptions
): FieldDecorator<T>;
//# sourceMappingURL=ValueMax.d.ts.map
