import type API from "../../../../../index";
import { Events } from "../../../../validation/models/Events";
import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
import type ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated.
 *
 * @extends AbstractValidationStrategyService<F, ValidationResult[], string[]>
 */
export class FunctionStrat<F> extends AbstractValidationStrategyService<
  F,
  ns.DetailedErrors,
  ns.SimpleErrors
> {
  private static readonly EMPTY: [ns.DetailedErrors, ns.SimpleErrors] = [null, null];

  /**
   * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
   *
   * @param value - The value to be validated.
   * @param context - The context in which the validation is taking place.
   *
   * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
   */
  test(
    value: API.Utilities.Types.FunctionType,
    _context: any
  ): [ns.DetailedErrors, ns.SimpleErrors] {
    const result: API.Validation.ValidationResult | Promise<API.Validation.ValidationResult> =
      value.bind(_context)();
    if (result instanceof Promise) {
      result.then(
        validationResult => {
          this.eventEmitter.emit(Events.ASYNC_VALIDATION_COMPLETE, {
            key: this.fieldName,
            value: validationResult,
          });
        },
        reason => {
          throw new Error(reason);
        }
      );
      return FunctionStrat.EMPTY;
    }

    return result.valid ? FunctionStrat.EMPTY : [result, result.message];
  }
}
