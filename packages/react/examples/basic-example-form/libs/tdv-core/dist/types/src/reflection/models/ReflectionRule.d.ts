import type API from "../../../index";
/**
 * A namespace containing all data and types for reflection (validation) rule.
 */
declare namespace ReflectionRule {
    /**
     * Manages a collection of validation rules for a specific field.
     *
     * @typeParam TFieldType - The type of the field.
     *
     * @remarks
     * This class is responsible for storing and applying validation rules to a specific field.
     * It allows you to validate the field against a payload and a set of validation groups.
     */
    class Instance<TFieldType> {
        #private;
        /**
         * Gets the contents of the reflection rule.
         *
         * @returns An array of `Validation.Metadata` for the field.
         */
        get contents(): Array<API.Validation.Metadata<TFieldType>>;
        /**
         * Constructs a new `ReflectionRule` instance.
         */
        constructor();
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
        validate<TBody>(value: TFieldType, payload: API.Utilities.Objects.Payload<TBody>, groups: string[], locale: API.Localization.LocaleResolver.Locale): API.Validation.Result[];
        /**
         * Removes and returns the last validation rule from the collection.
         *
         * @returns The last `Validation.Metadata` that was removed.
         */
        pop(): API.Validation.Metadata<TFieldType>;
        /**
         * Adds a new validation rule to the collection.
         *
         * @param rule - The `Validation.Metadata` to add.
         */
        add(rule: API.Validation.Metadata<TFieldType>): void;
    }
}
export default ReflectionRule;
//# sourceMappingURL=ReflectionRule.d.ts.map