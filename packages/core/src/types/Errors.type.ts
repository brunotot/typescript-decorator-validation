import { EvaluatedStrategy } from "./EvaluatedStrategy";

export type Errors<T> = Partial<EvaluatedStrategy<T, string[]>>;
