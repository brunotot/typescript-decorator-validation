import $ from "..";
import EvaluatedStrategy from "./evaluated-strategy.type";

/**
 * @typeParam T - The type of the value being evaluated.
 *
 * @type
 *
 * @description
 * Represents validation errors for a value of type `T`. This type is used in
 * conjunction with the `EvaluatedStrategy` to provide validation results as
 * an array of error messages.
 */
type Errors<T> = EvaluatedStrategy<T, string[], $.Params.partial["enabled"]>;

/**
 * @description
 * The default export for the `Errors` type.
 */
export default Errors;
