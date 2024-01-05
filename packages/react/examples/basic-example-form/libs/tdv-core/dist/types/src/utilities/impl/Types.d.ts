import type API from "../../../index";
import { type PrimitiveSet } from "../../../index";
/**
 * Represents the JavaScript `Function` type.
 */
export type FunctionType = (() => any) & {};
/**
 * Represents the generic array type.
 */
export type ArrayType = any[];
/**
 * Represents primitive data types including `string`, `number`, `boolean`,
 * `bigint`, `Date`, and custom primitives defined in `PrimitiveSetAppend`.
 */
export type PrimitiveType = [
    ...[string, number, boolean, bigint, Date],
    ...(PrimitiveSet extends {
        values: infer CustomPrimitives extends readonly unknown[];
    } ? CustomPrimitives : [])
];
/**
 * Represents a class constructor that can create instances of type `T`.
 *
 * @typeParam T - The type to be instantiated by the class constructor.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   constructor(arg1: string, arg2: number) {
 *     // ...
 *   }
 * }
 *
 * const myClassConstructor: Class<MyClass> = MyClass;
 * const instance = new myClassConstructor('hello', 42);
 * // Creates an instance of MyClass
 * ```
 */
export type Class<T = {}> = (new (...args: any[]) => T) & {};
/**
 * Unwraps a Promise type to its resolved value type.
 * @typeParam T - The type to unwrap.
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
/**
 * Unwraps a Class type to its instance type.
 * @typeParam T - The type to unwrap.
 */
export type UnwrapClass<T> = T extends Class<infer U> ? U : never;
/**
 * Unwraps a MetaStrategy type to its inferred class.
 * @typeParam TStrategy - The MetaStrategy type to unwrap.
 */
export type UnwrapMetaStrategy<TStrategy extends API.Reflection.MetaStrategy> = TStrategy extends Class<infer TInferredClass> ? TInferredClass : any;
/**
 * Prettifies a type by retaining the same shape.
 * @typeParam T - The type to prettify.
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
//# sourceMappingURL=Types.d.ts.map