import API from "api";

/**
 * Namespace that provides various types and utility functions for Class Decorators.
 */
namespace ClassDecoratorService {
  /**
   * Type alias for any class - indicates that a decorator may be only put on a class (not field).
   */
  export type Type = API.Utilities.Types.Class<any>;

  /**
   * Return type definition for `Supplier` and `Instance` - a class `T` or nullable.
   */
  export type ReturnDef<
    Class extends API.Utilities.Types.Class<any> = API.Utilities.Types.Class<any>
  > =
    | Class
    | undefined
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    | void;

  /**
   * Type definition for the Supplier function.
   * @param meta - Metadata object.
   * @param baseClass - The base class.
   * @param context - Additional context information.
   */
  export type Supplier<
    Class extends API.Utilities.Types.Class<any> = API.Utilities.Types.Class<any>
  > = ((
    meta: API.Reflection.Services.ClassValidatorMetaService<Class>,
    baseClass: Class,
    context: ClassDecoratorContext<Class>
  ) => ReturnDef<Class>) & {};

  /**
   * Type definition for the native `ClassDecoratorContext`.
   */
  export type Context<T extends Type> = ClassDecoratorContext<T>;

  /**
   * Type definition for the Instance function.
   * @param baseClass - The base class.
   * @param context - Additional context information.
   */
  export type Instance<T extends Type> = ((
    baseClass: API.Utilities.Types.Class<T>,
    context: Context<T>
  ) => ReturnDef<T>) & {};

  /**
   * Builds an Instance function using the provided Supplier function.
   * @param supplier - A Supplier function to use for building the Instance.
   * @returns An Instance function.
   */
  export function build<
    Class extends API.Utilities.Types.Class<any> = API.Utilities.Types.Class<any>
  >(supplier: Supplier<Class>) {
    return function (baseClass: Class, context: ClassDecoratorContext<Class>) {
      return supplier(
        API.Reflection.Services.ClassValidatorMetaService.inject(context),
        baseClass,
        context
      );
    };
  }
}

export default ClassDecoratorService;
