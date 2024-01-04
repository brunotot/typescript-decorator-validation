import type API from "../../../../index";
import { PrimitiveSet } from "../../../../index";
import { type FieldDecorator, createFieldDecorator } from "./../../index";

/**
 * Creates a decorator which flags the given field as a non-primitive (will validate inner fields of `T`).
 *
 * If a field which is being decorated is not a {@link API.Utilities.Types.PrimitiveType primitive}
 * (`string`, `number`, `boolean`, `bigint`, `Date`) and isn't marked as a primitive in {@link PrimitiveSet overrides} interface
 * then the framework treats it as a custom, client-defined validable class. That having in mind, you will always want to apply `@attribute`
 * to those types of fields so the runtime evaluation matches the TypeScript compiler type evaluation. For more clarity check examples below.
 *
 * @remarks
 * Current implementation doesn't allow referencing the parent class itself as the associated `clazz`.
 * Also, if `@attribute` isn't supplied for a non-primitive field, then the validation result at runtime defaults to primitive strategy and yet
 * the evaluated type at compile-time remains the same. That is why it's crucial to add `@attribute` decorator.
 *
 * @typeParam T - The type of the decorated property, which should be an object or an array of objects (nullables are allowed).
 * @param clazz - The class definition associated with the field.
 * @returns A decorator function to use with non-primitive fields.
 *
 * @example
 * class Item {
 *   \@ValueMax(10)
 *   quantity: number;
 *   \@ValueMin(0.1)
 *   price: number;
 * }
 *
 * class ShoppingCart {
 *   \@attribute(Item) // <---
 *   items: Item[];
 * }
 *
 * new ValidationEngine(ShoppingCart).validate({
 *   items: [
 *     // \@ValueMax constraint violation (quantity 15 exceeds maximum amount of 10)
 *     { quantity: 15, price: 200.00 },
 *     // \@ValueMin constraint violation (price 0 doesn't reach the minimum price amount of 0.1)
 *     { quantity: 1, price: 0 }
 *   ]
 * });
 *
 * // And the output is:
 *
 * {
 *   valid: false,
 *   detailedErrors: {
 *     items: [
 *       [{ key: "ValueMax", valid: false, message: "Maximum allowed value is 10 but is 15" }],
 *       [{ key: "ValueMax", valid: false, message: "Minimum allowed value is 0.1 but is 0" }]
 *     ]
 *   },
 *   errors: {
 *     items: [
 *       ["Maximum allowed value is 10 but is 15"],
 *       ["Minimum allowed value is 0.1 but is 0"]
 *     ]
 *   }
 * }
 */
export function attribute<T extends API.Utilities.Objects.Optional<object | object[]>>(
  clazz: API.Utilities.Types.Class<any>
): FieldDecorator<T> {
  return createFieldDecorator<any>((meta, name) => {
    meta.getUntypedDescriptor(name).thisClass = clazz;
  });
}
