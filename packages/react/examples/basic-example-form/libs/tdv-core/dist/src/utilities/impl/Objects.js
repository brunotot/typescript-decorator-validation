import API from "../../index";
import { EventEmitter } from "../misc/EventEmitter";
/**
 * Removes duplicate elements from an array while preserving order.
 *
 * @typeParam T - The type of the elements in the array.
 */
export function unique(data) {
    return [...new Set(data)];
}
/**
 * Checks if an error object has errors.
 *
 * @typeParam T - The type of the errors.
 */
export function hasErrors(data) {
    const data0 = data;
    if (Array.isArray(data0)) {
        return data0.some(item => hasErrors(item));
    }
    else if (typeof data0 === "object" && data0 !== null) {
        return Object.values(data0).some((value) => hasErrors(value));
    }
    else if (typeof data0 === "string") {
        return true;
    }
    return false;
}
/**
 * Recursively checks if two values are deep equal.
 */
export function deepEquals(val1, val2) {
    if (val1 === val2) {
        return true;
    }
    else if (typeof val1 !== typeof val2) {
        return false;
    }
    else if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) {
            return false;
        }
        for (let i = 0; i < val1.length; i++) {
            if (!deepEquals(val1[i], val2[i])) {
                return false;
            }
        }
        return true;
    }
    else if (typeof val1 === "object" && val1 !== null && val2 !== null) {
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            if (!deepEquals(val1[key], val2[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
/**
 * Hashes a value of any type and returns a number.
 */
export function hash(val) {
    function stringHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash = hash & hash;
        }
        return hash;
    }
    function numberHash(num) {
        return num
            .toString()
            .split("")
            .reduce((hash, ch) => {
            hash = (hash << 5) - hash + ch.charCodeAt(0);
            return hash & hash;
        }, 0);
    }
    function booleanHash(bool) {
        return bool ? 1 : 0;
    }
    function nullHash() {
        return 0;
    }
    function undefinedHash() {
        return 0;
    }
    function arrayHash(arr) {
        return arr.reduce((hash, val) => {
            hash = (hash << 5) - hash + hash(val);
            return hash & hash;
        }, 0);
    }
    function objectHash(obj) {
        return Object.keys(obj)
            .sort()
            .reduce((hashValue, key) => {
            hashValue = (hashValue << 5) - hashValue + hash(obj[key]);
            return hashValue & hashValue;
        }, 0);
    }
    function defaultHash(val) {
        return (val !== null && val !== void 0 ? val : "")
            .toString()
            .split("")
            .reduce((hash, ch) => {
            hash = (hash << 5) - hash + ch.charCodeAt(0);
            return hash & hash;
        }, 0);
    }
    if (typeof val === "string") {
        return stringHash(val);
    }
    else if (typeof val === "number") {
        return numberHash(val);
    }
    else if (typeof val === "boolean") {
        return booleanHash(val);
    }
    else if (val === null) {
        return nullHash();
    }
    else if (val === undefined) {
        return undefinedHash();
    }
    else if (Array.isArray(val)) {
        return arrayHash(val);
    }
    else if (typeof val === "object") {
        return objectHash(val);
    }
    else {
        return defaultHash(val);
    }
}
/**
 * Transforms a plain object into an instance of the given class.
 * @param clazz - The class to transform the object into.
 * @param object - The object to transform.
 * @typeParam TClass - The type of the class.
 * @returns An instance of TClass.
 */
export function toClass(clazz, object) {
    function _toClass(clazz, object) {
        if (Array.isArray(object)) {
            return object.map(item => _toClass(clazz, item));
        }
        const entries = Object.entries(object !== null && object !== void 0 ? object : {});
        const meta = API.Reflection.FieldValidatorMetaService.inject(clazz, EventEmitter.EMPTY);
        const data = {};
        for (const [key, value] of entries) {
            const descriptor = meta.getUntypedDescriptor(key);
            const { thisClass } = descriptor;
            if (thisClass) {
                if (Array.isArray(value)) {
                    data[key] = value.map(item => _toClass(thisClass, item));
                }
                else {
                    data[key] = toClass(thisClass, value);
                }
            }
            else {
                data[key] = value;
            }
        }
        const instance = new clazz();
        Object.entries(data).forEach(([k, v]) => (instance[k] = v));
        return instance;
    }
    return _toClass(clazz, object);
}
/**
 * Debounces a function.
 * @param fn - The function to debounce.
 * @param delay - The delay time in milliseconds.
 * @returns A debounced function.
 */
export function debounce(fn, delay) {
    let timeoutID = null;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => fn(...args), delay);
    };
}
export function assertType(type, value) {
    if (value == null)
        return;
    if (type === "date") {
        if (value instanceof Date)
            return;
        throwTypeMismatchError(type, value);
    }
    if (type === "array") {
        if (Array.isArray(value))
            return;
        throwTypeMismatchError(type, value);
    }
    if (typeof value === type)
        return;
    throwTypeMismatchError(type, value);
}
function throwTypeMismatchError(type, value) {
    throw new Error(`Type '${type}' is not assignable to type ${JSON.stringify(value)}`);
}
