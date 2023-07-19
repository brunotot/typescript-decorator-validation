import { DecoratorContext } from "./DecoratorContext.type";

export type Decorator<T = unknown> = (
  target: any,
  context: DecoratorContext<T>
) => void;
