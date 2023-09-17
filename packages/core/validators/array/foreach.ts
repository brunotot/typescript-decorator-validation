import { TdvCore } from "tdv-core";
import { makeDecorator } from "../../src/decorators/decorator.factory";
import { Decorator } from "../../src/decorators/decorator.types";

export default function foreach<T extends NonNullable<any[] | (() => any[])>>(
  ...validators: Decorator<TdvCore.Helper.ExtractArrayType<T>>[]
): Decorator<T> {
  return makeDecorator<T>((property, processor, context) => {
    processor.descriptor<any, any>(property).thisDefault = [];
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const validationProcessor = processor.descriptor<any, any>(
        property as keyof T
      );
      const rules = validationProcessor.rules;
      const rootRules = rules.root;
      const foreachRules = rules.foreach;
      const foreachRule = rootRules.pop();
      foreachRules.add(foreachRule);
    });
  });
}
