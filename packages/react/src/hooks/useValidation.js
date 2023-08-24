"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const tdv_core_1 = require("tdv-core");
function useValidation({ defaultValue, model, groups = [], }) {
    const processor = (0, react_1.useMemo)(() => new tdv_core_1.EntityProcessor(model, ...groups), []);
    const initialForm = defaultValue !== null && defaultValue !== void 0 ? defaultValue : processor.buildEmptyInstance();
    const [form, setForm] = (0, react_1.useState)(initialForm);
    const payload = form;
    const [detailedErrors, setDetailedErrors] = (0, react_1.useState)({});
    const [errors, setErrors] = (0, react_1.useState)({});
    const isValid = processor.isValid(payload);
    (0, react_1.useEffect)(() => {
        setDetailedErrors(processor.getDetailedErrors(payload));
        setErrors(processor.getErrors(payload));
    }, [form]);
    return {
        isValid,
        form,
        setForm,
        errors,
        detailedErrors,
        processor,
    };
}
exports.default = useValidation;
