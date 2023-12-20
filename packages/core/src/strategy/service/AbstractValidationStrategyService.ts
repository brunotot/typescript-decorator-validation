import API from "../../../index";

import { type EventEmitter } from "../../utilities/misc/EventEmitter";

/**
 * The `AbstractValidationStrategyService` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export abstract class AbstractValidationStrategyService<
  TClass = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  #locale: API.Localization.LocaleResolver.Locale;
  #groups: string[];
  #engineCfg: API.Validation.Config<any>;
  #classRules: API.Reflection.Rule.Instance<TClass>;
  #descriptor: API.Reflection.Descriptor.Instance<any, any>;
  #defaultParent: TClass;
  #fieldDescriptor?: API.Reflection.Descriptor.Instance<TClass, any>;
  #eventEmitter: EventEmitter;

  /**
   * Initializes the `#descriptor` and `#defaultParent` fields.
   *
   * @param descriptor The reflection descriptor for the field.
   * @param defaultValue The default value for the parent object.
   */
  constructor(
    descriptor: API.Reflection.Descriptor.Instance<TClass, any>,
    defaultValue: TClass,
    groups: string[],
    locale: API.Localization.LocaleResolver.Locale,
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
    const host = descriptor.hostClass!;
    this.#classRules = API.Reflection.Services.ClassValidatorMetaService.inject(host).data;
  }

  protected get eventEmitter(): EventEmitter {
    return this.#eventEmitter;
  }

  protected get fieldEngine(): API.Validation.ValidationEngine<TClass> {
    return new API.Validation.ValidationEngine<TClass>(this.#descriptor.thisClass!, this.engineCfg);
  }

  protected get engineCfg(): API.Validation.Config<any> {
    return this.#engineCfg;
  }

  protected get classRules(): API.Reflection.Rule.Instance<TClass> {
    return this.#classRules;
  }

  protected get groups(): string[] {
    return this.#groups;
  }

  protected get locale(): API.Localization.LocaleResolver.Locale {
    return this.#locale;
  }

  /**
   * Constructs and returns the configuration object for entity processing.
   *
   * @param groups Validation groups to consider during validation.
   *
   * @returns An `ValidationEngineNs.Config` object configured for the field type.
   */
  protected get fieldDescriptor(): API.Reflection.Descriptor.Instance<TClass, any, undefined> {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = API.Reflection.Services.FieldValidatorMetaService.inject(
      this.#descriptor.hostClass!
    ).getUntypedDescriptor(this.fieldName);
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

  protected getErrorMessages(validations: API.Validation.Result[] = []): string[] {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations) ? nonNullableValidations.map(e => e.message) : [];
  }

  protected getClassErrors(fieldValue: any, parentValue: any): API.Validation.Result[] {
    return this.classRules.validate(fieldValue, parentValue, this.groups, this.locale);
  }

  protected getRootErrors(fieldValue: any, parentValue: any): API.Validation.Result[] {
    return this.fieldDescriptor.rules.root.validate(
      fieldValue,
      parentValue,
      this.groups,
      this.locale
    );
  }

  protected getArrayItemErrors(arrayItem: any, parentValue: any): API.Validation.Result[] {
    return this.fieldDescriptor.rules.foreach.validate(
      arrayItem,
      parentValue,
      this.groups,
      this.locale
    );
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
  abstract test(value: any, context: any): [TDetailedResult, TSimpleResult];
}
