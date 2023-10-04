namespace Numbers {
  export type buildTuple<L extends number, T extends any[] = []> = T extends {
    length: L;
  }
    ? T
    : buildTuple<L, [...T, any]>;

  export type length<T extends any[] | string> = T extends { length: infer L }
    ? L
    : never;

  export type sum<A extends number, B extends number> = length<
    [...buildTuple<A>, ...buildTuple<B>]
  >;

  export type subtract<
    A extends number,
    B extends number
  > = buildTuple<A> extends [...infer U, ...buildTuple<B>] ? length<U> : never;
}

export default Numbers;
