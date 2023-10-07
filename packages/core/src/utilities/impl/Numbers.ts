/**
 * Collection of number-related types and methods.
 */
namespace Numbers {
  /**
   * Builds a tuple type of a given length.
   * @typeParam L - Length of the tuple.
   * @typeParam T - Initial tuple type (defaults to an empty array).
   */
  export type buildTuple<L extends number, T extends any[] = []> = T extends {
    length: L;
  }
    ? T
    : buildTuple<L, [...T, any]>;

  /**
   * Computes the length type of a given array or string type.
   * @typeParam T - Type that can have a length (array or string).
   */
  export type length<T extends any[] | string> = T extends { length: infer L }
    ? L
    : never;

  /**
   * Computes the sum of two number types.
   * @typeParam A - First number.
   * @typeParam B - Second number.
   */
  export type sum<A extends number, B extends number> = length<
    [...buildTuple<A>, ...buildTuple<B>]
  >;

  /**
   * Computes the difference between two number types.
   * @typeParam A - Minuend.
   * @typeParam B - Subtrahend.
   */
  export type subtract<
    A extends number,
    B extends number
  > = buildTuple<A> extends [...infer U, ...buildTuple<B>] ? length<U> : never;
}

export default Numbers;
