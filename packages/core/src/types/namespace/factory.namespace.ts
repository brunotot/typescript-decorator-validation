namespace Factory {
  export type Arguments<T extends any[]> = T extends []
    ? []
    : T extends [infer P]
    ? [P]
    : T extends [infer P, ...infer Rest]
    ? [P, ...Factory.Arguments<Rest>]
    : T extends [...infer Rest, infer P]
    ? [...Factory.Arguments<Rest>, P]
    : never;

  export type Function<T extends any[], R> = (
    ...args: Factory.Arguments<T>
  ) => R;
}

export default Factory;
