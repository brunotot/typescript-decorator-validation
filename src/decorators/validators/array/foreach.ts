import { Nullable } from "../../../service/ValidatorService";
import {
  Decorator,
  applyForeachValidator,
  buildDecorator,
} from "../../../service/DecoratorService";

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

export default function foreach<T extends Nullable<any[]>>(
  ...validators: Decorator<any, ExtractArrayType<T>>[]
): Decorator<any, T> {
  return buildDecorator<T>((target, property, _, ctx) => {
    validators.forEach((validator) => {
      applyForeachValidator(target, property, validator, ctx as any);
    });
  });
}
