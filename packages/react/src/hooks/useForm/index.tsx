import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Class } from "tdv-core";
import { FormContext } from "../../contexts/FormContext";
import useEffectWhenMounted from "../useAfterMount";
import useValidation from "../useValidation";
import FormContextNamespace from "./../../contexts/FormContext/types";
import ns from "./types";

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

  const handleChange: ns.UseFormSetterFn<TBody> = useCallback(
    (key, value) => {
      setForm((prev) => {
        const obj: any = {};
        for (const prop of processor.fields) {
          obj[prop] = (prev as any)[prop];
        }
        obj[key] =
          typeof value === "function" ? (value as any)(prev[key]) : value;
        return obj;
      });
    },
    [setForm]
  );

  const cachedHandlers: ns.UseFormChangeHandlerMap<TBody> = useMemo(
    () =>
      processor.fields.reduce(
        (prev, prop) => ({
          ...prev,
          [prop]: (value: any) => handleChange(prop, value),
        }),
        {}
      ),
    []
  ) as ns.UseFormChangeHandlerMap<TBody>;

  const providerProps: Omit<
    FormContextNamespace.FormProviderProps,
    "children"
  > = {
    submitted: submitted,
    setSubmitted: handleSetSubmitted,
    validateImmediately,
  };

  const data: ns.UseFormData<TClass, TBody> = {
    isValid,
    isSubmitted: isSubmitted,
    cachedHandlers,
    onSubmit,
    handleChange,
    providerProps,
    errors: validateImmediately || isSubmitted ? errors : {},
  };

  return [form, setForm, data];
}
