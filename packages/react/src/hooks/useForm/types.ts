import { type Dispatch, type SetStateAction } from "react";
import { type ValidationResult } from "tdv-core";
import type TdvCore from "tdv-core";
import type FormContextNamespace from "../../contexts/FormContext/types";

/**
 * A namespace containing all types related to the `useForm` hook.
 */
namespace UseFormHook {
  /**
   * Configuration options for the `useForm` hook.
   */
  export type UseFormConfig<TClass> = {
    defaultValue?: TdvCore.Utilities.Objects.Payload<TClass>;
    validationGroups?: string[];
    validateImmediately?: boolean;
    standalone?: boolean;
    resolveDecoratorArgs?: () => TdvCore.Decorator.DecoratorArgs;
    onSubmit?: () => Promise<void> | void;
    onSubmitValidationFail?: (errors: TdvCore.Strategy.Impl.Errors<TClass>) => void;
    onChange?: (value: TdvCore.Utilities.Objects.Payload<TClass>) => void;
    asyncDelay?: number;
    locale?: TdvCore.Localization.Locale;
  };

  /**
   * Data returned from the `useForm` hook.
   */
  export type UseFormData<TClass> = {
    isValid: boolean;
    isSubmitted: boolean;
    onSubmit: () => Promise<void>;
    mutations: UseFormChangeHandlerMap<TdvCore.Utilities.Objects.Payload<TClass>>;
    providerProps: Omit<FormContextNamespace.FormProviderProps, "children">;
    globalErrors: ValidationResult[];
    errors: TdvCore.Strategy.Impl.Errors<TClass>;
    detailedErrors: TdvCore.Strategy.Impl.DetailedErrors<TClass>;
    reset: (
      ...fieldPaths: Array<PayloadFieldPath<TdvCore.Utilities.Objects.Payload<TClass>>>
    ) => void;
  };

  /**
   * Type of the value returned by the `useForm` hook.
   */
  export type UseFormReturn<TClass> = readonly [
    TdvCore.Utilities.Objects.Payload<TClass>,
    Dispatch<SetStateAction<TdvCore.Utilities.Objects.Payload<TClass>>>,
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
    ? K extends TdvCore.Utilities.Objects.Inputs<T>
      ? K | `${K}.${PayloadFieldPath<T[K]>}`
      : ""
    : never;

  /**
   * A helper type for evaluation paths as strings representing JavaScript object selectors
   */
  export type PayloadFieldPathEvaluator<T> = {
    [K in keyof T]-?: K extends string
      ? TdvCore.Utilities.Booleans.isFunction<T[K]> extends true
        ? never
        : TdvCore.Utilities.Booleans.isArray<T[K]> extends true
        ? K
        : TdvCore.Utilities.Booleans.isObject<T[K]> extends true
        ? ObjectPathEvaluator<T, K>
        : K extends TdvCore.Utilities.Objects.Inputs<T>
        ? K
        : never
      : never;
  };

  /**
   * A central method for getting a union of all possible payload field paths
   */
  export type PayloadFieldPath<T> = TdvCore.Utilities.Booleans.isFunction<T> extends true
    ? ""
    : TdvCore.Utilities.Booleans.isObject<T> extends true
    ? PayloadFieldPathEvaluator<T>[keyof T]
    : "";
}

export default UseFormHook;
