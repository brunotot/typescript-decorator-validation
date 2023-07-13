import { Decorator, buildDecorator } from "../../../service/DecoratorService";
import { AcceptableDecoratorFieldType } from "../../../model/type/Context.type";

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

export default function foreach<T extends AcceptableDecoratorFieldType<any[]>>(
  ...validators: Decorator<ExtractArrayType<T>>[]
): Decorator<T> {
  return buildDecorator<T>((property, processor, context) => {
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const validationProcessor = processor.getValidationProcessor<T>(property);
      const validationMetadata = validationProcessor.node.pop()!;
      validationProcessor.appendChild(validationMetadata);
    });
  });
}
