import { Class } from "../../../model/type/Class.type";
import { buildDecorator } from "../../../service/DecoratorService";
import { Nullable } from "../../../service/ValidatorService";

export function valid<T extends Nullable<object>>(clazz: Class<T>) {
  return buildDecorator<Nullable<T>>((name, processor) => {
    processor.getValidationProcessor(name).constructorCreator = () => clazz;
  });
}
