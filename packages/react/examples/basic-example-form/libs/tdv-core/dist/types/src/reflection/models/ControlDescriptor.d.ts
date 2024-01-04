import API from "../../../index";
import { EventEmitter } from "../../utilities/misc/EventEmitter";
import StrategyMapper from "./../../strategy/models/StrategyMapper";
import { ValidationMetadata } from "./ValidationMetadata";
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
    hostClass?: API.Utilities.Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: API.Utilities.Types.Class<This>;
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
    hostClass?: API.Utilities.Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: API.Utilities.Types.Class<This>;
    thisName?: Name;
    thisDefault?: ControlDescriptorType<HostClass, Name>;
    validations: ControlDescriptorValidationMetadata<ControlDescriptorType<HostClass, Name>>;
    eventEmitter: EventEmitter;
    constructor(props: ControlDescriptorProps<This, HostClass, Name>);
    /**
     * Gets the implementation of the reflection strategy.
     * @throws {Error} If the strategy is not implemented.
     */
    get StrategyImpl(): API.Utilities.Types.Class<API.Strategy.Service.AbstractStrategy>;
    /**
     * Determines the reflection strategy type for the descriptor.
     * @returns The type of the reflection strategy.
     * @remarks
     * This method performs the following steps:
     * 1. Checks if the host class is defined.
     * 2. Checks if the field name is defined.
     * 3. Determines the strategy based on the field type and its metadata.
     */
    get strategy(): StrategyMapper.Key;
}
//# sourceMappingURL=ControlDescriptor.d.ts.map