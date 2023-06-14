import { RecursiveComplexType } from "../utility/type.utility";
import { ValidationResult } from "./validation-result.type";

export type ErrorData<T> = RecursiveComplexType<T, ValidationResult[]>;
