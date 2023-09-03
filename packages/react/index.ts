import FormProvider from "./src/contexts/FormContext";
import FormContextNamespace from "./src/contexts/FormContext/types";
import useForm from "./src/hooks/useForm";
import UseFormNamespace from "./src/hooks/useForm/types";
import useValidation from "./src/hooks/useValidation";
import UseValidationNamespace from "./src/hooks/useValidation/types";

//* Documented exports

export namespace Contexts {
  export import FormProvider = FormContextNamespace;
}

export namespace Hooks {
  export import UseForm = UseFormNamespace;
  export import UseValidation = UseValidationNamespace;
}

export { FormProvider, useForm, useValidation };

//* Undocumented exports

/** @hidden */
export type FormProviderProps = FormContextNamespace.FormProviderProps;

/** @hidden */
export type UseFormData<TClass, TBody = TClass> = Hooks.UseForm.UseFormData<
  TClass,
  TBody
>;

/** @hidden */
export type UseFormConfig<TClass, TBody = TClass> = Hooks.UseForm.UseFormConfig<
  TClass,
  TBody
>;

/** @hidden */
export type UseFormReturn<TClass, TBody = TClass> = Hooks.UseForm.UseFormReturn<
  TClass,
  TBody
>;

/** @hidden */
export type UseValidationData<
  TClass,
  TBody = TClass
> = Hooks.UseValidation.UseValidationData<TClass, TBody>;

/** @hidden */
export type UseValidationConfig<TBody> =
  Hooks.UseValidation.UseValidationConfig<TBody>;

/** @hidden */
export type UseValidationReturn<
  TClass,
  TBody = TClass
> = Hooks.UseValidation.UseValidationReturn<TClass, TBody>;
