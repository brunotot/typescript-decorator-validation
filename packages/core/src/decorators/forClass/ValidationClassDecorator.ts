import API from "../../../index";

/**
 * Creates validation decorators for classes.
 *
 * @typeParam T - The type of class being validated.
 * @param validate - The callback that defines the validation logic.
 * @param groups - Validation groups.
 * @returns A decorator factory for class validators.
 *
 * @example
 * ```typescript
 * \PropGreaterThan("myValue", 10)
 * class MyClass {
 *   public myValue!: number;
 * }
 *
 * function PropGreaterThan<T extends typeof MyClass>(prop: keyof MyClass, value: number) {
 *   return API.Decorator.ForClass.Validator.build<T>(instance => ({
 *     key: "PropGreaterThan",
 *     valid: instance[prop] > value,
 *     message: `${prop} must be greater than ${value}`
 *   }));
 * }
 * ```
 */
export function build<T extends API.Decorator.ForClass.Basic.Scope>(
  validate: API.Validation.Evaluator<API.Utilities.Types.UnwrapClass<T>>,
  groups: string[] = []
): API.Decorator.ForClass.Basic.Instance<T> {
  return API.Decorator.ForClass.Basic.build(meta => {
    meta.addValidator(validate, groups);
  });
}
