import { makeDecorator } from "../../src/decorators/decorator.factory";
import { $ } from "../../src/types/namespace/Utility.ns";
import { Class } from "../../src/types/validation/Class.type";

export default function valid<T extends $.Nullable<object>>(clazz: Class<T>) {
  return makeDecorator<$.Nullable<T>>((name, meta) => {
    const descriptor = meta.descriptor<any, string>(name);
    descriptor.thisClass = clazz;
  });
}
