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
type Class<T> = { new (...args: any[]): T };

export default Class;
