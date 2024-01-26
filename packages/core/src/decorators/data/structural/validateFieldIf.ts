import {
  createFieldDecorator,
  type FieldDecorator,
} from "@decorators/factory/forField/createFieldDecorator";
import { type DecoratorValidateIf } from "@decorators/helper";

export function validateFieldIf<Value, Class>(
  validateIf: DecoratorValidateIf<Class>
): FieldDecorator<Value, Class> {
  return createFieldDecorator<Value, Class>((meta, name) => {
    meta.getUntypedDescriptor(name).validateIf = validateIf;
  });
}
