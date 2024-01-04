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
export default function useValidation(model, { defaultValue, groups, asyncDelay, locale, resolveDecoratorArgs = () => ({}), } = {}) {
    const engine = useValidationEngine(model, {
        groups,
        defaultValue,
        asyncDelay,
        locale,
    });
    const [form, setForm] = useState(engine.defaultValue);
    const decoratorArgs = resolveDecoratorArgs();
    const [globalErrors, setGlobalErrors] = useState(() => engine.validate(form, decoratorArgs).globalErrors);
    const [details, setDetails] = useState(() => engine.validate(form, decoratorArgs).detailedErrors);
    const [simpleErrors, setSimpleErrors] = useState(() => {
        return engine.validate(form, decoratorArgs).errors;
    });
    useEffect(() => {
        engine.async.register(({ errors, detailedErrors, globalErrors }) => {
            setDetails(detailedErrors);
            setSimpleErrors(errors);
            setGlobalErrors(globalErrors);
        });
        return () => {
            engine.async.unregister();
        };
    }, [engine]);
    useEffect(() => {
        const { errors, detailedErrors, globalErrors } = engine.validate(form, decoratorArgs);
        setDetails(detailedErrors);
        setSimpleErrors(errors);
        setGlobalErrors(globalErrors);
    }, [form, engine, JSON.stringify(decoratorArgs)]);
    return [
        form,
        setForm,
        {
            isValid: engine.isValid(form),
            errors: simpleErrors,
            detailedErrors: details,
            engine,
            globalErrors,
        },
    ];
}
