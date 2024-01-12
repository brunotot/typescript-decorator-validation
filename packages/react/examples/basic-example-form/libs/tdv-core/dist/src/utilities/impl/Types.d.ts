/**
 * An overridable interface designed for disabling nested validation on custom object types.
 * - when specified ***(example 1)***: an object type is considered primitive and it's simplified errors render as `string[]`
 * - when not specified ***(example 2)***: an object type is considered as is and it's simplified errors are evaluated by {@link Strategy.Impl.Errors evaluate<T, string[]>})
 *
 * @example
 * 1: Disabling nested form validation for `Coordinate` class by augmenting the `PrimitiveSet` interface from `tdv-core`. This is a way of treating custom object types as primitives and avoiding recursive field validation
 * ```ts
 * // coordinate.ts - model class which is considered primitive
 * export class Coordinate {
 *   x: number;
 *   y: number;
 * }
 * ```
 * <div style="height: 1rem"></div>
 * ```ts
 * // index.ts - entry point of the app
 * declare module "tdv-core" {
 *   interface PrimitiveSet {
 *     // Specify object types as primitives here
 *     values: [Coordinate];
 *   }
 * }
 * ```
 * <div style="height: 1rem"></div>
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { createFieldValidator } from "tdv-core";
 * // custom Coordinate validator
 * function MinX(minX: number) {
 *   return createFieldValidator<Coordinate>(coordinate => ({
 *     key: "MinX",
 *     valid: coordinate.x >= minX,
 *     message: `Minimum X is ${minX}`
 *   }))
 * }
 *
 * // Coordinate class definition
 * class Consumer {
 *   \@MinX(10)
 *   coordinate: Coordinate; // primitive, doesn't validate recursively
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // ["Minimum X is 10"]
 * ```
 *
 * @example
 * 2: Default behavior - nested field validation is enabled for `Coordinate` class. It uses `\@attribute` for supplying validation engine with the runtime schema representation of the decorated field (if \@attribute is not defined then a type mismatch occurs between runtime type and compiled type)
 * ```ts
 * // coordinate.ts
 * import { collection } from "tdv-core";
 *
 * export class Coordinate {
 *   \@collection.number.ValueMin(10, { message: "Minimum X is 10" })
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { attribute, Localization, Form, Utilities } from "tdv-core";
 *
 * class Consumer {
 *   \@attribute(Coordinate) // enables deep validation
 *   coordinate: Coordinate; // non-primitive
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // { root: [], data: { x: ["Minimum X is 10"], y: [] } }
 * ```
 */
export interface PrimitiveSet {
}
export declare namespace Types {
    /**
     * Represents the JavaScript `Function` type.
     */
    type FunctionType = (() => any) & {};
    /**
     * Represents the generic array type.
     */
    type ArrayType = any[];
    /**
     * Represents primitive data types including `string`, `number`, `boolean`,
     * `bigint`, `Date`, and custom primitives defined in `PrimitiveSetAppend`.
     */
    type PrimitiveType = [
        ...[string, number, boolean, bigint, Date],
        ...(PrimitiveSet extends {
            values: infer CustomPrimitives extends readonly unknown[];
        } ? CustomPrimitives : [])
    ];
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