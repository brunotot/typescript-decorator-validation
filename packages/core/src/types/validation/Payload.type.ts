import { $ } from "../namespace/Utility.ns";
import { EvaluatedStrategy } from "./EvaluatedStrategy";

export type Payload<
  T,
  TPartial extends $.TArg<"partial"> = $.TArgGet<"partial">["enabled"]
> = EvaluatedStrategy<T, undefined, TPartial>;
