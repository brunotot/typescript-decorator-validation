import { Dispatch, SetStateAction } from "react";
import { TdvCore } from "tdv-core";
import FormContextNamespace from "../../contexts/FormContext/types";

/**
 * A namespace containing all types related to the `useForm` hook.
 */
namespace UseFormHook {
  /**
   * Configuration options for the `useForm` hook.
   */
  export type UseFormConfig<TClass> = {
    defaultValue?: TdvCore.Helper.Payload<TClass>;
    validationGroups?: TdvCore.Validation.Group[];
    validateImmediately?: boolean;
    standalone?: boolean;
    onSubmit?: () => Promise<void> | void;
    onSubmitValidationFail?: (
      errors: TdvCore.StrategyFactory.Impl.Errors<TClass>
    ) => void;
    onChange?: () => void;
  };

  /**
   * Data returned from the `useForm` hook.
   */
  export type UseFormData<TClass> = {
    isValid: boolean;
    isSubmitted: boolean;
    onSubmit: () => Promise<void>;
    mutations: UseFormChangeHandlerMap<TdvCore.Helper.Payload<TClass>>;
    providerProps: Omit<FormContextNamespace.FormProviderProps, "children">;
    errors: TdvCore.StrategyFactory.Impl.Errors<TClass>;
    detailedErrors: TdvCore.StrategyFactory.Impl.DetailedErrors<TClass>;
    reset: (
      ...fieldPaths: PayloadFieldPath<TdvCore.Helper.Payload<TClass>>[]
    ) => void;
  };

  /**
   * Type of the value returned by the `useForm` hook.
   */
  export type UseFormReturn<TClass> = readonly [
    TdvCore.Helper.Payload<TClass>,
    Dispatch<SetStateAction<TdvCore.Helper.Payload<TClass>>>,
    UseFormData<TClass>
  ];

  /**
   * Argument type for the form field setter function.
   */
  export type UseFormSetterFnArg<TBody, TKey extends keyof TBody> =
    | TBody[TKey]
    | ((prev: TBody[TKey]) => TBody[TKey]);

  /**
   * Type of the form field setter function.
   */
  export type UseFormSetterFn<TBody> = <TKey extends keyof TBody>(
    key: TKey,
    value: UseFormSetterFnArg<TBody, TKey>
  ) => void;

  /**
   * Map of change handlers for form fields.
   */
  export type UseFormChangeHandlerMap<TBody> = {
    [TKey in keyof TBody]: (value: TBody[TKey]) => void;
  };

  /**
   * A wrapper type for evaluation object paths as strings
   */
  export type ObjectPathEvaluator<T, K extends string> = K extends keyof T
    ? K extends TdvCore.Objects.Inputs<T>
      ? K | `${K}.${PayloadFieldPath<T[K]>}`
      : ""
    : never;

  /**
   * A helper type for evaluation paths as strings representing JavaScript object selectors
   */
  export type PayloadFieldPathEvaluator<T> = {
    [K in keyof T]-?: K extends string
      ? TdvCore.Condition.isFunction<T[K]> extends true
        ? never
        : TdvCore.Condition.isArray<T[K]> extends true
        ? K
        : TdvCore.Condition.isObject<T[K]> extends true
        ? ObjectPathEvaluator<T, K>
        : K extends TdvCore.Objects.Inputs<T>
        ? K
        : never
      : never;
  };

  /**
   * A central method for getting a union of all possible payload field paths
   */
  export type PayloadFieldPath<T> = TdvCore.Condition.isFunction<T> extends true
    ? ""
    : TdvCore.Condition.isObject<T> extends true
    ? PayloadFieldPathEvaluator<T>[keyof T]
    : "";
}

export default UseFormHook;
