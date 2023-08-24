import { Dispatch, SetStateAction } from "react";
import { DetailedErrors, EntityProcessor, Errors } from "tdv-core";
export type DecoratedValidation<T> = {
    form: T;
    setForm: Dispatch<SetStateAction<T>>;
    isValid: boolean;
    detailedErrors: DetailedErrors<T>;
    errors: Errors<T>;
    processor: EntityProcessor<T>;
};
