import $ from "..";
import Validation from "../namespace/validation.namespace";
import EvaluatedStrategy from "./evaluated-strategy.type";

/**
 * Represents detailed errors for validation results when calling `validate`
 * or `validateField` method of `EntityProcessor` instance.
 *
 * @typeParam T - The type of the value being evaluated.
 *
 * @remarks
 * Represents detailed validation errors for a value of type `T`. This type
 * is used in conjunction with the `EvaluatedStrategy` to provide detailed
 * validation results.
 */
type DetailedErrors<T> = EvaluatedStrategy<
  T,
  Validation.Result[],
  $.Params.partial["enabled"]
>;

export default DetailedErrors;
