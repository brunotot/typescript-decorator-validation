import { useContext, useEffect, useRef, useState } from "react";
import { Utilities, ValidationResult } from "tdv-core";
import { FormContext } from "../../components/FormProvider";
import { useChangeHandlers } from "../useChangeHandlers";
import { useReset } from "../useReset";
import { useValidation } from "../useValidation";
import { UseFormConfig, UseFormData, UseFormReturn } from "./types";

/**
 * React hook which exposes useful form and validation-related props to a form component
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
 */
export function useForm<TClass>(
  model: Utilities.Types.Class<TClass>,
  {
    defaultValue,
    onSubmit: onSubmitParam,
    onSubmitValidationFail,
    standalone,
    validateImmediately,
    validationGroups: groups,
    resolveDecoratorArgs,
    onChange,
    asyncDelay,
    locale,
  }: UseFormConfig<TClass> = {
    onSubmit: async () => {},
    standalone: true,
    validateImmediately: true,
    validationGroups: [],
    onChange: () => {},
  }
): UseFormReturn<TClass> {
  const isMounted = useRef(false);
  const ctx = useContext(FormContext);
  // prettier-ignore
  const [submitted, setSubmitted] = useState(!standalone && !!ctx && ctx.submitted);
  // prettier-ignore
  const instantContextValidation = standalone ? validateImmediately! : ctx? ctx.validateImmediately : validateImmediately!;
  const isSubmitted = instantContextValidation || submitted;

  const [form, setForm, { globalErrors, errors, detailedErrors, isValid, engine }] = useValidation<TClass>(model, {
    defaultValue,
    groups,
    resolveDecoratorArgs,
    asyncDelay,
    locale,
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
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    onChange?.(form);
  }, [form]);

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
    engine,
    submitted,
  });

  const data: UseFormData<TClass> = {
    mutations: useChangeHandlers(model, { setForm }),
    isValid,
    isSubmitted,
    onSubmit,
    providerProps,
    globalErrors,
    errors: /*isSubmitted ? */ errors /* : (clearErrors(errors) as any)*/,
    detailedErrors: /*isSubmitted ? */ detailedErrors /* : (clearErrors(detailedErrors) as any)*/,
    reset,
  };

  return [form, setForm, data];
}

function clearErrors(data: Record<string, any>): Record<string, any> {
  function isEmptyArrayStringOrValidationResult(value: any): value is string[] | ValidationResult[] {
    return (
      Array.isArray(value) &&
      (value.length === 0 || typeof value[0] === "string" || (value[0] as ValidationResult) !== undefined)
    );
  }

  const obj = {} as any;
  Object.keys(data).forEach(key => {
    if (isEmptyArrayStringOrValidationResult(data[key])) {
      // Empty the array if it's an Array<string> or Array<ValidationResult>
      obj[key] = [];
    } else if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recurse into non-array objects
      obj[key] = clearErrors(obj[key]);
    } else {
      obj[key] = structuredClone(data[key]);
    }
    // If it's not an array or an object, do nothing
  });

  return obj;
}
