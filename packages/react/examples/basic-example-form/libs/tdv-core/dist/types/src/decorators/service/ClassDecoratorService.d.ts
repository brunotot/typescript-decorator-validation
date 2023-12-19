import API from "../../../index";
/**
 * Namespace that provides various types and utility functions for Class Decorators.
 */
declare namespace ClassDecoratorService {
    /**
     * Type alias for any class - indicates that a decorator may be only put on a class (not field).
     */
    type Type = API.Utilities.Types.Class<any>;
    /**
     * Return type definition for `Supplier` and `Instance` - a class `T` or nullable.
     */
    type ReturnDef<T extends Type> = API.Utilities.Types.Class<T> | undefined | void;
    /**
     * Type definition for the Supplier function.
     * @param meta - Metadata object.
     * @param baseClass - The base class.
     * @param context - Additional context information.
     */
    type Supplier<T extends Type> = ((meta: API.Reflection.Services.ClassValidatorMetaService<API.Utilities.Types.Class<T>>, baseClass: API.Utilities.Types.Class<T>, context: Context<T>) => ReturnDef<T>) & {};
    /**
     * Type definition for the native `ClassDecoratorContext`.
     */
    type Context<T extends Type> = ClassDecoratorContext<T>;
    /**
     * Type definition for the Instance function.
     * @param baseClass - The base class.
     * @param context - Additional context information.
     */
    type Instance<T extends Type> = ((baseClass: API.Utilities.Types.Class<T>, context: Context<T>) => ReturnDef<T>) & {};
    /**
     * Builds an Instance function using the provided Supplier function.
     * @param supplier - A Supplier function to use for building the Instance.
     * @returns An Instance function.
     */
    function build<T extends Type>(supplier: Supplier<API.Utilities.Types.UnwrapClass<T>>): Instance<any>;
}
export default ClassDecoratorService;
//# sourceMappingURL=ClassDecoratorService.d.ts.map