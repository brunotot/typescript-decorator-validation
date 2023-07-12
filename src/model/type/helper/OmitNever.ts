import { KeyOf } from "../../utility/type.utility";

type Values<T> = T[KeyOf<T>];

export type OmitNever<T> = Pick<
  T,
  Values<{
    [Prop in KeyOf<T>]: [T[Prop]] extends [never] ? never : Prop;
  }>
>;
