import API from "../../index";
import * as Arrays from "./Arrays";
import * as Booleans from "./Booleans";
import type * as Types from "./Types";
/**
 * A type that represents an optional value.
 *
 * @typeParam T - The type of the optional value.
 */
export type Optional<T = undefined> = T extends undefined ? any : T | undefined | null;
/**
 * A predicate function for filtering arrays.
 *
 * @typeParam T - The type of the array elements.
 */
export type ArrayPredicate<T> = ((value: T, index: number, array: T[]) => boolean) & {};
/**
 * Filters out getters, functions and read-only properties from a type
 */
export type Payload<T> = Types.Prettify<API.Utilities.Objects.Purify<{
    [K in keyof T]: true extends Booleans.isAnyOf<true, [
        Booleans.isGetter<T, K>,
        Booleans.isFunction<T[K]>
    ]> ? never : true extends Booleans.isArray<T[K]> ? true extends Booleans.isPrimitive<Arrays.getArrayType<T[K]>> ? T[K] : Arrays.setArrayDepth<Payload<Arrays.getArrayType<T[K]>>, Arrays.getArrayDepth<T[K]>> : true extends Booleans.isPrimitive<T[K]> ? T[K] : Payload<T[K]>;
}>>;
/**
 * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
 *
 * @typeParam X - The first type.
 * @typeParam Y - The second type.
 * @typeParam A - The type to return if `X` and `Y` are equal.
 * @typeParam B - The type to return if `X` and `Y` are not equal.
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
/**
 * A type that excludes properties with values of type `TExclude` from `TParent`.
 *
 * @typeParam TParent - The parent type.
 * @typeParam TExclude - The type to exclude from `TParent`.
 */
export type Exclude<TParent, TExclude> = Pick<TParent, Values<{
    [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude] ? never : Prop;
}>>;
/**
 * A type that removes properties with values of type `never` from `T`.
 *
 * @typeParam T - The type to purify.
 */
export type Purify<T> = Exclude<T, never>;
/**
 * A type that extracts the values from the properties of an object type `T`.
 *
 * @typeParam T - An object type.
 */
export type Values<T> = T[keyof T];
/**
 * A type that extracts input properties from an object type `T`.
 *
 * @typeParam T - The object type.
 */
export type Inputs<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P>;
}[keyof T];
/**
 * Removes duplicate elements from an array while preserving order.
 *
 * @typeParam T - The type of the elements in the array.
 */
export declare function unique<T>(data: T[]): T[];
/**
 * Checks if an error object has errors.
 *
 * @typeParam T - The type of the errors.
 */
export declare function hasErrors<T>(data: API.Strategy.Factory.Impl.Errors<T>): boolean;
/**
 * Recursively checks if two values are deep equal.
 */
export declare function deepEquals(val1: any, val2: any): boolean;
/**
 * Hashes a value of any type and returns a number.
 */
export declare function hash(val: any): number;
/**
 * Transforms a plain object into an instance of the given class.
 * @param clazz - The class to transform the object into.
 * @param object - The object to transform.
 * @typeParam TClass - The type of the class.
 * @returns An instance of TClass.
 */
export declare function toClass<const TClass extends Types.Class<any>>(clazz: TClass, object?: Payload<Types.UnwrapClass<TClass>>): Types.UnwrapClass<TClass>;
/**
 * Debounces a function.
 * @param fn - The function to debounce.
 * @param delay - The delay time in milliseconds.
 * @returns A debounced function.
 */
export declare function debounce(fn: Function, delay: number): Function;
export type FieldType = "date" | "array" | "string" | "number" | "boolean" | "object";
export declare function assertType(type: FieldType, value: any): void | never;
//# sourceMappingURL=Objects.d.ts.map