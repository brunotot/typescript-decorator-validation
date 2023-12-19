import API from "../../../index";
/**
 * Namespace for FieldDecorator Service Types.
 */
declare namespace FieldDecoratorService {
    /**
     * Represents the generic type for the value being decorated.
     */
    type Type = unknown;
    /**
     * Type definition for supplying a function that will act as the decorator logic.
     *
     * @typeParam T - The type of the value being decorated.
     *
     * @param meta - Metadata service that can be used for more advanced validation scenarios.
     * @param name - The name of the property being decorated.
     * @param context - The context in which the decorator is being applied.
     *
     * @returns The return definition as specified by ReturnDef.
     */
    type Supplier<T extends Type = Type> = ((meta: API.Reflection.Services.FieldValidatorMetaService, name: string, context: Context<T>) => void) & {};
    /**
     * Context object passed to a field decorator function.
     *
     * @typeParam T - The type of the value being decorated.
     *
     * @property kind - The kind of member being decorated (getter, method, field).
     * @property static - Boolean indicating whether the member is static.
     * @property private - Boolean indicating whether the member is private.
     * @property name - The name of the member being decorated.
     * @property metadata - Additional metadata associated with the decorator.
     * @property access - An object with a get method for accessing the value.
     */
    type Context<T> = Readonly<{
        kind: "getter" | "method" | "field";
        static: boolean;
        private: boolean;
        name: string;
        metadata: globalThis.DecoratorMetadata;
        access: {
            get: (object: any) => T;
        };
    }>;
    /**
     * Type definition for a decorator function instance.
     *
     * @typeParam T - The type of the value being decorated.
     *
     * @param target - The object that owns the decorated property.
     * @param context - The context in which the decorator is being applied.
     *
     * @returns The return definition as specified by ReturnDef.
     */
    type Instance<T extends Type> = ((target: any, context: Context<T>) => void) & {};
    /**
     * Creates a new validator function using the provided validation builder options.
     *
     * @typeParam T - The type of the value being validated.
     *
     * @param groups - An array of group names that this validator belongs to. Validators in the same group can be executed together.
     * @param isValid - A function that performs the actual validation logic. It takes a value of type `T` and returns a boolean indicating whether the value is valid.
     *
     * @returns A decorator function that can be applied to class properties to add the validation logic.
     *
     * @remarks
     * This function leverages the `makeDecorator` function to create a new decorator.
     * It uses the `validationMetaService` to add the new validator to the metadata for the property it decorates.
     *
     * @example
     * ```typescript
     * const IsPositive = FieldValidatorDecorator.build<number>({
     *   groups: ['group1'],
     *   isValid: (value) => value > 0
     * });
     *
     * class MyClass {
     *   \@IsPositive
     *   public myValue: number;
     * }
     * ```
     */
    function build<T extends Type>(supplier: Supplier<T>): Instance<T>;
}
export default FieldDecoratorService;
//# sourceMappingURL=FieldDecoratorService.d.ts.map