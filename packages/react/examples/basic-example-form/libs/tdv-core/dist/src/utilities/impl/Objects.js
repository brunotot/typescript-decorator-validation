export var Objects;
(function (Objects) {
    /**
     * Removes duplicate elements from an array while preserving order.
     *
     * @typeParam T - The type of the elements in the array.
     */
    function unique(data) {
        return [...new Set(data)];
    }
    Objects.unique = unique;
    /**
     * Recursively checks if two values are deep equal.
     */
    function deepEquals(val1, val2) {
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
    Objects.deepEquals = deepEquals;
    /**
     * Hashes a value of any type and returns a number.
     */
    function hash(val) {
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
    Objects.hash = hash;
    /**
     * Debounces a function.
     * @param fn - The function to debounce.
     * @param delay - The delay time in milliseconds.
     * @returns A debounced function.
     */
    function debounce(fn, delay) {
        let timeoutID = null;
        return (...args) => {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(() => fn(...args), delay);
        };
    }
    Objects.debounce = debounce;
    function assertType(type, value) {
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
    Objects.assertType = assertType;
    function throwTypeMismatchError(type, value) {
        throw new Error(`Type '${type}' is not assignable to type ${JSON.stringify(value)}`);
    }
})(Objects || (Objects = {}));
