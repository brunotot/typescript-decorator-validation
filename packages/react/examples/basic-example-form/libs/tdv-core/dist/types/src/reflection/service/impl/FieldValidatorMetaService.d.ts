import { type DecoratorMeta } from "../../../decorators";
import { AbstractMetaService, type MetaStrategy } from "../../service/AbstractMetaService";
import { type AbstractValidationStrategyService } from "../../../strategy";
import { type EventEmitter, type Types } from "../../../utilities";
import { ValidationMetadata } from "../../../validation/models/ValidationMetadata";
import type { ValidationEvaluator } from "../../../validation/types";
/**
 * Describes the reflection rules for a specific field within a class.
 * @typeParam FieldType - The type of the field.
 */
export type ControlDescriptorValidationMetadata<FieldType> = {
    root: ValidationMetadata<FieldType>;
    foreach: ValidationMetadata<FieldType>;
};
/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ControlDescriptorType<HostClass, Name extends keyof HostClass | undefined = undefined> = Name extends keyof HostClass ? HostClass[Name] : HostClass;
/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ControlDescriptorProps<This, HostClass, Name extends keyof HostClass | undefined = undefined> = {
    hostClass?: Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: Types.Class<This>;
    thisName?: Name;
    thisDefault?: ControlDescriptorType<HostClass, Name>;
    validations?: ControlDescriptorValidationMetadata<ControlDescriptorType<HostClass, Name>>;
    eventEmitter: EventEmitter;
};
/**
 * A class responsible for describing reflection metadata for a specific field within a class.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 * @remarks This class is used to store metadata about a specific field, including its validation rules and default values.
 */
export declare class ControlDescriptor<This, HostClass, Name extends keyof HostClass | undefined = undefined> {
    hostClass?: Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: Types.Class<This>;
    thisName?: Name;
    thisDefault?: ControlDescriptorType<HostClass, Name>;
    validations: ControlDescriptorValidationMetadata<ControlDescriptorType<HostClass, Name>>;
    eventEmitter: EventEmitter;
    validateIf: (clazz: HostClass) => boolean;
    constructor(props: ControlDescriptorProps<This, HostClass, Name>);
    /**
     * Gets the implementation of the reflection strategy.
     * @throws {Error} If the strategy is not implemented.
     */
    get StrategyImpl(): Types.Class<AbstractValidationStrategyService>;
    /**
     * Determines the reflection strategy type for the descriptor.
     * @returns The type of the reflection strategy.
     * @remarks
     * This method performs the following steps:
     * 1. Checks if the host class is defined.
     * 2. Checks if the field name is defined.
     * 3. Determines the strategy based on the field type and its metadata.
     */
    get strategy(): string;
}
/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation. It provides methods to add validators, get field names, and manage descriptors.
 */
export declare class FieldValidatorMetaService extends AbstractMetaService<Map<string, ControlDescriptor<any, any, any>>> {
    #private;
    /**
     * Static method to create a new instance of FieldValidatorMetaService.
     * @param strategy - The strategy to inject.
     * @returns A new instance of FieldValidatorMetaService.
     */
    static inject(strategy: MetaStrategy, eventEmitter: EventEmitter): FieldValidatorMetaService;
    eventEmitter: EventEmitter;
    private constructor();
    /**
     * Adds a validator to a field.
     *
     * @param field - The name of the field.
     * @param validate - The validation function.
     * @param groups - Optional validation groups.
     */
    addValidator(field: string, validate: ValidationEvaluator<any>, meta?: DecoratorMeta<any>): void;
    /**
     * Gets the names of all fields present within given
     * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
     *
     * @returns An array of field names.
     */
    getFields(): string[];
    /**
     * Checks if a descriptor exists for a given name.
     *
     * @param name - The name of a field descriptor.
     * @returns `true` if the descriptor exists, `false` otherwise.
     */
    hasDescriptor(name: string): boolean;
    /**
     * Gets a typed descriptor for a given field name.
     *
     * @param thisName - The name of the field.
     * @returns The typed descriptor.
     */
    getTypedDescriptor<TClass, TName extends keyof TClass>(thisName: TName): ControlDescriptor<unknown, TClass, TName>;
    /**
     * Gets an untyped descriptor for a given field key.
     *
     * @param fieldKey - The key of the field.
     * @returns The untyped descriptor.
     */
    getUntypedDescriptor(fieldKey: any, eventEmitter?: EventEmitter): ControlDescriptor<any, any, any>;
}
//# sourceMappingURL=FieldValidatorMetaService.d.ts.map