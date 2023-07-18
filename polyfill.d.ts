import { PrimitiveSetAppend } from "./index";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

/*
 * import MyPrimitiveClass from '...';
 * declare module "typescript-decorator-validation" {
 *   interface PrimitiveSetAppend {
 *     values: [MyPrimitiveClass];
 *   }
 * }
 */

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
