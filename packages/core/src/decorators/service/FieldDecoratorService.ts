import API from "api";

namespace FieldDecoratorService {
  export type Type = unknown;

  export type ReturnDef = void;

  export type Supplier<T extends Type = Type> = (
    meta: API.Reflection.Services.FieldValidatorMetaService.default,
    name: string,
    context: Context<T>
  ) => ReturnDef;

  export type Context<T> = Readonly<{
    kind: "getter" | "method" | "field";
    static: boolean;
    private: boolean;
    name: string;
    metadata: globalThis.DecoratorMetadata;
    access: {
      get(object: any): T;
    };
  }>;

  export type Instance<T extends Type> = (
    target: any,
    context: Context<T>
  ) => ReturnDef;

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
   *   //@IsPositive
   *   public myValue: number;
   * }
   * ```
   */
  export function build<T extends Type>(supplier: Supplier<T>): Instance<T> {
    return function (target, context) {
      const isStage2 = typeof context === "string";
      const nameEval = isStage2 ? context : context.name;
      const strategyEval = isStage2 ? target.constructor : context;
      const contextEval = isStage2 ? { name: context, metadata: {} } : context;
      const metaService =
        API.Reflection.Services.FieldValidatorMetaService.default.inject(
          strategyEval
        );
      supplier(metaService, String(nameEval), contextEval as any);
    };
  }
}

export default FieldDecoratorService;
