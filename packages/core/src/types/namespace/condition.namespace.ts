import Helper from "./helper.namespace";
import Types from "./types.namespace";

/**
 * A collection of type-level utility functions for checking various conditions.
 */
// prettier-ignore
namespace Condition {
  /**
   * Checks if `TCheck` is any of the types in `TData`.
   * 
   * @typeParam TCheck - The type to check.
   * @typeParam TData - The array type to check against.
   */
  export type isAnyOf<TCheck, TData extends Types.Array> = 
    NonNullable<TCheck> extends TData[number] 
      ? true 
      : false;

  /**
   * Checks if `T` is an object type.
   * 
   * @typeParam T - The type to check.
   */
  export type isObject<T> = 
    NonNullable<T> extends Types.Object 
      ? true 
      : false;

  /**
   * Checks if `T` is a function type.
   * 
   * @typeParam T - The type to check.
   */
  export type isFunction<T> = 
    NonNullable<T> extends Types.Function
      ? true 
      : false;

  /**
   * Checks if `T` is an array type.
   * 
   * @typeParam T - The type to check.
   */
  export type isArray<T> = 
    NonNullable<T> extends Types.Array 
      ? true 
      : false;

  /**
   * Checks if `T` is a primitive type.
   * 
   * @typeParam T - The type to check.
   */
  export type isPrimitive<T> = 
    isAnyOf<T, Types.Primitive>;

  /**
   * Checks if `T` is an array of primitive types.
   * 
   * @typeParam T - The type to check.
   */
  export type isPrimitiveArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isPrimitive<Helper.ExtractArrayType<T>>;

  /**
   * Checks if `T` is an array of object types.
   * 
   * @typeParam T - The type to check.
   */
  export type isObjectArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isObject<Helper.ExtractArrayType<T>>;

  /**
   * Checks if `T` is `undefined`.
   * 
   * @typeParam T - The type to check.
   */
  export type isUndefined<T> = 
    T extends undefined 
      ? true 
      : false;
}

export default Condition;
