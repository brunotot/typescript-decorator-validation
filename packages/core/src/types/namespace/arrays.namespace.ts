import Condition from "./condition.namespace";

namespace Arrays {
  // prettier-ignore
  export type getArrayDepth<T> = 
    T extends any[] 
      ? T[0] extends any[] 
        ? T[0][0] extends any[]
          ? T[0][0][0] extends any[] 
            ? T[0][0][0][0] extends any[]
              ? 5
              : 4
            : 3
          : 2
        : 1
      : 0;

  // TODO
  //! TODO: HIGHLIGHT TYPE TRANSFORMATION UTILS AND GENERIC TYPE UTILS - FEATURE!!

  export type setArrayDepth<
    T,
    N extends number,
    R extends any[] = []
  > = R["length"] extends N ? T : setArrayDepth<T[], N, [T, ...R]>;

  /**
   * A type that extracts the element type of an array type `T`.
   *
   * @typeParam T - The type to extract the array type from.
   */
  export type getArrayType<T> = T extends (infer U)[]
    ? true extends Condition.isArray<U>
      ? getArrayType<U>
      : U
    : never;
}

export default Arrays;
