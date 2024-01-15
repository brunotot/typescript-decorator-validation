import { Objects } from "../../../../../../utilities";
import { FieldDecorator } from "../../../../../factory/forField";
import { DecoratorOptions } from "../../../../../helper";
/** `@Alpha` key. */
export declare const ALPHA = "Alpha";
/**
 * Checks if decorated string contains only alphabetical characters.
 *
 * @key {@link DecoratorKeys.ALPHA}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alpha()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alpha({ message: "Input must contain only alphabetical characters (no numbers or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alpha({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alpha({
 *     message: "Input must contain only alphabetical characters (no numbers or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export declare function Alpha<T extends Objects.Optional<string>>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=Alpha.d.ts.map
