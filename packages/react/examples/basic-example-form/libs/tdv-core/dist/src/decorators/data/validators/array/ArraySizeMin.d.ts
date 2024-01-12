import { FieldDecorator } from "../../../factory/forField";
import { DecoratorOptions } from "../../../helper";
/** `@ArraySizeMin` key. */
export declare const ARRAY_SIZE_MIN = "ArraySizeMin";
/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * @key {@link ARRAY_SIZE_MIN ArraySizeMin}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { message: "You must choose at least 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, {
 *     message: "You must choose at least 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export declare function ArraySizeMin<K, T extends K[]>(min: number, options?: DecoratorOptions): FieldDecorator<T>;
//# sourceMappingURL=ArraySizeMin.d.ts.map