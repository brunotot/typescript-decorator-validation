import FieldDecorator from "../../src/decorators/kind/FieldDecorator";
import Objects from "../../src/utilities/impl/Objects";
import Types from "../../src/utilities/impl/Types";

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
 *   //@attribute(Item)
 *   items: Item[];
 * }
 */
export default function attribute<
  T extends Objects.Optional<object | object[]>
>(clazz: Types.Class<any>): FieldDecorator.Instance<T> {
  return FieldDecorator.build<any>((meta, name) => {
    meta.getUntypedDescriptor(name).thisClass = clazz;
  });
}
