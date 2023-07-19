import { ValidationGroup } from "../decorators/types/DecoratorProps.type";
import { ValidationEvaluator } from "./ValidationEvaluator.type";

export type ValidationMetadata<T> = {
  groups: ValidationGroup[];
  validate: ValidationEvaluator<T>;
};
