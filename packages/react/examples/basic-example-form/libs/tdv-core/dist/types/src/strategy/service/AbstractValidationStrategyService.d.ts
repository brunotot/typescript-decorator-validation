import { type DecoratorArgs } from "../../decorators";
import { type Locale } from "../../localization";
import { type ControlDescriptor } from "../../reflection/service/impl/FieldValidatorMetaService";
import { type EventEmitter } from "../../utilities";
import { Form } from "../../validation/models/Form";
import { type ValidationMetadata } from "../../validation/models/ValidationMetadata";
import type { FormConfig, ValidationResult } from "../../validation/types";
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
    constructor(descriptor: ControlDescriptor<TClass, any>, defaultValue: TClass, groups: string[], locale: Locale, eventEmitter: EventEmitter, asyncDelay: number);
    set eventEmitter(v: EventEmitter);
    get eventEmitter(): EventEmitter;
    protected get fieldEngine(): Form<TClass>;
    protected get engineCfg(): FormConfig<any>;
    protected get classRules(): ValidationMetadata<TClass>;
    protected get groups(): string[];
    protected get locale(): Locale;
    /**
     * Constructs and returns the configuration object for entity processing.
     *
     * @param groups Validation groups to consider during validation.
     *
     * @returns An `ValidationEngineNs.Config` object configured for the field type.
     */
    protected get fieldDescriptor(): ControlDescriptor<TClass, any, undefined>;
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
    protected getErrorMessages(validations?: ValidationResult[]): string[];
    protected getClassErrors(fieldValue: any, parentValue: any): ValidationResult[];
    protected getRootErrors(fieldValue: any, parentValue: any, args: DecoratorArgs): ValidationResult[];
    protected getArrayItemErrors(arrayItem: any, parentValue: any): ValidationResult[];
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
    abstract test(value: any, context: any, args: DecoratorArgs): [TDetailedResult, TSimpleResult];
}
//# sourceMappingURL=AbstractValidationStrategyService.d.ts.map