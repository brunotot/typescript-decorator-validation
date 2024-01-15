import { type Dispatch, type SetStateAction } from "react";
import { type Decorators, type Localization, type Strategy, type Utilities, type ValidationResult } from "tdv-core";
import { type FormProviderProps } from "../../components";
import { type UseResetReturn } from "../useReset/types";

/**
 * Configuration options for the `useForm` hook.
 */
export type UseFormConfig<TClass> = {
  defaultValue?: Utilities.Objects.Payload<TClass>;
  validationGroups?: string[];
  validateImmediately?: boolean;
  standalone?: boolean;
  resolveDecoratorArgs?: () => Decorators.DecoratorArgs;
  onSubmit?: () => Promise<void> | void;
  onSubmitValidationFail?: (errors: Strategy.SimpleErrorsResponse<TClass>) => void;
  onChange?: (value: Utilities.Objects.Payload<TClass>) => void;
  asyncDelay?: number;
  locale?: Localization.Locale;
};

/**
 * Data returned from the `useForm` hook.
 */
export type UseFormData<TClass> = {
  isValid: boolean;
  isSubmitted: boolean;
  onSubmit: () => Promise<void>;
  mutations: UseFormChangeHandlerMap<Utilities.Objects.Payload<TClass>>;
  providerProps: Omit<FormProviderProps, "children">;
  globalErrors: ValidationResult[];
  errors: Strategy.SimpleErrorsResponse<TClass>;
  detailedErrors: Strategy.DetailedErrorsResponse<TClass>;
  reset: UseResetReturn<TClass>;
};

/**
 * Type of the value returned by the `useForm` hook.
 */
export type UseFormReturn<TClass> = readonly [
  Utilities.Objects.Payload<TClass>,
  Dispatch<SetStateAction<Utilities.Objects.Payload<TClass>>>,
  UseFormData<TClass>
];

/**
 * Argument type for the form field setter function.
 */
export type UseFormSetterFnArg<TBody, TKey extends keyof TBody> = TBody[TKey] | ((prev: TBody[TKey]) => TBody[TKey]);

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
