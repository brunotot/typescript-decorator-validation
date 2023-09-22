import { TdvCore } from "tdv-core";
import makeDecorator from "../../src/decorators/decorator.factory";
import Decorator from "../../src/types/namespace/decorator.namespace";

/**
 * Decorator for applying multiple validators to each element in an array property.
 *
 * @typeParam T - The type of the array property.
 * @param validators - An array of validators to apply to each element in the array.
 * @returns A validation decorator function.
 *
 * Example usage:
 * ```typescript
 * class MyClass {
 *   @foreach<string[]>(//@MinLength(5), //@MaxLength(10))
 *   names: string[];
 * }
 * ```
 * This example applies the `MinLength` and `MaxLength` validators to each element in the `names` array property.
 */
export default function foreach<T extends NonNullable<any[] | (() => any[])>>(
  ...validators: Decorator.Type<TdvCore.Helper.ExtractArrayType<T>>[]
): Decorator.Type<T> {
  return makeDecorator<T>((property, processor, context) => {
    processor.getUntypedDescriptor(property).thisDefault = [];
    validators.forEach((validator) => {
      validator(undefined, context as any);
      const validationProcessor = processor.getUntypedDescriptor(property);
      const rules = validationProcessor.rules;
      const rootRules = rules.root;
      const foreachRules = rules.foreach;
      const foreachRule = rootRules.pop();
      foreachRules.add(foreachRule);
    });
  });
}
