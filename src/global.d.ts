import { SomeClass } from "./main";
import { PrimitiveSetAppend } from "../index";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

// This is an example
declare module "../index" {
  interface PrimitiveSetAppend {
    values: [SomeClass];
  }
}

declare global {
  interface SymbolConstructor {
    metadata: unique symbol;
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
