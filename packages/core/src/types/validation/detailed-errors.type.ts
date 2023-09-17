import $ from "..";
import Validation from "../namespace/validation.namespace";
import EvaluatedStrategy from "./evaluated-strategy.type";

type DetailedErrors<T> = EvaluatedStrategy<
  T,
  Validation.Result[],
  $.Params.partial["enabled"]
>;

export default DetailedErrors;
