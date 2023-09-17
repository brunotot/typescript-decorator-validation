import { ValidationGroup } from "../../decorators/decorator.types";
import { ValidationEvaluator } from "./ValidationEvaluator.type";

export type ValidationMetadata<T> = {
  groups: ValidationGroup[];
  validate: ValidationEvaluator<T>;
};
