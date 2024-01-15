import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@ArrayUnique` key. */
export declare const ARRAY_UNIQUE = "ArrayUnique";
/**
 * Checks if all elements in decorated array are unique.
 *
 * @key {@link DecoratorKeys.ARRAY_UNIQUE}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayUnique()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayUnique({ message: "Languages data must be distinct" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({
 *     message: "Languages data must be distinct",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export declare function ArrayUnique<K, T extends K[]>(options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=ArrayUnique.d.ts.map
