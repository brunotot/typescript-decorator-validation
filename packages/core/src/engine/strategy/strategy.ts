import EventEmitter from "events";
import ValidationEngine from "..";
import Localization from "../../localization";
import Reflection from "../../reflection";
import ReflectionDescriptor from "../../reflection/models/reflection.descriptor";
import ClassValidatorMetaService from "../../reflection/service/impl/ClassValidatorMetaService";
import ValidationConfigurer from "../../reflection/service/impl/FieldValidatorMetaService";
import ValidationEngineNs from "../../types/namespace/validation-engine.namespace";
import Validation from "../../types/namespace/validation.namespace";

/**
 * The `ValidationStrategy` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TClass The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export default abstract class ValidationStrategy<
  TClass = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  #locale: Localization.Locale;
  #groups: string[];
  #engineCfg: ValidationEngineNs.Config<any>;
  #classRules: Reflection.Rule<TClass>;
  #descriptor: ReflectionDescriptor.ReflectionDescriptor<any, any>;
  #defaultParent: TClass;
  #fieldDescriptor?: ReflectionDescriptor.ReflectionDescriptor<TClass, any>;
  #eventEmitter: EventEmitter;

  /**
   * Initializes the `#descriptor` and `#defaultParent` fields.
   *
   * @param descriptor The reflection descriptor for the field.
   * @param defaultValue The default value for the parent object.
   */
  constructor(
    descriptor: ReflectionDescriptor.ReflectionDescriptor<TClass, any>,
    defaultValue: TClass,
    groups: string[],
    locale: Localization.Locale,
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
    this.#classRules = ClassValidatorMetaService.inject(host).data;
  }

  protected get eventEmitter(): EventEmitter {
    return this.#eventEmitter;
  }

  protected get fieldEngine(): ValidationEngine<TClass> {
    return new ValidationEngine<TClass>(
      this.#descriptor.thisClass!,
      this.engineCfg
    );
  }

  protected get engineCfg() {
    return this.#engineCfg;
  }

  protected get classRules(): Reflection.Rule<TClass> {
    return this.#classRules;
  }

  protected get groups(): string[] {
    return this.#groups;
  }

  protected get locale(): Localization.Locale {
    return this.#locale;
  }

  /**
   * Constructs and returns the configuration object for entity processing.
   *
   * @param groups Validation groups to consider during validation.
   *
   * @returns An `ValidationEngineNs.Config` object configured for the field type.
   */
  protected get fieldDescriptor() {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = ValidationConfigurer.inject(
      this.#descriptor.hostClass!
    ).getUntypedDescriptor(this.fieldName);
    return this.#fieldDescriptor;
  }

  /**
   * Gets the field name from the descriptor.
   *
   * @returns The name of the field.
   */
  protected get fieldName() {
    return this.#descriptor.thisName!;
  }

  /**
   * Gets the default value for the field.
   *
   * @returns The default value of the field.
   */
  protected get defaultValue() {
    return (this.#defaultParent as any)?.[this.fieldName];
  }

  protected getErrorMessages(validations: Validation.Result[] = []) {
    const nonNullableValidations = validations ?? [];
    return Array.isArray(nonNullableValidations)
      ? nonNullableValidations.map((e) => e.message)
      : [];
  }

  protected getClassErrors(fieldValue: any, parentValue: any) {
    return this.classRules.validate(
      fieldValue,
      parentValue,
      this.groups,
      this.locale
    );
  }

  protected getRootErrors(fieldValue: any, parentValue: any) {
    return this.fieldDescriptor.rules.root.validate(
      fieldValue,
      parentValue,
      this.groups,
      this.locale
    );
  }

  protected getArrayItemErrors(arrayItem: any, parentValue: any) {
    return this.fieldDescriptor!.rules.foreach.validate(
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
