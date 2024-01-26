import { ClassValidatorMetaService } from "@reflection";
import { EventEmitter, type Types } from "@utilities";

/**
 * Represents a class decorator function.
 * @typeParam TClass - The type of the class being decorated.
 * @param baseClass - The base class being decorated.
 * @param context - The context object for the class decorator.
 * @returns The decorated class or undefined/void.
 */
export type ClassDecorator<TClass extends Types.Class> = ((
  baseClass: TClass,
  context: ClassDecoratorCtx<TClass>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => TClass | undefined | void) & {};

/**
 * Type definition for a class decorator supplier.
 * A class decorator supplier is a function that takes in metadata, base class, and context,
 * and returns a modified class or undefined/void.
 * @typeParam TClass - The type of the base class.
 * @param meta - The metadata service for class validation.
 * @param baseClass - The base class to be decorated.
 * @param context - The context object for the class decorator.
 * @returns The modified class or undefined/void.
 */
export type ClassDecoratorSupplier<TClass extends Types.Class> = ((
  meta: ClassValidatorMetaService<TClass>,
  baseClass: TClass,
  context: ClassDecoratorCtx<TClass>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => TClass | undefined | void) & {};

/**
 * Type definition for the context of a class decorator.
 * @typeParam T - The type of the class being decorated.
 */
export type ClassDecoratorCtx<T extends Types.Class> = ClassDecoratorContext<T>;

/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export function createClassDecorator<TClass extends Types.Class>(
  supplier: ClassDecoratorSupplier<TClass>
): ClassDecorator<any> {
  return function (baseClass, context) {
    return supplier(
      ClassValidatorMetaService.inject(context, EventEmitter.EMPTY),
      baseClass,
      context
    );
  };
}
