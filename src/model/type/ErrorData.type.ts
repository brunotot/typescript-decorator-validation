import { RecursiveComplexType } from "../utility/type.utility";
import { ValidationResult } from "./ValidationResult.type";

export type ErrorData<T> = RecursiveComplexType<T, ValidationResult[]>;
