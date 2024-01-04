import API from "../../../../../../../index";
import { FieldDecorator } from "../../../../../../decorators";
/** Alphanumeric identifier. */
export declare const ALPHANUMERIC = "Alphanumeric";
/** Internal validation function for {@link Alphanumeric} validator. */
export declare function isAlphanumericValid<T extends API.Utilities.Objects.Optional<string>>(value: T): boolean;
/**
 * Checks if decorated string contains only alphabetical or number characters.
 *
 * @key {@link ALPHANUMERIC Alphanumeric}
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
export declare function Alphanumeric<T extends API.Utilities.Objects.Optional<string>>(options?: API.Decorator.Config.Options): FieldDecorator<T>;
//# sourceMappingURL=Alphanumeric.d.ts.map