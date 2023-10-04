import { useEffect, useState } from "react";
import TdvCore from "tdv-core";
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
 */
export default function useValidation<TClass>(
  model: TdvCore.Utilities.Types.Class<TClass>,
  { defaultValue, groups }: ns.UseValidationConfig<TClass> = {}
): ns.UseValidationReturn<TClass> {
  const engine = useValidationEngine<TClass>(model, {
    groups,
    defaultValue,
  });
  const [form, setForm] = useState<TdvCore.Utilities.Objects.Payload<TClass>>(
    engine.hostDefault
  );
  const [details, setDetails] = useState(
    {} as TdvCore.Strategy.Factory.Impl.DetailedErrors<TClass>
  );
  const [simpleErrors, setSimpleErrors] = useState(
    {} as TdvCore.Strategy.Factory.Impl.Errors<TClass>
  );

  useEffect(() => {
    engine.registerAsync(({ errors, detailedErrors }) => {
      setDetails(detailedErrors);
      setSimpleErrors(errors);
    });

    return () => {
      engine.unregisterAsync();
    };
  }, []);

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
      errors: simpleErrors,
      detailedErrors: details,
      engine,
    },
  ];
}
