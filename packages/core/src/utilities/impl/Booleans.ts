import API from "api";

import Arrays from "./Arrays";
import Objects from "./Objects";
import Types from "./Types";

/**
 * A collection of type-level utility functions for checking various conditions.
 */
namespace Booleans {
  /**
   * Checks if `TCheck` is any of the types in `TData`.
   *
   * @typeParam TCheck - The type to check.
   * @typeParam TData - The array type to check against.
   */
  export type isAnyOf<
    TCheck,
    TData extends Types.Array
  > = NonNullable<TCheck> extends TData[number] ? true : false;

  /**
   * Checks if `T` is an object type.
   *
   * @typeParam T - The type to check.
   */
  export type isObject<T> = NonNullable<T> extends isFunction<T>
    ? false
    : NonNullable<T> extends isArray<T>
    ? false
    : NonNullable<T> extends isPrimitive<T>
    ? false
    : true;

  /**
   * Checks if `T` is a function type.
   *
   * @typeParam T - The type to check.
   */
  export type isFunction<T> = NonNullable<T> extends Types.Function
    ? Types.UnwrapPromise<
        ReturnType<NonNullable<T>>
      > extends API.Validation.Result
      ? true
      : false
    : false;

  /**
   * Checks if `T[K]` is a getter type.
   *
   * @typeParam T - The parent type to check.
   * @typeParam T - The key of parent to check.
   */
  export type isGetter<T, K extends keyof T> = K extends Objects.Inputs<T>
    ? false
    : true;

  /**
   * Checks if `T` is an array type.
   *
   * @typeParam T - The type to check.
   */
  export type isArray<T> = NonNullable<T> extends Types.Array ? true : false;

  /**
   * Checks if `T` is a primitive type.
   *
   * @typeParam T - The type to check.
   */
  export type isPrimitive<T> = isAnyOf<T, Types.Primitive>;

  /**
   * Checks if `T` is an array of primitive types.
   *
   * @typeParam T - The type to check.
   */
  export type isPrimitiveArray<T> = Arrays.getArrayType<T> extends never
    ? false
    : isPrimitive<Arrays.getArrayType<T>>;

  /**
   * Checks if `T` is an array of object types.
   *
   * @typeParam T - The type to check.
   */
  export type isObjectArray<T> = Arrays.getArrayType<T> extends never
    ? false
    : isObject<Arrays.getArrayType<T>>;

  /**
   * Checks if `T` is `undefined`.
   *
   * @typeParam T - The type to check.
   */
  export type isUndefined<T> = T extends undefined ? true : false;
}

export default Booleans;
