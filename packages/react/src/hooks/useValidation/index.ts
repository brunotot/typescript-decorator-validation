import { useEffect, useState } from "react";
import { type Utilities, type Validation } from "tdv-core";
import { useEngine } from "../useEngine";
import { type UseValidationConfig, type UseValidationReturn } from "./types";

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
// prettier-ignore
export function useValidation<TClass>(
  Class: Utilities.Types.Class<TClass>,
  props: UseValidationConfig<TClass> = {}
): UseValidationReturn<TClass> {
  const { groups, defaultValue, asyncDelay, locale } = props;
  const resolveDecoratorArgs = props.resolveDecoratorArgs ?? (() => ({}));
  const decoratorArgs = resolveDecoratorArgs();
  const formConfig = { groups, defaultValue, asyncDelay, locale } satisfies Validation.FormConfig<TClass>;
  const engine = useEngine<TClass>(Class, formConfig);
  const [form, setForm] = useState<Utilities.Objects.Payload<TClass>>(engine.defaultValue);
  const [classSimpleErrors, setClassSimpleErrors] = useState(() => engine.validate(form, decoratorArgs).globalErrors);
  const [fieldDetailedErrors, setFieldDetailedErrors] = useState(() => engine.validate(form, decoratorArgs).detailedErrors);
  const [fieldSimpleErrors, setFieldSimpleErrors] = useState(() => engine.validate(form, decoratorArgs).errors);

  useEffect(() => {
    engine.registerAsync(({ errors, detailedErrors, globalErrors }) => {
      setFieldDetailedErrors(detailedErrors);
      setFieldSimpleErrors(errors);
      setClassSimpleErrors(globalErrors);
    });

    return () => {
      engine.unregisterAsync();
    };
  }, [engine]);

  useEffect(() => {
    const { errors, detailedErrors, globalErrors } = engine.validate(form, decoratorArgs);
    setFieldDetailedErrors(detailedErrors);
    setFieldSimpleErrors(errors);
    setClassSimpleErrors(globalErrors);
  }, [form, engine, JSON.stringify(decoratorArgs)]);

  return [
    form,
    setForm,
    {
      isValid: engine.isValid(form),
      errors: fieldSimpleErrors,
      detailedErrors: fieldDetailedErrors,
      globalErrors: classSimpleErrors,
      engine,
    },
  ];
}
