// prettier-ignore
namespace Helper {
  export type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B

  export type Values<T> = T[keyof T];

  export type Exclude<TParent, TExclude> = Pick<
    TParent,
    Helper.Values<{
      [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude]
        ? never
        : Prop;
    }>
  >;

  export type Purify<T> = Helper.Exclude<T, never>;

  export type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
}

export default Helper;
