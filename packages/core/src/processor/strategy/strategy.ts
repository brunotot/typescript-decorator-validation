import Localization from "../../localization";
import ReflectionDescriptor from "../../reflection/models/reflection.descriptor";
import ValidationConfigurer from "../../reflection/service/impl/reflection.service.validation";
import EntityProcessorNs from "../../types/namespace/entity-processor.namespace";
import Validation from "../../types/namespace/validation.namespace";

/**
 * The `ValidationStrategy` class serves as an abstract base class for implementing various validation strategies. It provides essential utility methods and properties to facilitate the validation process.
 *
 * @typeParam TFieldType The type of the field being validated.
 * @typeParam TDetailedResult The detailed result of the validation.
 * @typeParam TSimpleResult A simplified version of the validation result.
 */
export default abstract class ValidationStrategy<
  TFieldType = any,
  TDetailedResult = any,
  TSimpleResult = any
> {
  /**
   * The reflection descriptor for the field.
   */
  #descriptor: ReflectionDescriptor.ReflectionDescriptor<any, any>;

  /**
   * The default value for the parent object.
   */
  #defaultParent: TFieldType;

  /**
   * A specific descriptor for the field, lazy-loaded.
   */
  #fieldDescriptor?: ReflectionDescriptor.ReflectionDescriptor<TFieldType, any>;

  /**
   * Initializes the `#descriptor` and `#defaultParent` fields.
   *
   * @param descriptor The reflection descriptor for the field.
   * @param defaultValue The default value for the parent object.
   */
  constructor(
    descriptor: ReflectionDescriptor.ReflectionDescriptor<TFieldType, any>,
    defaultValue: TFieldType
  ) {
    this.#descriptor = descriptor;
    this.#defaultParent = defaultValue;
  }

  protected getEntityProcessorConfig(
    groups: Validation.Group[]
  ): EntityProcessorNs.Config<TFieldType> {
    return {
      defaultValue: this.defaultValue,
      groups,
    };
  }

  /**
   * Constructs and returns the configuration object for entity processing.
   *
   * @param groups Validation groups to consider during validation.
   *
   * @returns An `EntityProcessorNs.Config` object configured for the field type.
   */
  protected get fieldDescriptor() {
    if (this.#fieldDescriptor) return this.#fieldDescriptor;
    this.#fieldDescriptor = ValidationConfigurer.inject(
      this.descriptor.hostClass!
    ).getUntypedDescriptor(this.fieldName);
    return this.#fieldDescriptor;
  }

  /**
   * Gets the field name from the descriptor.
   *
   * @returns The name of the field.
   */
  protected get fieldName() {
    return this.descriptor.thisName!;
  }

  /**
   * Gets the default value for the field.
   *
   * @returns The default value of the field.
   */
  protected get defaultValue() {
    return this.defaultParent?.[this.fieldName];
  }

  /**
   * Gets the host class from the descriptor.
   *
   * @returns The host class of the field.
   */
  protected get class() {
    return this.descriptor.hostClass!;
  }

  /**
   * Gets the default parent object.
   *
   * @returns The default parent object.
   */
  protected get defaultParent() {
    return this.#defaultParent as any;
  }

  /**
   * Gets the reflection descriptor.
   *
   * @returns The reflection descriptor for the field.
   */
  protected get descriptor() {
    return this.#descriptor;
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
  public abstract test(
    value: any,
    context: any,
    groups: Validation.Group[],
    locale: Localization.Locale
  ): [TDetailedResult, TSimpleResult];
}
