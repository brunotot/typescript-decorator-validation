import HelperNamespace from "./helper.namespace";

namespace Objects {
  export type Equals<T> = (a: T, b: T) => boolean;

  export type Optional<T = undefined> = T extends undefined
    ? any
    : T | undefined | null;

  export type Hash<T> = (value: T) => number;

  export type ArrayPredicate<T> = (
    value: T,
    index: number,
    array: T[]
  ) => boolean;

  export type Inputs<T> = {
    [P in keyof T]-?: HelperNamespace.IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >;
  }[keyof T];
}

export default Objects;
