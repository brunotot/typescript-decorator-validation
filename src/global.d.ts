import { SomeClass } from "./main";
import { PrimitiveSetAppend } from "../index";

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
    readonly metadata: MetadataType;
  }
  interface ClassMethodDecoratorContext<
    This = unknown,
    Value extends (this: This, ...args: any) => any = (
      this: This,
      ...args: any
    ) => any
  > {
    readonly metadata: MetadataType;
  }
  interface ClassGetterDecoratorContext<This = unknown, Value = unknown> {
    readonly metadata: MetadataType;
  }
}
