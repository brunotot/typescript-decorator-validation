import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
import type ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an object.
 *
 * @extends AbstractValidationStrategyService<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
 */
export class ObjectStrat<F> extends AbstractValidationStrategyService<
  F,
  ns.DetailedErrors<F>,
  ns.SimpleErrors<F>
> {
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