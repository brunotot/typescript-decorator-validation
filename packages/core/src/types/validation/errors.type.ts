import $ from "..";
import EvaluatedStrategy from "./evaluated-strategy.type";

/**
 * Represents simple errors for validation results when calling `validate`
 * or `validateField` method of `EntityProcessor` instance.
 *
 * @typeParam T - The type of the value being evaluated.
 *
 * @remarks
 * Represents validation errors for a value of type `T`. This type is used in
 * conjunction with the `EvaluatedStrategy` to provide validation results as
 * an array of error messages.
 */
type Errors<T> = EvaluatedStrategy<T, string[], $.Params.partial["enabled"]>;

export default Errors;
