import {
  createClassDecorator,
  type ClassDecorator,
} from "@decorators/factory/forClass/createClassDecorator";
import { type DecoratorValidateIf } from "@decorators/helper";
import { type Types } from "@utilities";

export function validateClassIf<Class extends Types.Class>(
  validateIf: DecoratorValidateIf<Types.UnwrapClass<Class>>
): ClassDecorator<Class> {
  return createClassDecorator<Class>(meta => {
    meta.validateIf = validateIf;
  });
}
