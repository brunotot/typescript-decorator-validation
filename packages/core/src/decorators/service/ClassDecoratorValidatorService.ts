import API from "../../../index";

/**
 * A service class which exposes validated-decorator-related actions
 */
namespace ClassDecoratorValidatorService {
  /**
   * Type definition for supplying validation options to the class decorator.
   *
   * @typeParam T - The type that the class decorator is expected to work with.
   *
   * @property groups - Optional. An array of group names or a single group name that this validator belongs to. Validators in the same group can be executed together.
   * @property isValid - The function responsible for validation logic, as defined in the Evaluator type.
   */
  export type Supplier<T extends API.Decorator.Service.ClassDecoratorService.Type> = {
    groups?: string | string[];
    isValid: Evaluator<T>;
  };

  /**
   * Type definition for the evaluation function that performs the actual validation logic.
   *
   * @typeParam T - The type that the class decorator is expected to work with.
   *
   * @param value - The value to be validated.
   * @param context - The context in which the decorator is used, providing additional metadata.
   * @param locale - The locale information for localization.
   *
   * @returns A result object as defined in API.Validation.Result, indicating validation success or failure along with additional information.
   */
  export type Evaluator<T extends API.Decorator.Service.ClassDecoratorService.Type> = ((
    value: any,
    context: API.Decorator.Service.ClassDecoratorService.Context<T>,
    locale: API.Localization.Resolver.LocaleResolver.Locale
  ) => API.Validation.Result) & {};

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
   * This function leverages the `makeDecorator` function to build a new decorator.
   * It uses the `validationMetaService` to add the new validator to the metadata for the property it decorates.
   *
   * @example
   * ```typescript
   * const IsPositive = ClassDecoratorValidatorService.build<number>({
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
  export function build<T extends API.Decorator.Service.ClassDecoratorService.Type>(
    validate: API.Validation.Evaluator<T>,
    options?: API.Decorator.Options
  ): API.Decorator.Service.ClassDecoratorService.Instance<T> {
    return API.Decorator.Service.ClassDecoratorService.build(meta => {
      meta.addValidator(validate, API.Decorator.groups(options));
    });
  }
}

export default ClassDecoratorValidatorService;
