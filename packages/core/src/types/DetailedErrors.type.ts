import { EvaluatedStrategy } from "./EvaluatedStrategy";
import { ValidationResult } from "./ValidationResult.type";

export type DetailedErrors<T> = EvaluatedStrategy<T, ValidationResult[]>;
