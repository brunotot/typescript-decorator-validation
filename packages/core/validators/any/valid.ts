import FieldDecorator from "../../src/decorators/kind/FieldDecorator";
import $ from "../../src/types";
import Types from "../../src/types/namespace/types.namespace";

/**
 * Creates a decorator to associate a class with its validation rules.
 *
 * @typeparam T - The type of the decorated property, which should be an object.
 * @param clazz - The class to associate with the validation rules.
 * @returns A decorator function to use with class properties.
 *
 * @example
 * // Example 3: Validating an array of objects
 * class ShoppingCart {
 *   //@valid(Item)
 *   items: Item[];
 * }
 */
export default function valid<T extends $.Objects.Optional<object>>(
  clazz: Types.Class<T>
) {
  return FieldDecorator.build<$.Objects.Optional<T>>((meta, name) => {
    meta.getUntypedDescriptor(name).thisClass = clazz;
  });
}
