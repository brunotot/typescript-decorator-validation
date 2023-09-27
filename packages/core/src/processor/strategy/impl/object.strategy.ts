import Localization from "../../../localization";
import EntityProcessor from "../../../processor";
import ReflectionDescriptor from "../../../reflection/models/reflection.descriptor";
import Validation from "../../../types/namespace/validation.namespace";
import DetailedErrors from "../../../types/validation/detailed-errors.type";
import Errors from "../../../types/validation/errors.type";
import ValidationStrategy from "../strategy";

/**
 * @typeParam F - The type of the field being validated.
 *
 * @description
 * Represents the simplified error structure for validating object types.
 *
 * @type
 * - `node`: An array of string messages that represent validation errors at the object level.
 * - `children`: An `Errors<F>` object that represents validation errors for each property in the object.
 */
export type ObjectSimpleErrors<F> = {
  node: string[];
  children: Errors<F>;
};

/**
 * @typeParam F - The type of the field being validated.
 *
 * @description
 * Represents the detailed error structure for validating object types.
 *
 * @type
 * - `node`: An array of `Validation.Result` objects that represent detailed validation errors at the object level.
 * - `children`: A `DetailedErrors<F>` object that represents detailed validation errors for each property in the object.
 */
export type ObjectDetailedErrors<F> = {
  node: Validation.Result[];
  children: DetailedErrors<F>;
};

/**
 * @typeParam F - The type of the field being validated, which is expected to be an object.
 *
 * @description
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation
 * for validating object types.
 *
 * @extends ValidationStrategy<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
 */
export default class ObjectStrat<F> extends ValidationStrategy<
  F,
  ObjectDetailedErrors<F>,
  ObjectSimpleErrors<F>
> {
  /**
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   *
   * @description
   * Initializes the `ObjectStrat` class by calling the superclass constructor with the
   * provided descriptor and default value.
   */
  constructor(descriptor: ReflectionDescriptor<F, any>, defaultValue: F) {
    super(descriptor, defaultValue);
  }

  /**
   * @param value - The object value to be validated.
   * @param context - The context in which the validation is taking place.
   * @param groups - Optional validation groups to consider during validation.
   *
   * @returns A tuple containing `ObjectDetailedErrors<F>` and `ObjectSimpleErrors<F>`.
   *
   * @description
   * Implements the `test` method from the `ValidationStrategy` abstract class.
   * It performs the actual validation logic for object types.
   *
   * The method validates both the object as a whole (`node`) and its properties (`children`)
   * using the appropriate validation rules.
   */
  test(
    value: any,
    context: any,
    groups: Validation.Group[] = [],
    locale: Localization.Locale
  ): [ObjectDetailedErrors<F>, ObjectSimpleErrors<F>] {
    const { detailedErrors, errors } = new EntityProcessor<F>(
      super.descriptor.thisClass!,
      super.getEntityProcessorConfig(groups)
    ).validate(value);

    const rootResult = super.fieldDescriptor!.rules.root.validate(
      value,
      context,
      groups,
      locale
    );

    const detailedErrorsResult: ObjectDetailedErrors<F> = {
      node: rootResult,
      children: detailedErrors,
    };

    const errorsResult: ObjectSimpleErrors<F> = {
      node: Validation.buildSimpleErrors(rootResult),
      children: errors,
    };

    return [detailedErrorsResult, errorsResult];
  }
}
