import { makeDecorator } from "../../src/decorators/decorator.factory";
import { Decorator } from "../../src/decorators/types/Decorator.type";

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

export default function foreach<T extends NonNullable<any[]>>(
  ...validators: Decorator<ExtractArrayType<T>>[]
): Decorator<T> {
  return makeDecorator<T>((property, processor, context) => {
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const validationProcessor = processor.getValidationProcessor<T>(property);
      const validationMetadata = validationProcessor.node.pop()!;
      validationProcessor.appendChild(validationMetadata);
    });
  });
}
