import { Dispatch, SetStateAction } from "react";
import { TdvCore, ValidationEngine } from "tdv-core";

/**
 * A namespace which holds all necessary data for `useValidation` hook
 */
namespace UseValidationHook {
  /**
   * Validation-specific properties object which is meant to be consumed in a React component
   */
  export type UseValidationData<TClass, TBody = TClass> = {
    isValid: boolean;
    detailedErrors: TdvCore.EvaluatedStrategyFactory.DetailedErrors<TClass>;
    errors: TdvCore.EvaluatedStrategyFactory.Errors<TClass>;
    engine: ValidationEngine<TClass, TBody>;
  };

  /**
   * A type representing the return value of `useValidation` hook and is consisted of form state getter & setter and other data defined in `UseValidationData` type
   */
  export type UseValidationReturn<TClass, TBody = TClass> = readonly [
    TBody,
    Dispatch<SetStateAction<TBody>>,
    UseValidationData<TClass, TBody>
  ];

  /**
   * The configuration object of `useValidation` hook. Accepts a default value and groups which should be taken into consideration when validating
   */
  export type UseValidationConfig<TBody> = {
    defaultValue?: TBody;
    groups?: TdvCore.Validation.Group[];
  };
}

export default UseValidationHook;
