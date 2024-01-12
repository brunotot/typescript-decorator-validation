import { DecoratorArgs } from "@decorators/helper";
import { FieldValidatorMetaService } from "@reflection";
import { EventEmitter } from "@utilities";

/**
 * Represents a field decorator function that is used to decorate fields in a class.
 * The decorator function takes two parameters: the target object and the context object.
 * The target object represents the class or prototype that the decorator is applied to.
 * The context object provides additional information about the field being decorated.
 * @typeParam T - The type of the field being decorated.
 */
export type FieldDecorator<T extends unknown> = ((target: any, context: FieldDecoratorCtx<T>) => void) & {};

/**
 * Type definition for the FieldDecoratorSupplier function.
 * This function is used to create field decorators.
 * @typeParam T The type of the field value.
 * @param meta The meta service for field validators.
 * @param name The name of the field.
 * @param context The context object for the field decorator.
 * @param args The decorator arguments.
 */
export type FieldDecoratorSupplier<T extends unknown = unknown> = ((
  meta: FieldValidatorMetaService,
  name: string,
  context: FieldDecoratorCtx<T>,
  args: DecoratorArgs
) => void) & {};

/** Represents the context of a field decorator. */
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
export function createFieldDecorator<T extends unknown>(supplier: FieldDecoratorSupplier<T>): FieldDecorator<T> {
  return function (target, context) {
    const isStage2 = typeof context === "string";
    const nameEval = isStage2 ? context : context.name;
    const strategyEval = isStage2 ? target.constructor : context;
    const contextEval = isStage2 ? { name: context, metadata: {} } : context;
    const metaService = FieldValidatorMetaService.inject(strategyEval, EventEmitter.EMPTY);
    supplier(metaService, String(nameEval), contextEval as any, {});
  };
}
