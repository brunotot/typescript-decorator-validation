import API from "../../index";
import { EventEmitter } from "../../utilities/misc/EventEmitter";
import { ValidationMetadataEntry } from "../../validation";
/**
 * Manages a collection of validation rules for a specific field.
 *
 * @typeParam TFieldType - The type of the field.
 *
 * @remarks
 * This class is responsible for storing and applying validation rules to a specific field.
 * It allows you to validate the field against a payload and a set of validation groups.
 */
export declare class ValidationMetadata<TFieldType> {
    #private;
    /**
     * Gets the contents of the reflection rule.
     *
     * @returns An array of `Validation.Metadata` for the field.
     */
    get contents(): Array<ValidationMetadataEntry<TFieldType>>;
    /**
     * Constructs a new `ReflectionRule` instance.
     */
    constructor(contents?: Array<ValidationMetadataEntry<TFieldType>>);
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
    validate<TBody>(value: TFieldType, payload: API.Utilities.Objects.Payload<TBody>, groups: string[], locale: API.Localization.Locale, args?: API.Decorator.DecoratorArgs, emitter?: EventEmitter, field?: string): API.Validation.ValidationResult[];
    /**
     * Removes and returns the last validation rule from the collection.
     *
     * @returns The last `Validation.Metadata` that was removed.
     */
    pop(): ValidationMetadataEntry<TFieldType>;
    /**
     * Adds a new validation rule to the collection.
     *
     * @param rule - The `Validation.Metadata` to add.
     */
    add(rule: ValidationMetadataEntry<TFieldType>): void;
}
//# sourceMappingURL=ValidationMetadata.d.ts.map