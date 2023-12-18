import API from "../../../index";

/**
 * A service class which exposes validated-decorator-related actions
 */
namespace FieldDecoratorValidatorService {
  /**
   * Creates a new validator function using the provided validation builder options.
   *
   * @typeParam T - The type of the value being validated.
   *
   * @param groups - An array of group names that this validator belongs to. Validators in the same group can be executed together.
   * @param isValid - A function that performs the actual validation logic. It takes a value of type `T` and returns a boolean indicating whether the value is valid.
   *
   * @returns A decorator function that can be applied to class properties to add the validation logic.
   *
   * @remarks
   * This function leverages the `makeDecorator` function to create a new decorator.
   * It uses the `validationMetaService` to add the new validator to the metadata for the property it decorates.
   *
   * @example
   * ```typescript
   * const IsPositive = FieldDecoratorValidatorService.create<number>({
   *   groups: ['group1'],
   *   isValid: (value) => value > 0
   * });
   *
   * class MyClass {
   *   \@IsPositive
   *   public myValue: number;
   * }
   * ```
   */
  export function build<T extends API.Decorator.Service.FieldDecoratorService.Type>(
    validate: API.Validation.Evaluator<T>,
    groups?: string[]
  ): API.Decorator.Service.FieldDecoratorService.Instance<T> {
    return API.Decorator.Service.FieldDecoratorService.build<T>((meta, key) => {
      meta.addValidator(key, validate, groups ?? []);
    });
  }
}

export default FieldDecoratorValidatorService;
