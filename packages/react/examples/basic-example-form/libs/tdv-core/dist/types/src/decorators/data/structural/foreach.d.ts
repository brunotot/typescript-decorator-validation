import API from "../../../../index";
import { FieldDecorator } from "./../../../decorators";
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
export declare function foreach<T extends NonNullable<API.Utilities.Types.ArrayType | (() => API.Utilities.Types.ArrayType)>>(...validators: FieldDecorator<API.Utilities.Arrays.getArrayType<T>>[]): FieldDecorator<T>;
//# sourceMappingURL=foreach.d.ts.map