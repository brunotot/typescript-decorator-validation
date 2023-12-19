import API from "../../index";
/** ArrayEmpty identifier. */
export declare const ARRAY_EMPTY = "ArrayEmpty";
/** Internal validation function for {@link ArrayEmpty} validator. */
export declare function isArrayEmptyValid(array: any[]): boolean;
/**
 * Checks if the decorated array is empty.
 *
 * @key {@link ARRAY_EMPTY ArrayEmpty}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayEmpty()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayEmpty({ message: "Languages data must be empty" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayEmpty({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayEmpty({
 *     message: "Languages data must be empty",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export declare function ArrayEmpty<K, T extends Array<K>>(options?: API.Decorator.Options): API.Decorator.Service.FieldDecoratorService.Instance<T>;
//# sourceMappingURL=ArrayEmpty.d.ts.map