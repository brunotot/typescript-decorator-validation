"use strict";
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
var _ValidationMetadata_instances, _ValidationMetadata_contents, _ValidationMetadata_handleAsyncResults, _ValidationMetadata_groupedValidators;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMetadata = void 0;
const Events_1 = require("../models/Events");
/**
 * Manages a collection of validation rules for a specific field.
 *
 * @typeParam TFieldType - The type of the field.
 *
 * @remarks
 * This class is responsible for storing and applying validation rules to a specific field.
 * It allows you to validate the field against a payload and a set of validation groups.
 */
class ValidationMetadata {
    /**
     * Gets the contents of the reflection rule.
     *
     * @returns An array of `Validation.Metadata` for the field.
     */
    get contents() {
        return __classPrivateFieldGet(this, _ValidationMetadata_contents, "f");
    }
    /**
     * Constructs a new `ReflectionRule` instance.
     */
    constructor(contents = []) {
        _ValidationMetadata_instances.add(this);
        _ValidationMetadata_contents.set(this, void 0);
        __classPrivateFieldSet(this, _ValidationMetadata_contents, contents, "f");
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
     * @returns An array of `ValidationResult` containing the validation results.
     */
    validate(value, payload, groups, locale, args, emitter, field) {
        function isPromise(value) {
            return Boolean(value && typeof value.then === "function");
        }
        const groupedValidators = __classPrivateFieldGet(this, _ValidationMetadata_instances, "m", _ValidationMetadata_groupedValidators).call(this, __classPrivateFieldGet(this, _ValidationMetadata_contents, "f"), groups);
        const results = groupedValidators.map(({ validate }) => validate(value, payload, locale, args !== null && args !== void 0 ? args : {}));
        const asyncResults = results.filter(v => isPromise(v));
        __classPrivateFieldGet(this, _ValidationMetadata_instances, "m", _ValidationMetadata_handleAsyncResults).call(this, asyncResults, emitter, field);
        const syncResults = results.filter(v => !isPromise(v));
        return syncResults.filter(({ valid }) => !valid);
    }
    /**
     * Removes and returns the last validation rule from the collection.
     *
     * @returns The last `Validation.Metadata` that was removed.
     */
    pop() {
        return __classPrivateFieldGet(this, _ValidationMetadata_contents, "f").pop();
    }
    /**
     * Adds a new validation rule to the collection.
     *
     * @param rule - The `Validation.Metadata` to add.
     */
    add(rule) {
        __classPrivateFieldGet(this, _ValidationMetadata_contents, "f").push(rule);
    }
}
exports.ValidationMetadata = ValidationMetadata;
_ValidationMetadata_contents = new WeakMap(), _ValidationMetadata_instances = new WeakSet(), _ValidationMetadata_handleAsyncResults = function _ValidationMetadata_handleAsyncResults(asyncResults, emitter, field) {
    if (!emitter)
        return;
    Promise.all(asyncResults).then(results => {
        results.forEach(value => {
            emitter.emit(Events_1.Events.ASYNC_VALIDATION_COMPLETE, {
                key: field,
                value,
            });
        });
    });
}, _ValidationMetadata_groupedValidators = function _ValidationMetadata_groupedValidators(data, groups) {
    return data.filter((meta) => groups.length > 0 ? meta.groups.some((o) => groups.includes(o)) : meta.groups.length === 0);
};
