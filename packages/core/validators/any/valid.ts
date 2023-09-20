import { makeDecorator } from "../../src/decorators/decorator.factory";
import $ from "../../src/types";
import Class from "../../src/types/validation/class.type";

export default function valid<T extends $.Objects.Optional<object>>(
  clazz: Class<T>
) {
  return makeDecorator<$.Objects.Optional<T>>((name, meta) => {
    meta.getUntypedDescriptor(name).thisClass = clazz;
  });
}
