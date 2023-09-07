import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { ValidationResult } from "./ValidationResult.type";
import { $ } from "./namespace/Utility.ns";

export type DetailedErrors<T> = EvaluatedStrategy<
  T,
  ValidationResult[],
  $.TArgGet<"partial">["enabled"]
>;
