import { useEffect, useMemo, useState } from "react";
import {
  Class,
  DetailedErrors,
  EntityProcessor,
  Errors,
  Payload,
} from "tdv-core";
import ns from "./types";

/**
 * `useValidation` hook is responsible for providing form-related
 * (getter, setter) and validation-related (data) props
 * to the consumer component.
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid` and `errors`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   errors,
 *   detailedErrors,
 *   isValid,
 *   processor
 * }] = useValidation(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 * @typeParam TBody - represents writable scope of `TClass` (it can be TClass itself or a chunk of its fields)
 */
export default function useValidation<TClass, TBody = TClass>(
  model: Class<TClass>,
  config?: ns.UseValidationConfig<TBody>
): ns.UseValidationReturn<TClass, TBody> {
  const defaultValue = config?.defaultValue;
  const groups = config?.groups ?? [];
  // prettier-ignore
  const poc = useMemo(() => new EntityProcessor<TClass, TBody>(model, { groups, defaultValue }), []);
  const initialForm = defaultValue ?? poc.noArgsInstance;
  const [form, setForm] = useState<TBody>(initialForm as TBody);
  const [details, setDetails] = useState({} as DetailedErrors<TClass>);
  const [simpleErrors, setSimpleErrors] = useState({} as Errors<TClass>);
  const payload = form as Payload<TClass>;
  const isValid = poc.isValid(payload);

  useEffect(() => {
    setDetails(poc.getDetailedErrors(payload));
    setSimpleErrors(poc.getErrors(payload));
  }, [form]);

  const data: ns.UseValidationData<TClass, TBody> = {
    isValid,
    processor: poc,
    errors: simpleErrors,
    detailedErrors: details,
  };

  return [form, setForm, data];
}
