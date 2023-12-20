import API from "../../../index";
import { type EventEmitter } from "../../utilities/misc/EventEmitter";
/**
 * The `AbstractValidationStrategyService` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export declare abstract class AbstractValidationStrategyService<TClass = any, TDetailedResult = any, TSimpleResult = any> {
    #private;
    /**
     * Initializes the `#descriptor` and `#defaultParent` fields.
     *
     * @param descriptor The reflection descriptor for the field.
     * @param defaultValue The default value for the parent object.
     */
    constructor(descriptor: API.Reflection.Descriptor.Instance<TClass, any>, defaultValue: TClass, groups: string[], locale: API.Localization.LocaleResolver.Locale, eventEmitter: EventEmitter, asyncDelay: number);
    protected get eventEmitter(): EventEmitter;
    protected get fieldEngine(): API.Validation.ValidationEngine<TClass>;
    protected get engineCfg(): API.Validation.Config<any>;
    protected get classRules(): API.Reflection.Rule.Instance<TClass>;
    protected get groups(): string[];
    protected get locale(): API.Localization.LocaleResolver.Locale;
    /**
     * Constructs and returns the configuration object for entity processing.
     *
     * @param groups Validation groups to consider during validation.
     *
     * @returns An `ValidationEngineNs.Config` object configured for the field type.
     */
    protected get fieldDescriptor(): API.Reflection.Descriptor.Instance<TClass, any, undefined>;
    /**
     * Gets the field name from the descriptor.
     *
     * @returns The name of the field.
     */
    protected get fieldName(): string;
    /**
     * Gets the default value for the field.
     *
     * @returns The default value of the field.
     */
    protected get defaultValue(): any;
    protected getErrorMessages(validations?: API.Validation.Result[]): string[];
    protected getClassErrors(fieldValue: any, parentValue: any): API.Validation.Result[];
    protected getRootErrors(fieldValue: any, parentValue: any): API.Validation.Result[];
    protected getArrayItemErrors(arrayItem: any, parentValue: any): API.Validation.Result[];
    /**
     * The `test` method is an abstract method that must be implemented by subclasses. It performs the actual validation logic for the field. The method takes in the value to be validated, the context, and optionally, the validation groups to consider.
     *
     * @param value The value to be validated.
     * @param context The context in which the validation is taking place.
     * @param groups Optional validation groups to consider during validation.
     *
     * @returns A tuple containing the detailed result (`TDetailedResult`) and the simplified result (`TSimpleResult`).
     *
     * @remarks
     * It returns a tuple where the first element is the detailed validation result and the second element is
     * the simplified validation result.
     */
    abstract test(value: any, context: any): [TDetailedResult, TSimpleResult];
}
//# sourceMappingURL=AbstractValidationStrategyService.d.ts.map