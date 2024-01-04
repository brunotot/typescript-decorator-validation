import API from "../../../index";
export type ClassDecorator<TClass extends API.Utilities.Types.Class> = ((baseClass: TClass, context: ClassDecoratorCtx<TClass>) => TClass | undefined | void) & {};
export type ClassDecoratorSupplier<TClass extends API.Utilities.Types.Class> = ((meta: API.Reflection.ClassValidatorMetaService<TClass>, baseClass: TClass, context: ClassDecoratorCtx<TClass>) => TClass | undefined | void) & {};
export type ClassDecoratorCtx<T extends API.Utilities.Types.Class> = ClassDecoratorContext<T>;
/**
 * Creates a new class decorator function using the provided supplier.
 *
 * @typeParam T - The type of the class being decorated.
 * @param supplier - A callback that defines the basic class decorator behavior and returns the modified class.
 * @returns A basic class decorator factory.
 */
export declare function createClassDecorator<TClass extends API.Utilities.Types.Class>(supplier: ClassDecoratorSupplier<TClass>): ClassDecorator<any>;
//# sourceMappingURL=createClassDecorator.d.ts.map