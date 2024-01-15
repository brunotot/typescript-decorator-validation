import { Objects } from "../../../../../../utilities";
import { FieldDecorator } from "../../../../../factory/forField";
import { DecoratorOptions } from "../../../../../helper";
/** `@Alphanumeric` key. */
export declare const ALPHANUMERIC = "Alphanumeric";
/**
 * Checks if decorated string contains only alphabetical or number characters.
 *
 * @key {@link DecoratorKeys.ALPHANUMERIC}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alphanumeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alphanumeric({ message: "Input must contain only alphabetical or number characters (no specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({
 *     message: "Input must contain only alphabetical or number characters (no specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export declare function Alphanumeric<T extends Objects.Optional<string>>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=Alphanumeric.d.ts.map
