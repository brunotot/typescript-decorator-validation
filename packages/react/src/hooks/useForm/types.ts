import { Dispatch, SetStateAction } from "react";
import { Errors, ValidationGroup } from "tdv-core";
import { FormProviderProps } from "../../contexts/FormContext";

export type FormConfig<TClass, TBody = TClass> = {
  defaultValue?: TBody;
  validationGroups?: ValidationGroup[];
  validateImmediately?: boolean;
  standalone?: boolean;
  onSubmit?: () => Promise<void> | void;
  onSubmitValidationFail?: (errors: Errors<TClass>) => void;
  whenChanged?: () => void;
};

export type SetterFnArg<TBody, TKey extends keyof TBody> =
  | TBody[TKey]
  | ((prev: TBody[TKey]) => TBody[TKey]);

export type SetterFn<TBody> = <TKey extends keyof TBody>(
  key: TKey,
  value: SetterFnArg<TBody, TKey>
) => void;

export type ChangeHandlerMap<TBody> = {
  [TKey in keyof TBody]: (value: TBody[TKey]) => void;
};

export type UseFormData<TClass, TBody = TClass> = {
  isValid: boolean;
  isSubmitted: boolean;
  cachedHandlers: ChangeHandlerMap<TBody>;
  onSubmit: () => Promise<void>;
  handleChange: SetterFn<TBody>;
  providerProps: Omit<FormProviderProps, "children">;
  errors: Errors<TClass>;
};

export type UseFormReturn<TClass, TBody = TClass> = readonly [
  TBody,
  Dispatch<SetStateAction<TBody>>,
  UseFormData<TClass, TBody>
];
