import { TypeGroup } from "./TypeGroup.ns";

type _isAnyOf<
  TCheck,
  TPossibilities extends TypeGroup.Array
> = NonNullable<TCheck> extends TPossibilities[number] ? true : false;

// prettier-ignore
export namespace Condition {
  export type isAnyOf<TCheck, TData extends TypeGroup.Array> = _isAnyOf<TCheck, TData>
  export type isObject<T> = NonNullable<T> extends TypeGroup.Object ? true : false;
  export type isFunction<T> = NonNullable<T> extends TypeGroup.Function ? true : false;
  export type isArray<T> = NonNullable<T> extends TypeGroup.Array ? true : false;
  export type isPrimitive<T> = isAnyOf<T, TypeGroup.Primitive>;
  export type isUndefined<T> = T extends undefined ? true : false;
}
