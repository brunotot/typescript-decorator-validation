import Localization from "../../../localization";
import ValidationEngine from "../../../processor";
import ReflectionDescriptor from "../../../reflection/models/reflection.descriptor";
import ValidationConfigurer from "../../../reflection/service/impl/reflection.service.validation";
import EvaluatedStrategyFactory from "../../../types/namespace/evaluated-strategy-factory.namespace";
import Validation from "../../../types/namespace/validation.namespace";
import ValidationStrategy from "../strategy";

/**
 * Represents the simplified error structure for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated.
 *
 * - `node`: An array of string messages that represent validation errors at the array level.
 * - `children`: An array of `Errors<F>` objects that represent validation errors for each object in the array.
 */
export type ObjectArraySimpleErrors<F> = {
  node: string[];
  children: EvaluatedStrategyFactory.Errors<F>[];
};

/**
 * Represents the detailed error structure for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated.
 *
 * - `node`: An array of `Validation.Result` objects that represent detailed validation errors at the array level.
 * - `children`: An array of `DetailedErrors<F>` objects that represent detailed validation errors for each object in the array.
 */
export type ObjectArrayDetailedErrors<F> = {
  node: Validation.Result[];
  children: EvaluatedStrategyFactory.DetailedErrors<F>[];
};

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
 *
 * @extends ValidationStrategy<F, ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>>
 */
export default class ObjectArrayStrat<F> extends ValidationStrategy<
  F,
  ObjectArrayDetailedErrors<F>,
  ObjectArraySimpleErrors<F>
> {
  /**
   * Initializes the `ObjectArrayStrat` class by calling the superclass constructor with the provided descriptor and default value.
   *
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   */
  constructor(
    descriptor: ReflectionDescriptor.ReflectionDescriptor<F, any>,
    defaultValue: F
  ) {
    super(descriptor, defaultValue);
  }

  /**
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
   *
   * @param value - The array of object values to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `ObjectArrayDetailedErrors<F>` and `ObjectArraySimpleErrors<F>`.
   *
   * @remarks
   * The method validates both the array as a whole (`node`) and each individual object (`children`)
   * using the appropriate validation rules.
   */
  test(
    value: any[],
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>] {
    const _value = value ?? [];
    const fieldClass = super.descriptor.thisClass!;
    const metadata = ValidationConfigurer.inject(fieldClass);
    const field = metadata.getUntypedDescriptor(super.fieldName);
    const rootResult = field.rules.root.validate(
      _value,
      context,
      groups,
      locale
    );

    const objectArrayDetailedErrors = {
      node: rootResult,
      children: _value.map((v) =>
        new ValidationEngine<F>(
          fieldClass,
          super.getValidationEngineConfig(groups)
        ).getDetailedErrors(v)
      ),
    };

    const objectArraySimpleErrors = {
      node: Validation.buildSimpleErrors(rootResult),
      children: _value.map((v) =>
        new ValidationEngine<F>(
          fieldClass,
          super.getValidationEngineConfig(groups)
        ).getErrors(v)
      ),
    };

    return [objectArrayDetailedErrors, objectArraySimpleErrors];
  }
}
