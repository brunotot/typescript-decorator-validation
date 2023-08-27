import { Dispatch, SetStateAction } from "react";
import { DetailedErrors, EntityProcessor, Errors } from "tdv-core";

export type DecoratedValidation<TClass, TBody = TClass> = {
  form: TBody;
  setForm: Dispatch<SetStateAction<TBody>>;
  isValid: boolean;
  detailedErrors: DetailedErrors<TClass>;
  errors: Errors<TClass>;
  processor: EntityProcessor<TClass>;
};
