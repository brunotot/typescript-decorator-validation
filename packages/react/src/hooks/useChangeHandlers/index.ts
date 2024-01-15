import { useMemo } from "react";
import { Utilities } from "tdv-core";
import { type UseFormChangeHandlerMap, type UseFormSetterFn } from "../useForm/types";
import { type UseChangeHandlersConfig } from "./types";

/**
 * Custom hook that generates form change handlers for a given class and configuration.
 * @typeParam TClass - The class type.
 * @typeParam TBody - The body type (default is TClass).
 * @param clazz - The class to generate form change handlers for.
 * @param setForm - The form setter function.
 * @returns An object containing form change handlers for each field in the class.
 */
export function useChangeHandlers<TClass, TBody = TClass>(
  clazz: Utilities.Types.Class<TClass>,
  { setForm }: UseChangeHandlersConfig<TBody>
): UseFormChangeHandlerMap<TBody> {
  const fields = useMemo(() => Utilities.Classes.getClassFieldNames(clazz), []);

  const handleChange: UseFormSetterFn<TBody> = (key, value) => {
    setForm(prev => {
      const obj: any = {};
      for (const prop of fields) {
        obj[prop] = (prev as any)[prop];
      }
      obj[key] = typeof value === "function" ? (value as any)(prev[key]) : value;
      return obj;
    });
  };

  const mutations: UseFormChangeHandlerMap<TBody> = useMemo(
    () =>
      fields.reduce(
        (prev, prop) => ({
          ...prev,
          [prop]: (value: any) => {
            handleChange(prop as unknown as keyof TBody, value);
          },
        }),
        {}
      ),
    []
  ) as UseFormChangeHandlerMap<TBody>;

  return mutations;
}
