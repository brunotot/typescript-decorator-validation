import API from "../../index";
/** ArrayEvery identifier. */
export declare const ARRAY_EVERY = "ArrayEvery";
/** Internal validation function for {@link ArrayEvery} validator. */
export declare function isArrayEveryValid<K, T extends Array<K>>(array: T, predicate: API.Utilities.Objects.ArrayPredicate<K>): boolean;
/**
 * Checks if all elements of decorated array satisfy the given predicate criteria.
 *
 * @key {@link ARRAY_EVERY ArrayEvery}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.every()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0)
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, { message: "All elements must be greater than 0" })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, { groups: ["UPDATE"] })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, {
 *     message: "All elements must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   positiveNumbers: string[];
 * }
 * ```
 **/
export declare function ArrayEvery<K, T extends Array<K>>(predicate: API.Utilities.Objects.ArrayPredicate<K>, options?: API.Decorator.Options): API.Decorator.Service.FieldDecoratorService.Instance<T>;
//# sourceMappingURL=ArrayEvery.d.ts.map