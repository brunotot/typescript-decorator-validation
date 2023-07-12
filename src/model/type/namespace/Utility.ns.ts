type _Values<T> = T[$.KeyOf<T>];

type _ExcludeTypeHelper<T, TExclude> = Pick<
  T,
  _Values<{
    [Prop in $.KeyOf<T>]: [T[Prop]] extends [TExclude] ? never : Prop;
  }>
>;

// prettier-ignore
export namespace $ {
  export type _ = undefined;
  export type KeyOf<T> = keyof T;
  export type Values<T> = _Values<T>;
  export type ExcludeTypeHelper<TFrom, TRemove> = _ExcludeTypeHelper<TFrom, TRemove>;
  export type ExcludeNever<TActual> = ExcludeTypeHelper<TActual, never>;
}
