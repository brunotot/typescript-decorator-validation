"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = void 0;
const react_1 = require("react");
const useEngine_1 = require("../useEngine");
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
function useValidation(Class, props = {}) {
    var _a;
    const { groups, defaultValue, asyncDelay, locale } = props;
    const resolveDecoratorArgs = (_a = props.resolveDecoratorArgs) !== null && _a !== void 0 ? _a : (() => ({}));
    const decoratorArgs = resolveDecoratorArgs();
    const formConfig = { groups, defaultValue, asyncDelay, locale };
    const engine = (0, useEngine_1.useEngine)(Class, formConfig);
    const [form, setForm] = (0, react_1.useState)(engine.defaultValue);
    const [classSimpleErrors, setClassSimpleErrors] = (0, react_1.useState)(() => engine.validate(form, decoratorArgs).globalErrors);
    const [fieldDetailedErrors, setFieldDetailedErrors] = (0, react_1.useState)(() => engine.validate(form, decoratorArgs).detailedErrors);
    const [fieldSimpleErrors, setFieldSimpleErrors] = (0, react_1.useState)(() => engine.validate(form, decoratorArgs).errors);
    (0, react_1.useEffect)(() => {
        engine.registerAsync(({ errors, detailedErrors, globalErrors }) => {
            setFieldDetailedErrors(detailedErrors);
            setFieldSimpleErrors(errors);
            setClassSimpleErrors(globalErrors);
        });
        return () => {
            engine.unregisterAsync();
        };
    }, [engine]);
    (0, react_1.useEffect)(() => {
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
exports.useValidation = useValidation;
