import ValidationEngine from "../../..";
import Localization from "../../../../localization";
import ReflectionDescriptor from "../../../../reflection/models/reflection.descriptor";
import Validation from "../../../../types/namespace/validation.namespace";
import ValidationStrategy from "../../strategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an object.
 *
 * @extends ValidationStrategy<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
 */
export default class ObjectStrat<F> extends ValidationStrategy<
  F,
  ns.DetailedErrors<F>,
  ns.SimpleErrors<F>
> {
  /**
   * Initializes the `ObjectStrat` class by calling the superclass constructor with the provided descriptor and default value.
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
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for object types.
   *
   * @param value - The object value to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `ObjectDetailedErrors<F>` and `ObjectSimpleErrors<F>`.
   *
   * @remarks
   * The method validates both the object as a whole (`node`) and its properties (`children`)
   * using the appropriate validation rules.
   */
  test(
    value: any,
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ns.DetailedErrors<F>, ns.SimpleErrors<F>] {
    const { detailedErrors, errors } = new ValidationEngine<F>(
      super.descriptor.thisClass!,
      super.getValidationEngineConfig(groups)
    ).validate(value);

    const rootResult = super.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups,
      locale
    );

    const detailedErrorsResult: ns.DetailedErrors<F> = {
      node: rootResult,
      children: detailedErrors,
    };

    const errorsResult: ns.SimpleErrors<F> = {
      node: Validation.buildSimpleErrors(rootResult),
      children: errors,
    };

    return [detailedErrorsResult, errorsResult];
  }
}
