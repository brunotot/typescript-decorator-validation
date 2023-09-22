import $ from "..";
import Validation from "../namespace/validation.namespace";
import EvaluatedStrategy from "./evaluated-strategy.type";

/**
 * @typeParam T - The type of the value being evaluated.
 *
 * @type
 *
 * @description
 * Represents detailed validation errors for a value of type `T`. This type
 * is used in conjunction with the `EvaluatedStrategy` to provide detailed
 * validation results.
 */
type DetailedErrors<T> = EvaluatedStrategy<
  T,
  Validation.Result[],
  $.Params.partial["enabled"]
>;

/**
 * @description
 * The default export for the `DetailedErrors` type.
 */
export default DetailedErrors;
