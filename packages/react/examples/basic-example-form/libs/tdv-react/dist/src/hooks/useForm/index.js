var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../contexts/FormContext";
import useEffectWhenMounted from "../useAfterMount";
import useMutations from "../useMutations";
import useReset from "../useReset";
import useValidation from "../useValidation";
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
export default function useForm(model, { defaultValue, onSubmit: onSubmitParam, onSubmitValidationFail, standalone, validateImmediately, validationGroups: groups, resolveDecoratorArgs, onChange, asyncDelay, locale, } = {
    onSubmit: () => __awaiter(this, void 0, void 0, function* () { }),
    standalone: true,
    validateImmediately: true,
    validationGroups: [],
    onChange: () => { },
}) {
    const ctx = useContext(FormContext);
    // prettier-ignore
    const [submitted, setSubmitted] = useState(!standalone && !!ctx && ctx.submitted);
    // prettier-ignore
    const instantContextValidation = standalone ? validateImmediately : ctx ? ctx.validateImmediately : validateImmediately;
    const isSubmitted = instantContextValidation || submitted;
    const [form, setForm, { globalErrors, errors, detailedErrors, isValid, engine }] = useValidation(model, {
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
    useEffectWhenMounted(() => onChange === null || onChange === void 0 ? void 0 : onChange(form), [form]);
    //* When submitted flag from context gets changed.
    useEffect(() => {
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
    const reset = useReset({
        form,
        handleSetSubmitted,
        setForm,
        engine,
        submitted,
    });
    const data = {
        mutations: useMutations(model, { setForm }),
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
