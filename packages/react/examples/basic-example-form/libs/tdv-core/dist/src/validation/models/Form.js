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
var _Form_instances, _Form_eventListener, _Form_eventEmitter, _Form_fieldValidatorMetaService, _Form_classValidatorMetaService, _Form_groups, _Form_defaultValue, _Form_cache, _Form_hostClass, _Form_asyncDelay, _Form_debounceMap, _Form_validateField, _Form_registerAsync, _Form_unregisterAsync;
import API from "../../index";
import { ValidationMetadata } from "../../reflection/models/ValidationMetadata";
import { EventEmitter } from "../../utilities/misc/EventEmitter";
import { Cache } from "./Cache";
import { Events } from "./Events";
/**
 * A class responsible for processing and validating class instances through its decorated validators.
 *
 * @typeParam TClass - The type of the class being processed.
 * @typeParam TBody - The type of the payload body. Defaults to `TClass`.
 *
 * @remarks
 * This class uses a `CacheMap` to store validation results for better performance.
 * It also leverages `FieldValidatorMetaService` to retrieve metadata about the class being processed.
 */
export class Form {
    get async() {
        return {
            register: __classPrivateFieldGet(this, _Form_instances, "m", _Form_registerAsync).bind(this),
            unregister: __classPrivateFieldGet(this, _Form_instances, "m", _Form_unregisterAsync).bind(this),
            delay: __classPrivateFieldGet(this, _Form_asyncDelay, "f"),
        };
    }
    /**
     * Gets the default host value.
     */
    get defaultValue() {
        return __classPrivateFieldGet(this, _Form_defaultValue, "f");
    }
    /**
     * Constructs a new `ValidationEngine` instance.
     *
     * @param clazz - The class type to be processed.
     * @param config - Optional configuration settings.
     */
    constructor(clazz, config) {
        var _a, _b, _c, _d;
        _Form_instances.add(this);
        _Form_eventListener.set(this, void 0);
        _Form_eventEmitter.set(this, void 0);
        _Form_fieldValidatorMetaService.set(this, void 0);
        // @ts-ignore
        _Form_classValidatorMetaService.set(this, void 0);
        _Form_groups.set(this, void 0);
        _Form_defaultValue.set(this, void 0);
        _Form_cache.set(this, void 0);
        _Form_hostClass.set(this, void 0);
        _Form_asyncDelay.set(this, void 0);
        _Form_debounceMap.set(this, {});
        __classPrivateFieldSet(this, _Form_asyncDelay, (_a = config === null || config === void 0 ? void 0 : config.asyncDelay) !== null && _a !== void 0 ? _a : 300, "f");
        this.__id = Math.random().toString(36).substring(2, 8);
        __classPrivateFieldSet(this, _Form_eventEmitter, new EventEmitter(this.__id), "f");
        __classPrivateFieldSet(this, _Form_hostClass, clazz, "f");
        this.locale = (_b = config === null || config === void 0 ? void 0 : config.locale) !== null && _b !== void 0 ? _b : API.Localization.getLocale();
        __classPrivateFieldSet(this, _Form_groups, Array.from(new Set((_c = config === null || config === void 0 ? void 0 : config.groups) !== null && _c !== void 0 ? _c : [])), "f");
        __classPrivateFieldSet(this, _Form_defaultValue, (_d = config === null || config === void 0 ? void 0 : config.defaultValue) !== null && _d !== void 0 ? _d : API.Utilities.Objects.toClass(clazz), "f");
        __classPrivateFieldSet(this, _Form_fieldValidatorMetaService, API.Reflection.FieldValidatorMetaService.inject(clazz, __classPrivateFieldGet(this, _Form_eventEmitter, "f")), "f");
        __classPrivateFieldSet(this, _Form_classValidatorMetaService, API.Reflection.ClassValidatorMetaService.inject(clazz, __classPrivateFieldGet(this, _Form_eventEmitter, "f")), "f");
        __classPrivateFieldSet(this, _Form_cache, new Cache(state => this.validate.bind(this)(state)), "f");
    }
    /**
     * Checks if the given payload is valid.
     *
     * @param payload - The payload to validate.
     *
     * @returns `true` if valid, `false` otherwise.
     */
    isValid(payload) {
        return __classPrivateFieldGet(this, _Form_cache, "f").get("valid", payload);
    }
    /**
     * Retrieves detailed error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing detailed error messages.
     */
    getDetailedErrors(payload) {
        return __classPrivateFieldGet(this, _Form_cache, "f").get("detailedErrors", payload);
    }
    /**
     * Retrieves error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing error messages.
     */
    getErrors(payload) {
        return __classPrivateFieldGet(this, _Form_cache, "f").get("errors", payload);
    }
    getGlobalErrors(payload) {
        return __classPrivateFieldGet(this, _Form_cache, "f").get("globalErrors", payload);
    }
    /**
     * Validates the given payload and updates the cache.
     *
     * @param payload - The payload to validate. If not provided, a new instance of the class will be used.
     *
     * @returns An object containing the validation result, which includes:
     * - `valid`: A boolean indicating the overall validity of the payload.
     * - `detailedErrors`: An object containing detailed error messages for each field.
     * - `errors`: An object containing simplified error messages for each field.
     *
     * @remarks
     * This function performs the following steps:
     * 1. Initializes an empty `Errors` and `DetailedErrors` object.
     * 2. Iterates through each field defined in the metadata of the class.
     * 3. Calls `validateField` for each field to get the validation result.
     * 4. Updates the `Errors` and `DetailedErrors` objects with the validation result.
     * 5. Determines the overall validity of the payload.
     * 6. Updates the cache with the new validation result.
     *
     * The actual field validation is delegated to the `ValidationStrategy` implementations, which are determined by the metadata service.
     *
     * @example
     * ```typescript
     * const engine = new ValidationEngine(MyClass);
     * const result = engine.validate(myPayload);
     * console.log(result.valid);  // Output: true or false
     * ```
     */
    validate(payload, args = {}) {
        const state = API.Utilities.Objects.toClass(__classPrivateFieldGet(this, _Form_hostClass, "f"), payload);
        const errors = {};
        const detailedErrors = {};
        const classValidators = __classPrivateFieldGet(this, _Form_classValidatorMetaService, "f").data.contents;
        const classReflectionRule = new ValidationMetadata(classValidators);
        const classValidationErrors = classReflectionRule.validate(state, state, __classPrivateFieldGet(this, _Form_groups, "f"), this.locale, args, __classPrivateFieldGet(this, _Form_eventEmitter, "f"));
        __classPrivateFieldGet(this, _Form_fieldValidatorMetaService, "f").getFields().forEach(field => {
            const validation = __classPrivateFieldGet(this, _Form_instances, "m", _Form_validateField).call(this, field, state, args);
            detailedErrors[field] = validation[0];
            errors[field] = validation[1];
        });
        return __classPrivateFieldGet(this, _Form_cache, "f").patch({
            valid: !API.Utilities.Objects.hasErrors(errors),
            detailedErrors,
            errors,
            globalErrors: classValidationErrors,
        }, state);
    }
    /**
     * Registers an event listener for the specified event.
     * @param event - The name of the event to listen for.
     * @param handler - The event handler function.
     */
    listen(event, handler) {
        __classPrivateFieldGet(this, _Form_eventEmitter, "f").on(event, handler);
    }
    /**
     * Emits an event with optional data.
     * @param event - The name of the event to emit.
     * @param data - Optional data to pass along with the event.
     */
    emit(event, data) {
        __classPrivateFieldGet(this, _Form_eventEmitter, "f").emit(event, data);
    }
}
_Form_eventListener = new WeakMap(), _Form_eventEmitter = new WeakMap(), _Form_fieldValidatorMetaService = new WeakMap(), _Form_classValidatorMetaService = new WeakMap(), _Form_groups = new WeakMap(), _Form_defaultValue = new WeakMap(), _Form_cache = new WeakMap(), _Form_hostClass = new WeakMap(), _Form_asyncDelay = new WeakMap(), _Form_debounceMap = new WeakMap(), _Form_instances = new WeakSet(), _Form_validateField = function _Form_validateField(fieldName, 
// @ts-ignore
payload, args = {}) {
    var _a, _b;
    const descriptor = __classPrivateFieldGet(this, _Form_fieldValidatorMetaService, "f").getUntypedDescriptor(fieldName, __classPrivateFieldGet(this, _Form_eventEmitter, "f"));
    const stratImpl = new descriptor.StrategyImpl(descriptor, __classPrivateFieldGet(this, _Form_defaultValue, "f"), __classPrivateFieldGet(this, _Form_groups, "f"), this.locale, __classPrivateFieldGet(this, _Form_eventEmitter, "f"));
    if (descriptor.strategy === "function") {
        if (!__classPrivateFieldGet(this, _Form_debounceMap, "f")[fieldName]) {
            __classPrivateFieldGet(this, _Form_debounceMap, "f")[fieldName] = API.Utilities.Objects.debounce((value, context) => {
                stratImpl.test(value, context, args);
            }, __classPrivateFieldGet(this, _Form_asyncDelay, "f"));
        }
        // @ts-ignore
        __classPrivateFieldGet(this, _Form_debounceMap, "f")[fieldName](payload[fieldName], payload, args);
        return [
            (_a = __classPrivateFieldGet(this, _Form_cache, "f").get("detailedErrors")) === null || _a === void 0 ? void 0 : _a[fieldName],
            (_b = __classPrivateFieldGet(this, _Form_cache, "f").get("errors")) === null || _b === void 0 ? void 0 : _b[fieldName],
        ];
    }
    // @ts-expect-error We expect error here due to the nature of arbitrary types depending on the different types of fields (primitive, object, primitive array, object array and so on...)
    return stratImpl.test(payload[fieldName], payload, args);
}, _Form_registerAsync = function _Form_registerAsync(handler) {
    __classPrivateFieldGet(this, _Form_instances, "m", _Form_unregisterAsync).call(this);
    __classPrivateFieldSet(this, _Form_eventListener, ({ key, value }) => {
        const { valid } = value;
        const currentErrors = __classPrivateFieldGet(this, _Form_cache, "f").get("errors");
        const currentDetailedErrors = __classPrivateFieldGet(this, _Form_cache, "f").get("detailedErrors");
        let currentGlobalErrors = __classPrivateFieldGet(this, _Form_cache, "f").get("globalErrors");
        if (key) {
            let simpleResults = currentErrors[key];
            let detailedResults = currentDetailedErrors[key];
            if (valid) {
                detailedResults = detailedResults.filter(r => r.key !== value.key);
                simpleResults = simpleResults.filter(r => r !== value.message);
            }
            else {
                const existing = detailedResults.find(r => r.key === value.key);
                if (!existing) {
                    detailedResults = [...detailedResults, value];
                    simpleResults = [...simpleResults, value.message];
                }
            }
            currentErrors[key] = simpleResults;
            currentDetailedErrors[key] = detailedResults;
        }
        else {
            if (valid) {
                currentGlobalErrors = currentGlobalErrors.filter((r) => r.key !== value.key);
            }
            else {
                const existing = currentGlobalErrors.find((r) => r.key === value.key);
                if (!existing) {
                    currentGlobalErrors = [...currentGlobalErrors, value];
                }
            }
        }
        const patched = __classPrivateFieldGet(this, _Form_cache, "f").patch({
            valid,
            detailedErrors: Object.assign({}, currentDetailedErrors),
            errors: Object.assign({}, currentErrors),
            globalErrors: [...currentGlobalErrors],
        });
        handler({
            errors: patched.errors,
            detailedErrors: patched.detailedErrors,
            globalErrors: patched.globalErrors,
        });
    }, "f");
    __classPrivateFieldGet(this, _Form_eventEmitter, "f").on(Events.ASYNC_VALIDATION_COMPLETE, __classPrivateFieldGet(this, _Form_eventListener, "f"));
}, _Form_unregisterAsync = function _Form_unregisterAsync() {
    if (__classPrivateFieldGet(this, _Form_eventListener, "f") != null) {
        __classPrivateFieldGet(this, _Form_eventEmitter, "f").off(Events.ASYNC_VALIDATION_COMPLETE, __classPrivateFieldGet(this, _Form_eventListener, "f"));
    }
};
