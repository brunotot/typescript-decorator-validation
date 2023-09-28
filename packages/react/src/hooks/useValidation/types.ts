import { Dispatch, SetStateAction } from "react";
import { TdvCore, ValidationEngine } from "tdv-core";

namespace UseValidationHook {
  export type UseValidationData<TClass, TBody = TClass> = {
    isValid: boolean;
    detailedErrors: TdvCore.EvaluatedStrategyFactory.DetailedErrors<TClass>;
    errors: TdvCore.EvaluatedStrategyFactory.Errors<TClass>;
    processor: ValidationEngine<TClass, TBody>;
  };

  export type UseValidationReturn<TClass, TBody = TClass> = readonly [
    TBody,
    Dispatch<SetStateAction<TBody>>,
    UseValidationData<TClass, TBody>
  ];

  export type UseValidationConfig<TBody> = {
    defaultValue?: TBody;
    groups?: TdvCore.Validation.Group[];
  };
}

export default UseValidationHook;
