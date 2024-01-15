import { type DecoratorArgs } from "@decorators";
import { type DetailedErrorsResponse, type SimpleErrorsResponse } from "@strategy/models";
import { type Arrays, type Booleans } from "@utilities";
import type { ValidationResult } from "@validation/types";
import { AbstractValidationStrategyService } from "../AbstractValidationStrategyService";
import { ObjectStrategy } from "./ObjectStrategy";

export namespace ObjectArrayStrategy {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "composite[]" as const;

  /**
   * Represents the simplified error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of string messages that represent validation errors at the array level.
   * - `data`: An array of `Errors<F>` objects that represent validation errors for each object in the array.
   */
  export type SimpleErrors<F> = {
    root: string[];
    data: Array<SimpleErrorsResponse<F>>;
  };

  /**
   * Represents the detailed error structure for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated.
   *
   * - `field`: An array of `ValidationResult` objects that represent detailed validation errors at the array level.
   * - `data`: An array of `DetailedErrors<F>` objects that represent detailed validation errors for each object in the array.
   */
  export type DetailedErrors<F> = {
    root: ValidationResult[];
    data: Array<DetailedErrorsResponse<F>>;
  };

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> =
    Arrays.getArrayType<NonNullable<T[K]>> extends never
        ? false
      : true extends Booleans.isGetter<T, K>
        ? false
    : Booleans.isObject<Arrays.getArrayType<NonNullable<T[K]>>>;

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> = Array<ObjectStrategy.handler<T, K, R>>

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating arrays of object types.
   *
   * @typeParam F - The type of the field being validated, which is expected to be an array of objects.
   *
   * @extends AbstractValidationStrategyService<F, ObjectArrayDetailedErrors<F>, ObjectArraySimpleErrors<F>>
   */
  export class StrategyResolver<F> extends AbstractValidationStrategyService<F, DetailedErrors<F>, SimpleErrors<F>> {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for arrays of object types.
     *
     * @param value - The array of object values to be validated.
     * @param context - The context in which the validation is taking place.
     * @param groups - Optional validation groups to consider during validation.
     *
     * @returns A tuple containing `ObjectArrayDetailedErrors<F>` and `ObjectArraySimpleErrors<F>`.
     *
     * @remarks
     * The method validates both the array as a whole (`field`) and each individual object (`data`)
     * using the appropriate validation rules.
     */
    test(value: any[], context: any, args: DecoratorArgs): [DetailedErrors<F>, SimpleErrors<F>] {
      const _value = value ?? [];
      const rootResult = this.getRootErrors(value, context, args);

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const getData = (element: any) => {
        const [errors, detailedErrors] = new ObjectStrategy.StrategyResolver(
          this.fieldDescriptor,
          this.defaultValue,
          this.groups,
          this.locale,
          this.eventEmitter,
          this.engineCfg.asyncDelay!
        ).test(element, context, args);
        return {
          detailedErrors,
          errors,
        };
      };

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const getErrors = (element: any) => getData(element).errors;
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const getDetailedErrors = (element: any) => getData(element).detailedErrors;

      const details = {
        root: rootResult,
        data: _value.map(getDetailedErrors),
      };

      const simple = {
        root: this.getErrorMessages(rootResult),
        data: _value.map(getErrors),
      };

      return [details as any, simple as any];
    }
  }
}
