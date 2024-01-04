export * from "./models";
export * from "./service";
/**
 * Retrieves the names of all fields in a class.
 *
 * @param constructor - The class constructor.
 * @returns An array of field names.
 */
export function getClassFieldNames(constructor) {
    function getPropertyNames(classInstance) {
        return Object.getOwnPropertyNames(classInstance !== null && classInstance !== void 0 ? classInstance : {}).filter(property => property !== "constructor");
    }
    const instance = new constructor();
    const prototype = instance.__proto__;
    const instanceProps = getPropertyNames(instance);
    const prototypeProps = getPropertyNames(prototype);
    const uniquePropsSet = new Set([...instanceProps, ...prototypeProps]);
    const uniquePropsArray = [...uniquePropsSet];
    return uniquePropsArray;
}
/**
 * Retrieves the property descriptor for a specific field in a class.
 *
 * @param constructor - The class constructor.
 * @param name - The name of the field.
 * @returns The property descriptor for the field.
 */
export function getClassFieldDescriptor(constructor, name) {
    const instance = new constructor();
    const prototype = instance.__proto__;
    return Object.getOwnPropertyDescriptor(prototype, name);
}
/**
 * Retrieves or initializes metadata for a given strategy.
 *
 * @param strategy - The strategy to get metadata for.
 * @returns The metadata object.
 */
export function getMetadata(strategy) {
    var _a, _b, _c;
    var _d, _e;
    if (isClass(strategy)) {
        (_a = (_d = Symbol).metadata) !== null && _a !== void 0 ? _a : (_d.metadata = Symbol("Symbol.metadata"));
        (_b = strategy[_e = Symbol.metadata]) !== null && _b !== void 0 ? _b : (strategy[_e] = {});
        return strategy[Symbol.metadata];
    }
    if (strategy && !strategy.metadata) {
        strategy.metadata = {};
    }
    return (_c = strategy === null || strategy === void 0 ? void 0 : strategy.metadata) !== null && _c !== void 0 ? _c : {};
}
/**
 * Checks if a given strategy is a class.
 *
 * @param strategy - The strategy to check.
 * @returns True if the strategy is a class, false otherwise.
 */
export function isClass(strategy) {
    return typeof strategy === "function";
}
