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
var _FieldValidatorMetaService_instances, _FieldValidatorMetaService_fields, _FieldValidatorMetaService_handleClassInit, _FieldValidatorMetaService_handleContextInit;
import API from "../../../../index";
import { AbstractMetaService } from "../AbstractMetaService";
/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation.
 * It provides methods to add validators, get field names, and manage descriptors.
 */
export class FieldValidatorMetaService extends AbstractMetaService {
    /**
     * Static method to create a new instance of FieldValidatorMetaService.
     *
     * @param strategy - The strategy to inject.
     * @returns A new instance of FieldValidatorMetaService.
     */
    static inject(strategy) {
        return new FieldValidatorMetaService(strategy);
    }
    constructor(strategy) {
        super(FieldValidatorMetaService.name, strategy, () => new Map());
        _FieldValidatorMetaService_instances.add(this);
        _FieldValidatorMetaService_fields.set(this, void 0);
        API.Reflection.isClass(strategy)
            ? __classPrivateFieldGet(this, _FieldValidatorMetaService_instances, "m", _FieldValidatorMetaService_handleClassInit).call(this, strategy)
            : __classPrivateFieldGet(this, _FieldValidatorMetaService_instances, "m", _FieldValidatorMetaService_handleContextInit).call(this, strategy);
    }
    /**
     * Adds a validator to a field.
     *
     * @param field - The name of the field.
     * @param isValid - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(field, isValid, groups) {
        this.getUntypedDescriptor(field).rules.root.add({
            validate: isValid,
            groups,
        });
    }
    /**
     * Gets the names of all fields present within given
     * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
     *
     * @returns An array of field names.
     */
    getFields() {
        return __classPrivateFieldGet(this, _FieldValidatorMetaService_fields, "f");
    }
    /**
     * Checks if a descriptor exists for a given name.
     *
     * @param name - The name of a field descriptor.
     * @returns `true` if the descriptor exists, `false` otherwise.
     */
    hasDescriptor(name) {
        return this.data.has(name);
    }
    /**
     * Gets a typed descriptor for a given field name.
     *
     * @param thisName - The name of the field.
     * @returns The typed descriptor.
     */
    getTypedDescriptor(thisName) {
        return this.getUntypedDescriptor(thisName);
    }
    /**
     * Gets an untyped descriptor for a given field key.
     *
     * @param fieldKey - The key of the field.
     * @returns The untyped descriptor.
     */
    getUntypedDescriptor(fieldKey) {
        if (!this.hasDescriptor(fieldKey)) {
            const cfg = { thisName: fieldKey };
            const fieldValue = new API.Reflection.Descriptor.Instance(cfg);
            this.data.set(fieldKey, fieldValue);
        }
        const descriptor = this.data.get(fieldKey);
        if (!descriptor) {
            throw new Error(`Descriptor "${fieldKey}" does not exist`);
        }
        descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
        return descriptor;
    }
}
_FieldValidatorMetaService_fields = new WeakMap(), _FieldValidatorMetaService_instances = new WeakSet(), _FieldValidatorMetaService_handleClassInit = function _FieldValidatorMetaService_handleClassInit(clazz) {
    __classPrivateFieldSet(this, _FieldValidatorMetaService_fields, API.Reflection.getClassFieldNames(clazz), "f");
    __classPrivateFieldGet(this, _FieldValidatorMetaService_fields, "f").forEach(name => this.getUntypedDescriptor(name));
}, _FieldValidatorMetaService_handleContextInit = function _FieldValidatorMetaService_handleContextInit(_context) {
    __classPrivateFieldSet(this, _FieldValidatorMetaService_fields, [], "f");
};
