import { ValidationResult } from "./ValidationResult.type";

export type ValidationEvaluator<T> = (
  value: T,
  context?: any
) => ValidationResult;
