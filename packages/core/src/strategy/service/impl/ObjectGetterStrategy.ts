import { DecoratorArgs } from "@decorators";
import { DetailedErrorsResponse, SimpleErrorsResponse, evaluate } from "@strategy/models";
import { Booleans } from "@utilities";
import type { ValidationResult } from "@validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { ObjectStrategy } from "./ObjectStrategy";

export namespace ObjectGetterStrategy {
  export const Name = `(): ${ObjectStrategy.Name}` as const;

  /**
   * Represents the simplified error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `root`: An array of string messages that represent validation errors at the object level.
   * - `data`: An `Errors<F>` object that represents validation errors for each property in the object.
   */
  export type SimpleErrors<F> = {
    root: string[];
    data: SimpleErrorsResponse<F>;
  };

  /**
   * Represents the detailed error structure for validating object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `root`: An array of `ValidationResult` objects that represent detailed validation errors at the object level.
   * - `data`: A `DetailedErrors<F>` object that represents detailed validation errors for each property in the object.
   */
  export type DetailedErrors<F> = {
    root: ValidationResult[];
    data: DetailedErrorsResponse<F>;
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
      true extends Booleans.isGetter<T, K>
        ? Booleans.isObject<T[K]>
        : false

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
    : { root: R; data: evaluate<T[K], R> };

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating object types.
   *
   * @typeParam F - The type of the field being validated, which is expected to be an object.
   *
   * @extends AbstractValidationStrategyService<F, ObjectDetailedErrors<F>, ObjectSimpleErrors<F>>
   */
  export class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors<F>, SimpleErrors<F>> {
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
    test(value: any, context: any, args: DecoratorArgs): [DetailedErrors<F>, SimpleErrors<F>] {
      const { detailedErrors, errors } = this.fieldEngine.validate(value);

      const rootResult = [...this.getRootErrors(value, context, args), ...this.getClassErrors(value, context)];

      const detailedErrorsResult: DetailedErrors<F> = {
        root: rootResult,
        data: detailedErrors,
      };

      const errorsResult: SimpleErrors<F> = {
        root: this.getErrorMessages(rootResult),
        data: errors,
      };

      return [detailedErrorsResult, errorsResult];
    }
  }
}
