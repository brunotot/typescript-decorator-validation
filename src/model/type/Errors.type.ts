import { EvaluatedStrategy } from "../utility/type.utility";

export type Errors<T> = EvaluatedStrategy<T, string[]>;
