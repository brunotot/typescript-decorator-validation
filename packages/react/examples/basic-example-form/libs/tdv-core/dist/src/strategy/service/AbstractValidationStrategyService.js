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
var _AbstractValidationStrategyService_locale, _AbstractValidationStrategyService_groups, _AbstractValidationStrategyService_engineCfg, _AbstractValidationStrategyService_classRules, _AbstractValidationStrategyService_descriptor, _AbstractValidationStrategyService_defaultParent, _AbstractValidationStrategyService_fieldDescriptor, _AbstractValidationStrategyService_eventEmitter;
import { ClassValidatorMetaService } from "../../reflection/service/impl/ClassValidatorMetaService";
import { FieldValidatorMetaService } from "../../reflection/service/impl/FieldValidatorMetaService";
import { Form } from "../../validation/models/Form";
/**
 * The `AbstractValidationStrategyService` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export class AbstractValidationStrategyService {
    /**
     * Initializes the `#descriptor` and `#defaultParent` fields.
     *
     * @param descriptor The reflection descriptor for the field.
     * @param defaultValue The default value for the parent object.
     */
    constructor(descriptor, defaultValue, groups, locale, eventEmitter, asyncDelay) {
        _AbstractValidationStrategyService_locale.set(this, void 0);
        _AbstractValidationStrategyService_groups.set(this, void 0);
        _AbstractValidationStrategyService_engineCfg.set(this, void 0);
        _AbstractValidationStrategyService_classRules.set(this, void 0);
        _AbstractValidationStrategyService_descriptor.set(this, void 0);
        _AbstractValidationStrategyService_defaultParent.set(this, void 0);
        _AbstractValidationStrategyService_fieldDescriptor.set(this, void 0);
        _AbstractValidationStrategyService_eventEmitter.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_eventEmitter, eventEmitter, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_descriptor, descriptor, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_defaultParent, defaultValue, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_groups, groups, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_locale, locale, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_engineCfg, {
            defaultValue: this.defaultValue,
            groups: this.groups,
            asyncDelay,
        }, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_classRules, ClassValidatorMetaService.inject(__classPrivateFieldGet(this, _AbstractValidationStrategyService_descriptor, "f").hostClass, this.eventEmitter).data, "f");
    }
    set eventEmitter(v) {
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_eventEmitter, v, "f");
    }
    get eventEmitter() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_eventEmitter, "f");
    }
    get fieldEngine() {
        return new Form(__classPrivateFieldGet(this, _AbstractValidationStrategyService_descriptor, "f").thisClass, this.engineCfg);
    }
    get engineCfg() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_engineCfg, "f");
    }
    get classRules() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_classRules, "f");
    }
    get groups() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_groups, "f");
    }
    get locale() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_locale, "f");
    }
    /**
     * Constructs and returns the configuration object for entity processing.
     *
     * @param groups Validation groups to consider during validation.
     *
     * @returns An `ValidationEngineNs.Config` object configured for the field type.
     */
    get fieldDescriptor() {
        if (__classPrivateFieldGet(this, _AbstractValidationStrategyService_fieldDescriptor, "f"))
            return __classPrivateFieldGet(this, _AbstractValidationStrategyService_fieldDescriptor, "f");
        __classPrivateFieldSet(this, _AbstractValidationStrategyService_fieldDescriptor, FieldValidatorMetaService.inject(__classPrivateFieldGet(this, _AbstractValidationStrategyService_descriptor, "f").hostClass, __classPrivateFieldGet(this, _AbstractValidationStrategyService_eventEmitter, "f")).getUntypedDescriptor(this.fieldName, this.eventEmitter), "f");
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_fieldDescriptor, "f");
    }
    /**
     * Gets the field name from the descriptor.
     *
     * @returns The name of the field.
     */
    get fieldName() {
        return __classPrivateFieldGet(this, _AbstractValidationStrategyService_descriptor, "f").thisName;
    }
    /**
     * Gets the default value for the field.
     *
     * @returns The default value of the field.
     */
    get defaultValue() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _AbstractValidationStrategyService_defaultParent, "f")) === null || _a === void 0 ? void 0 : _a[this.fieldName];
    }
    getErrorMessages(validations = []) {
        const nonNullableValidations = validations !== null && validations !== void 0 ? validations : [];
        return Array.isArray(nonNullableValidations) ? nonNullableValidations.map(e => e.message) : [];
    }
    getClassErrors(fieldValue, parentValue) {
        return this.classRules.validate(fieldValue, parentValue, this.groups, this.locale);
    }
    getRootErrors(fieldValue, parentValue, args) {
        return this.fieldDescriptor.validations.root.validate(fieldValue, parentValue, this.groups, this.locale, args, __classPrivateFieldGet(this, _AbstractValidationStrategyService_eventEmitter, "f"), this.fieldName);
    }
    getArrayItemErrors(arrayItem, parentValue) {
        return this.fieldDescriptor.validations.foreach.validate(arrayItem, parentValue, this.groups, this.locale);
    }
}
_AbstractValidationStrategyService_locale = new WeakMap(), _AbstractValidationStrategyService_groups = new WeakMap(), _AbstractValidationStrategyService_engineCfg = new WeakMap(), _AbstractValidationStrategyService_classRules = new WeakMap(), _AbstractValidationStrategyService_descriptor = new WeakMap(), _AbstractValidationStrategyService_defaultParent = new WeakMap(), _AbstractValidationStrategyService_fieldDescriptor = new WeakMap(), _AbstractValidationStrategyService_eventEmitter = new WeakMap();
