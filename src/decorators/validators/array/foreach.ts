import { NullableType } from "../../../service/ValidatorService";
import ReflectService from "../../../service/ReflectService";
import {
  FieldDecoratorType,
  buildFieldDecorator,
} from "../../../service/DecoratorService";

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

export default function foreach<T extends NullableType<any[]>>(
  ...validators: FieldDecoratorType<any, ExtractArrayType<T>>[]
): FieldDecoratorType<any, T> {
  return buildFieldDecorator<T>((target, property, _, ctx) => {
    validators.forEach((validator) => {
      ReflectService.applyForeachValidator(
        target,
        property,
        validator,
        ctx as any
      );
    });
  });
}
