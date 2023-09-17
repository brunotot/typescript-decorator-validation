import $ from "..";
import EvaluatedStrategy from "./evaluated-strategy.type";

type Payload<
  T,
  TPartial extends $.Params.valuePartial = $.Params.partial["enabled"]
> = EvaluatedStrategy<T, undefined, TPartial>;

export default Payload;
