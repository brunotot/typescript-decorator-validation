import { Dispatch, SetStateAction } from "react";
import { Errors, ValidationGroup } from "tdv-core";
import FormContextNamespace from "../../contexts/FormContext/types";

namespace UseFormHook {
  export type UseFormConfig<TClass, TBody = TClass> = {
    defaultValue?: TBody;
    validationGroups?: ValidationGroup[];
    validateImmediately?: boolean;
    standalone?: boolean;
    onSubmit?: () => Promise<void> | void;
    onSubmitValidationFail?: (errors: Errors<TClass>) => void;
    whenChanged?: () => void;
  };

  export type UseFormData<TClass, TBody = TClass> = {
    isValid: boolean;
    isSubmitted: boolean;
    cachedHandlers: UseFormChangeHandlerMap<TBody>;
    onSubmit: () => Promise<void>;
    handleChange: UseFormSetterFn<TBody>;
    providerProps: Omit<FormContextNamespace.FormProviderProps, "children">;
    errors: Errors<TClass>;
    resetForm: () => void;
  };

  export type UseFormReturn<TClass, TBody = TClass> = readonly [
    TBody,
    Dispatch<SetStateAction<TBody>>,
    UseFormData<TClass, TBody>
  ];

  export type UseFormSetterFnArg<TBody, TKey extends keyof TBody> =
    | TBody[TKey]
    | ((prev: TBody[TKey]) => TBody[TKey]);

  export type UseFormSetterFn<TBody> = <TKey extends keyof TBody>(
    key: TKey,
    value: UseFormSetterFnArg<TBody, TKey>
  ) => void;

  export type UseFormChangeHandlerMap<TBody> = {
    [TKey in keyof TBody]: (value: TBody[TKey]) => void;
  };
}

export default UseFormHook;
