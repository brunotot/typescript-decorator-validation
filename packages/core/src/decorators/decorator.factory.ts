import MetadataProcessor from "../model/processor/MetadataProcessor";
import { Decorator } from "./types/Decorator.type";
import { DecoratorContext } from "./types/DecoratorContext.type";
import { DecoratorSupplier } from "./types/DecoratorSupplier.type";

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
  const processor = MetadataProcessor.fromClass(clazz);
  decoratorSupplier(name, processor, {
    name: name,
    metadata: {},
  } as any);
}

export function makeDecorator<T>(
  decoratorSupplier: DecoratorSupplier<T>
): Decorator<T> {
  return function (target, context) {
    debugger;
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
    const metadataProcessor = MetadataProcessor.fromContext(context);
    decoratorSupplier(name, metadataProcessor, context);
  };
}
