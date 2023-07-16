import { Class } from "../../../src/model/type/Class.type";
import { Nullable } from "../../../src/model/utility/type.utility";
import { buildDecorator } from "../../../src/service/DecoratorService";

export function valid<T extends Nullable<object>>(clazz: Class<T>) {
  return buildDecorator<Nullable<T>>((name, processor) => {
    processor.getValidationProcessor(name).constructorCreator = () => clazz;
  });
}
