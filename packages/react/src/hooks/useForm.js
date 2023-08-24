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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const tdv_react_1 = require("tdv-react");
const FormContext_1 = require("../contexts/FormContext");
const useEffectWhenMounted_1 = __importDefault(require("./useEffectWhenMounted"));
function findFirstErrorElem(text) {
    function search(parent, child = undefined) {
        var _a;
        if (!parent) {
            return null;
        }
        if (parent && child === null) {
            return parent;
        }
        if ((child === null || child === void 0 ? void 0 : child.nodeType) === Node.ELEMENT_NODE) {
            const element = child;
            const isErrorParent = (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.includes(text);
            if (isErrorParent) {
                for (const childNode of child.childNodes) {
                    const childParent = search(element, childNode);
                    if (childParent) {
                        return childParent;
                    }
                }
                return element;
            }
        }
        return null;
    }
    let res = null;
    const nodes = [...document.body.childNodes].reverse();
    for (let childNode of nodes) {
        res = search(document.documentElement, childNode);
        if (res)
            return res;
    }
    return null;
}
function scrollIntoError(errorMessage) {
    setTimeout(() => {
        var _a;
        const errorElem = findFirstErrorElem(errorMessage);
        (_a = errorElem === null || errorElem === void 0 ? void 0 : errorElem.parentElement) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
            block: "start",
            behavior: "smooth",
            inline: "nearest",
        });
    }, 100);
}
function findFirstStringInNestedArray(obj) {
    if (Array.isArray(obj)) {
        for (const item of obj) {
            const result = findFirstStringInNestedArray(item);
            if (result !== null) {
                return result;
            }
        }
    }
    else if (typeof obj === "object" && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const result = findFirstStringInNestedArray(obj[key]);
                if (result !== null) {
                    return result;
                }
            }
        }
    }
    else if (typeof obj === "string") {
        return obj;
    }
    return null;
}
const emptyClassModel = class {
};
function useForm({ 
// @ts-ignore
model = emptyClassModel, defaultValue: defaultValue0, whenChanged = () => { }, validationGroups: groups = [], onSubmit: onSubmitParam = () => __awaiter(this, void 0, void 0, function* () { }), onSubmitValidationFail, validateImmediately: validateImmediatelyParam = false, standalone = true, }) {
    const noArgsConstructedInstance = (0, react_1.useMemo)(() => new model(), []);
    const defaultValue = defaultValue0 !== null && defaultValue0 !== void 0 ? defaultValue0 : noArgsConstructedInstance;
    const ctx = (0, react_1.useContext)(FormContext_1.FormContext);
    const initialSubmitted = !standalone && !!ctx && ctx.submitted;
    const validateImmediately = standalone
        ? validateImmediatelyParam
        : ctx
            ? ctx.validateImmediately
            : validateImmediatelyParam;
    const [submitted0, setSubmitted] = (0, react_1.useState)(initialSubmitted);
    const submitted = validateImmediately || submitted0;
    const { form, setForm, errors: errors0, isValid, processor, } = (0, tdv_react_1.useValidation)({
        model,
        defaultValue,
        groups,
    });
    const [errors, setErrors] = (0, react_1.useState)(errors0);
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
    (0, useEffectWhenMounted_1.default)(() => whenChanged(), [form]);
    //* When useValidation returns fresh errors object data.
    (0, useEffectWhenMounted_1.default)(() => setErrors(errors0), [errors0]);
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
            if (submitted) {
                const clonedErrors = structuredClone(errors);
                setErrors(clonedErrors);
            }
            onSubmitValidationFail === null || onSubmitValidationFail === void 0 ? void 0 : onSubmitValidationFail();
            return;
        }
        yield onSubmitParam();
    });
    const handleChange = (0, react_1.useCallback)((key, value) => {
        setForm((prev) => {
            const obj = {};
            for (const prop of processor.fields) {
                obj[prop] = prev[prop];
            }
            obj[key] =
                typeof value === "function" ? value(prev[key]) : value;
            return obj;
        });
    }, [setForm]);
    const cachedHandlers = (0, react_1.useMemo)(() => processor.fields.reduce((prev, prop) => (Object.assign(Object.assign({}, prev), { [prop]: (value) => handleChange(prop, value) })), {}), []);
    const providerProps = {
        submitted: submitted0,
        setSubmitted: handleSetSubmitted,
        validateImmediately,
    };
    return {
        isValid,
        submitted,
        cachedHandlers,
        form,
        setForm,
        onSubmit,
        handleChange,
        providerProps,
        errors: validateImmediately
            ? errors
            : submitted
                ? errors
                : {},
    };
}
exports.default = useForm;
