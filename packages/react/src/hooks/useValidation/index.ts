import { useEffect, useState } from "react";
import { TdvCore } from "tdv-core";
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
  model: TdvCore.Types.Class<TClass>,
  { defaultValue, groups }: ns.UseValidationConfig<TBody> = {}
): ns.UseValidationReturn<TClass, TBody> {
  const processor = useEntityProcessor<TClass, TBody>(model, {
    groups,
    defaultValue,
  });
  const [form, setForm] = useState<TBody>(processor.hostDefault);
  const [details, setDetails] = useState(
    {} as TdvCore.EvaluatedStrategyFactory.DetailedErrors<TClass>
  );
  const [simpleErrors, setSimpleErrors] = useState(
    {} as TdvCore.EvaluatedStrategyFactory.Errors<TClass>
  );

  useEffect(() => {
    const { errors, detailedErrors } = processor.validate(form!);
    setDetails(detailedErrors);
    setSimpleErrors(errors);
  }, [form]);

  return [
    form,
    setForm,
    {
      isValid: processor.isValid(form!),
      processor,
      errors: simpleErrors,
      detailedErrors: details,
    },
  ];
}
