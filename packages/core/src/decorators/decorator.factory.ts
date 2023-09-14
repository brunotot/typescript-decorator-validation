import MetadataProcessor from "../model/processor/MetadataProcessor";
import {
  Decorator,
  DecoratorContext,
  DecoratorSupplier,
} from "./decorator.types";

function isDecoratorsStage2(context: DecoratorContext) {
  return typeof context === "string";
}

function makeDecoratorUsingStage2Strategy<T>(
  target: any,
  context: DecoratorContext,
  decoratorSupplier: DecoratorSupplier<T>
) {
  const name = context as unknown as string;
  const clazz = target.constructor;
  const processor = MetadataProcessor.inferFrom(clazz);
  decoratorSupplier(name, processor, {
    name: name,
    metadata: {},
  } as any);
}

export function makeDecorator<T>(
  decoratorSupplier: DecoratorSupplier<T>
): Decorator<T> {
  return function (target, context) {
    // Hardcoded check for old TS decorators (stage 2 proposal)
    if (isDecoratorsStage2(context)) {
      return makeDecoratorUsingStage2Strategy(
        target,
        context,
        decoratorSupplier
      );
    }

    // Regular stage 3 syntax
    const name = context.name;
    if (!context.metadata) {
      console.log(JSON.stringify(context));
    }
    const metadataProcessor = MetadataProcessor.inferFrom(context.metadata);
    decoratorSupplier(name, metadataProcessor, context);
  };
}
