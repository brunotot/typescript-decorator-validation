/**
 * A collection of utility types and functions.
 */
namespace Helper {
  /**
   * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
   *
   * @typeParam X - The first type.
   * @typeParam Y - The second type.
   * @typeParam A - The type to return if `X` and `Y` are equal.
   * @typeParam B - The type to return if `X` and `Y` are not equal.
   */
  export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B;

  /**
   * A type that extracts the values from the properties of an object type `T`.
   *
   * @typeParam T - An object type.
   */
  export type Values<T> = T[keyof T];

  /**
   * A type that excludes properties with values of type `TExclude` from `TParent`.
   *
   * @typeParam TParent - The parent type.
   * @typeParam TExclude - The type to exclude from `TParent`.
   */
  export type Exclude<TParent, TExclude> = Pick<
    TParent,
    Values<{
      [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude]
        ? never
        : Prop;
    }>
  >;

  /**
   * A type that removes properties with values of type `never` from `T`.
   *
   * @typeParam T - The type to purify.
   */
  export type Purify<T> = Exclude<T, never>;

  /**
   * A type that extracts the element type of an array type `T`.
   *
   * @typeParam T - The type to extract the array type from.
   */
  export type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
}

export default Helper;
