import API from "../../index";
/**
 * Creates a validator decorator which applies multiple validators to each element in array field.
 *
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A decorator function to use with class array fields.
 *
 * @example
 * 1: Applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 * ```ts
 * class MyClass {
 *   \@foreach(\@MinLength(5), \@MaxLength(10))
 *   names: string[];
 * }
 * ```
 */
export declare function foreach<T extends NonNullable<API.Utilities.Types.Array | (() => API.Utilities.Types.Array)>>(...validators: API.Decorator.Instance<API.Utilities.Arrays.getArrayType<T>>[]): API.Decorator.Instance<T>;
//# sourceMappingURL=foreach.d.ts.map