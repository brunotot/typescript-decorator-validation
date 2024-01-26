import { type Arrays } from "./Arrays";
import { type Booleans } from "./Booleans";
export declare namespace Objects {
    /**
     * A type that represents an optional value.
     *
     * @typeParam T - The type of the optional value.
     */
    type Optional<T = undefined> = T extends undefined ? any : T | undefined | null;
    /**
     * A predicate function for filtering arrays.
     *
     * @typeParam T - The type of the array elements.
     */
    type ArrayPredicate<T> = ((value: T, index: number, array: T[]) => boolean) & {};
    /**
     * Filters out getters, functions and read-only properties from a type
     */
    type Payload<T> = Purify<{
        [K in keyof T]: true extends Booleans.isAnyOf<true, [
            Booleans.isGetter<T, K>,
            Booleans.isFunction<T[K]>
        ]> ? never : true extends Booleans.isArray<T[K]> ? true extends Booleans.isPrimitive<Arrays.getArrayType<T[K]>> ? T[K] : Arrays.setArrayDepth<Payload<Arrays.getArrayType<T[K]>>, Arrays.getArrayDepth<T[K]>> : true extends Booleans.isPrimitive<T[K]> ? T[K] : Payload<T[K]>;
    }>;
    /**
     * A conditional type that checks if types `X` and `Y` are equal. It returns type `A` if they are equal, and type `B` if they are not.
     *
     * @typeParam X - The first type.
     * @typeParam Y - The second type.
     * @typeParam A - The type to return if `X` and `Y` are equal.
     * @typeParam B - The type to return if `X` and `Y` are not equal.
     */
    type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
    /**
     * A type that excludes properties with values of type `TExclude` from `TParent`.
     *
     * @typeParam TParent - The parent type.
     * @typeParam TExclude - The type to exclude from `TParent`.
     */
    type Exclude<TParent, TExclude> = Pick<TParent, Values<{
        [Prop in keyof TParent]: [TParent[Prop]] extends [TExclude] ? never : Prop;
    }>>;
    /**
     * A type that removes properties with values of type `never` from `T`.
     *
     * @typeParam T - The type to purify.
     */
    type Purify<T> = Exclude<T, never>;
    /**
     * A type that extracts the values from the properties of an object type `T`.
     *
     * @typeParam T - An object type.
     */
    type Values<T> = T[keyof T];
    /**
     * A type that extracts input properties from an object type `T`.
     *
     * @typeParam T - The object type.
     */
    type Inputs<T> = {
        [P in keyof T]-?: IfEquals<{
            [Q in P]: T[P];
        }, {
            -readonly [Q in P]: T[P];
        }, P>;
    }[keyof T];
    /**
     * Removes duplicate elements from an array while preserving order.
     *
     * @typeParam T - The type of the elements in the array.
     */
    function unique<T>(data: T[]): T[];
    /**
     * Recursively checks if two values are deep equal.
     */
    function deepEquals(val1: any, val2: any): boolean;
    /**
     * Hashes a value of any type and returns a number.
     */
    function hash(val: any): number;
    /**
     * Debounces a function.
     * @param fn - The function to debounce.
     * @param delay - The delay time in milliseconds.
     * @returns A debounced function.
     */
    function debounce(fn: Function, delay: number): Function;
    type FieldType = "date" | "array" | "string" | "number" | "boolean" | "object";
    function assertType(type: FieldType, value: any): void | never;
}
//# sourceMappingURL=Objects.d.ts.map