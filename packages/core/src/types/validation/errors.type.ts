import $ from "..";
import EvaluatedStrategy from "./evaluated-strategy.type";

type Errors<T> = EvaluatedStrategy<T, string[], $.Params.partial["enabled"]>;

export default Errors;
