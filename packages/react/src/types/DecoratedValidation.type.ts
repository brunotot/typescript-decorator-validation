import { DetailedErrors, Errors } from "tdv-core";
import { Dispatch, SetStateAction } from "react";

export type DecoratedValidation<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  valid: boolean;
  detailedErrors: DetailedErrors<T>;
  errors: Errors<T>;
};
