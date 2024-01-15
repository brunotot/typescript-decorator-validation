import { type DecoratorArgs } from "@decorators";
import { type Arrays, type Booleans, type Types } from "@utilities";
import type { ValidationResult } from "@validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { PrimitiveStrategy } from "./PrimitiveStrategy";

export namespace PrimitiveArrayGetterStrategy {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = `get (): ${PrimitiveStrategy.Name}[]` as const;

  /**
   * Represents the simplified error structure for validating arrays of primitive types.
   *
   * - `node`: An array of string messages that represent validation errors at the array level.
   * - `children`: A two-dimensional array of string messages that represent validation errors for each element in the array.
   */
  export type SimpleErrors = {
    node: string[];
    children: string[][];
  };

  /**
   * Represents the detailed error structure for validating arrays of primitive types.
   *
   * - `node`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
   * - `children`: A two-dimensional array of `ValidationResult` objects that represent detailed validation errors for each element in the array.
   */
  export type DetailedErrors = {
    node: ValidationResult[];
    children: ValidationResult[][];
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
      true extends Booleans.isGetter<T, K>
        ? Arrays.getArrayType<T[K]> extends never
          ? false
          : Booleans.isAnyOf<Arrays.getArrayType<T[K]>, Types.PrimitiveType>
        : false;

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
    : { node: R; children: R[]; };

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of primitive types like numbers, strings, etc.
   *
   * @typeParam F - The type of the field being validated, which is expected to be an array of primitives.
   *
   * @extends AbstractValidationStrategyService<F, PrimitiveArrayGetterDetailedErrors, PrimitiveArrayGetterSimpleErrors>
   */
  export class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors, SimpleErrors> {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of primitive types.
     *
     * @param value - The array of values to be validated.
     * @param context - The context in which the validation is taking place.
     * @param groups - Optional validation groups to consider during validation.
     *
     * @returns A tuple containing `PrimitiveArrayGetterDetailedErrors` and `PrimitiveArrayGetterSimpleErrors`.
     *
     * @remarks
     * The method validates both the array as a whole (`node`) and each individual element (`children`)
     * using the appropriate validation rules.
     */
    test(value: any[], context: any, args: DecoratorArgs): [DetailedErrors, SimpleErrors] {
      const valueArray = value ?? [];
      const rootResult = this.getRootErrors(valueArray, context, args);

      const details = {
        node: rootResult,
        children: valueArray.map(v => this.getArrayItemErrors(v, context)),
      };

      const simple = {
        node: this.getErrorMessages(rootResult),
        children: details.children.map(v => this.getErrorMessages(v)),
      };

      return [details, simple];
    }
  }
}
