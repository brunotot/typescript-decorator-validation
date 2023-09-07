import { Dispatch, SetStateAction } from "react";
import {
  Condition,
  DetailedErrors,
  Errors,
  TypeUtils,
  ValidationGroup,
} from "tdv-core";
import FormContextNamespace from "../../contexts/FormContext/types";

namespace UseFormHook {
  export type UseFormConfig<TClass, TBody = TClass> = {
    defaultValue?: TBody;
    validationGroups?: ValidationGroup[];
    validateImmediately?: boolean;
    standalone?: boolean;
    onSubmit?: () => Promise<void> | void;
    onSubmitValidationFail?: (errors: Errors<TClass>) => void;
    onChange?: () => void;
  };

  export type UseFormData<TClass, TBody = TClass> = {
    isValid: boolean;
    isSubmitted: boolean;
    onSubmit: () => Promise<void>;
    mutations: UseFormChangeHandlerMap<TBody>;
    providerProps: Omit<FormContextNamespace.FormProviderProps, "children">;
    errors: Errors<TClass>;
    detailedErrors: DetailedErrors<TClass>;
    reset: (...fieldPaths: PayloadFieldPath<TBody>[]) => void;
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

  // prettier-ignore
  export type ObjectPathEvaluator<T, K extends string> = K extends keyof T
    ? K extends TypeUtils.WritableKeys<T>
      ? K | `${K}.${PayloadFieldPath<T[K]>}`
      : ''
    : never;

  // prettier-ignore
  export type PayloadFieldPathEvaluator<T> = {
    [K in keyof T]-?: K extends string
    ? Condition.isFunction<T[K]> extends true ? never :
      Condition.isArray<T[K]> extends true ? K :
      Condition.isObject<T[K]> extends true ? ObjectPathEvaluator<T, K> : 
      K extends TypeUtils.WritableKeys<T> ? K : never : never;
  }

  // prettier-ignore
  export type PayloadFieldPath<T> = 
    Condition.isFunction<T> extends true ? '' : 
    Condition.isObject<T> extends true ? PayloadFieldPathEvaluator<T>[keyof T] : '';
}

export default UseFormHook;
