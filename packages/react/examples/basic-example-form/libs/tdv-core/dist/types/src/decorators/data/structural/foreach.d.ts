import { type FieldDecorator } from "../../factory/forField/createFieldDecorator";
import { type Arrays, type Types } from "../../../utilities";
/**
 * Creates a validator decorator which applies multiple validators to each element in array field.
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A decorator function to use with class array fields.
 * @example
 * 1: Applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 * ```ts
 * class MyClass {
 *   \@foreach(\@MinLength(5), \@MaxLength(10))
 *   names: string[];
 * }
 * ```
 */
export declare function foreach<T extends NonNullable<Types.ArrayType | (() => Types.ArrayType)>, Class>(...validators: Array<FieldDecorator<Arrays.getArrayType<T>, Class>>): FieldDecorator<T, Class>;
//# sourceMappingURL=foreach.d.ts.map