import { Dispatch, SetStateAction } from "react";
import { DetailedErrors, EntityProcessor, Errors } from "tdv-core";

export type DecoratedValidation<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  valid: boolean;
  detailedErrors: DetailedErrors<T>;
  errors: Errors<T>;
  processor: EntityProcessor<T>;
};
