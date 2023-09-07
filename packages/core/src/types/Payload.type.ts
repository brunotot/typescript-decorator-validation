import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { $ } from "./namespace/Utility.ns";

export type Payload<T> = EvaluatedStrategy<
  T,
  undefined,
  $.TArgGet<"partial">["enabled"]
>;
