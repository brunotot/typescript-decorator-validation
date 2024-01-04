function isEmptyArrayStringOrValidationResult(value) {
    return (Array.isArray(value) &&
        (value.length === 0 ||
            typeof value[0] === "string" ||
            value[0] !== undefined));
}
export function clearErrors(data) {
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
