import Decorator from "../../src/decorators";
import DecoratorService from "../../src/decorators/service/decorator.service";
import $ from "../../src/types/index";

/**
 * Decorator for applying multiple validators to each element in an array property.
 *
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A validation decorator function.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   \@foreach(\@MinLength(5), \@MaxLength(10))
 *   names: string[];
 * }
 * ```
 * This example applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 */
export default function foreach<T extends NonNullable<any[] | (() => any[])>>(
  ...validators: Decorator.Instance<$.Helper.ExtractArrayType<T>>[]
): Decorator.Instance<T> {
  return DecoratorService.create<T>((property, processor, context) => {
    const validationProcessor = processor.getUntypedDescriptor(property);
    validationProcessor.thisDefault = [];
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const rules = validationProcessor.rules;
      const rootRules = rules.root;
      const foreachRules = rules.foreach;
      foreachRules.add(rootRules.pop());
    });
  });
}
