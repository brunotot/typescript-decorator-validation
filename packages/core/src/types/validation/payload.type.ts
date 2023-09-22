import $ from "..";
import EvaluatedStrategy from "./evaluated-strategy.type";

/**
 * @typeParam T - The type of payload to be evaluated.
 * @typeParam TPartial - The type representing partial values for optional fields.
 *
 * @type
 *
 * @description
 * Represents a payload of type `T` with an evaluated strategy for handling optional fields.
 * This type is used to define how validation or processing should be applied to a payload of type `T`.
 */
type Payload<
  T,
  TPartial extends $.Params.valuePartial = $.Params.partial["enabled"]
> = EvaluatedStrategy<T, undefined, TPartial>;

export default Payload;
