import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { $ } from "./namespace/Utility.ns";

export type Errors<T> = EvaluatedStrategy<
  T,
  string[],
  $.TArgGet<"partial">["enabled"]
>;
