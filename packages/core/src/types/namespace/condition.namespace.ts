import Helper from "./helper.namespace";
import Types from "./types.namespace";

// prettier-ignore
namespace Condition {
  export type isAnyOf<TCheck, TData extends Types.Array> = 
    NonNullable<TCheck> extends TData[number] 
      ? true 
      : false
  
  export type isObject<T> = 
    NonNullable<T> extends Types.Object 
      ? true 
      : false;
  
  export type isFunction<T> = 
    NonNullable<T> extends Types.Function
      ? true 
      : false;
  
  export type isArray<T> = 
    NonNullable<T> extends Types.Array 
      ? true 
      : false;
  
  export type isPrimitive<T> = 
    isAnyOf<T, Types.Primitive>;

  export type isPrimitiveArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isPrimitive<Helper.ExtractArrayType<T>>;

  export type isObjectArray<T> = Helper.ExtractArrayType<T> extends never 
    ? false
    : isObject<Helper.ExtractArrayType<T>>;

  export type isUndefined<T> = 
    T extends undefined 
      ? true 
      : false;
}

export default Condition;
