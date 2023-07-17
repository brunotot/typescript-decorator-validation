import { EvaluatedStrategy } from "../utility/type.utility";
import { Validation } from "./Validation.type";

export type DetailedErrors<T> = EvaluatedStrategy<T, Validation[]>;
