import { makeDecorator } from "../../src/decorators/decorator.factory";
import { Decorator } from "../../src/decorators/types/Decorator.type";

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

export default function foreach<T extends NonNullable<any[]>>(
  ...validators: Decorator<ExtractArrayType<T>>[]
): Decorator<T> {
  return makeDecorator<T>((property, processor, context) => {
    processor.field(property).default = [];
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const validationProcessor = processor.field<T>(property as keyof T);
      const rules = validationProcessor.rules;
      const rootRules = rules.root;
      const foreachRules = rules.foreach;
      const foreachRule = rootRules.pop();
      foreachRules.add(foreachRule);
    });
  });
}
