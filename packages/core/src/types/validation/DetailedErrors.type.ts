import { $ } from "../namespace/Utility.ns";
import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { ValidationResult } from "./ValidationResult.type";

export type DetailedErrors<T> = EvaluatedStrategy<
  T,
  ValidationResult[],
  $.TArgGet<"partial">["enabled"]
>;
