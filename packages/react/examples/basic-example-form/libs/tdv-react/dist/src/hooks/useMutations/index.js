import { useMemo } from "react";
import { Reflection } from "tdv-core";
export default function useMutations(clazz, { setForm }) {
    const fields = useMemo(() => Reflection.getClassFieldNames(clazz), []);
    const handleChange = (key, value) => {
        setForm((prev) => {
            const obj = {};
            for (const prop of fields) {
                obj[prop] = prev[prop];
            }
            obj[key] =
                typeof value === "function" ? value(prev[key]) : value;
            return obj;
        });
    };
    const mutations = useMemo(() => fields.reduce((prev, prop) => (Object.assign(Object.assign({}, prev), { [prop]: (value) => {
            handleChange(prop, value);
        } })), {}), []);
    return mutations;
}
