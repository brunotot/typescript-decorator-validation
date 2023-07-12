import { PrimitiveSetAppend } from "../../../..";

type PrimitiveSet = [string, number, boolean, bigint, Date];
type PrimitiveOverride<TActual> = TActual extends {
  values: infer T extends readonly unknown[];
}
  ? T
  : [];

export namespace TypeGroup {
  export type Function = globalThis.Function;
  export type Object = object;
  export type Array = any[];
  export type Primitive = [
    ...PrimitiveSet,
    ...PrimitiveOverride<PrimitiveSetAppend>
  ];
}
