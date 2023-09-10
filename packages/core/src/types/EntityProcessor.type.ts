import { DetailedErrors } from "./DetailedErrors.type";
import { Errors } from "./Errors.type";
import { Payload } from "./Payload.type";
import { ValidationResult } from "./ValidationResult.type";
import { $ } from "./namespace/Utility.ns";

export type EntityProcessorResult<T> = {
  valid: boolean;
  detailedErrors: DetailedErrors<T>;
  errors: Errors<T>;
};

export type ValidityErrorsType =
  | EntityProcessorResult<any>
  | EntityProcessorResult<any>[]
  | ValidationResult[]
  | ValidationResult[][];

export type EntityProcessorCache<
  TClass,
  TBody = TClass
> = EntityProcessorResult<TClass> & {
  state: Payload<TBody>;
};

export type CacheKey<T> = Exclude<$.Keys<EntityProcessorCache<T>>, "state">;
