import API from "../../../index";
import { EventEmitter } from "../../../utilities/misc/EventEmitter";

export type FieldDecorator<T extends unknown> = ((
  target: any,
  context: FieldDecoratorCtx<T>
) => void) & {};

export type FieldDecoratorSupplier<T extends unknown = unknown> = ((
  meta: API.Reflection.FieldValidatorMetaService,
  name: string,
  context: FieldDecoratorCtx<T>,
  args: API.Decorator.DecoratorArgs
) => void) & {};

export type FieldDecoratorCtx<T extends unknown> = Readonly<{
  kind: "getter" | "method" | "field";
  static: boolean;
  private: boolean;
  name: string;
  metadata?: globalThis.DecoratorMetadataObject;
  access: {
    get: (object: any) => T;
  };
}>;

/**
 * Creates a new field decorator function using the provided supplier.
 * @typeParam T - The type of the field being decorated.
 * @param supplier - A callback that defines the basic field decorator behavior.
 * @returns A basic field decorator factory.
 */
export function createFieldDecorator<T extends unknown>(
  supplier: FieldDecoratorSupplier<T>
): FieldDecorator<T> {
  return function (target, context) {
    const isStage2 = typeof context === "string";
    const nameEval = isStage2 ? context : context.name;
    const strategyEval = isStage2 ? target.constructor : context;
    const contextEval = isStage2 ? { name: context, metadata: {} } : context;
    const metaService = API.Reflection.FieldValidatorMetaService.inject(
      strategyEval,
      EventEmitter.EMPTY
    );
    supplier(metaService, String(nameEval), contextEval as any, {});
  };
}
