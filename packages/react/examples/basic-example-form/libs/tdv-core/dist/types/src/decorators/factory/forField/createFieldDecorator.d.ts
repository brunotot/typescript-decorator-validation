import API from "../../../index";
export type FieldDecorator<T extends unknown> = ((target: any, context: FieldDecoratorCtx<T>) => void) & {};
export type FieldDecoratorSupplier<T extends unknown = unknown> = ((meta: API.Reflection.FieldValidatorMetaService, name: string, context: FieldDecoratorCtx<T>, args: API.Decorator.DecoratorArgs) => void) & {};
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
export declare function createFieldDecorator<T extends unknown>(supplier: FieldDecoratorSupplier<T>): FieldDecorator<T>;
//# sourceMappingURL=createFieldDecorator.d.ts.map