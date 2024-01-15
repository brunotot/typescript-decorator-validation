import { type DecoratorArgs } from "@decorators";
import { type Arrays, type Booleans, type Types } from "@utilities";
import type { ValidationResult } from "@validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";

export namespace PrimitiveArrayStrategy {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "primitive[]" as const;

  /**
   * Represents the simplified error structure for validating arrays of primitive types.
   *
   * - `root`: An array of string messages that represent validation errors at the array level.
   * - `data`: A two-dimensional array of string messages that represent validation errors for each element in the array.
   */
  export type SimpleErrors = {
    root: string[];
    data: string[][];
  };

  /**
   * Represents the detailed error structure for validating arrays of primitive types.
   *
   * - `root`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
   * - `data`: A two-dimensional array of `ValidationResult` objects that represent detailed validation errors for each element in the array.
   */
  export type DetailedErrors = {
    root: ValidationResult[];
    data: ValidationResult[][];
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
  Arrays.getArrayType<T[K]> extends never
      ? false
  : Booleans.isAnyOf<Arrays.getArrayType<T[K]>, Types.PrimitiveType>

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
  : { root: R; data: R[]; };

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
   *
   * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
   *
   * @extends AbstractValidationStrategyService<F,DetailedErrors,SimpleErrors>
   */
  export class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors, SimpleErrors> {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of primitive types.
     *
     * @param value - The array of values to be validated.
     * @param context - The context in which the validation is taking place.
     * @param groups - Optional validation groups to consider during validation.
     *
     * @returns A tuple containing `PrimitiveArrayDetailedErrors` and `PrimitiveArraySimpleErrors`.
     *
     * @remarks
     * The method validates both the array as a whole (`root`) and each individual element (`data`)
     * using the appropriate validation rules.
     */
    test(value: any[], context: any, args: DecoratorArgs): [DetailedErrors, SimpleErrors] {
      const valueArray = value ?? [];
      const rootResult = this.getRootErrors(valueArray, context, args);

      const details = {
        root: rootResult,
        data: valueArray.map(v => this.getArrayItemErrors(v, context)),
      };

      const simple = {
        root: this.getErrorMessages(rootResult),
        data: details.data.map(v => this.getErrorMessages(v)),
      };

      return [details, simple];
    }
  }
}
