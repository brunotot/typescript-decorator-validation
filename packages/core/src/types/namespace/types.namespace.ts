import { PrimitiveSetAppend } from "../../..";

// prettier-ignore
namespace Types {
  export type Function = globalThis.Function;
  
  export type Object = object;

  export type Array = any[];

  export type Primitive = [
    ...[string, number, boolean, bigint, Date],
    ...PrimitiveSetAppend extends {
      values: infer CustomPrimitives extends readonly unknown[];
    } ? CustomPrimitives : []
  ];
}

export default Types;
