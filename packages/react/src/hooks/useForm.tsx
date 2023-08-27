import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Class, Errors, StripClass, ValidationGroup } from "tdv-core";
import { $ } from "tdv-core/src/types/namespace/Utility.ns";
import { useValidation } from "tdv-react";
import { FormContext } from "../contexts/FormContext";
import useEffectWhenMounted from "./useEffectWhenMounted";

function findFirstErrorElem(text: string): $.Nullable<HTMLElement> {
  function search(
    parent: $.Nullable<Node>,
    child: $.Nullable<Node> = undefined
  ): $.Nullable<HTMLElement> {
    if (!parent) {
      return null;
    }

    if (parent && child === null) {
      return parent as HTMLElement;
    }

    if (child?.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;
      const isErrorParent = element.textContent?.includes(text);

      if (isErrorParent) {
        for (const childNode of child.childNodes) {
          const childParent = search(element, childNode);
          if (childParent) {
            return childParent;
          }
        }
        return element;
      }
    }

    return null;
  }

  let res = null;

  const nodes = [...document.body.childNodes].reverse();

  for (let childNode of nodes) {
    res = search(document.documentElement, childNode);
    if (res) return res;
  }

  return null;
}

function scrollIntoError(errorMessage: string) {
  setTimeout(() => {
    const errorElem = findFirstErrorElem(errorMessage);
    errorElem?.parentElement?.scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "nearest",
    });
  }, 100);
}

function findFirstStringInNestedArray(obj: any): string | null {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findFirstStringInNestedArray(item);
      if (result !== null) {
        return result;
      }
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const result = findFirstStringInNestedArray(obj[key]);
        if (result !== null) {
          return result;
        }
      }
    }
  } else if (typeof obj === "string") {
    return obj;
  }

  return null;
}

type ChangeHandlerCache<T> = {
  [K in keyof T]: (value: T[K]) => void;
};

export type FormConfig<TClass, TBody = TClass> = {
  defaultValue?: TBody;
  validationGroups?: ValidationGroup[];
  validateImmediately?: boolean;
  standalone?: boolean;
  onSubmit?: () => Promise<void> | void;
  onSubmitValidationFail?: (errors: Errors<TClass>) => void;
  whenChanged?: () => void;
};

type ChangeHandlerValue<T, K extends keyof T> = T[K] | ((prev: T[K]) => T[K]);
type _StripClass<T> = T extends Class<any> ? StripClass<T> : T;

export type ChangeHandler<T> = <K extends keyof T>(
  key: K,
  value: ChangeHandlerValue<T, K>
) => void;

export default function useForm<
  TClass extends Class<any>,
  TBody = _StripClass<TClass>
>(model: _StripClass<TClass>, config?: FormConfig<typeof model, TBody>) {
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

  const [submitted0, setSubmitted] = useState(initialSubmitted);
  const submitted = validateImmediately || submitted0;

  const {
    form,
    setForm,
    errors: errors0,
    isValid,
    processor,
  } = useValidation<_StripClass<TClass>, _StripClass<TBody>>({
    model,
    defaultValue: defaultValue as _StripClass<TBody>,
    groups,
  });

  const [errors, setErrors] = useState(errors0);

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
  useEffectWhenMounted(() => setErrors(errors0), [errors0]);

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
      const newErrors = submitted ? structuredClone(errors) : errors;
      if (submitted) {
        setErrors(newErrors);
      }
      onSubmitValidationFail?.(newErrors);
      return;
    }

    await onSubmitParam();
  };

  const handleChange: ChangeHandler<TBody> = useCallback(
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

  const cachedHandlers: ChangeHandlerCache<TBody> = useMemo(
    () =>
      processor.fields.reduce(
        (prev, prop) => ({
          ...prev,
          [prop]: (value: any) => handleChange(prop as keyof TBody, value),
        }),
        {}
      ),
    []
  ) as ChangeHandlerCache<TBody>;

  const providerProps = {
    submitted: submitted0,
    setSubmitted: handleSetSubmitted,
    validateImmediately,
  };

  return {
    isValid,
    submitted,
    cachedHandlers,
    form,
    setForm,
    onSubmit,
    handleChange,
    providerProps,
    errors: (validateImmediately
      ? errors
      : submitted
      ? errors
      : ({} as Errors<TClass>)) as Errors<_StripClass<TClass>>,
  };
}
