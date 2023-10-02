namespace Numbers {
  type _buildTuple<L extends number, T extends any[] = []> = T extends {
    length: L;
  }
    ? T
    : _buildTuple<L, [...T, any]>;

  export type getArrayLength<T extends any[]> = T extends { length: infer L }
    ? L
    : never;

  export type sum<A extends number, B extends number> = getArrayLength<
    [..._buildTuple<A>, ..._buildTuple<B>]
  >;

  export type subtract<
    A extends number,
    B extends number
  > = _buildTuple<A> extends [...infer U, ..._buildTuple<B>]
    ? getArrayLength<U>
    : never;
}

export default Numbers;
