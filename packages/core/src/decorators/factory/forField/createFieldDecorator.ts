import { type DecoratorArgs } from "@decorators/helper";
import { FieldValidatorMetaService } from "@reflection";
import { EventEmitter } from "@utilities";

/**
 * Represents a field decorator function that is used to decorate fields in a class.
 * The decorator function takes two parameters: the target object and the context object.
 * The target object represents the class or prototype that the decorator is applied to.
 * The context object provides additional information about the field being decorated.
 * @typeParam T - The type of the field being decorated.
 */
export type FieldDecorator<This, Value> = ((target: any, context: FieldDecoratorCtx<This, Value>) => void) & {};

/**
 * Type definition for the FieldDecoratorSupplier function.
 * This function is used to create field decorators.
 * @typeParam T The type of the field value.
 * @param meta The meta service for field validators.
 * @param name The name of the field.
 * @param context The context object for the field decorator.
 * @param args The decorator arguments.
 */
export type FieldDecoratorSupplier<This, Value> = ((
  meta: FieldValidatorMetaService,
  name: string,
  context: FieldDecoratorCtx<This, Value>,
  args: DecoratorArgs
) => void) & {};

/** Represents the context of a field decorator. */
export type FieldDecoratorCtx<This, Value> = Readonly<{
  kind: "getter" | "method" | "field";
  static: boolean;
  private: boolean;
  name: string;
  metadata?: globalThis.DecoratorMetadataObject;
  access: {
    get: (object: This) => Value;
  };
}>;

/**
 * Creates a new field decorator function using the provided supplier.
 * @typeParam T - The type of the field being decorated.
 * @param supplier - A callback that defines the basic field decorator behavior.
 * @returns A basic field decorator factory.
 */
export function createFieldDecorator<Value, Class>(
  supplier: FieldDecoratorSupplier<Value, Class>
): FieldDecorator<Value, Class> {
  return function (target, context) {
    const isStage2 = typeof context === "string";
    const nameEval = isStage2 ? context : context.name;
    const strategyEval = isStage2 ? target.constructor : context;
    const contextEval = isStage2 ? { name: context, metadata: {} } : context;
    const metaService = FieldValidatorMetaService.inject(strategyEval, EventEmitter.EMPTY);
    supplier(metaService, String(nameEval), contextEval as any, {});
  };
}
