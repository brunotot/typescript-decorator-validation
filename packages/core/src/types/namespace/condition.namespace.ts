import Helper from "./helper.namespace";
import Types from "./types.namespace";

/**
 * @namespace Condition
 *
 * @description
 * A collection of type-level utility functions for checking various conditions.
 */
// prettier-ignore
namespace Condition {
  /**
   * @typeParam TCheck - The type to check.
   * @typeParam TData - The array type to check against.
   * 
   * @description
   * Checks if `TCheck` is any of the types in `TData`.
   */
  export type isAnyOf<TCheck, TData extends Types.Array> = 
    NonNullable<TCheck> extends TData[number] 
      ? true 
      : false;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is an object type.
   */
  export type isObject<T> = 
    NonNullable<T> extends Types.Object 
      ? true 
      : false;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is a function type.
   */
  export type isFunction<T> = 
    NonNullable<T> extends Types.Function
      ? true 
      : false;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is an array type.
   */
  export type isArray<T> = 
    NonNullable<T> extends Types.Array 
      ? true 
      : false;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is a primitive type.
   */
  export type isPrimitive<T> = 
    isAnyOf<T, Types.Primitive>;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is an array of primitive types.
   */
  export type isPrimitiveArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isPrimitive<Helper.ExtractArrayType<T>>;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is an array of object types.
   */
  export type isObjectArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isObject<Helper.ExtractArrayType<T>>;

  /**
   * @typeParam T - The type to check.
   * 
   * @description
   * Checks if `T` is `undefined`.
   */
  export type isUndefined<T> = 
    T extends undefined 
      ? true 
      : false;
}

/**
 * @description
 * The default export for the `Condition` namespace.
 */
export default Condition;
