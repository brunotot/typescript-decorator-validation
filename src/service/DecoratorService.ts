import { Context } from "../model/type/Context.type";
import MetadataProcessor from "../processor/MetadataProcessor";

export type Decorator<T = unknown> = (target: any, context: Context<T>) => void;

export type DecoratorSupplier = (
  name: string,
  processor: MetadataProcessor
) => void;

export function buildDecorator<T>(decoration: DecoratorSupplier): Decorator<T> {
  return function (_, context) {
    const name = context.name;
    const metadataProcessor = MetadataProcessor.fromContext(context);
    decoration(name, metadataProcessor);
  };
}
