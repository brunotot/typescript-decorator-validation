"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChangeHandlers = void 0;
const react_1 = require("react");
const tdv_core_1 = require("tdv-core");
/**
 * Custom hook that generates form change handlers for a given class and configuration.
 * @typeParam TClass - The class type.
 * @typeParam TBody - The body type (default is TClass).
 * @param clazz - The class to generate form change handlers for.
 * @param setForm - The form setter function.
 * @returns An object containing form change handlers for each field in the class.
 */
function useChangeHandlers(clazz, { setForm }) {
    const fields = (0, react_1.useMemo)(() => tdv_core_1.Utilities.Classes.getClassFieldNames(clazz), []);
    const handleChange = (key, value) => {
        setForm(prev => {
            const obj = {};
            for (const prop of fields) {
                obj[prop] = prev[prop];
            }
            obj[key] = typeof value === "function" ? value(prev[key]) : value;
            return obj;
        });
    };
    const mutations = (0, react_1.useMemo)(() => fields.reduce((prev, prop) => (Object.assign(Object.assign({}, prev), { [prop]: (value) => {
            handleChange(prop, value);
        } })), {}), []);
    return mutations;
}
exports.useChangeHandlers = useChangeHandlers;
