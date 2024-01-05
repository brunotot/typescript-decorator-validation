import type * as Booleans from "./Booleans";

/**
 * Returns depth of provided generic array (example: getArrayDepth<string[][]> returns 2).
 * @remarks Due to TypeScript's compiler - evaluation is limited to the depth of 5.
 */
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

/**
 * Returns an array type constructed of `N` depth.
 */
export type setArrayDepth<T, N extends number, R extends any[] = []> = R["length"] extends N
  ? T
  : setArrayDepth<T[], N, [T, ...R]>;

/**
 * A type that extracts the element type of an array type `T`.
 *
 * @typeParam T - The type to extract the array type from.
 */
export type getArrayType<T> = T extends Array<infer U>
  ? true extends Booleans.isArray<U>
    ? getArrayType<U>
    : U
  : never;
