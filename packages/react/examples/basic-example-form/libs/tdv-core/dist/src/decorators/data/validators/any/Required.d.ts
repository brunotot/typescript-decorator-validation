import { Objects } from "../../../../utilities";
import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@Required` key. */
export declare const REQUIRED = "Required";
/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * @key {@link DecoratorKeys.REQUIRED}
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
export declare function Required<T extends Objects.Optional>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=Required.d.ts.map
