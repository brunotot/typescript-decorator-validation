import API from "api";

import EventEmitter from "events";
import AbstractValidationStrat from "../../strategy";
import ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an object.
 *
 * @extends AbstractValidationStrat<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
 */
export default class ObjectGetterStrat<F> extends AbstractValidationStrat<
  F,
  ns.DetailedErrors<F>,
  ns.SimpleErrors<F>
> {
  /**
   * Initializes the `ObjectGetterStrat` class by calling the superclass constructor with the provided descriptor and default value.
   *
   * @param descriptor - The reflection descriptor for the field.
   * @param defaultValue - The default value for the parent object.
   */
  constructor(
    descriptor: API.Reflection.Descriptor.Instance<F, any>,
    defaultValue: F,
    groups: string[],
    locale: API.Localization.Locale,
    eventEmitter: EventEmitter,
    asyncDelay: number
  ) {
    super(descriptor, defaultValue, groups, locale, eventEmitter, asyncDelay);
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
  test(value: any, context: any): [ns.DetailedErrors<F>, ns.SimpleErrors<F>] {
    const { detailedErrors, errors } = this.fieldEngine.validate(value);

    const rootResult = [
      ...this.getRootErrors(value, context),
      ...this.getClassErrors(value, context),
    ];

    const detailedErrorsResult: ns.DetailedErrors<F> = {
      root: rootResult,
      data: detailedErrors,
    };

    const errorsResult: ns.SimpleErrors<F> = {
      root: this.getErrorMessages(rootResult),
      data: errors,
    };

    return [detailedErrorsResult, errorsResult];
  }
}
