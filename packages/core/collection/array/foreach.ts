import API from "api";

/**
 * Creates a validator decorator which applies multiple validators to each element in array field.
 *
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A decorator function to use with class array fields.
 *
 * @example
 * 1: Applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 * ```ts
 * class MyClass {
 *   \@foreach(\@MinLength(5), \@MaxLength(10))
 *   names: string[];
 * }
 * ```
 */
export function foreach<This, Value extends any[]>(
  ...validators: ((
    target: undefined,
    context: ClassFieldDecoratorContext<
      This,
      Value extends (infer U)[] ? U : never
    >
  ) => void)[]
): (
  target: undefined,
  context: ClassFieldDecoratorContext<This, Value>
) => void {
  return API.Decorator.Service.FieldDecoratorService.build<This, Value>(
    (meta, property, context) => {
      const validationProcessor = meta.getUntypedDescriptor(property);
      validationProcessor.thisDefault = [];
      validators.forEach((validator) => {
        validator(undefined, context as any);
        const rules = validationProcessor.rules;
        const rootRules = rules.root;
        const foreachRules = rules.foreach;
        foreachRules.add(rootRules.pop());
      });
    }
  );
}
