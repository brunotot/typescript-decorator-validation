import { type Arrays, type Booleans, type Types } from "@utilities";
import { Events } from "@validation/models/Events";
import type { ValidationResult } from "@validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";

export namespace FunctionStrategy {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "function" as const;

  /**
   * Type definition for simple errors in this strategy.
   */
  export type SimpleErrors = string | null;

  /**
   * Type definition for detailed errors in this strategy.
   */
  export type DetailedErrors = ValidationResult | null;

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> = Booleans.isFunction<T[K]>

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R>
      ? T[K]
  : Arrays.getArrayType<R> | null;

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
   *
   * @typeParam F - The type of the field being validated.
   *
   * @extends AbstractValidationStrategyService<F, ValidationResult[], string[]>
   */
  export class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors, SimpleErrors> {
    private static readonly EMPTY: [DetailedErrors, SimpleErrors] = [null, null];

    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
     *
     * @param value - The value to be validated.
     * @param context - The context in which the validation is taking place.
     *
     * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
     */
    test(value: Types.FunctionType, _context: any): [DetailedErrors, SimpleErrors] {
      const result: ValidationResult | Promise<ValidationResult> = value.bind(_context)();
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
        return StrategyResolver.EMPTY;
      }

      return result.valid ? StrategyResolver.EMPTY : [result, result.message];
    }
  }
}
