import { Overrides } from "../../..";

/**
 * @namespace Types
 *
 * @description
 * A collection of types representing various data types.
 */
namespace Types {
  /**
   * @type
   *
   * @description
   * Represents the JavaScript `Function` type.
   */
  export type Function = globalThis.Function;

  /**
   * @type
   *
   * @description
   * Represents the generic `object` type.
   */
  export type Object = object;

  /**
   * @type
   *
   * @description
   * Represents the generic array type.
   */
  export type Array = any[];

  /**
   * @type
   *
   * @description
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
}

/**
 * @description
 * The default export for the `Types` namespace.
 */
export default Types;
