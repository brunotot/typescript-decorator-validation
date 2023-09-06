import { useMemo } from "react";
import { Class, EntityProcessor } from "tdv-core";
import UseFormNamespace from "./../useForm/types";
import ns from "./types";

export default function useMutations<TClass, TBody = TClass>(
  clazz: Class<TClass>,
  { setForm }: ns.UseMutationsConfig<TBody>
): UseFormNamespace.UseFormChangeHandlerMap<TBody> {
  const fields = useMemo(
    () => EntityProcessor.getClassFieldNames<TClass, TBody>(clazz),
    []
  );

  const handleChange: UseFormNamespace.UseFormSetterFn<TBody> = (
    key,
    value
  ) => {
    setForm((prev) => {
      const obj: any = {};
      for (const prop of fields) {
        obj[prop] = (prev as any)[prop];
      }
      obj[key] =
        typeof value === "function" ? (value as any)(prev[key]) : value;
      return obj;
    });
  };

  const mutations: UseFormNamespace.UseFormChangeHandlerMap<TBody> = useMemo(
    () =>
      fields.reduce(
        (prev, prop) => ({
          ...prev,
          [prop]: (value: any) => handleChange(prop, value),
        }),
        {}
      ),
    []
  ) as UseFormNamespace.UseFormChangeHandlerMap<TBody>;

  return mutations;
}
