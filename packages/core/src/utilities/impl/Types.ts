import API, { Overrides } from "api";

/**
 * A collection of types representing various data types.
 */
namespace Types {
  /**
   * Represents the JavaScript `Function` type.
   */
  export type Function = () => any;

  /**
   * Represents the generic array type.
   */
  export type Array = any[];

  /**
   * Represents primitive data types including `string`, `number`, `boolean`,
   * `bigint`, `Date`, and custom primitives defined in `PrimitiveSetAppend`.
   */
  export type Primitive = [
    ...[string, number, boolean, bigint, Date],
    ...(Overrides.PrimitiveSet extends {
      values: infer CustomPrimitives extends readonly unknown[];
    }
      ? CustomPrimitives
      : [])
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
  export type Class<T> = { new (...args: any[]): T };

  export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

  export type UnwrapClass<T> = T extends Types.Class<infer U> ? U : never;

  export type UnwrapMetaStrategy<
    TStrategy extends API.Reflection.MetaStrategy
  > = TStrategy extends Types.Class<infer TInferredClass>
    ? TInferredClass
    : any;

  export type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}

export default Types;
