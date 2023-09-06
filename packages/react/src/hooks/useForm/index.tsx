import { useContext, useEffect, useMemo, useState } from "react";
import { Class } from "tdv-core";
import { FormContext } from "../../contexts/FormContext";
import useEffectWhenMounted from "../useAfterMount";
import useMutations from "../useMutations";
import useReset from "../useReset";
import useValidation from "../useValidation";
import FormContextNamespace from "./../../contexts/FormContext/types";
import ns from "./types";

/**
 * `useForm` hook is responsible for providing form-related
 * (getter, setter, memoized change handlers, isValid, isSubmitted, etc...)
 * and validation-related (data) props to the consumer component.
 *
 * Hook is internally invokes {@link useValidation}
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
  model: Class<TClass>,
  config?: ns.UseFormConfig<TClass, TBody>
): ns.UseFormReturn<TClass, TBody> {
  const defaultValue0 = config?.defaultValue;
  const whenChanged = config?.whenChanged ?? (() => {});
  const groups = config?.validationGroups ?? [];
  const onSubmitParam = config?.onSubmit ?? (async () => {});
  const validateImmediatelyParam =
    config?.validateImmediately === undefined
      ? false
      : config?.validateImmediately!;
  const standalone =
    config?.standalone === undefined ? true : config.standalone!;
  const onSubmitValidationFail = config?.onSubmitValidationFail;
  const noArgsConstructedInstance = useMemo(() => new model(), []);
  const defaultValue =
    defaultValue0 ?? (noArgsConstructedInstance as unknown as TBody);
  const ctx = useContext(FormContext);
  const initialSubmitted = !standalone && !!ctx && ctx.submitted;
  const validateImmediately = standalone
    ? validateImmediatelyParam
    : ctx
    ? ctx.validateImmediately
    : validateImmediatelyParam;

  const [submitted, setSubmitted] = useState(initialSubmitted);
  const isSubmitted = validateImmediately || submitted;

  const [form, setForm, { errors: errorsSnapshot, isValid, processor }] =
    useValidation<TClass, TBody>(model, {
      defaultValue,
      groups,
    });

  const [errors, setErrors] = useState(errorsSnapshot);

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
  useEffectWhenMounted(() => whenChanged(), [form]);

  //* When useValidation returns fresh errors object data.
  useEffectWhenMounted(() => setErrors(errorsSnapshot), [errorsSnapshot]);

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
      const newErrors = isSubmitted ? structuredClone(errors) : errors;
      if (isSubmitted) {
        setErrors(newErrors);
      }
      onSubmitValidationFail?.(newErrors);
      return;
    }

    await onSubmitParam();
  };

  const providerProps: Omit<
    FormContextNamespace.FormProviderProps,
    "children"
  > = {
    submitted: submitted,
    setSubmitted: handleSetSubmitted,
    validateImmediately,
  };

  const mutations = useMutations(model, { setForm });

  const reset = useReset({
    form,
    handleSetSubmitted,
    setForm,
    processor,
    submitted,
  });

  const data: ns.UseFormData<TClass, TBody> = {
    isValid,
    isSubmitted,
    mutations,
    onSubmit,
    providerProps,
    errors: validateImmediately || isSubmitted ? errors : {},
    reset,
  };

  return [form, setForm, data];
}
