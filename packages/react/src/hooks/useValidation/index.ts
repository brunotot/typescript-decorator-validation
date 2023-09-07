import { useEffect, useState } from "react";
import { Class, DetailedErrors, Errors, Payload } from "tdv-core";
import useEntityProcessor from "../useEntityProcessor";
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
  { defaultValue, groups }: ns.UseValidationConfig<TBody> = {}
): ns.UseValidationReturn<TClass, TBody> {
  const processor = useEntityProcessor(model, { groups, defaultValue });
  const [form, setForm] = useState<TBody>(processor.noArgsInstance);
  const [details, setDetails] = useState({} as DetailedErrors<TClass>);
  const [simpleErrors, setSimpleErrors] = useState({} as Errors<TClass>);

  useEffect(() => {
    const { errors, detailedErrors } = processor.validate(
      form as Payload<TClass>
    );
    setDetails(detailedErrors);
    setSimpleErrors(errors);
  }, [form]);

  return [
    form,
    setForm,
    {
      isValid: processor.isValid(form as Payload<TClass>),
      processor,
      errors: simpleErrors,
      detailedErrors: details,
    },
  ];
}
