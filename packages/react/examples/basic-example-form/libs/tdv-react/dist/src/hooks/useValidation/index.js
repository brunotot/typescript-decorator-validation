import { useEffect, useState } from "react";
import useValidationEngine from "../useValidationEngine";
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
export default function useValidation(model, { defaultValue, groups } = {}) {
    const engine = useValidationEngine(model, {
        groups,
        defaultValue,
    });
    const [form, setForm] = useState(engine.hostDefault);
    const [details, setDetails] = useState({});
    const [simpleErrors, setSimpleErrors] = useState({});
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
        const { errors, detailedErrors } = engine.validate(form);
        setDetails(detailedErrors);
        setSimpleErrors(errors);
    }, [form]);
    return [
        form,
        setForm,
        {
            isValid: engine.isValid(form),
            errors: simpleErrors,
            detailedErrors: details,
            engine,
        },
    ];
}
