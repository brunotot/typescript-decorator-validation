import { PrimitiveSetAppend } from "../../..";

/**
 * @namespace Types
 *
 * @description
 * A collection of types representing various data types.
 */
namespace Types {
  /**
   * @type
   *
   * @description
   * Represents the JavaScript `Function` type.
   */
  export type Function = globalThis.Function;

  /**
   * @type
   *
   * @description
   * Represents the generic `object` type.
   */
  export type Object = object;

  /**
   * @type
   *
   * @description
   * Represents the generic array type.
   */
  export type Array = any[];

  /**
   * @type
   *
   * @description
   * Represents primitive data types including `string`, `number`, `boolean`,
   * `bigint`, `Date`, and custom primitives defined in `PrimitiveSetAppend`.
   */
  export type Primitive = [
    ...[string, number, boolean, bigint, Date],
    ...(PrimitiveSetAppend extends {
      values: infer CustomPrimitives extends readonly unknown[];
    }
      ? CustomPrimitives
      : [])
  ];
}

/**
 * @description
 * The default export for the `Types` namespace.
 */
export default Types;
