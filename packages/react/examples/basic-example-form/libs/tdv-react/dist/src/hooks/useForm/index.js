"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const FormProvider_1 = require("../../components/FormProvider");
const useChangeHandlers_1 = require("../useChangeHandlers");
const useReset_1 = require("../useReset");
const useValidation_1 = require("../useValidation");
/**
 * React hook which exposes useful form and validation-related props to a form component
 *
 * Hook internally invokes {@link useValidation}
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid`, `handleChange`, `errors` and `onSubmit`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   isValid,
 *   isSubmitted,
 *   onSubmit,
 *   errors,
 *   providerProps,
 *   mutations
 * }] = useForm(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 */
function useForm(model, { defaultValue, onSubmit: onSubmitParam, onSubmitValidationFail, standalone, validateImmediately, validationGroups: groups, resolveDecoratorArgs, onChange, asyncDelay, locale, } = {
    onSubmit: () => __awaiter(this, void 0, void 0, function* () { }),
    standalone: true,
    validateImmediately: true,
    validationGroups: [],
    onChange: () => { },
}) {
    const isMounted = (0, react_1.useRef)(false);
    const ctx = (0, react_1.useContext)(FormProvider_1.FormContext);
    // prettier-ignore
    const [submitted, setSubmitted] = (0, react_1.useState)(!standalone && !!ctx && ctx.submitted);
    // prettier-ignore
    const instantContextValidation = standalone ? validateImmediately : ctx ? ctx.validateImmediately : validateImmediately;
    const isSubmitted = instantContextValidation || submitted;
    const [form, setForm, { globalErrors, errors, detailedErrors, isValid, engine }] = (0, useValidation_1.useValidation)(model, {
        defaultValue,
        groups,
        resolveDecoratorArgs,
        asyncDelay,
        locale,
    });
    //* Dispatcher function which fires only when
    //* itself isn't a parent and context exists.
    const dispatchContext = (bool) => {
        if (!standalone && !!ctx) {
            ctx === null || ctx === void 0 ? void 0 : ctx.setSubmitted(!!bool);
        }
    };
    //* A wrapper function for setting Submitted value.
    //* Dispatches to parent only when itself isn't
    //* a parent and context exists.
    const handleSetSubmitted = (bool) => {
        const value = !!bool;
        dispatchContext(value);
        setSubmitted(value);
    };
    //* When input data changes execute callback.
    (0, react_1.useEffect)(() => {
        if (isMounted.current) {
            isMounted.current = false;
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(form);
    }, [form]);
    //* When submitted flag from context gets changed.
    (0, react_1.useEffect)(() => {
        const contextValue = !!(ctx === null || ctx === void 0 ? void 0 : ctx.submitted);
        const hasParentContext = !!ctx;
        if (!standalone && hasParentContext) {
            setSubmitted(contextValue);
        }
    }, [ctx === null || ctx === void 0 ? void 0 : ctx.submitted]);
    const onSubmit = () => __awaiter(this, void 0, void 0, function* () {
        handleSetSubmitted(true);
        if (!isValid) {
            onSubmitValidationFail === null || onSubmitValidationFail === void 0 ? void 0 : onSubmitValidationFail(errors);
            return;
        }
        yield (onSubmitParam === null || onSubmitParam === void 0 ? void 0 : onSubmitParam());
    });
    const providerProps = {
        submitted: submitted,
        setSubmitted: handleSetSubmitted,
        validateImmediately: instantContextValidation,
    };
    const reset = (0, useReset_1.useReset)({
        form,
        handleSetSubmitted,
        setForm,
        engine,
        submitted,
    });
    const data = {
        mutations: (0, useChangeHandlers_1.useChangeHandlers)(model, { setForm }),
        isValid,
        isSubmitted,
        onSubmit,
        providerProps,
        globalErrors,
        errors: /*isSubmitted ? */ errors /* : (clearErrors(errors) as any)*/,
        detailedErrors: /*isSubmitted ? */ detailedErrors /* : (clearErrors(detailedErrors) as any)*/,
        reset,
    };
    return [form, setForm, data];
}
exports.useForm = useForm;
function clearErrors(data) {
    function isEmptyArrayStringOrValidationResult(value) {
        return (Array.isArray(value) &&
            (value.length === 0 || typeof value[0] === "string" || value[0] !== undefined));
    }
    const obj = {};
    Object.keys(data).forEach(key => {
        if (isEmptyArrayStringOrValidationResult(data[key])) {
            // Empty the array if it's an Array<string> or Array<ValidationResult>
            obj[key] = [];
        }
        else if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
            // Recurse into non-array objects
            obj[key] = clearErrors(obj[key]);
        }
        else {
            obj[key] = structuredClone(data[key]);
        }
        // If it's not an array or an object, do nothing
    });
    return obj;
}
