import API from "api";

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
export function attribute<
  T extends API.Utilities.Objects.Optional<object | object[]>
>(
  clazz: API.Utilities.Types.Class<any>
): API.Decorator.Service.FieldDecoratorService.Instance<T> {
  return API.Decorator.Service.FieldDecoratorService.build<any>(
    (meta, name) => {
      meta.getUntypedDescriptor(name).thisClass = clazz;
    }
  );
}
