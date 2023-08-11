import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Class, Errors, ValidationGroup } from "tdv-core";
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

const emptyClassModel = class {};

type ChangeHandlerCache<T> = {
  [K in keyof T]: (value: T[K]) => void;
};

export type UseFormProps<T> = {
  model: Class<T>;
  defaultValue: T;
  validationGroups?: ValidationGroup[];
  validateImmediately?: boolean;
  standalone?: boolean;
  onSubmit?: () => Promise<void> | void;
  onSubmitValidationFail?: () => void;
  whenChanged?: () => void;
};

type ChangeHandlerValue<T, K extends keyof T> = T[K] | ((prev: T[K]) => T[K]);

export type ChangeHandler<T> = <K extends keyof T>(
  key: K,
  value: ChangeHandlerValue<T, K>
) => void;

export default function useForm<T>({
  // @ts-ignore
  model = emptyClassModel,
  defaultValue,
  whenChanged = () => {},
  validationGroups: groups = [],
  onSubmit: onSubmitParam = async () => {},
  onSubmitValidationFail,
  validateImmediately = false,
  standalone = true,
}: UseFormProps<T>) {
  const ctx = useContext(FormContext);
  const initialSubmitted = !standalone && !!ctx && ctx.submitted;

  const [submitted0, setSubmitted] = useState(initialSubmitted);
  const submitted = validateImmediately || submitted0;

  const {
    form,
    setForm,
    errors: errors0,
    isValid,
    processor,
  } = useValidation<T>({
    model,
    defaultValue,
    groups,
  });

  const [errors, setErrors] = useState(errors0);
  useEffectWhenMounted(whenChanged, [form]);
  useEffectWhenMounted(() => ctx?.setSubmitted(submitted0), [submitted0]);

  useEffect(() => {
    if (!standalone) {
      setSubmitted(!!ctx?.submitted);
    }
  }, [ctx?.submitted]);

  useEffect(() => {
    setErrors(errors0);
  }, [errors0]);

  useEffect(() => {
    if (!standalone && !!ctx) {
      ctx.setSubmitted(initialSubmitted);
    }
  }, []);

  const onSubmit = async () => {
    setSubmitted(true);

    if (!isValid) {
      if (submitted) {
        const clonedErrors = structuredClone(errors);
        setErrors(clonedErrors);
      }
      onSubmitValidationFail?.();
      return;
    }

    await onSubmitParam();
  };

  const handleChange: ChangeHandler<T> = useCallback(
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

  const cachedHandlers: ChangeHandlerCache<T> = useMemo(
    () =>
      processor.fields.reduce(
        (prev, prop) => ({
          ...prev,
          [prop]: (value: any) => handleChange(prop as keyof T, value),
        }),
        {}
      ),
    []
  ) as ChangeHandlerCache<T>;

  const registerProvider = () => ({ submitted: submitted0, setSubmitted });

  return {
    isValid,
    submitted,
    cachedHandlers,
    form,
    setForm,
    onSubmit,
    handleChange,
    registerProvider,
    errors: validateImmediately
      ? errors
      : submitted
      ? errors
      : ({} as Errors<T>),
  };
}
