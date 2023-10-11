import { useMemo } from "react";
import type TdvCore from "tdv-core";
import { Reflection } from "tdv-core";
import type UseFormNamespace from "./../useForm/types";
import type ns from "./types";

export default function useMutations<TClass, TBody = TClass>(
  clazz: TdvCore.Utilities.Types.Class<TClass>,
  { setForm }: ns.UseMutationsConfig<TBody>
): UseFormNamespace.UseFormChangeHandlerMap<TBody> {
  const fields = useMemo(() => Reflection.getClassFieldNames(clazz), []);

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
          [prop]: (value: any) => {
            handleChange(prop as unknown as keyof TBody, value);
          },
        }),
        {}
      ),
    []
  ) as UseFormNamespace.UseFormChangeHandlerMap<TBody>;

  return mutations;
}
