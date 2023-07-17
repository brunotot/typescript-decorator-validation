import { DecoratorContext } from "./DecoratorContext.type";

export type Decorator<T = unknown> = (
  target: unknown,
  context: DecoratorContext<T>
) => void;
