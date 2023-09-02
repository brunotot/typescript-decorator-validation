import FormProvider, { FormProviderProps } from "./src/contexts/FormContext";
import useForm from "./src/hooks/useForm";
import {
  ChangeHandlerMap,
  FormConfig,
  SetterFn,
  SetterFnArg,
} from "./src/hooks/useForm/types";
import useValidation from "./src/hooks/useValidation";
import {
  UseValidationConfig,
  UseValidationData,
  UseValidationReturn,
} from "./src/hooks/useValidation/types";

export { FormProvider, useForm, useValidation };
export type {
  ChangeHandlerMap,
  FormConfig,
  FormProviderProps,
  SetterFn,
  SetterFnArg,
  UseValidationConfig,
  UseValidationData,
  UseValidationReturn,
};
