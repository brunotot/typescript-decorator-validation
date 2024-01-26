"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidatorMetaService = exports.ControlDescriptor = void 0;
const _decorators_1 = require("../../../decorators");
const AbstractMetaService_1 = require("../../service/AbstractMetaService");
const StrategyMapper_1 = require("../../../strategy/models/StrategyMapper");
const Strategies = __importStar(require("../../../strategy/service/impl"));
const _utilities_1 = require("../../../utilities");
const ValidationMetadata_1 = require("../../../validation/models/ValidationMetadata");
/**
 * A class responsible for describing reflection metadata for a specific field within a class.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 * @remarks This class is used to store metadata about a specific field, including its validation rules and default values.
 */
class ControlDescriptor {
    constructor(props) {
        var _a, _b;
        this.hostClass = props.hostClass;
        this.thisName = props.thisName;
        this.thisClass = props.thisClass;
        this.hostDefault = ((_a = props.hostDefault) !== null && _a !== void 0 ? _a : props.hostClass) ? new props.hostClass() : undefined;
        this.thisDefault = props.thisDefault;
        this.eventEmitter = props.eventEmitter;
        this.validateIf = () => true;
        this.validations = (_b = props.validations) !== null && _b !== void 0 ? _b : {
            root: new ValidationMetadata_1.ValidationMetadata(),
            foreach: new ValidationMetadata_1.ValidationMetadata(),
        };
    }
    /**
     * Gets the implementation of the reflection strategy.
     * @throws {Error} If the strategy is not implemented.
     */
    get StrategyImpl() {
        const strategy = this.strategy;
        if (!(strategy in StrategyMapper_1.StrategyData)) {
            const error = `Validation strategy not implemented for field type '${strategy}'`;
            throw new Error(error);
        }
        return StrategyMapper_1.StrategyData[strategy];
    }
    /**
     * Determines the reflection strategy type for the descriptor.
     * @returns The type of the reflection strategy.
     * @remarks
     * This method performs the following steps:
     * 1. Checks if the host class is defined.
     * 2. Checks if the field name is defined.
     * 3. Determines the strategy based on the field type and its metadata.
     */
    get strategy() {
        var _a;
        if (!this.hostClass) {
            return "unknown";
        }
        if (!this.thisName) {
            return Strategies.ObjectStrategy.Name;
        }
        const instance = new this.hostClass();
        const fieldName = this.thisName;
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const getNativeStrategy = (value) => {
            const meta = FieldValidatorMetaService.inject(this.hostClass, this.eventEmitter);
            const descriptor = meta.getTypedDescriptor(this.thisName);
            if (value instanceof Promise ||
                (value &&
                    typeof value === "object" &&
                    "key" in value &&
                    typeof value.key === "string" &&
                    "valid" in value &&
                    typeof value.valid === "boolean" &&
                    "message" in value &&
                    typeof value.message === "string")) {
                return Strategies.FunctionStrategy.Name;
            }
            return Array.isArray(value)
                ? descriptor.thisClass
                    ? Strategies.ObjectArrayStrategy.Name
                    : Strategies.PrimitiveArrayStrategy.Name
                : descriptor.thisClass
                    ? Strategies.ObjectStrategy.Name
                    : Strategies.PrimitiveStrategy.Name;
        };
        const descriptor = _utilities_1.Classes.getClassFieldDescriptor(this.hostClass, fieldName);
        const isGetter = (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) && !descriptor.set;
        if (isGetter) {
            const value = descriptor.get.call(instance);
            return `get (): ${getNativeStrategy(value)}`;
        }
        const value = instance[fieldName];
        if (typeof value === "function") {
            return getNativeStrategy(value.bind((_a = this.hostDefault) !== null && _a !== void 0 ? _a : new this.hostClass())());
        }
        return getNativeStrategy(value);
    }
}
exports.ControlDescriptor = ControlDescriptor;
/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation. It provides methods to add validators, get field names, and manage descriptors.
 */
class FieldValidatorMetaService extends AbstractMetaService_1.AbstractMetaService {
    /**
     * Static method to create a new instance of FieldValidatorMetaService.
     * @param strategy - The strategy to inject.
     * @returns A new instance of FieldValidatorMetaService.
     */
    static inject(strategy, eventEmitter) {
        return new FieldValidatorMetaService(strategy, eventEmitter);
    }
    constructor(strategy, eventEmitter) {
        super(FieldValidatorMetaService.name, strategy, () => new Map());
        _FieldValidatorMetaService_instances.add(this);
        _FieldValidatorMetaService_fields.set(this, void 0);
        this.eventEmitter = eventEmitter;
        _utilities_1.Classes.isClass(strategy)
            ? __classPrivateFieldGet(this, _FieldValidatorMetaService_instances, "m", _FieldValidatorMetaService_handleClassInit).call(this, strategy)
            : __classPrivateFieldGet(this, _FieldValidatorMetaService_instances, "m", _FieldValidatorMetaService_handleContextInit).call(this, strategy);
    }
    /**
     * Adds a validator to a field.
     *
     * @param field - The name of the field.
     * @param validate - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(field, validate, meta = _decorators_1.DEFAULT_DECORATOR_META) {
        this.getUntypedDescriptor(field).validations.root.add({ validate, meta });
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
    getUntypedDescriptor(fieldKey, eventEmitter) {
        this.eventEmitter = eventEmitter !== null && eventEmitter !== void 0 ? eventEmitter : this.eventEmitter;
        if (!this.hasDescriptor(fieldKey)) {
            const cfg = { thisName: fieldKey, eventEmitter: this.eventEmitter };
            const fieldValue = new ControlDescriptor(cfg);
            this.data.set(fieldKey, fieldValue);
        }
        const descriptor = this.data.get(fieldKey);
        if (!descriptor)
            throw new Error(`Descriptor "${fieldKey}" does not exist`);
        descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
        descriptor.eventEmitter = this.eventEmitter;
        return descriptor;
    }
}
exports.FieldValidatorMetaService = FieldValidatorMetaService;
_FieldValidatorMetaService_fields = new WeakMap(), _FieldValidatorMetaService_instances = new WeakSet(), _FieldValidatorMetaService_handleClassInit = function _FieldValidatorMetaService_handleClassInit(clazz) {
    __classPrivateFieldSet(this, _FieldValidatorMetaService_fields, _utilities_1.Classes.getClassFieldNames(clazz), "f");
    __classPrivateFieldGet(this, _FieldValidatorMetaService_fields, "f").forEach(name => this.getUntypedDescriptor(name));
}, _FieldValidatorMetaService_handleContextInit = function _FieldValidatorMetaService_handleContextInit(_context) {
    __classPrivateFieldSet(this, _FieldValidatorMetaService_fields, [], "f");
};
