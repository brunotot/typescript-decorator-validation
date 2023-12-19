var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
/**
 * A namespace containing all data and types for reflection (validation) rule.
 */
var ReflectionRule;
(function (ReflectionRule) {
    var _Instance_instances, _Instance_contents, _Instance_groupedValidators;
    /**
     * Manages a collection of validation rules for a specific field.
     *
     * @typeParam TFieldType - The type of the field.
     *
     * @remarks
     * This class is responsible for storing and applying validation rules to a specific field.
     * It allows you to validate the field against a payload and a set of validation groups.
     */
    class Instance {
        /**
         * Gets the contents of the reflection rule.
         *
         * @returns An array of `Validation.Metadata` for the field.
         */
        get contents() {
            return __classPrivateFieldGet(this, _Instance_contents, "f");
        }
        /**
         * Constructs a new `ReflectionRule` instance.
         */
        constructor() {
            _Instance_instances.add(this);
            _Instance_contents.set(this, void 0);
            __classPrivateFieldSet(this, _Instance_contents, [], "f");
        }
        /**
         * Validates a field against a payload and a set of validation groups.
         *
         * @typeParam TBody - The type of the payload.
         *
         * @param value - The value of the field to validate.
         * @param payload - The payload to validate against.
         * @param groups - The validation groups to consider.
         *
         * @returns An array of `Validation.Result` containing the validation results.
         */
        validate(value, payload, groups, locale) {
            return __classPrivateFieldGet(this, _Instance_instances, "m", _Instance_groupedValidators).call(this, __classPrivateFieldGet(this, _Instance_contents, "f"), groups)
                .map(({ validate }) => validate(value, payload, locale))
                .filter(({ valid }) => !valid);
        }
        /**
         * Removes and returns the last validation rule from the collection.
         *
         * @returns The last `Validation.Metadata` that was removed.
         */
        pop() {
            return __classPrivateFieldGet(this, _Instance_contents, "f").pop();
        }
        /**
         * Adds a new validation rule to the collection.
         *
         * @param rule - The `Validation.Metadata` to add.
         */
        add(rule) {
            __classPrivateFieldGet(this, _Instance_contents, "f").push(rule);
        }
    }
    _Instance_contents = new WeakMap(), _Instance_instances = new WeakSet(), _Instance_groupedValidators = function _Instance_groupedValidators(data, groups) {
        return data.filter((meta) => groups.length > 0 ? meta.groups.some(o => groups.includes(o)) : meta.groups.length === 0);
    };
    ReflectionRule.Instance = Instance;
})(ReflectionRule || (ReflectionRule = {}));
export default ReflectionRule;
