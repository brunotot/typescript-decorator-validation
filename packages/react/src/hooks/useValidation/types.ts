import { Dispatch, SetStateAction } from "react";
import TdvCore, { Validation } from "tdv-core";

/**
 * A namespace which holds all necessary data for `useValidation` hook
 */
namespace UseValidationHook {
  /**
   * Validation-specific properties object which is meant to be consumed in a React component
   */
  export type UseValidationData<TClass> = {
    isValid: boolean;
    detailedErrors: TdvCore.Strategy.Factory.Impl.DetailedErrors<TClass>;
    errors: TdvCore.Strategy.Factory.Impl.Errors<TClass>;
    engine: Validation.ValidationEngine<TClass>;
  };

  /**
   * A type representing the return value of `useValidation` hook and is consisted of form state getter & setter and other data defined in `UseValidationData` type
   */
  export type UseValidationReturn<TClass> = readonly [
    TdvCore.Utilities.Objects.Payload<TClass>,
    Dispatch<SetStateAction<TdvCore.Utilities.Objects.Payload<TClass>>>,
    UseValidationData<TClass>
  ];

  /**
   * The configuration object of `useValidation` hook. Accepts a default value and groups which should be taken into consideration when validating
   */
  export type UseValidationConfig<TClass> = {
    defaultValue?: TdvCore.Utilities.Objects.Payload<TClass>;
    groups?: string[];
  };
}

export default UseValidationHook;
