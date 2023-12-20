var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ValidationEngine_eventListener, _ValidationEngine_eventEmitter, _ValidationEngine_fieldValidatorMetaService, _ValidationEngine_groups, _ValidationEngine_hostDefault, _ValidationEngine_cacheMap, _ValidationEngine_hostClass, _ValidationEngine_asyncDelay, _ValidationEngine_debounceMap;
import API from "../../../index";
import { EventEmitter } from "../../utilities/misc/EventEmitter";
import { CacheMap } from "./CacheMap";
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
export class ValidationEngine {
    /**
     * Constructs a new `ValidationEngine` instance.
     *
     * @param clazz - The class type to be processed.
     * @param config - Optional configuration settings.
     */
    constructor(clazz, config) {
        var _a, _b, _c, _d;
        _ValidationEngine_eventListener.set(this, void 0);
        _ValidationEngine_eventEmitter.set(this, void 0);
        _ValidationEngine_fieldValidatorMetaService.set(this, void 0);
        _ValidationEngine_groups.set(this, void 0);
        _ValidationEngine_hostDefault.set(this, void 0);
        _ValidationEngine_cacheMap.set(this, void 0);
        _ValidationEngine_hostClass.set(this, void 0);
        _ValidationEngine_asyncDelay.set(this, void 0);
        _ValidationEngine_debounceMap.set(this, {});
        __classPrivateFieldSet(this, _ValidationEngine_asyncDelay, (_a = config === null || config === void 0 ? void 0 : config.asyncDelay) !== null && _a !== void 0 ? _a : 300, "f");
        __classPrivateFieldSet(this, _ValidationEngine_eventEmitter, new EventEmitter(), "f");
        __classPrivateFieldSet(this, _ValidationEngine_hostClass, clazz, "f");
        this.locale = (_b = config === null || config === void 0 ? void 0 : config.locale) !== null && _b !== void 0 ? _b : API.Localization.LocaleResolver.getLocale();
        __classPrivateFieldSet(this, _ValidationEngine_groups, Array.from(new Set((_c = config === null || config === void 0 ? void 0 : config.groups) !== null && _c !== void 0 ? _c : [])), "f");
        __classPrivateFieldSet(this, _ValidationEngine_hostDefault, (_d = config === null || config === void 0 ? void 0 : config.defaultValue) !== null && _d !== void 0 ? _d : API.Utilities.Objects.toClass(clazz), "f");
        __classPrivateFieldSet(this, _ValidationEngine_fieldValidatorMetaService, API.Reflection.Services.FieldValidatorMetaService.inject(clazz), "f");
        __classPrivateFieldSet(this, _ValidationEngine_cacheMap, new CacheMap(state => this.validate.bind(this)(state)), "f");
    }
    registerAsync(handler) {
        this.unregisterAsync();
        __classPrivateFieldSet(this, _ValidationEngine_eventListener, ({ key, value }) => {
            const { valid } = value;
            const currentError = __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("errors");
            const currentDetailedError = __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("detailedErrors");
            if (valid) {
                currentDetailedError[key] = null;
                currentError[key] = null;
            }
            else {
                currentDetailedError[key] = value;
                currentError[key] = value.message;
            }
            const patched = __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").patch({
                valid,
                detailedErrors: currentDetailedError,
                errors: currentError,
            });
            handler({
                errors: patched.errors,
                detailedErrors: patched.detailedErrors,
            });
        }, "f");
        __classPrivateFieldGet(this, _ValidationEngine_eventEmitter, "f").on("asyncValidationComplete", __classPrivateFieldGet(this, _ValidationEngine_eventListener, "f"));
    }
    unregisterAsync() {
        if (__classPrivateFieldGet(this, _ValidationEngine_eventListener, "f") != null) {
            __classPrivateFieldGet(this, _ValidationEngine_eventEmitter, "f").off("asyncValidationComplete", __classPrivateFieldGet(this, _ValidationEngine_eventListener, "f"));
        }
    }
    /**
     * Gets the default host value.
     */
    get hostDefault() {
        return __classPrivateFieldGet(this, _ValidationEngine_hostDefault, "f");
    }
    /**
     * Checks if the given payload is valid.
     *
     * @param payload - The payload to validate.
     *
     * @returns `true` if valid, `false` otherwise.
     */
    isValid(payload) {
        return __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("valid", payload);
    }
    /**
     * Retrieves detailed error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing detailed error messages.
     */
    getDetailedErrors(payload) {
        return __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("detailedErrors", payload);
    }
    /**
     * Retrieves error messages for the given payload.
     *
     * @param payload - The payload to validate.
     *
     * @returns An object containing error messages.
     */
    getErrors(payload) {
        return __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("errors", payload);
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
    validate(payload) {
        const state = API.Utilities.Objects.toClass(__classPrivateFieldGet(this, _ValidationEngine_hostClass, "f"), payload);
        const errors = {};
        const detailedErrors = {};
        __classPrivateFieldGet(this, _ValidationEngine_fieldValidatorMetaService, "f").getFields().forEach(field => {
            const validation = this.validateField(state, field);
            detailedErrors[field] = validation[0];
            errors[field] = validation[1];
        });
        return __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").patch({
            valid: !API.Utilities.Objects.hasErrors(errors),
            detailedErrors,
            errors,
        }, state);
    }
    /**
     * Validates a single field within the entity.
     *
     * @typeParam K - The key type of the field.
     *
     * @param payload - The payload containing the field value.
     * @param fieldName - The name of the field to validate.
     *
     * @returns An array containing the detailed error message and the error message.
     */
    validateField(payload, fieldName) {
        var _a, _b;
        const descriptor = __classPrivateFieldGet(this, _ValidationEngine_fieldValidatorMetaService, "f").getUntypedDescriptor(fieldName);
        const stratImpl = new descriptor.StrategyImpl(descriptor, __classPrivateFieldGet(this, _ValidationEngine_hostDefault, "f"), __classPrivateFieldGet(this, _ValidationEngine_groups, "f"), this.locale, __classPrivateFieldGet(this, _ValidationEngine_eventEmitter, "f"));
        if (descriptor.strategy === "function") {
            if (!__classPrivateFieldGet(this, _ValidationEngine_debounceMap, "f")[fieldName]) {
                __classPrivateFieldGet(this, _ValidationEngine_debounceMap, "f")[fieldName] = API.Utilities.Objects.debounce((value, context) => {
                    stratImpl.test(value, context);
                }, __classPrivateFieldGet(this, _ValidationEngine_asyncDelay, "f"));
            }
            __classPrivateFieldGet(this, _ValidationEngine_debounceMap, "f")[fieldName](payload[fieldName], payload);
            return [
                (_a = __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("detailedErrors")) === null || _a === void 0 ? void 0 : _a[fieldName],
                (_b = __classPrivateFieldGet(this, _ValidationEngine_cacheMap, "f").get("errors")) === null || _b === void 0 ? void 0 : _b[fieldName],
            ];
        }
        // @ts-expect-error We expect error here due to the nature of arbitrary types depending on the different types of fields (primitive, object, primitive array, object array and so on...)
        return stratImpl.test(payload[fieldName], payload);
    }
}
_ValidationEngine_eventListener = new WeakMap(), _ValidationEngine_eventEmitter = new WeakMap(), _ValidationEngine_fieldValidatorMetaService = new WeakMap(), _ValidationEngine_groups = new WeakMap(), _ValidationEngine_hostDefault = new WeakMap(), _ValidationEngine_cacheMap = new WeakMap(), _ValidationEngine_hostClass = new WeakMap(), _ValidationEngine_asyncDelay = new WeakMap(), _ValidationEngine_debounceMap = new WeakMap();
