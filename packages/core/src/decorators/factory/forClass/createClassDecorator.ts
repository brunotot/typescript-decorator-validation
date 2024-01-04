import API from "../../../index";
import { EventEmitter } from "../../../utilities/misc/EventEmitter";

export type ClassDecorator<TClass extends API.Utilities.Types.Class> = ((
  baseClass: TClass,
  context: ClassDecoratorCtx<TClass>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => TClass | undefined | void) & {};

export type ClassDecoratorSupplier<TClass extends API.Utilities.Types.Class> = ((
  meta: API.Reflection.ClassValidatorMetaService<TClass>,
  baseClass: TClass,
  context: ClassDecoratorCtx<TClass>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => TClass | undefined | void) & {};

export type ClassDecoratorCtx<T extends API.Utilities.Types.Class> = ClassDecoratorContext<T>;

/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export function createClassDecorator<TClass extends API.Utilities.Types.Class>(
  supplier: ClassDecoratorSupplier<TClass>
): ClassDecorator<any> {
  return function (baseClass, context) {
    return supplier(
      API.Reflection.ClassValidatorMetaService.inject(baseClass ?? context, EventEmitter.EMPTY),
      baseClass,
      context
    );
  };
}
