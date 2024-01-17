import { type FieldDecorator } from "../../../../../factory/forField";
import { type DecoratorOptions } from "../../../../../helper";
import { Objects } from "../../../../../../utilities";
/**
 * Checks if decorated string contains only uppercase characters.
 *
 * @key {@link DecoratorKeys.UPPERCASE}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Uppercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Uppercase({ message: "Input must contain only uppercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Uppercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Uppercase({
 *     message: "Input must contain only uppercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export declare function Uppercase<T extends Objects.Optional<string>>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=Uppercase.d.ts.map