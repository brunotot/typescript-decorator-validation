import { DecoratorContextMetadata } from "../src/decorators/types/DecoratorContext.type";

declare global {
  interface SymbolConstructor {
    readonly metadata: unique symbol;
  }

  interface ClassFieldDecoratorContext<This = unknown, Value = unknown> {
    readonly metadata: DecoratorContextMetadata;
  }

  interface ClassMethodDecoratorContext<
    This = unknown,
    Value extends (this: This, ...args: any) => any = (
      this: This,
      ...args: any
    ) => any
  > {
    readonly metadata: DecoratorContextMetadata;
  }

  interface ClassGetterDecoratorContext<This = unknown, Value = unknown> {
    readonly metadata: DecoratorContextMetadata;
  }
}
