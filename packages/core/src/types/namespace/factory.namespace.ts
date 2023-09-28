/**
 * A collection of types and interfaces related to function factories.
 */
namespace Factory {
  /**
   * A type that extracts the argument types from a given array type `T`.
   *
   * @typeParam T - An array of any types.
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
   * A type representing a function that takes arguments of types `T` and returns `R`.
   *
   * @typeParam T - An array of any types representing the arguments.
   * @typeParam R - The return type of the function.
   */
  export type Function<T extends any[], R> = ((
    ...args: Factory.Arguments<T>
  ) => R) & {};
}

export default Factory;
