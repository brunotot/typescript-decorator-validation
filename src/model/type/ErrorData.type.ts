import { EvaluatedStrategy } from "../utility/type.utility";
import { ValidationResult } from "./ValidationResult.type";

export type ErrorData<T> = EvaluatedStrategy<T, ValidationResult[]>;
