import API from "api";

export type FieldDecorator<This = unknown, Value = unknown> = (
  target: undefined,
  context: ClassFieldDecoratorContext<This, Value>
) => void;

/**
 * Namespace for FieldDecorator Service Types.
 */
namespace FieldDecoratorService {
  /**
   * Type definition for supplying a function that will act as the decorator logic.
   *
   * @typeParam T - The type of the value being decorated.
   *
   * @param meta - Metadata service that can be used for more advanced validation scenarios.
   * @param name - The name of the property being decorated.
   * @param context - The context in which the decorator is being applied.
   *
   * @returns The return definition as specified by ReturnDef.
   */
  export type Supplier<This, Value> = (
    meta: API.Reflection.Services.FieldValidatorMetaService,
    name: string,
    context: ClassFieldDecoratorContext<This, Value>
  ) => void;

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
   * const IsPositive = FieldValidatorDecorator.build<number>({
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
  export function build<This = unknown, Value = unknown>(
    supplier: Supplier<This, Value>
  ): (
    target: undefined,
    context: ClassFieldDecoratorContext<This, Value>
  ) => void {
    return function (target, context) {
      const isStage2 = typeof context === "string";
      const nameEval = isStage2 ? context : context.name;
      const strategyEval = isStage2 ? (target as any).constructor : context;
      const contextEval = isStage2 ? { name: context, metadata: {} } : context;
      const metaService =
        API.Reflection.Services.FieldValidatorMetaService.inject(strategyEval);
      supplier(metaService, String(nameEval), contextEval as any);
    };
  }
}

export default FieldDecoratorService;
