import { makeDecorator } from "../../src/decorators/decorator.factory";
import { Class } from "../../src/types/Class.type";
import { $ } from "../../src/types/namespace/Utility.ns";

export default function valid<T extends $.Nullable<object>>(clazz: Class<T>) {
  return makeDecorator<$.Nullable<T>>((name, processor) => {
    processor.getValidationProcessor(name).constructorCreator = () => clazz;
  });
}
