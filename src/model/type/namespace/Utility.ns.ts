import { Class } from "../Class.type";

type _Values<T> = T[$.KeyOf<T>];

type _ExcludeTypeHelper<T, TExclude> = Pick<
  T,
  _Values<{
    [Prop in $.KeyOf<T>]: [T[Prop]] extends [TExclude] ? never : Prop;
  }>
>;

type _Object<V> = {
  [key: string]: V;
};

// prettier-ignore
type _ParamsResolver<T extends any[]> = 
  T extends []
    ?[]

  :T extends [infer P]
    ?[P]

  :T extends [infer P, ...infer Rest]
    ? [P, ..._ParamsResolver<Rest>]

  :T extends [...infer Rest, infer P]
    ? [..._ParamsResolver<Rest>, P]

  :never;

// prettier-ignore
export namespace $ {
  export type ParamsResolver<T extends any[]> = _ParamsResolver<T>
  export type Object<V> = _Object<V>;
  export type _ = undefined;
  export type KeyOf<T> = keyof T;
  export type Values<T> = _Values<T>;
  export type ExcludeTypeHelper<TFrom, TRemove> = _ExcludeTypeHelper<TFrom, TRemove>;
  export type ExcludeNever<TActual> = ExcludeTypeHelper<TActual, never>;
}
