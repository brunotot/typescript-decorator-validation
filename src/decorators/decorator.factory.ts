import MetadataProcessor from "../model/processor/MetadataProcessor";
import { Decorator } from "./types/Decorator.type";
import { DecoratorSupplier } from "./types/DecoratorSupplier.type";

export function makeDecorator<T>(
  decoratorSupplier: DecoratorSupplier<T>
): Decorator<T> {
  return function (_, context) {
    const name = context.name;
    const metadataProcessor = MetadataProcessor.fromContext(context);
    decoratorSupplier(name, metadataProcessor, context);
  };
}
