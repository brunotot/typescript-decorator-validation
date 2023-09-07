import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { $ } from "./namespace/Utility.ns";

export type Payload<
  T,
  TPartial extends $.TArg<"partial"> = $.TArgGet<"partial">["enabled"]
> = EvaluatedStrategy<T, undefined, TPartial>;
