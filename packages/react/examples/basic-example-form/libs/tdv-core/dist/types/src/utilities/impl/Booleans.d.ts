import type API from "../../../index";
import type Arrays from "./Arrays";
import type Objects from "./Objects";
import type Types from "./Types";
/**
 * A collection of type-level utility functions for checking various conditions.
 */
declare namespace Booleans {
    /**
     * Checks if `TCheck` is any of the types in `TData`.
     *
     * @typeParam TCheck - The type to check.
     * @typeParam TData - The array type to check against.
     */
    type isAnyOf<TCheck, TData extends Types.Array> = NonNullable<TCheck> extends TData[number] ? true : false;
    /**
     * Checks if `T` is an object type.
     *
     * @typeParam T - The type to check.
     */
    type isObject<T> = NonNullable<T> extends isFunction<T> ? false : NonNullable<T> extends isArray<T> ? false : NonNullable<T> extends isPrimitive<T> ? false : true;
    /**
     * Checks if `T` is a function type.
     *
     * @typeParam T - The type to check.
     */
    type isFunction<T> = NonNullable<T> extends Types.Function ? Types.UnwrapPromise<ReturnType<NonNullable<T>>> extends API.Validation.Result ? true : false : false;
    /**
     * Checks if `T[K]` is a getter type.
     *
     * @typeParam T - The parent type to check.
     * @typeParam T - The key of parent to check.
     */
    type isGetter<T, K extends keyof T> = K extends Objects.Inputs<T> ? false : true;
    /**
     * Checks if `T` is an array type.
     *
     * @typeParam T - The type to check.
     */
    type isArray<T> = NonNullable<T> extends Types.Array ? true : false;
    /**
     * Checks if `T` is a primitive type.
     *
     * @typeParam T - The type to check.
     */
    type isPrimitive<T> = isAnyOf<T, Types.Primitive>;
    /**
     * Checks if `T` is an array of primitive types.
     *
     * @typeParam T - The type to check.
     */
    type isPrimitiveArray<T> = Arrays.getArrayType<T> extends never ? false : isPrimitive<Arrays.getArrayType<T>>;
    /**
     * Checks if `T` is an array of object types.
     *
     * @typeParam T - The type to check.
     */
    type isObjectArray<T> = Arrays.getArrayType<T> extends never ? false : isObject<Arrays.getArrayType<T>>;
    /**
     * Checks if `T` is `undefined`.
     *
     * @typeParam T - The type to check.
     */
    type isUndefined<T> = T extends undefined ? true : false;
}
export default Booleans;
//# sourceMappingURL=Booleans.d.ts.map