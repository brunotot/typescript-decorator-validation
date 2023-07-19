import MetadataProcessor from "../../model/processor/MetadataProcessor";
import { DecoratorContext } from "./DecoratorContext.type";

export type DecoratorSupplier<T = unknown> = (
  name: string,
  processor: MetadataProcessor,
  context: DecoratorContext<T>
) => void;
