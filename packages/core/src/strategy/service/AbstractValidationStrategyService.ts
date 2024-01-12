import { DecoratorArgs } from "@decorators";
import { Locale } from "@localization";
import { ClassValidatorMetaService } from "@reflection/service/impl/ClassValidatorMetaService";
import { ControlDescriptor, FieldValidatorMetaService } from "@reflection/service/impl/FieldValidatorMetaService";
import { EventEmitter } from "@utilities";
import { Form } from "@validation/models/Form";
import { ValidationMetadata } from "@validation/models/ValidationMetadata";
import type { FormConfig, ValidationResult } from "@validation/types";

/**
 * The `AbstractValidationStrategyService` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export abstract class AbstractValidationStrategyService<TClass = any, TDetailedResult = any, TSimpleResult = any> {
  #locale: Locale;
  #groups: string[];
  #engineCfg: FormConfig<any>;
  #classRules: ValidationMetadata<TClass>;
  #descriptor: ControlDescriptor<any, any>;
  #defaultParent: TClass;
  #fieldDescriptor?: ControlDescriptor<TClass, any>;
  #eventEmitter: EventEmitter;

  /**
   * Initializes the `#descriptor` and `#defaultParent` fields.
   *
   * @param descriptor The reflection descriptor for the field.
   * @param defaultValue The default value for the parent object.
   */
  constructor(
    descriptor: ControlDescriptor<TClass, any>,
    defaultValue: TClass,
    groups: string[],
    locale: Locale,
    eventEmitter: EventEmitter,
    asyncDelay: number
  ) {
    this.#eventEmitter = eventEmitter;
    this.#descriptor = descriptor;
    this.#defaultParent = defaultValue;
    this.#groups = groups;
    this.#locale = locale;
    this.#engineCfg = {
      defaultValue: this.defaultValue,
      groups: this.groups,
      asyncDelay,
    };
    this.#classRules = ClassValidatorMetaService.inject(this.#descriptor.hostClass!, this.eventEmitter).data;
  }

  public set eventEmitter(v: EventEmitter) {
    this.#eventEmitter = v;
  }

  public get eventEmitter(): EventEmitter {
    return this.#eventEmitter;
  }

  protected get fieldEngine(): Form<TClass> {
    return new Form<TClass>(this.#descriptor.thisClass!, this.engineCfg);
  }

  protected get engineCfg(): FormConfig<any> {
    return this.#engineCfg;
  }

  protected get classRules(): ValidationMetadata<TClass> {
    return this.#classRules;
  }

  protected get groups(): string[] {
    return this.#groups;
  }

  protected get locale(): Locale {
    return this.#locale;
  }

  /**
   * Constructs and returns the configuration object for entity processing.
   *
   * @param groups Validation groups to consider during validation.
   *
   * @returns An `ValidationEngineNs.Config` object configured for the field type.
   */
  protected get fieldDescriptor(): ControlDescriptor<TClass, any, undefined> {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = FieldValidatorMetaService.inject(
      this.#descriptor.hostClass!,
      this.#eventEmitter
    ).getUntypedDescriptor(this.fieldName, this.eventEmitter);
    return this.#fieldDescriptor;
  }

  /**
   * Gets the field name from the descriptor.
   *
   * @returns The name of the field.
   */
  protected get fieldName(): string {
    return this.#descriptor.thisName!;
  }

  /**
   * Gets the default value for the field.
   *
   * @returns The default value of the field.
   */
  protected get defaultValue(): any {
    return (this.#defaultParent as any)?.[this.fieldName];
  }

  protected getErrorMessages(validations: ValidationResult[] = []): string[] {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations) ? nonNullableValidations.map(e => e.message) : [];
  }

  protected getClassErrors(fieldValue: any, parentValue: any): ValidationResult[] {
    return this.classRules.validate(fieldValue, parentValue, this.groups, this.locale);
  }

  protected getRootErrors(fieldValue: any, parentValue: any, args: DecoratorArgs): ValidationResult[] {
    return this.fieldDescriptor.validations.root.validate(
      fieldValue,
      parentValue,
      this.groups,
      this.locale,
      args,
      this.#eventEmitter,
      this.fieldName
    );
  }

  protected getArrayItemErrors(arrayItem: any, parentValue: any): ValidationResult[] {
    return this.fieldDescriptor.validations.foreach.validate(arrayItem, parentValue, this.groups, this.locale);
  }

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
