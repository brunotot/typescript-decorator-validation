import { Dispatch, SetStateAction } from "react";
import {
  DetailedErrors,
  EntityProcessor,
  Errors,
  ValidationGroup,
} from "tdv-core";

namespace UseValidationHook {
  export type UseValidationData<TClass, TBody = TClass> = {
    isValid: boolean;
    detailedErrors: DetailedErrors<TClass>;
    errors: Errors<TClass>;
    processor: EntityProcessor<TClass, TBody>;
  };

  export type UseValidationReturn<TClass, TBody = TClass> = readonly [
    TBody,
    Dispatch<SetStateAction<TBody>>,
    UseValidationData<TClass, TBody>
  ];

  export type UseValidationConfig<TBody> = {
    defaultValue?: TBody;
    groups?: ValidationGroup[];
  };
}

export default UseValidationHook;
