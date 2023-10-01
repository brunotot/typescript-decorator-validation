import { useEffect, useState } from "react";
import { TdvCore } from "tdv-core";
import useValidationEngine from "../useValidationEngine";
import ns from "./types";

/**
 * React hook which exposes validation-related props to a form component
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
 *   engine
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
  const engine = useValidationEngine<TClass, TBody>(model, {
    groups,
    defaultValue,
  });
  const [form, setForm] = useState<TBody>(engine.hostDefault);
  const [details, setDetails] = useState(
    {} as TdvCore.EvaluatedStrategyFactory.DetailedErrors<TClass>
  );
  const [simpleErrors, setSimpleErrors] = useState(
    {} as TdvCore.EvaluatedStrategyFactory.Errors<TClass>
  );

  useEffect(() => {
    const { errors, detailedErrors } = engine.validate(form!);
    setDetails(detailedErrors);
    setSimpleErrors(errors);
  }, [form]);

  return [
    form,
    setForm,
    {
      isValid: engine.isValid(form!),
      engine,
      errors: simpleErrors,
      detailedErrors: details,
    },
  ];
}
