import { useContext, useEffect, useState } from "react";
import { TdvCore } from "tdv-core";
import { FormContext } from "../../contexts/FormContext";
import useEffectWhenMounted from "../useAfterMount";
import useMutations from "../useMutations";
import useReset from "../useReset";
import useValidation from "../useValidation";
import ns from "./types";

/**
 * `useForm` hook is responsible for providing form-related
 * (getter, setter, memoized change handlers, isValid, isSubmitted, etc...)
 * and validation-related (data) props to the consumer component.
 *
 * Hook internally invokes {@link useValidation}
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid`, `handleChange`, `errors` and `onSubmit`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   isValid,
 *   isSubmitted,
 *   onSubmit,
 *   errors,
 *   providerProps,
 *   mutations
 * }] = useForm(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 * @typeParam TBody - represents writable scope of `TClass` (it can be TClass itself or a chunk of its fields)
 */
export default function useForm<TClass, TBody = TClass>(
  model: TdvCore.Types.Class<TClass>,
  {
    defaultValue,
    onSubmit: onSubmitParam,
    onSubmitValidationFail,
    standalone,
    validateImmediately,
    validationGroups: groups,
    onChange,
  }: ns.UseFormConfig<TClass, TBody> = {
    onSubmit: async () => {},
    standalone: true,
    validateImmediately: false,
    validationGroups: [],
    onChange: () => {},
  }
): ns.UseFormReturn<TClass, TBody> {
  const ctx = useContext(FormContext);
  // prettier-ignore
  const [submitted, setSubmitted] = useState(!standalone && !!ctx && ctx.submitted);
  // prettier-ignore
  const instantContextValidation = standalone ? validateImmediately! : ctx? ctx.validateImmediately : validateImmediately!;
  const isSubmitted = instantContextValidation || submitted;

  const [form, setForm, { errors, detailedErrors, isValid, processor }] =
    useValidation<TClass, TBody>(model, {
      defaultValue,
      groups,
    });

  //* Dispatcher function which fires only when
  //* itself isn't a parent and context exists.
  const dispatchContext = (bool?: boolean) => {
    if (!standalone && !!ctx) {
      ctx?.setSubmitted(!!bool);
    }
  };

  //* A wrapper function for setting Submitted value.
  //* Dispatches to parent only when itself isn't
  //* a parent and context exists.
  const handleSetSubmitted = (bool: boolean) => {
    const value = !!bool;
    dispatchContext(value);
    setSubmitted(value);
  };

  //* When input data changes execute callback.
  useEffectWhenMounted(() => onChange?.(), [form]);

  //* When submitted flag from context gets changed.
  useEffect(() => {
    const contextValue = !!ctx?.submitted;
    const hasParentContext = !!ctx;
    if (!standalone && hasParentContext) {
      setSubmitted(contextValue);
    }
  }, [ctx?.submitted]);

  const onSubmit = async () => {
    handleSetSubmitted(true);
    if (!isValid) {
      onSubmitValidationFail?.(errors);
      return;
    }
    await onSubmitParam?.();
  };

  const providerProps = {
    submitted: submitted,
    setSubmitted: handleSetSubmitted,
    validateImmediately: instantContextValidation,
  };

  const reset = useReset({
    form,
    handleSetSubmitted,
    setForm,
    processor,
    submitted,
  });

  const data: ns.UseFormData<TClass, TBody> = {
    mutations: useMutations(model, { setForm }),
    isValid,
    isSubmitted,
    onSubmit,
    providerProps,
    errors: isSubmitted ? errors : {},
    detailedErrors: isSubmitted ? detailedErrors : {},
    reset,
  };

  return [form, setForm, data];
}
