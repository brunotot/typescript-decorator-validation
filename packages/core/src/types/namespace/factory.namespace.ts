/**
 * @namespace Factory
 *
 * @description
 * A collection of types and interfaces related to function factories.
 */
namespace Factory {
  /**
   * @typeParam T - An array of any types.
   *
   * @description
   * A type that extracts the argument types from a given array type `T`.
   *
   * - If `T` is an empty array, it returns an empty array.
   * - If `T` has one element, it returns an array with that element.
   * - If `T` has more than one element, it recursively extracts the types.
   */
  export type Arguments<T extends any[]> = T extends []
    ? []
    : T extends [infer P]
    ? [P]
    : T extends [infer P, ...infer Rest]
    ? [P, ...Factory.Arguments<Rest>]
    : T extends [...infer Rest, infer P]
    ? [...Factory.Arguments<Rest>, P]
    : never;

  /**
   * @typeParam T - An array of any types representing the arguments.
   * @typeParam R - The return type of the function.
   *
   * @description
   * A type representing a function that takes arguments of types `T` and returns `R`.
   */
  export type Function<T extends any[], R> = (
    ...args: Factory.Arguments<T>
  ) => R;
}

/**
 * @description
 * The default export for the `Factory` namespace.
 */
export default Factory;
