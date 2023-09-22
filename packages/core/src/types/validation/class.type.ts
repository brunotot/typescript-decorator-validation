/**
 * @typeParam T - The type to be instantiated by the class constructor.
 *
 * @type
 *
 * @description
 * Represents a class constructor that can create instances of type `T`.
 *
 * Usage:
 * ```typescript
 * class MyClass {
 *   constructor(arg1: string, arg2: number) {
 *     // ...
 *   }
 * }
 *
 * const myClassConstructor: Class<MyClass> = MyClass;
 * const instance = new myClassConstructor('hello', 42); // Creates an instance of MyClass
 * ```
 */
type Class<T> = new (...args: any[]) => T;

/**
 * @description
 * The default export for the `Class` type.
 */
export default Class;
