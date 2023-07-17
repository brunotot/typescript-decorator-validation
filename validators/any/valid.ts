import { makeDecorator } from "../../src/decorators/decorator.factory";
import { Class } from "../../src/model/type/Class.type";
import { Nullable } from "../../src/model/utility/type.utility";

export function valid<T extends Nullable<object>>(clazz: Class<T>) {
  return makeDecorator<Nullable<T>>((name, processor) => {
    processor.getValidationProcessor(name).constructorCreator = () => clazz;
  });
}
