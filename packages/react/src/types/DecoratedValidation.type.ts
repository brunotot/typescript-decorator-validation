import { DetailedErrors, Errors } from "tdv-core";

export type DecoratedValidation<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  valid: boolean;
  detailedErrors: DetailedErrors<T>;
  errors: Errors<T>;
};
