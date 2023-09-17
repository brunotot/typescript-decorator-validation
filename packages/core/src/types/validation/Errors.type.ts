import { $ } from "../namespace/Utility.ns";
import { EvaluatedStrategy } from "./EvaluatedStrategy";

export type Errors<T> = EvaluatedStrategy<
  T,
  string[],
  $.TArgGet<"partial">["enabled"]
>;
