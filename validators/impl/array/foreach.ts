import { AcceptableDecoratorFieldType } from "../../../src/model/type/Context.type";
import {
  Decorator,
  buildDecorator,
} from "../../../src/model/utility/decorator.utility";

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
