import { AbstractValidationStrategyService } from "../../../service/AbstractValidationStrategyService";
import type ns from "./types";

/**
 * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
 *
 * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
 *
 * @extends AbstractValidationStrategyService<F,ns.DetailedErrors,ns.SimpleErrors>
 */
export class PrimitiveArrayStrat<F> extends AbstractValidationStrategyService<
  F,
  ns.DetailedErrors,
  ns.SimpleErrors
> {
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
  test(value: any[], context: any): [ns.DetailedErrors, ns.SimpleErrors] {
    const valueArray = value ?? [];
    const rootResult = this.getRootErrors(valueArray, context);

    const details = {
      root: rootResult,
      data: valueArray.map((v) => this.getArrayItemErrors(v, context)),
    };

    const simple = {
      root: this.getErrorMessages(rootResult),
      data: details.data.map((v) => this.getErrorMessages(v)),
    };

    return [details, simple];
  }
}