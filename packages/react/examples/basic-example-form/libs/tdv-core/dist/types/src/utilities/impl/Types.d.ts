import * as Overrides from "../../overrides";
export declare namespace Types {
    /**
     * Represents the JavaScript `Function` type.
     */
    type FunctionType = (() => any) & {};
    /**
     * Represents the generic array type.
     */
    type ArrayType = any[];
    export import PrimitiveType = Overrides.PrimitiveType;
    /**
     * Represents a class constructor that can create instances of type `T`.
     *
     * @typeParam T - The type to be instantiated by the class constructor.
     *
     * @example
     * ```typescript
     * class MyClass {
     *   constructor(arg1: string, arg2: number) {
     *     // ...
     *   }
     * }
     *
     * const myClassConstructor: Class<MyClass> = MyClass;
     * const instance = new myClassConstructor('hello', 42);
     * // Creates an instance of MyClass
     * ```
     */
    type Class<T = {}> = (new (...args: any[]) => T) & {};
    /**
     * Unwraps a Promise type to its resolved value type.
     * @typeParam T - The type to unwrap.
     */
    type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
    /**
     * Unwraps a Class type to its instance type.
     * @typeParam T - The type to unwrap.
     */
    type UnwrapClass<T> = T extends Class<infer U> ? U : never;
    /**
     * Prettifies a type by retaining the same shape.
     * @typeParam T - The type to prettify.
     */
    type Prettify<T> = {
        [K in keyof T]: T[K];
    } & {};
}
//# sourceMappingURL=Types.d.ts.map