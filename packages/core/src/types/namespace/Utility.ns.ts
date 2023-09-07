type _Exclude<TParent, TExclude> = Pick<
  TParent,
  $.Values<{
    [Prop in $.Keys<TParent>]: [TParent[Prop]] extends [TExclude]
      ? never
      : Prop;
  }>
>;

type _ParamsFactory<T extends any[]> = T extends []
  ? []
  : T extends [infer P]
  ? [P]
  : T extends [infer P, ...infer Rest]
  ? [P, ..._ParamsFactory<Rest>]
  : T extends [...infer Rest, infer P]
  ? [..._ParamsFactory<Rest>, P]
  : never;

// prettier-ignore
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

// prettier-ignore
type _WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

type _Nullable<GUARD = undefined> = GUARD extends undefined
  ? any
  : GUARD | undefined | null;

// prettier-ignore
export namespace $ {
  export type Nullable<TGuard = undefined> = _Nullable<TGuard>;
  export type Optional<T extends object> = {[K in keyof T]?: NonNullable<T[K]>};
  export type Equals<T> = (a: T, b: T) => boolean;
  export type Exclude<TFrom, TRemove> = _Exclude<TFrom, TRemove>;
  export type ExcludeNever<TActual> = Exclude<TActual, never>;
  export type FuncFactory<T extends any[], R> = (...args: ParamsFactory<T>) => R;
  export type HashGenerator<T> = (value: T) => number;
  export type Keys<T> = keyof T;
  export type Object<V> = Record<string, V>;
  export type ParamsFactory<T extends any[]> = _ParamsFactory<T>;
  export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;
  export type Values<T> = T[$.Keys<T>];
  export type WritableKeys<T> = _WritableKeys<T>;
  export type _ = undefined;
  export type TArgGet<TParamKey extends keyof TypeParams> = TypeParams[TParamKey];
  export type TArg<TParamKey extends keyof TypeParams> = $.Values<TArgGet<TParamKey>>;
}

type TypeParams = {
  partial: {
    disabled: "disabled";
    enabled: "enabled";
  };
};
