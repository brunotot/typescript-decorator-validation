import { Class } from "../../../src/model/type/Class.type";
import { buildDecorator } from "../../../src/model/utility/decorator.utility";
import { Nullable } from "../../../src/model/utility/type.utility";

export function valid<T extends Nullable<object>>(clazz: Class<T>) {
  return buildDecorator<Nullable<T>>((name, processor) => {
    processor.getValidationProcessor(name).constructorCreator = () => clazz;
  });
}
